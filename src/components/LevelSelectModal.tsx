import React, { useState, useRef } from 'react';
import { X, Star, Lock, CheckCircle2, Download, Upload, AlertCircle, Sparkles } from 'lucide-react';
import { LevelDef, LevelProgress } from '../types';
import { exportProgressAsJSON, importProgressFromJSON } from '../game/levels';
import { sound } from '../game/audio';

interface LevelSelectModalProps {
  levels: LevelDef[];
  progress: Record<number, LevelProgress>;
  currentLevelId: number;
  onSelectLevel: (levelId: number) => void;
  onUpdateProgress: (newProgress: Record<number, LevelProgress>) => void;
  onClose: () => void;
}

export const LevelSelectModal: React.FC<LevelSelectModalProps> = ({
  levels,
  progress,
  currentLevelId,
  onSelectLevel,
  onUpdateProgress,
  onClose,
}) => {
  const [lockedNotice, setLockedNotice] = useState<string | null>(null);
  const [shakeId, setShakeId] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [selectedTier, setSelectedTier] = useState<'all' | '1-10' | '11-20' | '21-30' | '31-40'>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stats calculation
  let completedCount = 0;
  let totalStars = 0;
  levels.forEach((lvl) => {
    const p = progress[lvl.id];
    if (p?.completed) {
      completedCount++;
      totalStars += p.stars || 0;
    }
  });

  const filteredLevels = levels.filter((lvl) => {
    if (selectedTier === '1-10') return lvl.id >= 1 && lvl.id <= 10;
    if (selectedTier === '11-20') return lvl.id >= 11 && lvl.id <= 20;
    if (selectedTier === '21-30') return lvl.id >= 21 && lvl.id <= 30;
    if (selectedTier === '31-40') return lvl.id >= 31 && lvl.id <= 40;
    return true;
  });

  const handleLevelClick = (lvl: LevelDef, unlocked: boolean) => {
    if (!unlocked) {
      sound.playLockBuzz();
      setShakeId(lvl.id);
      setLockedNotice(`🔒 Nivel ${lvl.id} bloqueado: Supera primero el Nivel ${lvl.id - 1} para desbloquear.`);
      setTimeout(() => setShakeId(null), 500);
      return;
    }

    sound.playClick();
    onSelectLevel(lvl.id);
    onClose();
  };

  const handleExportJSON = () => {
    sound.playClick();
    try {
      const jsonStr = exportProgressAsJSON(progress);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `progreso_cargo_bridge_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setStatusMessage({
        type: 'success',
        text: '¡Archivo de progreso descargado exitosamente!',
      });
      setTimeout(() => setStatusMessage(null), 4000);
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'Error al exportar el archivo de progreso.',
      });
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  const handleImportClick = () => {
    sound.playClick();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const result = importProgressFromJSON(content);
        if (result.success && result.progress) {
          onUpdateProgress(result.progress);
          sound.playWin();
          setStatusMessage({
            type: 'success',
            text: `¡Progreso restaurado! ${result.completedCount} niveles superados, ${result.totalStars} estrellas.`,
          });
          setLockedNotice(null);
        } else {
          sound.playLockBuzz();
          setStatusMessage({
            type: 'error',
            text: result.error || 'Archivo inválido o incompatible.',
          });
        }
      }
      setTimeout(() => setStatusMessage(null), 5000);
    };
    reader.readAsText(file);
    // Reset input so user can re-upload the same file if modified
    e.target.value = '';
  };

  return (
    <div
      id="level-select-overlay"
      className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 z-50 animate-in fade-in duration-200"
    >
      <div
        id="level-select-modal"
        className="bg-slate-900 border border-slate-700/90 rounded-2xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl relative max-h-[92vh] flex flex-col overflow-hidden"
      >
        {/* Background Watermark */}
        <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center opacity-[0.04] overflow-hidden z-0">
          <span className="text-7xl sm:text-9xl font-black font-mono tracking-widest -rotate-12 text-white">
            GmedranoTIC
          </span>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-800 gap-2 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-white">Seleccionar Nivel</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                {completedCount}/{levels.length} superados
              </span>
              <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                <Star className="w-3 h-3 fill-current" />
                {totalStars}/{levels.length * 3}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-sky-950/80 border border-sky-800/60 text-sky-300 font-semibold select-none">
                @GmedranoTIC
              </span>
            </div>
            <p className="text-slate-400 text-xs mt-1">
              Desbloqueo secuencial: supera cada nivel para abrir el siguiente.
            </p>
          </div>

          <button
            id="btn-close-levels-modal"
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar: Save / Load JSON Progress */}
        <div className="flex flex-wrap items-center justify-between gap-2 py-2.5 px-3 my-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="font-medium text-slate-300">Gestión de partidas guardadas:</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-export-progress-json"
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-colors cursor-pointer active:scale-95 font-medium"
              title="Descargar archivo JSON con tu progreso"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Guardar (JSON)</span>
            </button>

            <button
              id="btn-import-progress-json"
              onClick={handleImportClick}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-950/70 hover:bg-sky-900/80 text-sky-200 border border-sky-700/70 transition-colors cursor-pointer active:scale-95 font-medium"
              title="Subir archivo JSON para restaurar tu progreso"
            >
              <Upload className="w-3.5 h-3.5 text-sky-400" />
              <span>Cargar (JSON)</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept=".json,application/json"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Feedback / Notification alerts */}
        {statusMessage && (
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs mb-2 transition-all duration-200 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-200'
                : 'bg-red-950/80 border border-red-500/50 text-red-200'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            )}
            <span className="font-medium">{statusMessage.text}</span>
          </div>
        )}

        {lockedNotice && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs mb-2 bg-amber-950/80 border border-amber-500/50 text-amber-200 animate-pulse">
            <Lock className="w-4 h-4 shrink-0 text-amber-400" />
            <span className="font-medium">{lockedNotice}</span>
          </div>
        )}

        {/* Tier Tabs Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-1.5 text-xs select-none no-scrollbar">
          {[
            { id: 'all', label: `Todos (${levels.length})` },
            { id: '1-10', label: '1-10 Fundamentos' },
            { id: '11-20', label: '11-20 Cargas Medias' },
            { id: '21-30', label: '21-30 Gran Dificultad' },
            { id: '31-40', label: '31-40 Dificultad Extrema' },
          ].map((tier) => (
            <button
              key={tier.id}
              onClick={() => {
                sound.playClick();
                setSelectedTier(tier.id as any);
              }}
              className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer text-xs ${
                selectedTier === tier.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-750 border border-slate-700/60'
              }`}
            >
              {tier.label}
            </button>
          ))}
        </div>

        {/* Levels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 overflow-y-auto py-2 pr-1 flex-1">
          {filteredLevels.map((lvl) => {
            const p = progress[lvl.id] || {
              unlocked: lvl.id === 1,
              completed: false,
              bestBudgetRemaining: 0,
              stars: 0,
            };
            const isCurrent = lvl.id === currentLevelId;
            const hasElephant = lvl.cargos.some((c) => c.type === 'elephant');
            const totalWeight = lvl.cargos.reduce((acc, c) => acc + c.weight, 0);
            const isShaking = shakeId === lvl.id;

            return (
              <button
                key={lvl.id}
                id={`level-card-${lvl.id}`}
                onClick={() => handleLevelClick(lvl, p.unlocked)}
                className={`flex flex-col text-left p-3 rounded-xl border transition-all relative select-none ${
                  isShaking ? 'animate-bounce border-red-500 ring-2 ring-red-500/40' : ''
                } ${
                  isCurrent
                    ? 'bg-sky-950/70 border-sky-400 ring-2 ring-sky-500/30 shadow-lg'
                    : p.unlocked
                    ? p.completed
                      ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 hover:border-slate-500 cursor-pointer'
                      : 'bg-slate-850 hover:bg-slate-800 border-emerald-800/70 hover:border-emerald-600 cursor-pointer'
                    : 'bg-slate-950/50 border-slate-850 opacity-55 hover:opacity-75 cursor-not-allowed'
                }`}
                title={
                  p.unlocked
                    ? `Jugar Nivel ${lvl.id}: ${lvl.title}`
                    : `Bloqueado. Supera el Nivel ${lvl.id - 1} primero.`
                }
              >
                <div className="flex items-start justify-between gap-1.5">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                        Nivel {lvl.id}
                      </span>
                      {hasElephant && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-medium">
                          🐘 Elefante
                        </span>
                      )}
                      {p.completed && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-medium">
                          Superado
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-white text-xs sm:text-sm truncate mt-0.5">
                      {lvl.title.replace(`Nivel ${lvl.id}: `, '')}
                    </h3>
                  </div>

                  {!p.unlocked ? (
                    <div className="p-1.5 rounded-lg bg-slate-900 text-slate-500 shrink-0 border border-slate-800">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="flex gap-0.5 shrink-0 pt-0.5">
                      {[1, 2, 3].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= p.stars
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-slate-400 text-[11px] mt-1 line-clamp-1">
                  {lvl.subtitle}
                </p>

                <div className="flex items-center justify-between text-[11px] mt-2.5 pt-1.5 border-t border-slate-700/40 font-mono text-slate-300">
                  <span className="text-slate-400">${lvl.budget}</span>
                  {p.completed ? (
                    <span className="text-emerald-400 font-semibold text-[10px]">
                      +${p.bestBudgetRemaining}
                    </span>
                  ) : (
                    <span className="text-slate-400 text-[10px]">
                      {totalWeight} kg
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Watermark Attribution */}
        <div className="pt-2.5 mt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 select-none relative z-10">
          <span className="font-mono text-slate-400 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
            Marca de agua: @GmedranoTIC
          </span>
          <span className="text-slate-400 hidden sm:inline">
            Juego educativo para aprender estructuras en la ESO
          </span>
        </div>
      </div>
    </div>
  );
};
