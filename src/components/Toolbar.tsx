import React from 'react';
import {
  Footprints,
  Hammer,
  Shield,
  Cable as CableIcon,
  Eraser,
  Hand,
  Undo2,
  Redo2,
  Trash2,
  Grid,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { MaterialType, ToolType } from '../types';
import { MATERIALS } from '../game/materials';

interface ToolbarProps {
  activeTool: ToolType;
  onSelectTool: (tool: ToolType) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  gridEnabled: boolean;
  onToggleGrid: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  disabled?: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  activeTool,
  onSelectTool,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onClear,
  gridEnabled,
  onToggleGrid,
  onZoomIn,
  onZoomOut,
  disabled = false,
}) => {
  const materials: { type: MaterialType; icon: React.ReactNode; label: string; desc: string }[] = [
    {
      type: 'walkway',
      icon: <Footprints className="w-5 h-5" />,
      label: 'Pasarela',
      desc: 'Caminan los obreros',
    },
    {
      type: 'wood',
      icon: <Hammer className="w-5 h-5" />,
      label: 'Viga Madera',
      desc: 'Soporte triangular',
    },
    {
      type: 'steel',
      icon: <Shield className="w-5 h-5" />,
      label: 'Acero',
      desc: 'Alta resistencia',
    },
    {
      type: 'cable',
      icon: <CableIcon className="w-5 h-5" />,
      label: 'Cable',
      desc: 'Suspensión y tracción',
    },
  ];

  return (
    <div className="bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-2 sm:p-3 flex flex-wrap items-center justify-between gap-2 select-none z-20">
      {/* Materials Palette */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-0.5 max-w-full">
        {materials.map((m) => {
          const props = MATERIALS[m.type];
          const isSelected = activeTool === m.type;

          return (
            <button
              key={m.type}
              onClick={() => onSelectTool(m.type)}
              disabled={disabled}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all font-semibold text-xs sm:text-sm cursor-pointer shrink-0 border active:scale-95 ${
                isSelected
                  ? 'bg-sky-600 text-white border-sky-400 shadow-lg shadow-sky-950/50 ring-2 ring-sky-400/40'
                  : 'bg-slate-800/90 text-slate-300 border-slate-700 hover:bg-slate-700/80 hover:text-white'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={`${props.name}: $${props.costPerMeter}/m. ${m.desc}`}
            >
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: props.color }}
              />
              <div className="flex flex-col items-start leading-tight">
                <span className="font-bold flex items-center gap-1">
                  {m.label}
                </span>
                <span
                  className={`text-[10px] font-mono ${
                    isSelected ? 'text-sky-200' : 'text-slate-400'
                  }`}
                >
                  ${props.costPerMeter}/m
                </span>
              </div>
            </button>
          );
        })}

        {/* Divider */}
        <div className="h-7 w-[1px] bg-slate-700 mx-0.5 shrink-0" />

        {/* Eraser Tool */}
        <button
          onClick={() => onSelectTool('erase')}
          disabled={disabled}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border active:scale-95 shrink-0 ${
            activeTool === 'erase'
              ? 'bg-rose-600 text-white border-rose-400 shadow-lg shadow-rose-950/50 ring-2 ring-rose-400/40'
              : 'bg-slate-800/90 text-slate-300 border-slate-700 hover:bg-slate-700/80 hover:text-white'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Herramienta Borrar: Toca cualquier viga o nodo para eliminarlo"
        >
          <Eraser className="w-4 h-4" />
          <span className="hidden sm:inline">Borrar</span>
        </button>

        {/* Pan Tool (Touch navigation) */}
        <button
          onClick={() => onSelectTool('pan')}
          disabled={disabled}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border active:scale-95 shrink-0 ${
            activeTool === 'pan'
              ? 'bg-amber-600 text-white border-amber-400 shadow-lg shadow-amber-950/50 ring-2 ring-amber-400/40'
              : 'bg-slate-800/90 text-slate-300 border-slate-700 hover:bg-slate-700/80 hover:text-white'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Mover Vista: Arrastra la pantalla con un dedo para desplazarte"
        >
          <Hand className="w-4 h-4" />
          <span className="hidden sm:inline">Mover</span>
        </button>
      </div>

      {/* Right Side: Edit Actions & Zoom */}
      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
        <button
          onClick={onZoomIn}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
          title="Acercar zoom (+)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          onClick={onZoomOut}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
          title="Alejar zoom (-)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <div className="h-6 w-[1px] bg-slate-700 mx-0.5" />

        <button
          onClick={onUndo}
          disabled={!canUndo || disabled}
          className={`p-2 rounded-lg border transition-colors cursor-pointer ${
            canUndo && !disabled
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              : 'bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed'
          }`}
          title="Deshacer (Ctrl+Z)"
        >
          <Undo2 className="w-4 h-4" />
        </button>

        <button
          onClick={onRedo}
          disabled={!canRedo || disabled}
          className={`p-2 rounded-lg border transition-colors cursor-pointer ${
            canRedo && !disabled
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              : 'bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed'
          }`}
          title="Rehacer (Ctrl+Y)"
        >
          <Redo2 className="w-4 h-4" />
        </button>

        <button
          onClick={onToggleGrid}
          disabled={disabled}
          className={`p-2 rounded-lg border transition-colors cursor-pointer ${
            gridEnabled
              ? 'bg-sky-900/60 text-sky-400 border-sky-600/80'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border-slate-700'
          }`}
          title={gridEnabled ? 'Ocultar cuadrícula' : 'Mostrar cuadrícula'}
        >
          <Grid className="w-4 h-4" />
        </button>

        <button
          onClick={onClear}
          disabled={disabled}
          className="p-2 rounded-lg bg-slate-800 hover:bg-red-900/60 text-slate-400 hover:text-red-300 border border-slate-700 hover:border-red-700 transition-colors cursor-pointer"
          title="Limpiar todo el puente"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
