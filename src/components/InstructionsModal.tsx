import React from 'react';
import { X, Touchpad, HelpCircle, Footprints, Hammer, Shield, Cable, Sparkles, CheckCircle2 } from 'lucide-react';

interface InstructionsModalProps {
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Cómo Jugar a Cargo Bridge</h2>
              <p className="text-slate-400 text-xs">Guía de construcción, controles táctiles y física</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 py-4 text-xs sm:text-sm text-slate-300">
          {/* Goal */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5">
            <h3 className="font-bold text-white text-sm mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Objetivo Principal
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Construye un puente seguro entre los dos acantilados dentro del presupuesto.
              Al pulsar <strong className="text-emerald-400">PROBAR</strong>, los obreros saldrán de la cabaña, cruzarán el puente, recogerán la carga pesada al otro lado y volverán a la base. ¡Ahorra el máximo dinero posible para ganar 3 estrellas!
            </p>
          </div>

          {/* Touch Controls Guide */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5">
            <h3 className="font-bold text-white text-sm mb-2 flex items-center gap-1.5">
              <Touchpad className="w-4 h-4 text-sky-400" />
              Controles Táctiles y Ratón
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span><strong>Dibujar Vigas:</strong> Toca un anclaje verde o nodo existente, arrastra el dedo y suelta sobre otro punto para conectarlos.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span><strong>Atracción Magnética:</strong> El cursor se engancha automáticamente a los nodos cercanos (radio de 28px adaptado para dedos) para que no falles ninguna unión.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span><strong>Zoom y Desplazamiento:</strong> Pellizca con dos dedos para hacer zoom, o selecciona la herramienta <strong>Mover</strong> en la barra inferior para arrastrar la pantalla con un solo dedo.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span><strong>Herramienta Borrar:</strong> Toca cualquier tramo o nodo para eliminarlo y recuperar su costo en el presupuesto.</span>
              </li>
            </ul>
          </div>

          {/* Materials */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5">
            <h3 className="font-bold text-white text-sm mb-2">Materiales de Construcción</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-amber-900/40">
                <div className="font-bold text-amber-400 flex items-center gap-1.5 mb-0.5">
                  <Footprints className="w-4 h-4" /> Pasarela ($14/m)
                </div>
                <p className="text-slate-400 text-[11px]">
                  Imprescindible: Es el suelo continuo por donde caminan los obreros.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-yellow-900/40">
                <div className="font-bold text-yellow-500 flex items-center gap-1.5 mb-0.5">
                  <Hammer className="w-4 h-4" /> Viga de Madera ($8/m)
                </div>
                <p className="text-slate-400 text-[11px]">
                  Económica y ligera. Ideal para formar triángulos de soporte debajo o encima.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-700/60">
                <div className="font-bold text-slate-300 flex items-center gap-1.5 mb-0.5">
                  <Shield className="w-4 h-4 text-sky-400" /> Viga de Acero ($24/m)
                </div>
                <p className="text-slate-400 text-[11px]">
                  Gran resistencia para cargas pesadas como cajas fuertes y yunques.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-700/60">
                <div className="font-bold text-slate-300 flex items-center gap-1.5 mb-0.5">
                  <Cable className="w-4 h-4 text-slate-400" /> Cable de Acero ($10/m)
                </div>
                <p className="text-slate-400 text-[11px]">
                  Soporta enorme tracción colgado desde torres o anclajes altos.
                </p>
              </div>
            </div>
          </div>

          {/* Stress physics info */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
            <span className="font-bold text-white block mb-1">Mapa de Calor y Rotura:</span>
            <p className="text-slate-400 leading-relaxed">
              Durante la prueba, las vigas cambian de color según la tensión soportada:
              <span className="text-emerald-400 font-semibold ml-1">Verde (Normal)</span> →
              <span className="text-amber-400 font-semibold ml-1">Amarillo</span> →
              <span className="text-orange-400 font-semibold ml-1">Naranja</span> →
              <span className="text-red-400 font-semibold ml-1">Rojo crítico (¡Punto de fractura!)</span>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm cursor-pointer transition-colors"
          >
            ¡Entendido!
          </button>
        </div>
      </div>
    </div>
  );
};
