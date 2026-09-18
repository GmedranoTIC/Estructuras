import React from 'react';
import { Play, RotateCcw, Volume2, VolumeX, HelpCircle, Map, Maximize2, ShieldAlert } from 'lucide-react';
import { LevelDef } from '../types';

interface HeaderProps {
  level: LevelDef;
  mode: 'edit' | 'test';
  budgetRemaining: number;
  moneySpent: number;
  soundEnabled: boolean;
  onToggleMode: () => void;
  onResetSimulation: () => void;
  onToggleSound: () => void;
  onOpenLevels: () => void;
  onOpenHelp: () => void;
  onResetZoom: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  level,
  mode,
  budgetRemaining,
  moneySpent,
  soundEnabled,
  onToggleMode,
  onResetSimulation,
  onToggleSound,
  onOpenLevels,
  onOpenHelp,
  onResetZoom,
}) => {
  const isOverBudget = budgetRemaining < 0;
  const budgetRatio = Math.max(0, Math.min(1, budgetRemaining / level.budget));

  return (
    <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-3 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between gap-2 select-none z-20">
      {/* Left: Level Title & Level Select */}
      <div className="flex items-center gap-2 min-w-0">
        <button
          onClick={onOpenLevels}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-colors text-xs sm:text-sm font-semibold cursor-pointer shrink-0"
          title="Ver todos los niveles"
        >
          <Map className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">Niveles</span>
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-white font-bold text-sm sm:text-base truncate">
              {level.title}
            </h1>
            <span className="hidden md:inline-block px-1.5 py-0.5 rounded text-[11px] bg-slate-800 text-slate-400 border border-slate-700">
              Presupuesto: ${level.budget}
            </span>
          </div>
          <p className="text-slate-400 text-xs truncate hidden sm:block">
            {level.subtitle}
          </p>
        </div>
      </div>

      {/* Middle: Budget Status Indicator */}
      <div className="flex flex-col items-center px-2 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 min-w-[130px] sm:min-w-[170px]">
        <div className="flex items-center justify-between w-full text-xs font-mono font-bold">
          <span className="text-slate-400">Restante:</span>
          <span
            className={
              isOverBudget
                ? 'text-red-400 flex items-center gap-1'
                : budgetRemaining < 50
                ? 'text-amber-400'
                : 'text-emerald-400'
            }
          >
            {isOverBudget && <ShieldAlert className="w-3.5 h-3.5 inline" />}
            ${budgetRemaining}
          </span>
        </div>
        {/* Progress bar */}
        <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden mt-1">
          <div
            className={`h-full transition-all duration-300 ${
              isOverBudget
                ? 'bg-red-500 w-full'
                : budgetRatio < 0.2
                ? 'bg-amber-400'
                : 'bg-emerald-400'
            }`}
            style={{ width: `${isOverBudget ? 100 : budgetRatio * 100}%` }}
          />
        </div>
      </div>

      {/* Right: Mode Switcher & Tools */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {mode === 'edit' ? (
          <button
            onClick={onToggleMode}
            disabled={isOverBudget}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer ${
              isOverBudget
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-60'
                : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-950/40 active:scale-95'
            }`}
            title="Iniciar simulación de física"
          >
            <Play className="w-4 h-4 fill-current" />
            <span className="font-extrabold tracking-wide">PROBAR</span>
          </button>
        ) : (
          <button
            onClick={onResetSimulation}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-bold text-xs sm:text-sm shadow-md bg-amber-600 hover:bg-amber-500 text-white shadow-amber-950/40 active:scale-95 transition-all cursor-pointer"
            title="Volver a la mesa de diseño"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="font-extrabold tracking-wide">EDITAR</span>
          </button>
        )}

        <button
          onClick={onResetZoom}
          className="p-1.5 sm:p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/80 transition-colors cursor-pointer"
          title="Centrar vista / Resetear zoom"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        <button
          onClick={onToggleSound}
          className="p-1.5 sm:p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/80 transition-colors cursor-pointer"
          title={soundEnabled ? 'Silenciar sonido' : 'Activar sonido'}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-400" />
          )}
        </button>

        <button
          onClick={onOpenHelp}
          className="p-1.5 sm:p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/80 transition-colors cursor-pointer"
          title="Instrucciones y ayuda táctil"
        >
          <HelpCircle className="w-4 h-4 text-amber-400" />
        </button>
      </div>
    </header>
  );
};
