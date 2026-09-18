import { AnchorPoint, Beam, Joint, LevelDef, MaterialType, WorkerActor, CargoItem } from '../types';
import { MATERIALS } from './materials';
import { Particle } from './physics';

export interface RenderContext {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  camera: { x: number; y: number; zoom: number };
  mode: 'edit' | 'test';
  level: LevelDef;
  joints: Map<string, Joint>;
  beams: Beam[];
  workers: WorkerActor[];
  cargos: CargoItem[];
  particles: Particle[];
  // Dragging preview state
  dragStartJointId: string | null;
  dragCurrentPos: { x: number; y: number } | null;
  dragActiveMaterial: MaterialType;
  snappedJointId: string | null;
  hoveredJointId: string | null;
  hoveredBeamId: string | null;
  gridEnabled: boolean;
  canAffordDrag: boolean;
}

export class GameRenderer {
  // Convert world coordinates to screen
  public static worldToScreen(
    wx: number,
    wy: number,
    camera: { x: number; y: number; zoom: number }
  ) {
    return {
      x: (wx - camera.x) * camera.zoom,
      y: (wy - camera.y) * camera.zoom,
    };
  }

  // Convert screen coordinates to world
  public static screenToWorld(
    sx: number,
    sy: number,
    camera: { x: number; y: number; zoom: number }
  ) {
    return {
      x: sx / camera.zoom + camera.x,
      y: sy / camera.zoom + camera.y,
    };
  }

  public static render(rc: RenderContext) {
    const { ctx, width, height, camera, mode } = rc;

    ctx.save();
    ctx.clearRect(0, 0, width, height);

    if (mode === 'edit') {
      // 1. Blueprint Background
      this.drawBlueprintBackground(rc);
    } else {
      // 1. Scenic Sky & Mountains Background
      this.drawRealisticBackground(rc);
    }

    // Apply Camera transform for world objects
    ctx.save();
    ctx.scale(camera.zoom, camera.zoom);
    ctx.translate(-camera.x, -camera.y);

    // 2. Terrain (Cliffs, water, pillars)
    this.drawTerrain(rc);

    // 3. Stations & Platforms
    this.drawStations(rc);

    // 4. Cargos on the ground
    this.drawCargos(rc);

    // 5. Beams (Bridge structure)
    this.drawBeams(rc);

    // 6. Preview line if dragging in edit mode
    if (mode === 'edit' && rc.dragStartJointId && rc.dragCurrentPos) {
      this.drawPreviewBeam(rc);
    }

    // 7. Joints (Nodes & Anchors)
    this.drawJoints(rc);

    // 8. Workers (only in test mode, or idle in edit mode)
    this.drawWorkers(rc);

    // 9. Physics particles (splinters, dust)
    this.drawParticles(rc);

    ctx.restore();

    // 10. Screen-space Overlays / crosshair
    if (mode === 'edit') {
      this.drawScreenOverlay(rc);
    }

    ctx.restore();
  }

