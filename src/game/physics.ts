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
  private jointOverstressTicks: Map<string, number> = new Map();
  private stepSoundTimer: number = 0;
  private fallPostDelay: number = 0;

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
        tensionStress: 0,
      });
    });

    this.beams = sourceBeams.map((b) => ({
      ...b,
      stress: 0,
      broken: false,
    }));
    this.fallPostDelay = 0;

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
    this.jointOverstressTicks.clear();
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
          const isTension = dist > rest;
          const matProps = MATERIALS[beam.material];

          // Normalized stress calculation (1.0 = breaking point)
          // Under tension (tracción), materials have lower resistance (especially walkway bars on the floor)
          const maxStrainFraction = isTension
            ? (0.11 * matProps.tensileStrength)
            : (0.16 * matProps.strength);

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

        // 3b. Check tensile limit at joints between floor bars (uniones entre barras del suelo a tracción)
        this.joints.forEach((joint) => {
          if (joint.fixed) return;

          const connectedWalkways = this.beams.filter(
            (b) => !b.broken && b.material === 'walkway' && (b.nodeA === joint.id || b.nodeB === joint.id)
          );

          if (connectedWalkways.length >= 1) {
            let totalTensionStrain = 0;
            for (const b of connectedWalkways) {
              const otherId = b.nodeA === joint.id ? b.nodeB : b.nodeA;
              const other = this.joints.get(otherId);
              if (!other) continue;
              const d = Math.hypot(other.x - joint.x, other.y - joint.y);
              if (d > b.length) {
                // Tension (tracción) pulling on joint
                totalTensionStrain += (d - b.length) / b.length;
              }
            }

            joint.tensionStress = totalTensionStrain;

            // Límite de unión por tracción entre barras del suelo
            const JOINT_TENSILE_LIMIT = 0.052;
            if (totalTensionStrain >= JOINT_TENSILE_LIMIT) {
              const jTicks = (this.jointOverstressTicks.get(joint.id) || 0) + 1;
              this.jointOverstressTicks.set(joint.id, jTicks);
              if (jTicks > 3) {
                this.breakFloorJoint(joint, connectedWalkways);
                this.jointOverstressTicks.set(joint.id, 0);
              }
            } else {
              this.jointOverstressTicks.set(joint.id, 0);
            }
          } else {
            joint.tensionStress = 0;
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

  private breakFloorJoint(joint: Joint, connectedWalkways: Beam[]) {
    sound.playJointSnap();

    // Spawn bolt, nut and spark particles flying from snapped joint
    for (let i = 0; i < 16; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      this.particles.push({
        x: joint.x + (Math.random() - 0.5) * 6,
        y: joint.y + (Math.random() - 0.5) * 6,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        life: 0,
        maxLife: 35 + Math.random() * 20,
        color: i % 2 === 0 ? '#facc15' : '#94a3b8',
        size: 2.2 + Math.random() * 2,
        rotation: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.5,
      });
    }

    // Snap the most strained floor beam connected to this joint
    const targetBeam = connectedWalkways.reduce(
      (max, b) => (b.stress > max.stress ? b : max),
      connectedWalkways[0]
    );
    if (targetBeam && !targetBeam.broken) {
      const a = this.joints.get(targetBeam.nodeA);
      const b = this.joints.get(targetBeam.nodeB);
      if (a && b) {
        this.breakBeam(targetBeam, a, b);
      }
    }
  }

  private triggerWorkerFall(worker: WorkerActor, vx: number) {
    if (worker.state === 'falling') return;
    worker.state = 'falling';
    worker.vx = vx;
    worker.vy = 1.2;
    sound.playScream();
    sound.playFail();
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
        // Free fall physics with natural gravity
        worker.vy += 0.38;
        worker.x += worker.vx;
        worker.y += worker.vy;

        // Water splash trigger when plunging through the river
        if (!worker.hasSplashed && worker.y >= this.level.terrain.waterY) {
          worker.hasSplashed = true;
          sound.playSplash();

          // Spawn dramatic water splash droplets
          for (let i = 0; i < 20; i++) {
            const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.5;
            const speed = 2.2 + Math.random() * 5.0;
            this.particles.push({
              x: worker.x + (Math.random() - 0.5) * 16,
              y: this.level.terrain.waterY,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              life: 0,
              maxLife: 26 + Math.random() * 22,
              color: i % 2 === 0 ? '#38bdf8' : '#e0f2fe',
              size: 2.2 + Math.random() * 3.0,
              rotation: 0,
              vRot: 0,
            });
          }
        }
        return;
      }

      if (worker.state === 'deposited') {
        return;
      }

      // Check ground beneath worker feet
      const groundInfo = this.getGroundInfo(worker.x, worker.y);
      if (groundInfo === null) {
        // No bridge or terrain beneath feet! Fall with scream!
        this.triggerWorkerFall(worker, worker.facing * 0.4);
        return;
      }

      worker.y = groundInfo.y;
      worker.onGround = true;
      worker.slope = groundInfo.slope;

      if (worker.state === 'picking_up') {
        // Paused during lifting animation
        return;
      }

      // Movement direction: +1 right, -1 left
      const dir: 1 | -1 = worker.state === 'returning' ? -1 : 1;
      worker.facing = dir;

      // Incline in direction of travel:
      // Canvas Y goes down.
      // Right (+1): dy/dx < 0 is uphill -> incline = -slope
      // Left (-1): dy/dx > 0 is uphill -> incline = +slope
      const incline = dir === 1 ? -groundInfo.slope : groundInfo.slope;
      worker.incline = incline;

      // Carried cargo weight
      const carriedCargo = worker.cargoId ? this.cargos.find((c) => c.id === worker.cargoId) : null;
      const cargoWeight = carriedCargo ? carriedCargo.weight : 0;

      // Base walking speed
      const baseSpeed = worker.cargoId ? 1.05 : 1.35;
      let actualSpeed = baseSpeed;

      // CUESTAS Y RESISTENCIA DE PENDIENTE
      if (incline > 0.03) {
        // CUESTA ARRIBA: La pendiente y la carga reducen la velocidad
        // Pendiente máxima escalable: disminuye con mayor peso de carga
        // 0 kg: máx ~0.65 (~33°); 100 kg: ~0.50 (~26°); 200 kg: ~0.38 (~21°); 400 kg: ~0.15 (~8.5°)
        const maxSlope = Math.max(0.12, 0.65 - (cargoWeight / 400) * 0.50);

        if (incline >= maxSlope) {
          // ¡NO PUEDE SUBIR! Demasiada cuesta o carga excesiva
          actualSpeed = 0;
          worker.isStruggling = true;
          worker.stuckTimer = (worker.stuckTimer || 0) + 1;

          // Ligero resbalón o esfuerzo en el sitio
          worker.x += (Math.random() - 0.6) * 0.18 * dir;
          worker.walkCycle += 0.08;

          // Quejido / esfuerzo sonoro
          if (this.stepSoundTimer % 45 === 0) {
            sound.playEffortGrunt();
          }

          // Gotas de sudor volando de la frente
          if (this.stepSoundTimer % 12 === 0) {
            this.particles.push({
              x: worker.x + (dir === 1 ? -4 : 4),
              y: worker.y - 25,
              vx: (Math.random() - 0.5) * 1.8,
              vy: -1.2 - Math.random() * 1.0,
              life: 0,
              maxLife: 20 + Math.random() * 14,
              color: '#38bdf8',
              size: 2.2,
              rotation: 0,
              vRot: 0,
            });
          }

          // Si pasa ~3 segundos atascado sin poder avanzar, la simulación falla
          if (worker.stuckTimer > 200) {
            this.isLevelFailed = true;
            this.failureReason = cargoWeight > 0
              ? `¡Pendiente demasiado empinada para la carga de ${cargoWeight} kg! El obrero no puede remontar la cuesta. Suaviza la rampa del puente.`
              : '¡Pendiente demasiado empinada! El obrero no puede subir una cuesta tan inclinada. Suaviza la rampa.';
            sound.playSnap();
          }
        } else {
          // Sube pero con resistencia proporcional
          const difficulty = incline / maxSlope; // 0..1
          const speedFactor = Math.max(0.12, 1 - Math.pow(difficulty, 1.25));
          actualSpeed = baseSpeed * speedFactor;
          worker.stuckTimer = 0;
          worker.isStruggling = difficulty > 0.45;

          if (worker.isStruggling) {
            if (this.stepSoundTimer % 65 === 0) {
              sound.playEffortGrunt();
            }
            if (this.stepSoundTimer % 18 === 0) {
              this.particles.push({
                x: worker.x + (dir === 1 ? -3 : 3),
                y: worker.y - 24,
                vx: (Math.random() - 0.5) * 1.4,
                vy: -1.0 - Math.random() * 0.8,
                life: 0,
                maxLife: 18 + Math.random() * 12,
                color: '#38bdf8',
                size: 2.0,
                rotation: 0,
                vRot: 0,
              });
            }
          }
        }
      } else {
        // PLANO O CUESTA ABAJO
        worker.isStruggling = false;
        worker.stuckTimer = 0;
        const downhillBonus = Math.min(0.28, -incline * 0.38);
        actualSpeed = baseSpeed * (1 + downhillBonus);
      }

      // Animate walking and footsteps
      if (actualSpeed > 0.05) {
        worker.walkCycle += 0.15 * Math.min(1.4, Math.max(0.5, actualSpeed));
        if (this.stepSoundTimer % 18 === 0 && worker.onGround) {
          sound.playFootstep();
        }
      }

      // Advance worker position
      if (worker.state === 'exiting_base') {
        worker.x += actualSpeed;
        const ground = this.getGroundInfo(worker.x, worker.y);
        if (ground) worker.y = ground.y;

        if (worker.x >= this.level.leftStation.x + 20) {
          worker.state = 'to_cargo';
        }
      } else if (worker.state === 'to_cargo') {
        worker.x += actualSpeed;
        const ground = this.getGroundInfo(worker.x, worker.y);
        if (ground === null) {
          this.triggerWorkerFall(worker, 0.4);
          return;
        }
        worker.y = ground.y;

        // Check cargo pickup reach
        const cargo = this.cargos.find((c) => c.id === worker.assignedCargoId && !c.collected);
        if (cargo && Math.abs(worker.x - cargo.x) < 8) {
          worker.state = 'picking_up';
          sound.playPickup();
          if (cargo.type === 'elephant') {
            sound.playElephantTrumpet();
          }
          setTimeout(() => {
            if (this.isRunning && worker.state === 'picking_up') {
              worker.state = 'returning';
              worker.cargoId = cargo.id;
              cargo.collected = true;
              cargo.carriedBy = worker.id;
            }
          }, 450);
        }
      } else if (worker.state === 'returning') {
        worker.x -= actualSpeed;
        const ground = this.getGroundInfo(worker.x, worker.y);
        if (ground === null) {
          this.triggerWorkerFall(worker, -0.4);
          return;
        }
        worker.y = ground.y;

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

  // Find ground surface height and slope beneath worker feet
  private getGroundInfo(x: number, currentY: number): { y: number; slope: number; onBridge: boolean } | null {
    // 1. Left cliff terrain
    const leftEdge = this.level.terrain.leftEdge;
    const rightEdge = this.level.terrain.rightEdge;
    const leftCliffMaxX = leftEdge[1].x;
    const rightCliffMinX = rightEdge[0].x;

    if (x <= leftCliffMaxX) {
      return { y: this.level.leftStation.y, slope: 0, onBridge: false };
    }
    if (x >= rightCliffMinX) {
      return { y: this.level.rightPlatform.y, slope: 0, onBridge: false };
    }

    // 2. Pillars if any
    if (this.level.terrain.pillars) {
      for (const p of this.level.terrain.pillars) {
        if (x >= p.x && x <= p.x + p.width) {
          return { y: p.y, slope: 0, onBridge: false };
        }
      }
    }

    // 3. Walkways (active/unbroken)
    const activeWalkways = this.beams.filter((b) => !b.broken && b.material === 'walkway');
    let bestY: number | null = null;
    let bestSlope = 0;
    let minDiff = 34;

    for (const beam of activeWalkways) {
      const a = this.joints.get(beam.nodeA);
      const b = this.joints.get(beam.nodeB);
      if (!a || !b) continue;

      const minSegX = Math.min(a.x, b.x);
      const maxSegX = Math.max(a.x, b.x);

      // Overlap with foot tolerance
      if (x >= minSegX - 4 && x <= maxSegX + 4) {
        const dx = b.x - a.x;
        if (Math.abs(dx) < 0.001) continue;
        const t = (x - a.x) / dx;
        const yOnLine = a.y + t * (b.y - a.y);
        const diff = Math.abs(currentY - yOnLine);

        if (diff < minDiff) {
          minDiff = diff;
          bestY = yOnLine;
          // Mathematical dy/dx in screen coords
          bestSlope = (b.y - a.y) / dx;
        }
      }
    }

    if (bestY !== null) {
      return { y: bestY, slope: bestSlope, onBridge: true };
    }
    return null;
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

    // Check if any worker is currently falling
    const fallingWorkers = this.workers.filter((w) => w.state === 'falling');
    if (fallingWorkers.length > 0) {
      // Allow user to watch the entire dramatic plunge:
      // Check if all falling workers have passed completely below the water level / bottom of screen
      const allPlunged = fallingWorkers.every(
        (w) => w.y > this.level.terrain.waterY + 120 || w.y > 660
      );

      if (allPlunged) {
        this.fallPostDelay++;
        // Wait ~60 physics ticks after complete plunge to let splashes and physics settle
        if (this.fallPostDelay >= 60) {
          this.isLevelFailed = true;
          this.failureReason = '¡El puente colapsó y el trabajador cayó al abismo!';
        }
      }
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
