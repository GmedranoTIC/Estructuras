import { Beam, Joint, LevelDef, MaterialType, WorkerActor, CargoItem } from '../types';
import { MATERIALS } from './materials';
import { sound } from './audio';

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  rotation: number;
  vRot: number;
}

export class PhysicsEngine {
  public joints: Map<string, Joint> = new Map();
  public beams: Beam[] = [];
  public workers: WorkerActor[] = [];
  public cargos: CargoItem[] = [];
  public particles: Particle[] = [];
  public level: LevelDef;
  public isRunning: boolean = false;
  public isLevelComplete: boolean = false;
  public isLevelFailed: boolean = false;
  public failureReason: string = '';
  public maxStressObserved: number = 0;
  public frameCount: number = 0;
  private brokenBeamIds: Set<string> = new Set();
  private beamOverstressTicks: Map<string, number> = new Map();
  private stepSoundTimer: number = 0;

  constructor(level: LevelDef, initialJoints: Joint[], initialBeams: Beam[]) {
    this.level = level;
    this.reset(initialJoints, initialBeams);
  }

  public reset(sourceJoints: Joint[], sourceBeams: Beam[]) {
    this.joints.clear();
    sourceJoints.forEach((j) => {
      this.joints.set(j.id, {
        ...j,
        oldX: j.x,
        oldY: j.y,
        radius: j.fixed ? 7 : 5.5,
      });
    });

    this.beams = sourceBeams.map((b) => ({
      ...b,
      stress: 0,
      broken: false,
    }));

    this.cargos = this.level.cargos.map((c) => ({
      ...c,
      collected: false,
    }));

    this.workers = [];
    for (let i = 0; i < this.level.workersCount; i++) {
      const assignedCargo = this.cargos[i % this.cargos.length];
      this.workers.push({
        id: `worker_${i}`,
        name: `Trabajador #${i + 1}`,
        x: this.level.leftStation.x - i * 40,
        y: this.level.leftStation.y,
        vx: 0,
        vy: 0,
        state: 'exiting_base',
        facing: 1,
        walkCycle: i * 0.5,
        assignedCargoId: assignedCargo ? assignedCargo.id : '',
        targetX: assignedCargo ? assignedCargo.x : this.level.rightPlatform.x,
        onGround: true,
      });
    }

    this.particles = [];
    this.brokenBeamIds.clear();
    this.beamOverstressTicks.clear();
    this.isLevelComplete = false;
    this.isLevelFailed = false;
    this.failureReason = '';
    this.maxStressObserved = 0;
    this.frameCount = 0;
    this.isRunning = false;
  }

  public start() {
    this.isRunning = true;
  }

  public step(substeps: number = 6) {
    if (!this.isRunning) return;
    this.frameCount++;

    // Gravity and mass constants
    const gravity = 0.28 / substeps;
    const airDamping = 0.998;

    for (let s = 0; s < substeps; s++) {
      // 1. Verlet integration on movable joints
      this.joints.forEach((joint) => {
        if (joint.fixed) return;

        const vx = (joint.x - joint.oldX) * airDamping;
        const vy = (joint.y - joint.oldY) * airDamping;

        joint.oldX = joint.x;
        joint.oldY = joint.y;

        joint.x += vx;
        joint.y += vy + gravity;
      });

      // 2. Add extra weight onto joints from workers
      this.applyWorkerLoadsToJoints(gravity * 3.5);

      // 3. Relax distance constraints
      const iterations = 8;
      for (let iter = 0; iter < iterations; iter++) {
        this.beams.forEach((beam) => {
          if (beam.broken) return;

          const a = this.joints.get(beam.nodeA);
          const b = this.joints.get(beam.nodeB);
          if (!a || !b) return;

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 0.001) return;

          const rest = beam.length;
          const isCable = beam.material === 'cable';

          // Cables only resist extension (tension), slack on compression
          if (isCable && dist < rest) {
            beam.stress = 0;
            return;
          }

          const diff = (dist - rest) / dist;
          const matProps = MATERIALS[beam.material];

          // Normalized stress calculation (1.0 = breaking point)
          // Steel breaks at ~18% strain, Wood at ~14%, Walkway at ~15%, Cable at ~22%
          const maxStrainFraction = (0.16 * matProps.strength);
          const currentStrain = Math.abs(dist - rest) / rest;
          const calculatedStress = Math.min(2.0, currentStrain / maxStrainFraction);
          beam.stress = calculatedStress;

          if (calculatedStress > this.maxStressObserved) {
            this.maxStressObserved = calculatedStress;
          }

          // Check for breakage threshold
          if (calculatedStress >= 1.0) {
            const ticks = (this.beamOverstressTicks.get(beam.id) || 0) + 1;
            this.beamOverstressTicks.set(beam.id, ticks);
            if (ticks > 4) {
              this.breakBeam(beam, a, b);
              return;
            }
          } else {
            this.beamOverstressTicks.set(beam.id, 0);
          }

          // Stiffness
          let stiffness = 0.85;
          if (beam.material === 'steel') stiffness = 0.95;
          if (beam.material === 'cable') stiffness = 0.90;

          const adjust = diff * 0.5 * stiffness;

          if (!a.fixed && !b.fixed) {
            a.x += dx * adjust;
            a.y += dy * adjust;
            b.x -= dx * adjust;
            b.y -= dy * adjust;
          } else if (!a.fixed && b.fixed) {
            a.x += dx * diff * stiffness;
            a.y += dy * diff * stiffness;
          } else if (a.fixed && !b.fixed) {
            b.x -= dx * diff * stiffness;
            b.y -= dy * diff * stiffness;
          }
        });
      }
    }

