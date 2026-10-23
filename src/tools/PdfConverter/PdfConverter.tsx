import React, { useState, useRef } from 'react';
import { 
  FileText, 
  UploadCloud, 
  Download, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Sparkles, 
  Settings, 
  Check, 
  RefreshCw,
  Plus,
  Eye
} from 'lucide-react';
import jsPDF from 'jspdf';
import { formatBytes } from '../ImageCompressor/utils';

interface ImagePage {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
  size: number;
  width: number;
  height: number;
}

export function PdfConverter() {
  const [pages, setPages] = useState<ImagePage[]>([]);
  const [pageSize, setPageSize] = useState<'a4' | 'letter' | 'fit'>('a4');
  const [orientation, setOrientation] = useState<'p' | 'l'>('p');
  const [margin, setMargin] = useState<number>(5); // in mm
  const [pdfName, setPdfName] = useState('converted-document.pdf');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | File[]) => {
    const newPages: ImagePage[] = [];
    const validFiles = Array.from(fileList).filter(f => f.type.startsWith('image/'));

    if (validFiles.length === 0) {
      alert('Please select valid image files (PNG, JPG, WebP, etc.)');
      return;
    }

    let loadedCount = 0;
    validFiles.forEach((file) => {
      const previewUrl = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        newPages.push({
          id: Math.random().toString(36).substring(2, 9),
          file,
          previewUrl,
          name: file.name,
          size: file.size,
          width: img.naturalWidth || img.width,
          height: img.naturalHeight || img.height,
        });
        loadedCount++;
        if (loadedCount === validFiles.length) {
          setPages(prev => [...prev, ...newPages]);
        }
      };
      img.src = previewUrl;
    });
  };

  const loadSamplePages = () => {
    const titles = ['Contract Summary Page 1', 'Financial Breakdown Page 2', 'Verification Certificate Page 3'];
    const colors = [['#4f46e5', '#3730a3'], ['#059669', '#065f46'], ['#d97706', '#92400e']];

    const samplePages: ImagePage[] = [];
    titles.forEach((title, idx) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1240;
      canvas.height = 1754; // A4 ratio
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createLinearGradient(0, 0, 1240, 1754);
        grad.addColorStop(0, colors[idx][0]);
        grad.addColorStop(1, colors[idx][1]);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1240, 1754);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 58px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(title, 620, 800);

        ctx.font = '32px Inter, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fillText(`OmniTool Client-Side PDF Engine • Page ${idx + 1} of 3`, 620, 880);

        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `sample-page-${idx + 1}.png`, { type: 'image/png' });
            samplePages.push({
              id: `sample-${idx}`,
              file,
              previewUrl: canvas.toDataURL('image/png'),
              name: file.name,
              size: blob.size,
              width: 1240,
              height: 1754,
            });
            if (samplePages.length === titles.length) {
              setPages(samplePages);
            }
          }
        }, 'image/png');
      }
    });
  };

  const movePage = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= pages.length) return;
    const updated = [...pages];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setPages(updated);
  };

  const removePage = (index: number) => {
    const updated = [...pages];
    URL.revokeObjectURL(updated[index].previewUrl);
    updated.splice(index, 1);
    setPages(updated);
  };

  const generatePdf = async () => {
    if (pages.length === 0) return;
    setIsGenerating(true);

    try {
      const pdf = new jsPDF({
        orientation,
        unit: 'mm',
        format: pageSize === 'fit' ? 'a4' : pageSize,
      });

      for (let i = 0; i < pages.length; i++) {
        if (i > 0) {
          pdf.addPage(pageSize === 'fit' ? 'a4' : pageSize, orientation);
        }

        const page = pages[i];
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const availableWidth = pageWidth - (margin * 2);
        const availableHeight = pageHeight - (margin * 2);

        // Aspect ratio calculations
        const imgRatio = page.width / page.height;
        const pageRatio = availableWidth / availableHeight;

        let renderWidth = availableWidth;
        let renderHeight = availableHeight;

        if (imgRatio > pageRatio) {
          renderHeight = availableWidth / imgRatio;
        } else {
          renderWidth = availableHeight * imgRatio;
        }

        // Center on page with margins
        const x = margin + (availableWidth - renderWidth) / 2;
        const y = margin + (availableHeight - renderHeight) / 2;

        pdf.addImage(page.previewUrl, 'JPEG', x, y, renderWidth, renderHeight, undefined, 'FAST');
      }

      const filename = pdfName.endsWith('.pdf') ? pdfName : `${pdfName}.pdf`;
      pdf.save(filename);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      alert('Error generating PDF document. Check console for details.');
    } finally {
      setIsGenerating(false);
    }
  };

  const totalSize = pages.reduce((acc, p) => acc + p.size, 0);

  return (
    <div className="space-y-8">
      {/* Upload Drop Zone */}
      {pages.length === 0 ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-10 md:p-14 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 ring-4 ring-indigo-500/10'
              : 'border-slate-300 dark:border-slate-800 hover:border-indigo-400 bg-white dark:bg-slate-900/60 shadow-sm'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) handleFiles(e.target.files);
            }}
          />

          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <UploadCloud className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                Drag & Drop Images or Click to Select Multiple Photos
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                Combine PNG, JPG, and WebP receipts, documents, or photos into a single PDF document in seconds.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                🔒 100% Client-Side In-Memory
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium">
                📄 Multi-Page PDF Assembly
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                loadSamplePages();
              }}
              className="mt-3 text-xs inline-flex items-center gap-1.5 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Try with 3 Sample Document Pages
            </button>
          </div>
        </div>
      ) : (
        /* Document Arrangement Workspace */
        <div className="space-y-6">
          {/* Header Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {pages.length} {pages.length === 1 ? 'Page' : 'Pages'} Ready for PDF
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Total Image Payload: {formatBytes(totalSize)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors inline-flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
              >
                <Plus className="w-3.5 h-3.5" />
                Add More Images
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) handleFiles(e.target.files);
                }}
              />

              <button
                type="button"
                onClick={() => setPages([])}
                className="px-3 py-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
              >
                Clear All
              </button>

              <button
                type="button"
                onClick={generatePdf}
                disabled={isGenerating || pages.length === 0}
                className="px-4 py-2 text-sm font-bold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20 transition-all inline-flex items-center gap-2 disabled:opacity-50"
              >
                {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                Download PDF
              </button>
            </div>
          </div>

          {/* Layout Configuration Controls */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <Settings className="w-4 h-4 text-indigo-500" />
              <h4 className="font-semibold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                PDF Layout & Print Options
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Page Format */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Page Dimensions
                </label>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                >
                  <option value="a4">Standard A4 (210 × 297 mm)</option>
                  <option value="letter">US Letter (8.5 × 11 in)</option>
                  <option value="fit">Fit to Image Size</option>
                </select>
              </div>

              {/* Orientation */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Orientation
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrientation('p')}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                      orientation === 'p'
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Portrait
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrientation('l')}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                      orientation === 'l'
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Landscape
                  </button>
                </div>
              </div>

              {/* Margins */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Page Margin
                </label>
                <select
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                >
                  <option value={0}>None (0 mm full bleed)</option>
                  <option value={5}>Compact (5 mm)</option>
                  <option value={10}>Standard (10 mm)</option>
                  <option value={20}>Wide (20 mm)</option>
                </select>
              </div>

              {/* PDF Filename */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Output Filename
                </label>
                <input
                  type="text"
                  value={pdfName}
                  onChange={(e) => setPdfName(e.target.value)}
                  placeholder="converted-document.pdf"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Reorderable Page Thumbnails Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
              <span>Document Page Order (Click arrows to reorder)</span>
              <span>{pages.length} Pages</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {pages.map((p, idx) => (
                <div
                  key={p.id}
                  className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 relative group"
                >
                  {/* Page Badge */}
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                      Page {idx + 1}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {p.width} × {p.height}px
                    </span>
                  </div>

                  {/* Thumbnail */}
                  <div className="h-44 rounded-xl bg-slate-950 overflow-hidden flex items-center justify-center border border-slate-800">
                    <img
                      src={p.previewUrl}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Page Details & Actions */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {p.name}
                    </p>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => movePage(idx, 'up')}
                          className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30"
                          title="Move earlier"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === pages.length - 1}
                          onClick={() => movePage(idx, 'down')}
                          className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30"
                          title="Move later"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removePage(idx)}
                        className="p-1 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                        title="Remove page"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
