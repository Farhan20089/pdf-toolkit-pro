import React, { useState, useMemo, useRef } from 'react';
import { marked } from 'marked';
import jsPDF from 'jspdf';
import { 
  FileEdit, 
  Eye, 
  Columns, 
  Copy, 
  Check, 
  Download, 
  Printer, 
  Bold, 
  Italic, 
  Heading1, 
  Heading2, 
  List, 
  Code, 
  Table, 
  CheckSquare, 
  Quote, 
  Sparkles,
  Clock,
  Type
} from 'lucide-react';
import { useClipboard } from '../../hooks/useClipboard';

const INITIAL_MARKDOWN = `# OmniTool Markdown Document

Welcome to the **100% Client-Side Markdown Editor**! Edit on the left and see the styled preview render in real-time on the right.

## ✨ Key Capabilities
- **Zero Backend Cost:** Compiles entirely inside your browser memory.
- **GFM Compliant:** Supports GitHub Flavored Markdown, syntax blocks, and tables.
- **1-Click Export:** Download clean HTML, raw Markdown, or print-ready PDF.

### Action Item Checklist
- [x] Configure Tailwind modern typography
- [x] Set up client-side HTML compiler
- [ ] Deploy to global Edge CDN

---

### Comparison Matrix
| Feature | Legacy Cloud Converters | OmniTool Engine |
| :--- | :--- | :--- |
| **Server Cost** | $50 - $500/month | **$0.00 Forever** |
| **Data Privacy** | Files uploaded to server | **100% In-Browser** |
| **Latency** | 2.5s network lag | **0ms Instant** |

> "Simplicity is the prerequisite for reliability." — Edsger W. Dijkstra

\`\`\`typescript
// Pure browser execution
export function compileMarkdown(source: string): string {
  return marked.parse(source, { gfm: true, breaks: true });
}
\`\`\`
`;