    // 4. Update Workers & Cargo AI
    this.updateWorkers();

    // 5. Update Particles
    this.updateParticles();

    // 6. Check Win/Loss conditions
    this.checkGameStatus();
  }

  private applyWorkerLoadsToJoints(workerGravity: number) {
    this.workers.forEach((worker) => {
      if (worker.state === 'falling' || !worker.onGround) return;

      // Base worker weight: 65kg
      let totalWeight = 65;
      if (worker.cargoId) {
        const c = this.cargos.find((ci) => ci.id === worker.cargoId);
        if (c) totalWeight += c.weight;
      }

      const weightForce = totalWeight * 0.015 * workerGravity;

      // Find walkway segment currently beneath worker
      const activeWalkways = this.beams.filter((b) => !b.broken && b.material === 'walkway');
      for (const beam of activeWalkways) {
        const a = this.joints.get(beam.nodeA);
        const b = this.joints.get(beam.nodeB);
        if (!a || !b) continue;

        const minX = Math.min(a.x, b.x) - 2;
        const maxX = Math.max(a.x, b.x) + 2;

        if (worker.x >= minX && worker.x <= maxX) {
          const t = Math.max(0, Math.min(1, (worker.x - a.x) / (b.x - a.x)));
          const segY = a.y + t * (b.y - a.y);

          // If worker is close to this segment's line
          if (Math.abs(worker.y - segY) < 14) {
            if (!a.fixed) a.y += weightForce * (1 - t);
            if (!b.fixed) b.y += weightForce * t;
            break;
          }
        }
      }
    });
  }

  private breakBeam(beam: Beam, a: Joint, b: Joint) {
    beam.broken = true;
    this.brokenBeamIds.add(beam.id);
    sound.playSnap();

    // Spawn splinter particles
    const midX = (a.x + b.x) / 2;
    const midY = (a.y + b.y) / 2;
    const color = MATERIALS[beam.material].testColor;

    for (let i = 0; i < 14; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 4;
      this.particles.push({
        x: midX + (Math.random() - 0.5) * 10,
        y: midY + (Math.random() - 0.5) * 10,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        life: 0,
        maxLife: 30 + Math.random() * 25,
        color,
        size: 2.5 + Math.random() * 3.5,
        rotation: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.4,
      });
    }
  }

  private updateWorkers() {
    this.stepSoundTimer++;

    this.workers.forEach((worker) => {
      if (worker.state === 'falling') {
        // Free fall physics
        worker.vy += 0.4;
        worker.x += worker.vx;
        worker.y += worker.vy;

        if (worker.y > this.level.terrain.waterY + 100) {
          this.isLevelFailed = true;
          this.failureReason = '¡Un trabajador cayó al abismo!';
        }
        return;
      }

      if (worker.state === 'deposited') {
        return;
      }

      // Animate walking
      worker.walkCycle += 0.15;
      if (this.stepSoundTimer % 18 === 0 && worker.onGround) {
        sound.playFootstep();
      }

      // Walking speeds: slightly slower when carrying heavy cargo
      const walkSpeed = worker.cargoId ? 1.05 : 1.35;

      // Handle States
      if (worker.state === 'exiting_base') {
        worker.facing = 1;
        worker.x += walkSpeed;
        const groundY = this.getGroundY(worker.x, worker.y);
        worker.y = groundY !== null ? groundY : this.level.leftStation.y;

        // Once past the station, transition to 'to_cargo'
        if (worker.x >= this.level.leftStation.x + 20) {
          worker.state = 'to_cargo';
        }
      } else if (worker.state === 'to_cargo') {
        worker.facing = 1;
        worker.x += walkSpeed;

        const groundY = this.getGroundY(worker.x, worker.y);
        if (groundY === null) {
          // No ground or bridge beneath feet! Fall!
          worker.state = 'falling';
          worker.vx = 0.5;
          worker.vy = 1;
          sound.playFail();
          return;
        }

        worker.y = groundY;

        // Check if reached the assigned cargo
        const cargo = this.cargos.find((c) => c.id === worker.assignedCargoId && !c.collected);
        if (cargo && Math.abs(worker.x - cargo.x) < 8) {
          worker.state = 'picking_up';
          sound.playPickup();
          setTimeout(() => {
            if (this.isRunning && worker.state === 'picking_up') {
              worker.state = 'returning';
              worker.cargoId = cargo.id;
              cargo.collected = true;
              cargo.carriedBy = worker.id;
            }
          }, 450);
        }
      } else if (worker.state === 'picking_up') {
        // Paused lifting animation
        worker.y = this.getGroundY(worker.x, worker.y) || worker.y;
      } else if (worker.state === 'returning') {
        worker.facing = -1;
        worker.x -= walkSpeed;

        const groundY = this.getGroundY(worker.x, worker.y);
        if (groundY === null) {
          // Bridge collapsed under worker's feet!
          worker.state = 'falling';
          worker.vx = -0.5;
          worker.vy = 1;
          sound.playFail();
          return;
        }

        worker.y = groundY;

        // Keep carried cargo synced
        if (worker.cargoId) {
          const c = this.cargos.find((ci) => ci.id === worker.cargoId);
          if (c) {
            c.x = worker.x;
            c.y = worker.y - 24;
          }
        }

        // Reached left station
        if (worker.x <= this.level.leftStation.x) {
          worker.state = 'deposited';
          // Cargo safely home
          if (worker.cargoId) {
            const c = this.cargos.find((ci) => ci.id === worker.cargoId);
            if (c) {
              c.x = this.level.leftStation.x - 30;
              c.y = this.level.leftStation.y - 12;
            }
          }
        }
      }
    });
  }

  // Find surface height beneath worker feet
  private getGroundY(x: number, currentY: number): number | null {
    // 1. Left cliff terrain
    const leftEdge = this.level.terrain.leftEdge;
    const rightEdge = this.level.terrain.rightEdge;
    const leftCliffMaxX = leftEdge[1].x;
    const rightCliffMinX = rightEdge[0].x;

    if (x <= leftCliffMaxX) {
      return this.level.leftStation.y;
    }
    if (x >= rightCliffMinX) {
      return this.level.rightPlatform.y;
    }

    // 2. Pillars if any
    if (this.level.terrain.pillars) {
      for (const p of this.level.terrain.pillars) {
        if (x >= p.x && x <= p.x + p.width) {
          return p.y;
        }
      }
    }

    // 3. Walkways (active/unbroken)
    const activeWalkways = this.beams.filter((b) => !b.broken && b.material === 'walkway');
    let bestY: number | null = null;
    let minDiff = 32;

    for (const beam of activeWalkways) {
      const a = this.joints.get(beam.nodeA);
      const b = this.joints.get(beam.nodeB);
      if (!a || !b) continue;

      const minSegX = Math.min(a.x, b.x);
      const maxSegX = Math.max(a.x, b.x);

      // Overlap with foot tolerance
      if (x >= minSegX - 4 && x <= maxSegX + 4) {
        const t = (x - a.x) / (b.x - a.x);
        const yOnLine = a.y + t * (b.y - a.y);
        const diff = Math.abs(currentY - yOnLine);

        if (diff < minDiff) {
          minDiff = diff;
          bestY = yOnLine;
        }
      }
    }

    return bestY;
  }

  private updateParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life++;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.15; // particle gravity
      p.rotation += p.vRot;

      if (p.life >= p.maxLife) {
        this.particles.splice(i, 1);
      }
    }
  }

  private checkGameStatus() {
    if (this.isLevelFailed) return;

    // Check if any worker fell
    const anyFell = this.workers.some((w) => w.state === 'falling');
    if (anyFell) {
      this.isLevelFailed = true;
      this.failureReason = '¡El puente colapsó y los trabajadores cayeron!';
      return;
    }

    // Check if all workers have safely deposited their cargo
    const allDeposited = this.workers.every((w) => w.state === 'deposited');
    if (allDeposited && !this.isLevelComplete) {
      this.isLevelComplete = true;
      sound.playWin();
    }
  }
}
