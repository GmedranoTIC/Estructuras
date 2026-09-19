import React, { useState } from 'react';
import { Play, Map, BookOpen, Sparkles, Award, ShieldCheck, HelpCircle, X, ChevronRight } from 'lucide-react';
import { sound } from '../game/audio';

interface CoverModalProps {
  isOpen: boolean;
  onStartGame: () => void;
  onOpenLevels: () => void;
  onOpenHelp: () => void;
  onClose: () => void;
  completedLevelsCount: number;
  totalLevelsCount: number;
}

export const CoverModal: React.FC<CoverModalProps> = ({
  isOpen,
  onStartGame,
  onOpenLevels,
  onOpenHelp,
  onClose,
  completedLevelsCount,
  totalLevelsCount,
}) => {
  const [showDidacticGuide, setShowDidacticGuide] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleStart = () => {
    sound.playClick();
    onStartGame();
  };

  const handleLevels = () => {
    sound.playClick();
    onOpenLevels();
  };

  const handleHelp = () => {
    sound.playClick();
    onOpenHelp();
  };

  return (
    <div
      id="cover-modal-overlay"
      className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-300"
    >
      <div
        id="cover-modal-card"
        className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl relative flex flex-col items-center text-center overflow-hidden my-auto"
      >
        {/* Subtle Watermark in top-right */}
        <div className="absolute top-4 right-4 flex items-center gap-2 select-none">
          <span className="text-[11px] font-mono tracking-wider font-semibold text-slate-400/70 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700/60">
            @GmedranoTIC
          </span>
          <button
            id="btn-close-cover"
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Cerrar portada y jugar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cover Photo / Portrait */}
        <div className="relative mt-2 mb-4 group">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500/40 via-sky-500/40 to-emerald-500/40 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition duration-500" />
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-slate-600/80 shadow-xl bg-slate-950">
            <img
              src="/cover.jpg"
              alt="Estructuras ESO @GmedranoTIC"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[10px] tracking-wider uppercase shadow-md whitespace-nowrap">
            Estructuras ESO
          </span>
        </div>

        {/* Mandatory Teacher / Educational Attribution Text */}
        <div className="my-2 max-w-lg">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center justify-center gap-2">
            <span>Cargo Bridge</span>
            <span className="text-amber-400 text-xs px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/30">
              {totalLevelsCount} Niveles
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base font-semibold text-sky-300 leading-relaxed bg-sky-950/40 border border-sky-800/40 rounded-xl py-2 px-3 shadow-inner">
            Juego educativo para aprender estructuras en la ESO creado por <span className="text-amber-300 font-bold underline decoration-amber-500/50">@GmedranoTIC</span>
          </p>
        </div>

        {/* Didactic Description */}
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed mt-1 text-balance">
          Pon a prueba tu ingenio construyendo puentes resistentes y económicos.
          Aprende el comportamiento de la <strong className="text-amber-300 font-medium">tracción</strong>,{' '}
          <strong className="text-sky-300 font-medium">compresión</strong>,{' '}
          <strong className="text-emerald-300 font-medium">flexión</strong> y la{' '}
          <strong className="text-purple-300 font-medium">triangulación indeformable</strong> con física realista en tiempo real.
        </p>

        {/* Progress & Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/90 text-slate-300 border border-slate-700/80">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            Progreso: <strong>{completedLevelsCount} / {totalLevelsCount}</strong> niveles
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/90 text-slate-300 border border-slate-700/80">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Resistencia en pendientes
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/90 text-slate-300 border border-slate-700/80">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            Guardado y carga JSON
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-md mt-5">
          <button
            id="btn-cover-play"
            onClick={handleStart}
            className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-black text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-lg shadow-amber-500/20 active:scale-98 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{completedLevelsCount > 0 ? 'CONTINUAR PARTIDA' : '¡EMPEZAR A JUGAR!'}</span>
          </button>

          <button
            id="btn-cover-levels"
            onClick={handleLevels}
            className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-sm text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-600/80 active:scale-98 transition-all cursor-pointer"
          >
            <Map className="w-4 h-4 text-sky-400" />
            <span>ELEGIR NIVEL</span>
          </button>
        </div>

        {/* Quick Guide Toggle Button */}
        <div className="flex items-center justify-center gap-3 mt-3.5">
          <button
            id="btn-cover-guide"
            onClick={() => setShowDidacticGuide(!showDidacticGuide)}
            className="text-xs text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-medium cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>{showDidacticGuide ? 'Ocultar conceptos de estructuras' : 'Ver conceptos clave de estructuras ESO'}</span>
            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showDidacticGuide ? 'rotate-90' : ''}`} />
          </button>

          <button
            id="btn-cover-help"
            onClick={handleHelp}
            className="text-xs text-slate-400 hover:text-sky-300 transition-colors flex items-center gap-1 font-medium cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
            <span>Cómo jugar</span>
          </button>
        </div>

        {/* Didactic Concepts Accordion */}
        {showDidacticGuide && (
          <div className="mt-3 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-left text-xs text-slate-300 w-full max-w-lg animate-in slide-in-from-top-2 duration-200">
            <h4 className="font-bold text-white mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider text-amber-400">
              <BookOpen className="w-3.5 h-3.5" /> Conceptos de Estructuras (Tecnología ESO)
            </h4>
            <ul className="space-y-1.5 text-[11px] leading-relaxed">
              <li>
                <strong className="text-amber-300">Tracción:</strong> Esfuerzo que tiende a estirar el elemento. El <span className="text-amber-200 font-semibold">Cable</span> es perfecto para soportar tracción sin añadir peso.
              </li>
              <li>
                <strong className="text-sky-300">Compresión:</strong> Esfuerzo que tiende a aplastar o acortar la barra. El <span className="text-sky-200 font-semibold">Acero</span> y la <span className="text-amber-600 font-semibold">Madera</span> resisten la compresión.
              </li>
              <li>
                <strong className="text-emerald-300">Triangulación:</strong> El triángulo es la única figura geométrica rígida e indeformable. Cualquier cuadrilátero debe dividirse con una diagonal.
              </li>
              <li>
                <strong className="text-purple-300">Pandeo:</strong> Deformación lateral que sufren las barras largas y delgadas sometidas a compresión. Evítalo usando tramos más cortos o reforzados.
              </li>
              <li>
                <strong className="text-rose-300">Pendiente y Rozamiento:</strong> Si una pasarela tiene demasiada inclinación, el trabajador se ralentizará o no podrá remontar la pendiente con cargas pesadas.
              </li>
            </ul>
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 w-full flex items-center justify-between text-[11px] text-slate-400">
          <span>@GmedranoTIC</span>
          <span>Tecnología y Digitalización • ESO</span>
        </div>
      </div>
    </div>
  );
};
