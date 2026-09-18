import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { Toolbar } from './components/Toolbar';
import { VictoryModal } from './components/VictoryModal';
import { FailureModal } from './components/FailureModal';
import { LevelSelectModal } from './components/LevelSelectModal';
import { InstructionsModal } from './components/InstructionsModal';
import { LEVELS, loadLevelProgress, saveLevelProgress } from './game/levels';
import { MATERIALS, calculateBeamCost } from './game/materials';
import { PhysicsEngine } from './game/physics';
import { GameRenderer } from './game/renderer';
import { sound } from './game/audio';
import { Beam, Joint, LevelDef, LevelProgress, MaterialType, ToolType } from './types';

interface HistorySnapshot {
  joints: Joint[];
  beams: Beam[];
}

export default function App() {
  // Game state
  const [levelIndex, setLevelIndex] = useState<number>(0);
  const currentLevel: LevelDef = LEVELS[levelIndex] || LEVELS[0];
  const [progress, setProgress] = useState<Record<number, LevelProgress>>(() => loadLevelProgress());

  // Edit / Test mode
  const [mode, setMode] = useState<'edit' | 'test'>('edit');
  const [activeTool, setActiveTool] = useState<ToolType>('walkway');
  const [gridEnabled, setGridEnabled] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => sound.isEnabled());

  // Modals
  const [showLevelModal, setShowLevelModal] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false);
  const [showFailureModal, setShowFailureModal] = useState<boolean>(false);
  const [failureReason, setFailureReason] = useState<string>('');
  const [victoryStars, setVictoryStars] = useState<number>(3);

  // Construction State
  const [joints, setJoints] = useState<Joint[]>([]);
  const [beams, setBeams] = useState<Beam[]>([]);

  // Undo / Redo stacks
  const [undoStack, setUndoStack] = useState<HistorySnapshot[]>([]);
  const [redoStack, setRedoStack] = useState<HistorySnapshot[]>([]);

  // Canvas & Viewport Camera
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 800, height: 500 });
  const cameraRef = useRef<{ x: number; y: number; zoom: number }>({ x: 0, y: 0, zoom: 1 });

  // Physics Simulation
  const physicsRef = useRef<PhysicsEngine | null>(null);

  // Dragging & Interaction State
  const isDraggingRef = useRef<boolean>(false);
  const dragStartJointIdRef = useRef<string | null>(null);
  const dragCurrentPosRef = useRef<{ x: number; y: number } | null>(null);
  const snappedJointIdRef = useRef<string | null>(null);
  const hoveredJointIdRef = useRef<string | null>(null);
  const hoveredBeamIdRef = useRef<string | null>(null);

  // Multi-touch tracking
  const activePointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const initialPinchDistRef = useRef<number | null>(null);
  const initialPinchZoomRef = useRef<number>(1);
  const lastPanPosRef = useRef<{ x: number; y: number } | null>(null);

  // Initialize level anchors when level changes
  const initLevel = useCallback((lvl: LevelDef) => {
    const initialJoints: Joint[] = lvl.anchors.map((a) => ({
      id: a.id,
      x: a.x,
      y: a.y,
      oldX: a.x,
      oldY: a.y,
      fixed: true,
      anchorId: a.id,
      radius: 8,
    }));

    setJoints(initialJoints);
    setBeams([]);
    setUndoStack([]);
    setRedoStack([]);
    setMode('edit');
    setShowVictoryModal(false);
    setShowFailureModal(false);
    physicsRef.current = null;

    // Center camera on the level
    centerCameraOnLevel(lvl);
  }, []);

  useEffect(() => {
    initLevel(currentLevel);
  }, [currentLevel, initLevel]);

  // Center and fit camera
  const centerCameraOnLevel = (lvl: LevelDef) => {
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    if (clientWidth === 0 || clientHeight === 0) return;

    // World bounds for Cargo Bridge levels
    const minX = 40;
    const maxX = 740;
    const minY = 120;
    const maxY = 560;

    const worldWidth = maxX - minX;
    const worldHeight = maxY - minY;

    const zoomX = (clientWidth * 0.92) / worldWidth;
    const zoomY = (clientHeight * 0.88) / worldHeight;
    const targetZoom = Math.min(zoomX, zoomY, 1.4);

    const worldMidX = (minX + maxX) / 2;
    const worldMidY = (minY + maxY) / 2;

    cameraRef.current = {
      zoom: targetZoom,
      x: worldMidX - clientWidth / (2 * targetZoom),
      y: worldMidY - clientHeight / (2 * targetZoom),
    };
  };

  // Resize observer for responsive canvas
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({ width: clientWidth, height: clientHeight });
      }
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Calculate budget & money spent
  const moneySpent = beams.reduce((sum, b) => sum + b.cost, 0);
  const budgetRemaining = currentLevel.budget - moneySpent;

  // Save history snapshot
  const saveSnapshot = useCallback(() => {
    setUndoStack((prev) => [
      ...prev.slice(-25),
      {
        joints: JSON.parse(JSON.stringify(joints)),
        beams: JSON.parse(JSON.stringify(beams)),
      },
    ]);
    setRedoStack([]);
  }, [joints, beams]);

  // Undo / Redo
  const handleUndo = useCallback(() => {
    if (undoStack.length === 0 || mode !== 'edit') return;

    const previous = undoStack[undoStack.length - 1];
    setRedoStack((prev) => [
      ...prev,
      {
        joints: JSON.parse(JSON.stringify(joints)),
        beams: JSON.parse(JSON.stringify(beams)),
      },
    ]);

    setJoints(previous.joints);
    setBeams(previous.beams);
    setUndoStack((prev) => prev.slice(0, -1));
    sound.playClick();
  }, [undoStack, joints, beams, mode]);

  const handleRedo = useCallback(() => {
    if (redoStack.length === 0 || mode !== 'edit') return;

    const next = redoStack[redoStack.length - 1];
    setUndoStack((prev) => [
      ...prev,
      {
        joints: JSON.parse(JSON.stringify(joints)),
        beams: JSON.parse(JSON.stringify(beams)),
      },
    ]);

    setJoints(next.joints);
    setBeams(next.beams);
    setRedoStack((prev) => prev.slice(0, -1));
    sound.playClick();
  }, [redoStack, joints, beams, mode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) handleRedo();
        else handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleMode();
      } else if (e.key === '1') setActiveTool('walkway');
      else if (e.key === '2') setActiveTool('wood');
      else if (e.key === '3') setActiveTool('steel');
      else if (e.key === '4') setActiveTool('cable');
      else if (e.key === 'e' || e.key === 'E') setActiveTool('erase');
      else if (e.key === 'm' || e.key === 'M') setActiveTool('pan');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  // Clear all constructed elements (keep only fixed anchors)
  const handleClear = () => {
    if (mode !== 'edit' || beams.length === 0) return;
    saveSnapshot();

    const anchorsOnly = currentLevel.anchors.map((a) => ({
      id: a.id,
      x: a.x,
      y: a.y,
      oldX: a.x,
      oldY: a.y,
      fixed: true,
      anchorId: a.id,
      radius: 8,
    }));

    setJoints(anchorsOnly);
    setBeams([]);
    sound.playClick();
  };

  // Switch between Edit and Test Simulation
  const toggleMode = () => {
    if (mode === 'edit') {
      if (budgetRemaining < 0) return; // Cannot start while over budget

      // Must have at least 1 walkway beam
      const hasWalkway = beams.some((b) => b.material === 'walkway');
      if (!hasWalkway) {
        alert('¡Necesitas colocar al menos una pasarela de madera para que puedan cruzar los trabajadores!');
        return;
      }

      // Initialize physics engine
      const sim = new PhysicsEngine(currentLevel, joints, beams);
      sim.start();
      physicsRef.current = sim;
      setMode('test');
      sound.playClick();
    } else {
      // Return to design
      physicsRef.current = null;
      setMode('edit');
      setShowFailureModal(false);
      sound.playClick();
    }
  };

  // Find nearest joint within snap radius
  const findNearestJoint = (
    pos: { x: number; y: number },
    snapRadiusPx: number = 28
  ): Joint | null => {
    const zoom = cameraRef.current.zoom;
    const maxWorldDist = snapRadiusPx / zoom;

    let nearest: Joint | null = null;
    let minDist = maxWorldDist;

    joints.forEach((joint) => {
      const d = Math.hypot(joint.x - pos.x, joint.y - pos.y);
      if (d < minDist) {
        minDist = d;
        nearest = joint;
      }
    });

    return nearest;
  };

  // Find nearest beam under touch/cursor (for Eraser)
  const findNearestBeam = (pos: { x: number; y: number }, maxDistancePx: number = 16): Beam | null => {
    const zoom = cameraRef.current.zoom;
    const maxWorldDist = maxDistancePx / zoom;

    const jointMap = new Map<string, Joint>();
    joints.forEach((j) => jointMap.set(j.id, j));

    let nearest: Beam | null = null;
    let minDist = maxWorldDist;

    beams.forEach((beam) => {
      const a = jointMap.get(beam.nodeA);
      const b = jointMap.get(beam.nodeB);
      if (!a || !b) return;

      // Distance from point to line segment
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const lenSq = dx * dx + dy * dy;
      if (lenSq === 0) return;

      const t = Math.max(0, Math.min(1, ((pos.x - a.x) * dx + (pos.y - a.y) * dy) / lenSq));
      const projX = a.x + t * dx;
      const projY = a.y + t * dy;

      const dist = Math.hypot(pos.x - projX, pos.y - projY);
      if (dist < minDist) {
        minDist = dist;
        nearest = beam;
      }
    });

    return nearest;
  };

  // Pointer Interaction Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);

    const rect = canvas.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;

    activePointersRef.current.set(e.pointerId, { x: screenX, y: screenY });

    // Multi-touch pinch detection
    if (activePointersRef.current.size === 2) {
      const pts = Array.from(activePointersRef.current.values());
      initialPinchDistRef.current = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      initialPinchZoomRef.current = cameraRef.current.zoom;
      lastPanPosRef.current = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
      return;
    }

    if (activePointersRef.current.size > 2) return;

    // Single touch or mouse click
    const worldPos = GameRenderer.screenToWorld(screenX, screenY, cameraRef.current);

    // If Pan Tool or middle/right click
    if (activeTool === 'pan' || e.button === 1 || e.button === 2) {
      lastPanPosRef.current = { x: screenX, y: screenY };
      return;
    }

    // In Test mode, dragging only pans camera
    if (mode === 'test') {
      lastPanPosRef.current = { x: screenX, y: screenY };
      return;
    }

    // If Eraser Tool
    if (activeTool === 'erase') {
      const nearestJoint = findNearestJoint(worldPos, 24);
      if (nearestJoint && !nearestJoint.fixed) {
        // Delete joint and connected beams
        saveSnapshot();
        setJoints((prev) => prev.filter((j) => j.id !== nearestJoint.id));
        setBeams((prev) => prev.filter((b) => b.nodeA !== nearestJoint.id && b.nodeB !== nearestJoint.id));
        sound.playClick();
        return;
      }

      const nearestBeam = findNearestBeam(worldPos, 20);
      if (nearestBeam) {
        saveSnapshot();
        setBeams((prev) => prev.filter((b) => b.id !== nearestBeam.id));
        sound.playClick();
        return;
      }
      return;
    }

    // Construction Tool: Walkway, Wood, Steel, Cable
    const nearestJoint = findNearestJoint(worldPos, 32);
    if (nearestJoint) {
      isDraggingRef.current = true;
      dragStartJointIdRef.current = nearestJoint.id;
      dragCurrentPosRef.current = worldPos;
      snappedJointIdRef.current = null;
      sound.playClick();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;

    if (activePointersRef.current.has(e.pointerId)) {
      activePointersRef.current.set(e.pointerId, { x: screenX, y: screenY });
    }

    // Two-finger Pinch & Pan
    if (activePointersRef.current.size === 2) {
      const pts = Array.from(activePointersRef.current.values());
      const currentDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const currentMid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };

      if (initialPinchDistRef.current && initialPinchDistRef.current > 10) {
        const factor = currentDist / initialPinchDistRef.current;
        const newZoom = Math.min(2.5, Math.max(0.6, initialPinchZoomRef.current * factor));

        if (lastPanPosRef.current) {
          const dx = (currentMid.x - lastPanPosRef.current.x) / cameraRef.current.zoom;
          const dy = (currentMid.y - lastPanPosRef.current.y) / cameraRef.current.zoom;
          cameraRef.current.x -= dx;
          cameraRef.current.y -= dy;
        }

        cameraRef.current.zoom = newZoom;
        lastPanPosRef.current = currentMid;
      }
      return;
    }

    // Single-pointer Camera Pan
    if (lastPanPosRef.current && (activeTool === 'pan' || mode === 'test' || e.buttons === 2 || e.buttons === 4)) {
      const dx = (screenX - lastPanPosRef.current.x) / cameraRef.current.zoom;
      const dy = (screenY - lastPanPosRef.current.y) / cameraRef.current.zoom;
      cameraRef.current.x -= dx;
      cameraRef.current.y -= dy;
      lastPanPosRef.current = { x: screenX, y: screenY };
      return;
    }

    // Construction Dragging
    const worldPos = GameRenderer.screenToWorld(screenX, screenY, cameraRef.current);

    if (isDraggingRef.current && dragStartJointIdRef.current) {
      // Check for snap to other joints (except start joint)
      const snapTarget = findNearestJoint(worldPos, 30);
      if (snapTarget && snapTarget.id !== dragStartJointIdRef.current) {
        snappedJointIdRef.current = snapTarget.id;
        dragCurrentPosRef.current = { x: snapTarget.x, y: snapTarget.y };
      } else {
        snappedJointIdRef.current = null;
        // If grid enabled, apply mild snap
        if (gridEnabled) {
          const snapSize = 10;
          dragCurrentPosRef.current = {
            x: Math.round(worldPos.x / snapSize) * snapSize,
            y: Math.round(worldPos.y / snapSize) * snapSize,
          };
        } else {
          dragCurrentPosRef.current = worldPos;
        }
      }
    } else if (mode === 'edit') {
      // Hover detection for joints or beams
      const hJoint = findNearestJoint(worldPos, 22);
      hoveredJointIdRef.current = hJoint ? hJoint.id : null;

      if (!hJoint && activeTool === 'erase') {
        const hBeam = findNearestBeam(worldPos, 16);
        hoveredBeamIdRef.current = hBeam ? hBeam.id : null;
      } else {
        hoveredBeamIdRef.current = null;
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    activePointersRef.current.delete(e.pointerId);
    if (activePointersRef.current.size < 2) {
      initialPinchDistRef.current = null;
      lastPanPosRef.current = null;
    }

    if (!isDraggingRef.current || !dragStartJointIdRef.current || !dragCurrentPosRef.current) {
      isDraggingRef.current = false;
      dragStartJointIdRef.current = null;
      dragCurrentPosRef.current = null;
      snappedJointIdRef.current = null;
      return;
    }

    // Complete beam placement
    const startJoint = joints.find((j) => j.id === dragStartJointIdRef.current);
    if (!startJoint) {
      resetDrag();
      return;
    }

    const matType = activeTool as MaterialType;
    const matProps = MATERIALS[matType];
    if (!matProps) {
      resetDrag();
      return;
    }

    let endJointId: string = '';
    let endX = dragCurrentPosRef.current.x;
    let endY = dragCurrentPosRef.current.y;

    if (snappedJointIdRef.current) {
      const targetJoint = joints.find((j) => j.id === snappedJointIdRef.current);
      if (targetJoint && targetJoint.id !== startJoint.id) {
        endJointId = targetJoint.id;
        endX = targetJoint.x;
        endY = targetJoint.y;
      }
    }

    const dist = Math.hypot(endX - startJoint.x, endY - startJoint.y);

    // Validate min and max length
    if (dist >= 18 && dist <= matProps.maxSpan) {
      const cost = calculateBeamCost(matType, dist);

      // Check if player has enough budget
      if (budgetRemaining >= cost) {
        saveSnapshot();

        let updatedJoints = [...joints];

        // If no existing joint at the end, create a new one!
        if (!endJointId) {
          endJointId = `node_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
          const newJoint: Joint = {
            id: endJointId,
            x: endX,
            y: endY,
            oldX: endX,
            oldY: endY,
            fixed: false,
            radius: 5.5,
          };
          updatedJoints.push(newJoint);
          setJoints(updatedJoints);
        }

        // Check if beam already exists between these 2 joints
        const exists = beams.some(
          (b) =>
            (b.nodeA === startJoint.id && b.nodeB === endJointId) ||
            (b.nodeA === endJointId && b.nodeB === startJoint.id)
        );

        if (!exists) {
          const newBeam: Beam = {
            id: `beam_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            nodeA: startJoint.id,
            nodeB: endJointId,
            material: matType,
            length: dist,
            stress: 0,
            broken: false,
            cost,
          };

          setBeams((prev) => [...prev, newBeam]);
          sound.playPlace(matType);
        }
      }
    }

    resetDrag();
  };

  const resetDrag = () => {
    isDraggingRef.current = false;
    dragStartJointIdRef.current = null;
    dragCurrentPosRef.current = null;
    snappedJointIdRef.current = null;
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const worldBefore = GameRenderer.screenToWorld(mouseX, mouseY, cameraRef.current);

    const zoomDelta = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.min(2.5, Math.max(0.5, cameraRef.current.zoom * zoomDelta));

    cameraRef.current.zoom = newZoom;
    const worldAfter = GameRenderer.screenToWorld(mouseX, mouseY, cameraRef.current);

    cameraRef.current.x += worldBefore.x - worldAfter.x;
    cameraRef.current.y += worldBefore.y - worldAfter.y;
  };

  // Main Render & Animation Loop
  useEffect(() => {
    let animId: number;

    const loop = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Physics step if in test mode
          if (mode === 'test' && physicsRef.current) {
            physicsRef.current.step(6);

            if (physicsRef.current.isLevelComplete && !showVictoryModal) {
              const res = saveLevelProgress(
                currentLevel.id,
                budgetRemaining,
                currentLevel.threeStarBudget,
                currentLevel.twoStarBudget
              );
              setVictoryStars(res.stars);
              setProgress(loadLevelProgress());
              setShowVictoryModal(true);
            } else if (physicsRef.current.isLevelFailed && !showFailureModal) {
              setFailureReason(physicsRef.current.failureReason);
              setShowFailureModal(true);
            }
          }

          // Build joint map
          const jointMap = new Map<string, Joint>();
          const activeJoints = physicsRef.current ? Array.from(physicsRef.current.joints.values()) : joints;
          activeJoints.forEach((j) => jointMap.set(j.id, j));

          const activeBeams = physicsRef.current ? physicsRef.current.beams : beams;
          const activeWorkers = physicsRef.current ? physicsRef.current.workers : [];
          const activeCargos = physicsRef.current ? physicsRef.current.cargos : currentLevel.cargos.map((c) => ({ ...c, collected: false }));
          const activeParticles = physicsRef.current ? physicsRef.current.particles : [];

          // Live drag cost check
          let canAffordDrag = true;
          if (isDraggingRef.current && dragStartJointIdRef.current && dragCurrentPosRef.current) {
            const start = jointMap.get(dragStartJointIdRef.current);
            if (start) {
              const d = Math.hypot(dragCurrentPosRef.current.x - start.x, dragCurrentPosRef.current.y - start.y);
              const previewCost = calculateBeamCost(activeTool as MaterialType, d);
              canAffordDrag = budgetRemaining >= previewCost;
            }
          }

          GameRenderer.render({
            ctx,
            width: dimensions.width,
            height: dimensions.height,
            camera: cameraRef.current,
            mode,
            level: currentLevel,
            joints: jointMap,
            beams: activeBeams,
            workers: activeWorkers,
            cargos: activeCargos,
            particles: activeParticles,
            dragStartJointId: dragStartJointIdRef.current,
            dragCurrentPos: dragCurrentPosRef.current,
            dragActiveMaterial: (activeTool as MaterialType) || 'walkway',
            snappedJointId: snappedJointIdRef.current,
            hoveredJointId: hoveredJointIdRef.current,
            hoveredBeamId: hoveredBeamIdRef.current,
            gridEnabled,
            canAffordDrag,
          });
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [
    mode,
    joints,
    beams,
    dimensions,
    currentLevel,
    gridEnabled,
    activeTool,
    budgetRemaining,
    showVictoryModal,
    showFailureModal,
  ]);

  // Next level navigation
  const handleNextLevel = () => {
    if (levelIndex < LEVELS.length - 1) {
      setLevelIndex(levelIndex + 1);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 font-sans overflow-hidden select-none">
      {/* Top Header */}
      <Header
        level={currentLevel}
        mode={mode}
        budgetRemaining={budgetRemaining}
        moneySpent={moneySpent}
        soundEnabled={soundEnabled}
        onToggleMode={toggleMode}
        onResetSimulation={toggleMode}
        onToggleSound={() => setSoundEnabled(sound.toggleSound())}
        onOpenLevels={() => setShowLevelModal(true)}
        onOpenHelp={() => setShowHelpModal(true)}
        onResetZoom={() => centerCameraOnLevel(currentLevel)}
      />

      {/* Main Interactive Stage Container */}
      <div
        ref={containerRef}
        className="relative flex-1 w-full h-full bg-slate-900 overflow-hidden cursor-crosshair touch-none"
      >
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onWheel={handleWheel}
          onContextMenu={(e) => e.preventDefault()}
          className="absolute inset-0 block w-full h-full"
        />

        {/* Floating Quick Helper Badge on Mobile */}
        {mode === 'edit' && (
          <div className="absolute top-3 left-3 pointer-events-none bg-slate-900/80 backdrop-blur-sm border border-slate-700/60 rounded-lg px-2.5 py-1 text-[11px] text-slate-300 shadow-md sm:block hidden">
            <span className="text-amber-400 font-bold">Consejo:</span> Toca un anclaje verde y arrastra para tender vigas.
          </div>
        )}

        {/* Live Simulation Stress Warning Banner */}
        {mode === 'test' && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl px-4 py-1.5 text-xs text-slate-200 shadow-lg flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold">Simulación en curso:</span> Los obreros van a por la carga.
          </div>
        )}
      </div>

      {/* Bottom Construction Deck */}
      <Toolbar
        activeTool={activeTool}
        onSelectTool={(tool) => {
          setActiveTool(tool);
          sound.playClick();
        }}
        canUndo={undoStack.length > 0}
        canRedo={redoStack.length > 0}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onClear={handleClear}
        gridEnabled={gridEnabled}
        onToggleGrid={() => setGridEnabled(!gridEnabled)}
        onZoomIn={() => {
          cameraRef.current.zoom = Math.min(2.5, cameraRef.current.zoom * 1.2);
        }}
        onZoomOut={() => {
          cameraRef.current.zoom = Math.max(0.5, cameraRef.current.zoom * 0.8);
        }}
        disabled={mode === 'test'}
      />

      {/* Modals */}
      {showVictoryModal && (
        <VictoryModal
          level={currentLevel}
          budgetRemaining={budgetRemaining}
          moneySpent={moneySpent}
          stars={victoryStars}
          hasNextLevel={levelIndex < LEVELS.length - 1}
          onNextLevel={() => {
            setShowVictoryModal(false);
            handleNextLevel();
          }}
          onReplay={() => {
            setShowVictoryModal(false);
            toggleMode();
          }}
          onOpenLevels={() => {
            setShowVictoryModal(false);
            setShowLevelModal(true);
          }}
        />
      )}

      {showFailureModal && (
        <FailureModal
          level={currentLevel}
          reason={failureReason}
          onRetry={() => {
            setShowFailureModal(false);
            toggleMode();
          }}
          onOpenLevels={() => {
            setShowFailureModal(false);
            setShowLevelModal(true);
          }}
        />
      )}

      {showLevelModal && (
        <LevelSelectModal
          levels={LEVELS}
          progress={progress}
          currentLevelId={currentLevel.id}
          onSelectLevel={(lvlId) => {
            const idx = LEVELS.findIndex((l) => l.id === lvlId);
            if (idx !== -1) setLevelIndex(idx);
          }}
          onClose={() => setShowLevelModal(false)}
        />
      )}

      {showHelpModal && (
        <InstructionsModal onClose={() => setShowHelpModal(false)} />
      )}
    </div>
  );
}