export function MarkdownEditor() {
  const [content, setContent] = useState<string>(INITIAL_MARKDOWN);
  const [viewMode, setViewMode] = useState<'split' | 'edit' | 'preview'>('split');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { copy, copiedKey } = useClipboard();

  // Compile Markdown to HTML
  const compiledHtml = useMemo(() => {
    try {
      return marked.parse(content, { gfm: true, breaks: true }) as string;
    } catch {
      return '<p class="text-red-500 font-mono">Error parsing markdown</p>';
    }
  }, [content]);

  // Statistics: Words, Characters, Reading Time
  const stats = useMemo(() => {
    const chars = content.length;
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    const readTimeMinutes = Math.max(1, Math.ceil(words / 200));
    return { chars, words, readTimeMinutes };
  }, [content]);

  // Insert syntax helpers
  const insertSyntax = (before: string, after = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end) || 'text';
    const replacement = `${before}${selected}${after}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 10);
  };

  const downloadMarkdownFile = () => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document.md';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 1500);
  };

  const downloadPdfFile = () => {
    try {
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'pt',
        format: 'a4',
      });

      const margin = 40;
      const pageWidth = doc.internal.pageSize.getWidth();
      const maxLineWidth = pageWidth - margin * 2;

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(11);

      // Parse plain text cleanly from compiled output or source
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = compiledHtml;
      const cleanText = tempDiv.innerText || tempDiv.textContent || content;

      const splitLines = doc.splitTextToSize(cleanText, maxLineWidth);
      let cursorY = 50;

      for (let i = 0; i < splitLines.length; i++) {
        if (cursorY > doc.internal.pageSize.getHeight() - 50) {
          doc.addPage();
          cursorY = 50;
        }
        doc.text(splitLines[i], margin, cursorY);
        cursorY += 16;
      }

      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'document.pdf';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 1500);
    } catch (e) {
      console.warn('Direct jsPDF download fallback to print:', e);
      handlePrint();
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      downloadPdfFile();
      return;
    }
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>OmniTool Document Print</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; padding: 40px; color: #1e293b; max-width: 800px; margin: 0 auto; }
            h1, h2, h3 { color: #0f172a; margin-top: 1.5em; }
            table { border-collapse: collapse; width: 100%; margin: 20px 0; }
            th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
            th { background-color: #f1f5f9; }
            pre { background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; overflow-x: auto; }
            blockquote { border-left: 4px solid #6366f1; margin: 0; padding-left: 16px; color: #64748b; }
          </style>
        </head>
        <body>
          ${compiledHtml}
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6">
      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Formatting Buttons */}
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={() => insertSyntax('**', '**')}
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Bold (**text**)"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSyntax('*', '*')}
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Italic (*text*)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSyntax('# ')}
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSyntax('## ')}
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <span className="text-slate-300 dark:text-slate-700 mx-1">|</span>
          <button
            type="button"
            onClick={() => insertSyntax('> ')}
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Quote block"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSyntax('```typescript\n', '\n```')}
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Code block"
          >
            <Code className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSyntax('- [ ] ')}
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Task list item"
          >
            <CheckSquare className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSyntax('| Column 1 | Column 2 |\n| :--- | :--- |\n| Value 1 | Value 2 |\n')}
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Insert Table"
          >
            <Table className="w-4 h-4" />
          </button>
        </div>

        {/* View Mode & Export Controls */}
        <div className="flex items-center gap-2">
          {/* View Mode Toggles */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setViewMode('split')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                viewMode === 'split' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500'
              }`}
            >
              Split
            </button>
            <button
              type="button"
              onClick={() => setViewMode('edit')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                viewMode === 'edit' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500'
              }`}
            >
              Write
            </button>
            <button
              type="button"
              onClick={() => setViewMode('preview')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                viewMode === 'preview' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500'
              }`}
            >
              Preview
            </button>
          </div>

          <button
            type="button"
            onClick={() => copy(compiledHtml, 'compiled-html')}
            className="px-3.5 py-2.5 min-h-[44px] sm:min-h-[48px] text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors inline-flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
          >
            {copiedKey === 'compiled-html' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            Copy HTML
          </button>

          <button
            type="button"
            onClick={downloadMarkdownFile}
            className="px-3.5 py-2.5 min-h-[44px] sm:min-h-[48px] text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors inline-flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
          >
            <Download className="w-3.5 h-3.5" />
            Export .md
          </button>

          <button
            type="button"
            onClick={downloadPdfFile}
            className="px-4 py-2.5 min-h-[44px] sm:min-h-[48px] text-xs font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all inline-flex items-center gap-1.5"
            title="Download PDF directly to device (mobile-ready)"
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-2.5 min-h-[44px] sm:min-h-[48px] text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors inline-flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 hidden sm:inline-flex"
            title="Open browser print preview"
          >
            <Printer className="w-3.5 h-3.5" />
            Print
          </button>
        </div>
      </div>

      {/* Editor & Preview Split Panes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[550px]">
        {/* Left: Raw Markdown Editor */}
        {(viewMode === 'split' || viewMode === 'edit') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-6' : 'lg:col-span-12'} flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden`}>
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-xs text-slate-500">
              <span className="font-semibold uppercase tracking-wider text-[11px] text-slate-700 dark:text-slate-300">
                Markdown Source
              </span>
              <div className="flex items-center gap-3 text-[11px]">
                <span>{stats.words} words</span>
                <span>{stats.chars} characters</span>
              </div>
            </div>

            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing markdown..."
              spellCheck={false}
              className="flex-1 w-full p-4 text-xs font-mono bg-transparent text-slate-800 dark:text-slate-200 focus:outline-none resize-none leading-relaxed selection:bg-indigo-600 selection:text-white"
            />
          </div>
        )}

        {/* Right: Rendered HTML Preview */}
        {(viewMode === 'split' || viewMode === 'preview') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-6' : 'lg:col-span-12'} flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden`}>
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-xs text-slate-500">
              <span className="font-semibold uppercase tracking-wider text-[11px] text-slate-700 dark:text-slate-300">
                Live GitHub Preview
              </span>
              <div className="flex items-center gap-1.5 text-[11px] text-indigo-500 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>{stats.readTimeMinutes} min read</span>
              </div>
            </div>

            <div
              className="flex-1 p-6 overflow-y-auto prose dark:prose-invert prose-indigo max-w-none text-xs leading-relaxed"
              dangerouslySetInnerHTML={{ __html: compiledHtml }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
