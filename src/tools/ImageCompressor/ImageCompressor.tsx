import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  UploadCloud, 
  Download, 
  FileCheck, 
  Sparkles, 
  RefreshCw, 
  Lock, 
  Unlock, 
  Sliders, 
  Eye, 
  ArrowRight,
  Layers,
  FileImage
} from 'lucide-react';
import { compressImage, formatBytes, CompressionOptions, CompressionResult } from './utils';

export function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [originalDims, setOriginalDims] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const [quality, setQuality] = useState<number>(80);
  const [format, setFormat] = useState<'image/webp' | 'image/jpeg' | 'image/png'>('image/webp');
  const [targetWidth, setTargetWidth] = useState<number>(0);
  const [targetHeight, setTargetHeight] = useState<number>(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(true);

  const [result, setResult] = useState<CompressionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [sliderPos, setSliderPos] = useState<number>(50); // comparison split %
  const [viewMode, setViewMode] = useState<'split' | 'sideBySide'>('split');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const comparisonContainerRef = useRef<HTMLDivElement>(null);

  // Load sample image for instant demo
  const loadSampleImage = () => {
    // Generate a colorful high-res SVG canvas and convert to File
    const canvas = document.createElement('canvas');
    canvas.width = 1600;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 1600, 1000);
      grad.addColorStop(0, '#4338ca');
      grad.addColorStop(0.5, '#6366f1');
      grad.addColorStop(1, '#ec4899');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1600, 1000);

      // Add modern geometric shapes
      for (let i = 0; i < 20; i++) {
        ctx.fillStyle = `rgba(255, 255, 255, ${0.05 + (i % 5) * 0.04})`;
        ctx.beginPath();
        ctx.arc((i * 137) % 1600, (i * 223) % 1000, 80 + (i * 12), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 54px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Client-Side WebP Compression Demo', 800, 480);
      ctx.font = '28px Inter, sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.fillText('100% In-Browser Canvas API • Zero Server Upload', 800, 540);

      canvas.toBlob((blob) => {
        if (blob) {
          const sampleFile = new File([blob], 'demo-artwork.png', { type: 'image/png' });
          handleFileSelected(sampleFile);
        }
      }, 'image/png');
    }
  };

  const handleFileSelected = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WebP, etc.)');
      return;
    }

    setFile(selectedFile);
    setOriginalSize(selectedFile.size);

    const objectUrl = URL.createObjectURL(selectedFile);
    setOriginalPreview(objectUrl);

    // Read natural dimensions
    const img = new Image();
    img.onload = () => {
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      setOriginalDims({ width: w, height: h });
      setTargetWidth(w);
      setTargetHeight(h);
    };
    img.src = objectUrl;
  };

  const triggerCompression = useCallback(async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const options: CompressionOptions = {
        quality: quality / 100,
        maxWidth: targetWidth > 0 ? targetWidth : undefined,
        maxHeight: targetHeight > 0 ? targetHeight : undefined,
        format,
        maintainAspectRatio,
      };

      const compressed = await compressImage(file, options);
      setResult(compressed);
    } catch (err) {
      console.error('Compression failed:', err);
    } finally {
      setIsProcessing(false);
    }
  }, [file, quality, format, targetWidth, targetHeight, maintainAspectRatio]);

  // Re-run compression when settings change (debounced)
  useEffect(() => {
    if (!file) return;
    const timer = setTimeout(() => {
      triggerCompression();
    }, 150);
    return () => clearTimeout(timer);
  }, [file, quality, format, targetWidth, targetHeight, maintainAspectRatio, triggerCompression]);

  const handleDimensionChange = (val: number, dimension: 'width' | 'height') => {
    if (dimension === 'width') {
      setTargetWidth(val);
      if (maintainAspectRatio && originalDims.width > 0) {
        const ratio = originalDims.height / originalDims.width;
        setTargetHeight(Math.round(val * ratio));
      }
    } else {
      setTargetHeight(val);
      if (maintainAspectRatio && originalDims.height > 0) {
        const ratio = originalDims.width / originalDims.height;
        setTargetWidth(Math.round(val * ratio));
      }
    }
  };

  const applyScalePreset = (percent: number) => {
    if (!originalDims.width) return;
    const factor = percent / 100;
    setTargetWidth(Math.round(originalDims.width * factor));
    setTargetHeight(Math.round(originalDims.height * factor));
  };

  const downloadCompressed = () => {
    if (!result) return;
    const ext = format === 'image/webp' ? 'webp' : format === 'image/jpeg' ? 'jpg' : 'png';
    const baseName = file?.name.replace(/\.[^/.]+$/, '') || 'image';
    const filename = `${baseName}-compressed.${ext}`;

    const link = document.createElement('a');
    link.href = result.dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const savingsPercent = originalSize > 0 && result
    ? Math.round(((originalSize - result.size) / originalSize) * 100)
    : 0;

  // Split slider mouse/touch handler
  const handleSplitMouseMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!comparisonContainerRef.current) return;
    const rect = comparisonContainerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(pos, 2), 98));
  };

  return (
    <div className="space-y-8">
      {/* Upload & Drag Drop Zone */}
      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files?.[0]) {
              handleFileSelected(e.dataTransfer.files[0]);
            }
          }}
          className={`relative border-2 border-dashed rounded-2xl p-10 md:p-14 text-center transition-all cursor-pointer group ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 ring-4 ring-indigo-500/10'
              : 'border-slate-300 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 bg-white dark:bg-slate-900/60 shadow-sm'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp, image/bmp, image/svg+xml"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFileSelected(e.target.files[0]);
              }
            }}
          />

          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                Drag & Drop Image or Click to Browse
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                Supports PNG, JPG, WebP, and BMP. Converted instantly inside your browser with 100% privacy guarantee.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                🔒 Zero Server Uploads
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium">
                ⚡ Instant Canvas Conversion
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                loadSampleImage();
              }}
              className="mt-3 text-xs inline-flex items-center gap-1.5 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Try with Demo Image
            </button>
          </div>
        </div>
      ) : (
        /* Image Workspace when file is loaded */
        <div className="space-y-6">
          {/* Header Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                <FileImage className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate max-w-xs md:max-w-md">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Original: {formatBytes(originalSize)} • {originalDims.width} × {originalDims.height}px
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setOriginalPreview(null);
                  setResult(null);
                }}
                className="px-3 py-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors inline-flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Change Image
              </button>
              <button
                type="button"
                onClick={downloadCompressed}
                disabled={!result || isProcessing}
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20 transition-all inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                Download ({formatBytes(result?.size || 0)})
              </button>
            </div>
          </div>

          {/* Savings Metric Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Original Size</span>
              <p className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">
                {formatBytes(originalSize)}
              </p>
              <span className="text-[11px] text-slate-400">Uncompressed input</span>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">New Size</span>
              <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-1 flex items-center gap-2">
                {result ? formatBytes(result.size) : 'Calculating...'}
                {isProcessing && <RefreshCw className="w-4 h-4 animate-spin text-indigo-500" />}
              </p>
              <span className="text-[11px] text-slate-400">
                {format.replace('image/', '').toUpperCase()} format
              </span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Data Saved</span>
              <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                {savingsPercent >= 0 ? `-${savingsPercent}%` : `+${Math.abs(savingsPercent)}%`}
              </p>
              <span className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80">
                {result && originalSize > result.size
                  ? `${formatBytes(originalSize - result.size)} reduction`
                  : 'Optimized'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Dimensions</span>
              <p className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-1">
                {result ? `${result.width} × ${result.height}` : '...'}
              </p>
              <span className="text-[11px] text-slate-400">
                Original: {originalDims.width}×{originalDims.height}
              </span>
            </div>
          </div>

          {/* Controls & Configuration */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <Sliders className="w-4 h-4 text-indigo-500" />
              <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Compression & Format Settings
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Output Format Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Output Format</span>
                  <span className="text-[11px] text-indigo-500 font-medium">WebP recommended</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['image/webp', 'image/jpeg', 'image/png'] as const).map((fmt) => {
                    const label = fmt === 'image/webp' ? 'WebP' : fmt === 'image/jpeg' ? 'JPEG' : 'PNG';
                    const isSelected = format === fmt;
                    return (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => setFormat(fmt)}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-500/20'
                            : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quality Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Quality ({quality}%)
                  </label>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {quality >= 80 ? 'High' : quality >= 50 ? 'Medium' : 'Aggressive'}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="1"
                  value={quality}
                  disabled={format === 'image/png'}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 disabled:opacity-40"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Smallest File (10%)</span>
                  <span>Balanced (80%)</span>
                  <span>Max Quality (100%)</span>
                </div>
              </div>

              {/* Target Resize & Aspect Ratio */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Resize Dimensions (px)
                  </label>
                  <button
                    type="button"
                    onClick={() => setMaintainAspectRatio(!maintainAspectRatio)}
                    className="text-[11px] inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    {maintainAspectRatio ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                    {maintainAspectRatio ? 'Aspect Locked' : 'Free Aspect'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <input
                      type="number"
                      min="10"
                      max="10000"
                      value={targetWidth || ''}
                      onChange={(e) => handleDimensionChange(Number(e.target.value), 'width')}
                      placeholder="Width"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      min="10"
                      max="10000"
                      value={targetHeight || ''}
                      onChange={(e) => handleDimensionChange(Number(e.target.value), 'height')}
                      placeholder="Height"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Scale presets */}
                <div className="flex items-center gap-1.5 pt-1">
                  {[100, 75, 50, 25].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => applyScalePreset(pct)}
                      className="px-2 py-0.5 text-[10px] font-medium rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                    >
                      {pct}%
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setTargetWidth(1920);
                      if (originalDims.width > 0) {
                        setTargetHeight(Math.round(1920 * (originalDims.height / originalDims.width)));
                      }
                    }}
                    className="px-2 py-0.5 text-[10px] font-medium rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                  >
                    1080p
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Before & After Visual Comparison Canvas */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-indigo-500" />
                <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                  Interactive Visual Inspection
                </h4>
              </div>

              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setViewMode('split')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                    viewMode === 'split'
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Slider Compare
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('sideBySide')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                    viewMode === 'sideBySide'
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Side by Side
                </button>
              </div>
            </div>

            {viewMode === 'split' ? (
              <div
                ref={comparisonContainerRef}
                onMouseMove={handleSplitMouseMove}
                onTouchMove={handleSplitMouseMove}
                className="relative w-full h-[360px] md:h-[480px] bg-slate-950 rounded-xl overflow-hidden select-none cursor-ew-resize border border-slate-700"
              >
                {/* Background: Compressed */}
                {result && (
                  <img
                    src={result.dataUrl}
                    alt="Compressed output"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                  />
                )}

                {/* Foreground: Original (clipped by sliderPos) */}
                {originalPreview && (
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPos}%` }}
                  >
                    <img
                      src={originalPreview}
                      alt="Original input"
                      className="absolute inset-0 w-full h-full object-contain pointer-events-none max-w-none"
                      style={{
                        width: comparisonContainerRef.current?.clientWidth || '100%',
                        height: '100%',
                      }}
                    />
                  </div>
                )}

                {/* Vertical Divider Line with Grab Handle */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-xl pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-indigo-600 border-2 border-white shadow-lg flex items-center justify-center text-white text-xs">
                    ↔
                  </div>
                </div>

                {/* Labels */}
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/10 pointer-events-none">
                  Original ({formatBytes(originalSize)})
                </div>
                <div className="absolute top-3 right-3 bg-indigo-600/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white border border-indigo-400/30 pointer-events-none">
                  Compressed ({formatBytes(result?.size || 0)})
                </div>
              </div>
            ) : (
              /* Side by Side View */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
                    <span>Original ({formatBytes(originalSize)})</span>
                    <span>{originalDims.width} × {originalDims.height}</span>
                  </div>
                  <div className="h-[280px] bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
                    {originalPreview && (
                      <img
                        src={originalPreview}
                        alt="Original"
                        className="max-h-full max-w-full object-contain"
                      />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-indigo-500 font-semibold px-1">
                    <span>Compressed ({formatBytes(result?.size || 0)})</span>
                    <span>{result ? `${result.width} × ${result.height}` : ''}</span>
                  </div>
                  <div className="h-[280px] bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center border border-indigo-900/50">
                    {result && (
                      <img
                        src={result.dataUrl}
                        alt="Compressed"
                        className="max-h-full max-w-full object-contain"
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
