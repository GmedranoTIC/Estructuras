import React, { useState, useEffect, useRef } from 'react';
import { Download, X, Copy, Check, Camera, User, Star, DollarSign, Award, RefreshCw } from 'lucide-react';
import { LevelDef } from '../types';
import { sound } from '../game/audio';

interface ScreenshotModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerName: string;
  onUpdatePlayerName: (name: string) => void;
  level: LevelDef;
  levelStars: number;
  moneySpent: number;
  budgetRemaining: number;
  totalStars: number;
  maxStars: number;
  totalMoneySaved: number;
  completedLevelsCount: number;
  totalLevelsCount: number;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const ScreenshotModal: React.FC<ScreenshotModalProps> = ({
  isOpen,
  onClose,
  playerName,
  onUpdatePlayerName,
  level,
  levelStars,
  moneySpent,
  budgetRemaining,
  totalStars,
  maxStars,
  totalMoneySaved,
  completedLevelsCount,
  totalLevelsCount,
  canvasRef,
}) => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(playerName);
  const [isGenerating, setIsGenerating] = useState<boolean>(true);

  useEffect(() => {
    setTempName(playerName);
  }, [playerName]);

  const generateDiplomaImage = () => {
    setIsGenerating(true);
    try {
      const sourceCanvas = canvasRef.current;
      if (!sourceCanvas) {
        setIsGenerating(false);
        return;
      }

      // Certificate Resolution (16:9 widescreen 1280x720)
      const cWidth = 1280;
      const cHeight = 720;
      const certCanvas = document.createElement('canvas');
      certCanvas.width = cWidth;
      certCanvas.height = cHeight;
      const ctx = certCanvas.getContext('2d');

      if (!ctx) {
        setIsGenerating(false);
        return;
      }

      // 1. Background: Deep Blueprint Technical Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, cHeight);
      bgGrad.addColorStop(0, '#0a192f');
      bgGrad.addColorStop(0.5, '#071324');
      bgGrad.addColorStop(1, '#030a13');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, cWidth, cHeight);

      // Subtle technical grid pattern
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 32;
      for (let x = 0; x < cWidth; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, cHeight);
        ctx.stroke();
      }
      for (let y = 0; y < cHeight; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(cWidth, y);
        ctx.stroke();
      }

      // 2. Ornate Technical Double Border Frame with Corner Rivets
      ctx.strokeStyle = '#f59e0b'; // Amber-500
      ctx.lineWidth = 3;
      ctx.strokeRect(24, 24, cWidth - 48, cHeight - 48);

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1;
      ctx.strokeRect(32, 32, cWidth - 64, cHeight - 64);

      // Corner rivets
      const corners = [
        [32, 32],
        [cWidth - 32, 32],
        [32, cHeight - 32],
        [cWidth - 32, cHeight - 32],
      ];
      corners.forEach(([cx, cy]) => {
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Header: App branding & Educational attribution
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 15px "Courier New", monospace';
      ctx.textAlign = 'left';
      ctx.fillText('CARGO BRIDGE • TECNOLOGÍA Y ESTRUCTURAS ESO', 50, 62);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#facc15';
      ctx.font = 'bold 14px "Courier New", monospace';
      ctx.fillText('CREADO POR @GmedranoTIC', cWidth - 50, 62);

      // Certificate Title
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 28px sans-serif';
      ctx.shadowColor = 'rgba(245, 158, 11, 0.4)';
      ctx.shadowBlur = 12;
      ctx.fillText('DIPLOMA DE LOGRO Y ANÁLISIS ESTRUCTURAL', cWidth / 2, 102);
      ctx.shadowBlur = 0;

      // 4. Student / Engineer Identity Box
      ctx.textAlign = 'center';
      const displayName = (tempName || playerName || 'ALUMNO/A').trim().toUpperCase();

      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
      ctx.lineWidth = 1.5;
      const nameBoxWidth = 720;
      const nameBoxHeight = 52;
      const nameBoxX = (cWidth - nameBoxWidth) / 2;
      const nameBoxY = 118;
      ctx.fillRect(nameBoxX, nameBoxY, nameBoxWidth, nameBoxHeight);
      ctx.strokeRect(nameBoxX, nameBoxY, nameBoxWidth, nameBoxHeight);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText('INGENIERO/A RESPONSABLE DE LA OBRA:', cWidth / 2, 134);

      ctx.fillStyle = '#fbbf24'; // Vibrant Amber
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText(`👷 ${displayName}`, cWidth / 2, 158);

      // 5. Embed the Real Game Bridge Canvas!
      // Frame for the bridge screenshot
      const bridgeX = 50;
      const bridgeY = 184;
      const bridgeW = 820;
      const bridgeH = 430;

      // Outer container
      ctx.fillStyle = '#020617';
      ctx.fillRect(bridgeX, bridgeY, bridgeW, bridgeH);

      // Draw game canvas maintaining aspect ratio or fitting
      ctx.save();
      ctx.beginPath();
      ctx.rect(bridgeX, bridgeY, bridgeW, bridgeH);
      ctx.clip();

      // Fit the source canvas into bridge viewport
      const srcW = sourceCanvas.width;
      const srcH = sourceCanvas.height;
      const scale = Math.min(bridgeW / srcW, bridgeH / srcH);
      const drawW = srcW * scale;
      const drawH = srcH * scale;
      const drawX = bridgeX + (bridgeW - drawW) / 2;
      const drawY = bridgeY + (bridgeH - drawH) / 2;

      ctx.drawImage(sourceCanvas, drawX, drawY, drawW, drawH);
      ctx.restore();

      // Border around bridge canvas
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.strokeRect(bridgeX, bridgeY, bridgeW, bridgeH);

      // Overlay watermark in bottom of bridge picture
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fillRect(bridgeX + 8, bridgeY + bridgeH - 32, bridgeW - 16, 26);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1;
      ctx.strokeRect(bridgeX + 8, bridgeY + bridgeH - 32, bridgeW - 16, 26);

      ctx.fillStyle = '#f1f5f9';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`Puente construido: ${level.title}`, bridgeX + 18, bridgeY + bridgeH - 15);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#34d399';
      ctx.fillText(`Ahorro en nivel: $${budgetRemaining} / Gastado: $${moneySpent}`, bridgeX + bridgeW - 18, bridgeY + bridgeH - 15);

      // 6. Right Side Achievement & Stats Column
      const statColX = 890;
      const statColY = 184;
      const statColW = 340;
      const statColH = 430;

      // Card background
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fillRect(statColX, statColY, statColW, statColH);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.lineWidth = 2;
      ctx.strokeRect(statColX, statColY, statColW, statColH);

      // Column Header
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('ESTADÍSTICAS GLOBALES', statColX + statColW / 2, statColY + 34);

      // Stars of this level
      let starsStr = '';
      for (let s = 0; s < 3; s++) {
        starsStr += s < levelStars ? '⭐ ' : '☆ ';
      }
      ctx.font = '24px sans-serif';
      ctx.fillText(starsStr.trim(), statColX + statColW / 2, statColY + 70);

      // Separator
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
      ctx.beginPath();
      ctx.moveTo(statColX + 20, statColY + 90);
      ctx.lineTo(statColX + statColW - 20, statColY + 90);
      ctx.stroke();

      // Stat 1: Total Stars
      ctx.textAlign = 'left';
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px sans-serif';
      ctx.fillText('ESTRELLAS TOTALES:', statColX + 24, statColY + 122);

      ctx.fillStyle = '#facc15'; // Gold
      ctx.font = 'bold 24px monospace';
      ctx.fillText(`${totalStars} / ${maxStars}`, statColX + 24, statColY + 152);

      // Stat 2: Total Money Saved
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px sans-serif';
      ctx.fillText('DINERO TOTAL AHORRADO:', statColX + 24, statColY + 202);

      ctx.fillStyle = '#34d399'; // Emerald
      ctx.font = 'bold 24px monospace';
      ctx.fillText(`$${totalMoneySaved.toLocaleString('es-ES')}`, statColX + 24, statColY + 232);

      // Stat 3: Progress
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px sans-serif';
      ctx.fillText('NIVELES COMPLETADOS:', statColX + 24, statColY + 282);

      ctx.fillStyle = '#38bdf8'; // Sky
      ctx.font = 'bold 24px monospace';
      ctx.fillText(`${completedLevelsCount} / ${totalLevelsCount}`, statColX + 24, statColY + 312);

      // Educational Verification Stamp
      const stampY = statColY + 355;
      ctx.fillStyle = 'rgba(56, 189, 248, 0.1)';
      ctx.fillRect(statColX + 20, stampY, statColW - 40, 55);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.strokeRect(statColX + 20, stampY, statColW - 40, 55);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('VERIFICACIÓN ESTRUCTURAL', statColX + statColW / 2, stampY + 22);
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '10px sans-serif';
      ctx.fillText('Estructura Indeformable • ESO', statColX + statColW / 2, stampY + 40);

      // 7. Footer: Mandatory attribution & Date
      const dateStr = new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      ctx.textAlign = 'left';
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px sans-serif';
      ctx.fillText(`Juego educativo para aprender estructuras en la ESO creado por @GmedranoTIC • Fecha: ${dateStr}`, 50, cHeight - 42);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 12px "Courier New", monospace';
      ctx.fillText('Cargo Bridge ESO @GmedranoTIC', cWidth - 50, cHeight - 42);

      // Convert to image data URL
      const generatedUrl = certCanvas.toDataURL('image/png');
      setDataUrl(generatedUrl);
      setIsGenerating(false);
    } catch (err) {
      console.error('Error generating diploma capture:', err);
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      generateDiplomaImage();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownload = () => {
    sound.playWin();
    const safeName = (playerName || 'Alumno').replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ_-]/g, '_');
    const filename = `CargoBridge_ESO_${safeName}_Nivel${level.id}.png`;

    if (dataUrl) {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCopy = async () => {
    if (!dataUrl) return;
    try {
      sound.playClick();
      // Try using modern Clipboard API with Blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback: download instead
      handleDownload();
    }
  };

  const handleApplyNewName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      onUpdatePlayerName(tempName.trim());
      sound.playClick();
      setTimeout(generateDiplomaImage, 50);
    }
  };

  return (
    <div
      id="screenshot-modal-overlay"
      className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="screenshot-modal-card"
        className="bg-slate-900 border border-slate-700/90 rounded-3xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl relative flex flex-col max-h-[95vh] overflow-y-auto my-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>Captura / Diploma Oficial de Ingeniero/a</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-sky-950 border border-sky-800 text-sky-300 font-mono hidden sm:inline">
                  @GmedranoTIC
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Incrusta tu nombre, el puente construido, estrellas totales conseguidas y dinero ahorrado.
              </p>
            </div>
          </div>

          <button
            id="btn-close-screenshot"
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
            title="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Change Name Section */}
        <form
          onSubmit={handleApplyNewName}
          className="flex flex-wrap items-center gap-2.5 bg-slate-950/60 border border-slate-800 rounded-2xl p-3 my-3 text-xs"
        >
          <label className="text-slate-300 font-semibold flex items-center gap-1.5 shrink-0">
            <User className="w-4 h-4 text-amber-400" />
            <span>Nombre en la captura:</span>
          </label>
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            placeholder="Introduce tu nombre y apellidos..."
            className="flex-1 min-w-[180px] px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition-colors"
          />
          <button
            type="submit"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-semibold transition-colors cursor-pointer active:scale-95"
            title="Actualizar imagen con el nuevo nombre"
          >
            <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
            <span>Actualizar</span>
          </button>
        </form>

        {/* Image Preview Container */}
        <div className="relative w-full aspect-video max-h-[460px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-700/80 shadow-inner flex items-center justify-center my-1 group">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-3 text-slate-400 text-xs">
              <RefreshCw className="w-6 h-6 text-amber-400 animate-spin" />
              <span>Generando captura del puente y diploma...</span>
            </div>
          ) : dataUrl ? (
            <img
              src={dataUrl}
              alt="Diploma y Captura de Puente Cargo Bridge @GmedranoTIC"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-rose-400 text-xs">No se pudo componer la imagen.</div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-4 mt-2 border-t border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Listo para imprimir o adjuntar como evidencia de clase.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-copy-screenshot"
              onClick={handleCopy}
              disabled={isGenerating || !dataUrl}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-colors cursor-pointer active:scale-95 disabled:opacity-50"
              title="Copiar imagen al portapapeles"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-sky-400" />
                  <span>Copiar</span>
                </>
              )}
            </button>

            <button
              id="btn-download-screenshot"
              onClick={handleDownload}
              disabled={isGenerating || !dataUrl}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>DESCARGAR CAPTURA (PNG)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