  private static drawBlueprintBackground(rc: RenderContext) {
    const { ctx, width, height, camera, gridEnabled } = rc;

    // Dark technical blueprint cyan-blue
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#0c2238');
    grad.addColorStop(1, '#081726');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    if (!gridEnabled) return;

    // Blueprint grid
    const gridSize = 20 * camera.zoom;
    const startX = (-camera.x * camera.zoom) % gridSize;
    const startY = (-camera.y * camera.zoom) % gridSize;

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';

    ctx.beginPath();
    for (let x = startX; x < width; x += gridSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = startY; y < height; y += gridSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();

    // Major 100px grid lines
    const majorGridSize = 100 * camera.zoom;
    const majorStartX = (-camera.x * camera.zoom) % majorGridSize;
    const majorStartY = (-camera.y * camera.zoom) % majorGridSize;

    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';

    ctx.beginPath();
    for (let x = majorStartX; x < width; x += majorGridSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = majorStartY; y < height; y += majorGridSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  }

  private static drawRealisticBackground(rc: RenderContext) {
    const { ctx, width, height } = rc;

    // Rich cartoon sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
    skyGrad.addColorStop(0, '#38bdf8'); // deep bright sky
    skyGrad.addColorStop(0.55, '#bae6fd');
    skyGrad.addColorStop(0.8, '#fef08a'); // horizon warmth
    skyGrad.addColorStop(1, '#fed7aa');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Distant mountain silhouettes
    ctx.fillStyle = '#93c5fd';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.7);
    ctx.lineTo(width * 0.25, height * 0.38);
    ctx.lineTo(width * 0.5, height * 0.65);
    ctx.lineTo(width * 0.78, height * 0.32);
    ctx.lineTo(width, height * 0.68);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Closer mountain layer
    ctx.fillStyle = '#60a5fa';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.75);
    ctx.lineTo(width * 0.18, height * 0.48);
    ctx.lineTo(width * 0.42, height * 0.72);
    ctx.lineTo(width * 0.68, height * 0.44);
    ctx.lineTo(width * 0.92, height * 0.66);
    ctx.lineTo(width, height * 0.75);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
  }

  private static drawTerrain(rc: RenderContext) {
    const { ctx, level, mode } = rc;
    const { leftEdge, rightEdge, waterY, pillars } = level.terrain;

    if (mode === 'edit') {
      // Blueprint terrain outline style
      ctx.fillStyle = 'rgba(14, 116, 144, 0.25)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;

      // Left cliff
      ctx.beginPath();
      leftEdge.forEach((p, idx) => {
        if (idx === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Right cliff
      ctx.beginPath();
      rightEdge.forEach((p, idx) => {
        if (idx === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Pillars if any
      if (pillars) {
        pillars.forEach((pil) => {
          ctx.beginPath();
          ctx.rect(pil.x, pil.y, pil.width, pil.height);
          ctx.fill();
          ctx.stroke();
        });
      }

      // Water line
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      ctx.moveTo(0, waterY);
      ctx.lineTo(800, waterY);
      ctx.stroke();
      ctx.setLineDash([]);
      return;
    }

    // Realistic Mode: Rich rock canyon with grass rims and rushing river
    // 1. Water in canyon
    const waterGrad = ctx.createLinearGradient(0, waterY, 0, waterY + 80);
    waterGrad.addColorStop(0, '#0284c7');
    waterGrad.addColorStop(0.5, '#0369a1');
    waterGrad.addColorStop(1, '#075985');
    ctx.fillStyle = waterGrad;
    ctx.fillRect(0, waterY, 800, 200);

    // Water wave highlights
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 6; i++) {
      const wx = (i * 140 + (Date.now() / 25) % 140);
      ctx.beginPath();
      ctx.moveTo(wx, waterY + 12);
      ctx.quadraticCurveTo(wx + 30, waterY + 6, wx + 60, waterY + 12);
      ctx.stroke();
    }

    // 2. Left rock cliff
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    leftEdge.forEach((p, idx) => {
      if (idx === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    ctx.fill();

    // Grass rim on left
    ctx.fillStyle = '#65a30d';
    ctx.beginPath();
    ctx.rect(leftEdge[0].x, leftEdge[0].y - 3, leftEdge[1].x - leftEdge[0].x, 8);
    ctx.fill();

    // 3. Right rock cliff
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    rightEdge.forEach((p, idx) => {
      if (idx === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    ctx.fill();

    // Grass rim on right
    ctx.fillStyle = '#65a30d';
    ctx.beginPath();
    ctx.rect(rightEdge[0].x, rightEdge[0].y - 3, rightEdge[1].x - rightEdge[0].x, 8);
    ctx.fill();

    // Pillars if any
    if (pillars) {
      pillars.forEach((pil) => {
        ctx.fillStyle = '#334155';
        ctx.fillRect(pil.x, pil.y, pil.width, pil.height);

        // Pillar grass cap
        ctx.fillStyle = '#65a30d';
        ctx.fillRect(pil.x - 2, pil.y - 2, pil.width + 4, 6);
      });
    }
  }

  private static drawStations(rc: RenderContext) {
    const { ctx, level, mode } = rc;
    const { leftStation, rightPlatform } = level;

    if (mode === 'edit') {
      // Blueprint house icon
      ctx.strokeStyle = '#38bdf8';
      ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.lineWidth = 2;

      // Base Cabin
      ctx.beginPath();
      ctx.rect(leftStation.x - 45, leftStation.y - 50, 45, 50);
      ctx.fill();
      ctx.stroke();

      // Roof
      ctx.beginPath();
      ctx.moveTo(leftStation.x - 50, leftStation.y - 50);
      ctx.lineTo(leftStation.x - 22, leftStation.y - 75);
      ctx.lineTo(leftStation.x + 5, leftStation.y - 50);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Target platform flag/sign
      ctx.beginPath();
      ctx.moveTo(rightPlatform.x + 40, rightPlatform.y);
      ctx.lineTo(rightPlatform.x + 40, rightPlatform.y - 55);
      ctx.stroke();
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(rightPlatform.x + 40, rightPlatform.y - 55, 30, 20);
      return;
    }

    // Realistic Mode: Wooden Pioneer Cabin & Cargo Depot
    // 1. Pioneer Cabin (Left)
    const hx = leftStation.x - 45;
    const hy = leftStation.y - 50;

    // Walls
    ctx.fillStyle = '#92400e';
    ctx.fillRect(hx, hy, 45, 50);

    // Wood panel horizontal lines
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 1.5;
    for (let y = hy + 10; y < leftStation.y; y += 10) {
      ctx.beginPath();
      ctx.moveTo(hx, y);
      ctx.lineTo(hx + 45, y);
      ctx.stroke();
    }

    // Doorway
    ctx.fillStyle = '#451a03';
    ctx.fillRect(hx + 22, leftStation.y - 32, 18, 32);

    // Roof
    ctx.fillStyle = '#b91c1c'; // red tin roof
    ctx.beginPath();
    ctx.moveTo(hx - 5, hy);
    ctx.lineTo(hx + 22, hy - 25);
    ctx.lineTo(hx + 50, hy);
    ctx.closePath();
    ctx.fill();

    // Chimney with smoke
    ctx.fillStyle = '#64748b';
    ctx.fillRect(hx + 8, hy - 30, 8, 18);

    // Sign "BASE"
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(hx + 4, hy + 4, 24, 10);
    ctx.fillStyle = '#78350f';
    ctx.font = 'bold 7px sans-serif';
    ctx.fillText('BASE', hx + 7, hy + 12);

    // 2. Cargo platform sign
    ctx.fillStyle = '#92400e';
    ctx.fillRect(rightPlatform.x + 35, rightPlatform.y - 45, 5, 45);
    ctx.fillStyle = '#eab308';
    ctx.fillRect(rightPlatform.x + 25, rightPlatform.y - 45, 25, 16);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 8px sans-serif';
    ctx.fillText('CARGA', rightPlatform.x + 27, rightPlatform.y - 34);
  }

  private static drawCargos(rc: RenderContext) {
    const { ctx, cargos, mode } = rc;

    cargos.forEach((cargo) => {
      if (cargo.carriedBy) return; // Handled by worker drawing

      ctx.save();
      ctx.translate(cargo.x, cargo.y);

      if (mode === 'edit') {
        ctx.fillStyle = 'rgba(234, 179, 8, 0.2)';
        ctx.strokeStyle = '#eab308';
        ctx.lineWidth = 2;
        ctx.fillRect(-12, -24, 24, 24);
        ctx.strokeRect(-12, -24, 24, 24);

        ctx.fillStyle = '#eab308';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${cargo.weight}kg`, 0, -28);
      } else {
        this.renderCargoGraphic(ctx, cargo);
      }

      ctx.restore();
    });
  }

  public static renderCargoGraphic(ctx: CanvasRenderingContext2D, cargo: CargoItem) {
    ctx.save();
    if (cargo.type === 'crate') {
      // Wooden Crate
      ctx.fillStyle = '#b45309';
      ctx.fillRect(-11, -22, 22, 22);
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 2;
      ctx.strokeRect(-11, -22, 22, 22);
      // Crossbars
      ctx.beginPath();
      ctx.moveTo(-11, -22);
      ctx.lineTo(11, 0);
      ctx.moveTo(-11, 0);
      ctx.lineTo(11, -22);
      ctx.stroke();
    } else if (cargo.type === 'safe') {
      // Steel Safe
      ctx.fillStyle = '#334155';
      ctx.fillRect(-13, -24, 26, 24);
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.strokeRect(-13, -24, 26, 24);
      // Dial
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.arc(0, -12, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(0, -12, 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (cargo.type === 'barrel') {
      // Blue Industrial Barrel
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.roundRect(-10, -24, 20, 24, 4);
      ctx.fill();
      ctx.strokeStyle = '#075985';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      // Ribs
      ctx.strokeStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(-10, -17);
      ctx.lineTo(10, -17);
      ctx.moveTo(-10, -8);
      ctx.lineTo(10, -8);
      ctx.stroke();
    } else if (cargo.type === 'gold') {
      // Golden Idol
      ctx.fillStyle = '#eab308';
      ctx.beginPath();
      ctx.arc(0, -18, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(-8, -12, 16, 12);
      ctx.strokeStyle = '#ca8a04';
      ctx.lineWidth = 2;
      ctx.stroke();
    } else {
      // Anvil
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(-12, -8, 24, 8);
      ctx.fillRect(-6, -18, 12, 10);
      ctx.fillRect(-14, -22, 28, 6);
    }

    // Weight badge
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 8px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${cargo.weight}kg`, 0, -26);

    ctx.restore();
  }

  private static drawBeams(rc: RenderContext) {
    const { ctx, joints, beams, mode, hoveredBeamId } = rc;

    beams.forEach((beam) => {
      if (beam.broken) return;

      const a = joints.get(beam.nodeA);
      const b = joints.get(beam.nodeB);
      if (!a || !b) return;

      const mat = MATERIALS[beam.material];

      ctx.save();
      ctx.lineCap = 'round';

      if (mode === 'edit') {
        const isHovered = hoveredBeamId === beam.id;

        ctx.strokeStyle = isHovered ? '#ef4444' : mat.color;
        ctx.lineWidth = mat.strokeWidth;

        if (beam.material === 'cable') {
          ctx.setLineDash([4, 3]);
        }

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();

        // Walkway tread notches
        if (beam.material === 'walkway') {
          ctx.strokeStyle = '#fef08a';
          ctx.lineWidth = 1.5;
          const count = Math.floor(beam.length / 15);
          for (let i = 1; i <= count; i++) {
            const t = i / (count + 1);
            const px = a.x + t * (b.x - a.x);
            const py = a.y + t * (b.y - a.y);
            ctx.beginPath();
            ctx.arc(px, py, 1.5, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      } else {
        // Realistic Test Mode: Realistic appearance with Stress Heatmap
        // Stress: 0 to 1.0+
        const stress = beam.stress;
        let strokeColor = mat.testColor;

        if (stress > 0.88) {
          // Critical stress: blinking bright red
          strokeColor = (Math.floor(Date.now() / 80) % 2 === 0) ? '#ef4444' : '#f87171';
        } else if (stress > 0.70) {
          strokeColor = '#f97316'; // orange
        } else if (stress > 0.45) {
          strokeColor = '#eab308'; // yellow
        } else if (stress > 0.20) {
          strokeColor = '#84cc16'; // lime green
        }

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = mat.strokeWidth;

        if (beam.material === 'cable') {
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = stress > 0.7 ? strokeColor : '#94a3b8';
        }

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();

        // If Walkway in test mode, draw wooden planks along top
        if (beam.material === 'walkway') {
          ctx.strokeStyle = '#451a03';
          ctx.lineWidth = 2;
          const count = Math.max(2, Math.floor(beam.length / 12));
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const len = Math.hypot(dx, dy);
          const nx = -dy / len;
          const ny = dx / len;

          for (let i = 0; i <= count; i++) {
            const t = i / count;
            const px = a.x + t * dx;
            const py = a.y + t * dy;
            ctx.beginPath();
            ctx.moveTo(px - nx * 4, py - ny * 4);
            ctx.lineTo(px + nx * 4, py + ny * 4);
            ctx.stroke();
          }
        }
      }

      ctx.restore();
    });
  }

  private static drawJoints(rc: RenderContext) {
    const { ctx, joints, mode, hoveredJointId, snappedJointId, dragStartJointId } = rc;

    joints.forEach((joint) => {
      const isAnchor = joint.fixed;
      const isSnapped = snappedJointId === joint.id;
      const isDragStart = dragStartJointId === joint.id;
      const isHovered = hoveredJointId === joint.id;

      ctx.save();
      ctx.translate(joint.x, joint.y);

      if (mode === 'edit') {
        if (isAnchor) {
          // Large bolted green anchor plate
          ctx.fillStyle = '#10b981';
          ctx.beginPath();
          ctx.arc(0, 0, 8.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Anchor bolt center
          ctx.fillStyle = '#064e3b';
          ctx.beginPath();
          ctx.arc(0, 0, 3, 0, Math.PI * 2);
          ctx.fill();

          // Pulsing snap target circle
          if (isSnapped || isHovered) {
            ctx.strokeStyle = '#22c55e';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(0, 0, 16, 0, Math.PI * 2);
            ctx.stroke();
          }
        } else {
          // Standard node joint
          ctx.fillStyle = isDragStart ? '#f59e0b' : '#38bdf8';
          ctx.beginPath();
          ctx.arc(0, 0, 5.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          if (isSnapped || isHovered) {
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, 14, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      } else {
        // Test mode joint
        ctx.fillStyle = isAnchor ? '#10b981' : '#475569';
        ctx.beginPath();
        ctx.arc(0, 0, isAnchor ? 7 : 4.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = isAnchor ? '#ffffff' : '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.restore();
    });
  }

  private static drawPreviewBeam(rc: RenderContext) {
    const { ctx, joints, dragStartJointId, dragCurrentPos, dragActiveMaterial, snappedJointId, canAffordDrag } = rc;
    if (!dragStartJointId || !dragCurrentPos) return;

    const start = joints.get(dragStartJointId);
    if (!start) return;

    const mat = MATERIALS[dragActiveMaterial];
    let targetX = dragCurrentPos.x;
    let targetY = dragCurrentPos.y;

    if (snappedJointId) {
      const target = joints.get(snappedJointId);
      if (target) {
        targetX = target.x;
        targetY = target.y;
      }
    }

    const dist = Math.hypot(targetX - start.x, targetY - start.y);
    const exceedsSpan = dist > mat.maxSpan;
    const isValid = !exceedsSpan && canAffordDrag && dist >= 18;

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineWidth = mat.strokeWidth;
    ctx.strokeStyle = isValid ? '#22c55e' : '#ef4444';
    ctx.setLineDash([6, 4]);

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(targetX, targetY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Live Tag with Length and Cost
    const midX = (start.x + targetX) / 2;
    const midY = (start.y + targetY) / 2;
    const meters = (dist / 10).toFixed(1);
    const cost = Math.round((dist / 10) * mat.costPerMeter);

    const tagText = exceedsSpan
      ? `¡Muy largo! (Máx ${Math.round(mat.maxSpan / 10)}m)`
      : !canAffordDrag
      ? `¡Sin presupuesto! ($${cost})`
      : `${meters}m · $${cost}`;

    ctx.font = 'bold 11px sans-serif';
    const textWidth = ctx.measureText(tagText).width;

    ctx.fillStyle = isValid ? 'rgba(15, 23, 42, 0.85)' : 'rgba(185, 28, 28, 0.9)';
    ctx.beginPath();
    ctx.roundRect(midX - textWidth / 2 - 6, midY - 22, textWidth + 12, 18, 5);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(tagText, midX, midY - 9);

    // Target end circle indicator
    ctx.fillStyle = isValid ? '#22c55e' : '#ef4444';
    ctx.beginPath();
    ctx.arc(targetX, targetY, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  private static drawWorkers(rc: RenderContext) {
    const { ctx, workers, cargos } = rc;

    workers.forEach((worker) => {
      ctx.save();
      ctx.translate(worker.x, worker.y);

      // Facing orientation
      ctx.scale(worker.facing, 1);

      if (worker.state === 'falling') {
        // Tumbling / flailing animation
        ctx.rotate((worker.vy * 0.4));
      }

      // 1. Legs animation
      const legAngle = Math.sin(worker.walkCycle) * 0.45;
      ctx.strokeStyle = '#1e3a8a'; // denim blue pants
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';

      // Left leg
      ctx.beginPath();
      ctx.moveTo(-2, -6);
      ctx.lineTo(-2 + Math.sin(legAngle) * 7, 0);
      ctx.stroke();

      // Right leg
      ctx.beginPath();
      ctx.moveTo(2, -6);
      ctx.lineTo(2 - Math.sin(legAngle) * 7, 0);
      ctx.stroke();

      // Boots
      ctx.fillStyle = '#78350f';
      ctx.fillRect(-4 + Math.sin(legAngle) * 7, -2, 5, 3);
      ctx.fillRect(0 - Math.sin(legAngle) * 7, -2, 5, 3);

      // 2. Body / Torso
      ctx.fillStyle = '#dc2626'; // red plaid worker shirt
      ctx.fillRect(-5, -17, 10, 11);

      // Blue overalls straps
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(-4, -17, 2, 11);
      ctx.fillRect(2, -17, 2, 11);

      // 3. Head & Hard Hat
      // Face
      ctx.fillStyle = '#fbcfe8';
      ctx.beginPath();
      ctx.arc(0, -21, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Eye
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(1, -22, 1.5, 1.5);

      // Yellow Hard Hat (Iconic Cargo Bridge look)
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(0, -23, 6, Math.PI, 0);
      ctx.fill();
      // Hat visor
      ctx.fillRect(-6, -23, 13, 2.5);

      // 4. Arms & Carried Cargo
      if (worker.cargoId) {
        // Carrying cargo overhead or in front
        ctx.strokeStyle = '#fbcfe8';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(-2, -14);
        ctx.lineTo(4, -20);
        ctx.lineTo(6, -26);
        ctx.stroke();

        // Render carried cargo
        const cargo = cargos.find((c) => c.id === worker.cargoId);
        if (cargo) {
          ctx.save();
          ctx.translate(6, -28);
          this.renderCargoGraphic(ctx, cargo);
          ctx.restore();
        }
      } else {
        // Idle swinging arms
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(0, -14);
        ctx.lineTo(Math.cos(legAngle) * 6, -8);
        ctx.stroke();
      }

      ctx.restore();
    });
  }

  private static drawParticles(rc: RenderContext) {
    const { ctx, particles } = rc;

    particles.forEach((p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      const alpha = 1 - p.life / p.maxLife;
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.fillStyle = p.color;

      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 2);

      ctx.restore();
    });
  }

  private static drawScreenOverlay(rc: RenderContext) {
    const { ctx, width, height, canAffordDrag, dragStartJointId } = rc;

    // Small compass / scale indicator in lower left
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(16, height - 20);
    ctx.lineTo(66, height - 20);
    ctx.moveTo(16, height - 24);
    ctx.lineTo(16, height - 16);
    ctx.moveTo(66, height - 24);
    ctx.lineTo(66, height - 16);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '10px monospace';
    ctx.fillText('5 metros', 20, height - 8);

    if (dragStartJointId && !canAffordDrag) {
      // Warning overlay banner
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Presupuesto insuficiente para este tramo', width / 2, 48);
    }

    ctx.restore();
  }
}
