import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Code2, 
  Copy, 
  Check, 
  Download, 
  AlertCircle, 
  FileText, 
  Binary, 
  Link2, 
  ShieldCheck, 
  Sparkles,
  Maximize2,
  Trash2,
  Upload
} from 'lucide-react';
import { 
  validateAndFormatJson, 
  utf8ToBase64, 
  base64ToUtf8, 
  computeCryptoHash,
  JsonValidationResult 
} from './formatters';
import { useClipboard } from '../../hooks/useClipboard';

type SubTab = 'json' | 'base64' | 'url' | 'hash';

export function DeveloperFormatter() {
  const [activeTab, setActiveTab] = useState<SubTab>('json');
  const { copy, copiedKey } = useClipboard();

  // --- JSON State ---
  const [jsonInput, setJsonInput] = useState<string>(
    JSON.stringify({
      appName: "OmniTool Engine",
      version: "1.0.0",
      clientSide: true,
      features: ["Image Compression", "SEO Tag Gen", "JSON Formatter", "Profit Calculator"],
      performance: { lighthouse: 100, latencyMs: 0, backendCost: "$0.00" }
    }, null, 2)
  );
  const [jsonIndent, setJsonIndent] = useState<number>(2);
  const [jsonResult, setJsonResult] = useState<JsonValidationResult>({ isValid: true });

  useEffect(() => {
    const res = validateAndFormatJson(jsonInput, jsonIndent);
    setJsonResult(res);
  }, [jsonInput, jsonIndent]);

  // --- Base64 State ---
  const [base64Mode, setBase64Mode] = useState<'text' | 'file'>('text');
  const [base64TextInput, setBase64TextInput] = useState('Hello from OmniTool Client-Side Engine! 🚀');
  const [base64TextOutput, setBase64TextOutput] = useState('');
  const [base64Direction, setBase64Direction] = useState<'encode' | 'decode'>('encode');
  const [base64Error, setBase64Error] = useState<string | null>(null);
  const [fileBase64Result, setFileBase64Result] = useState<{ filename: string; size: number; dataUrl: string } | null>(null);
  const fileDropRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (base64Mode === 'text') {
      try {
        setBase64Error(null);
        if (base64Direction === 'encode') {
          setBase64TextOutput(utf8ToBase64(base64TextInput));
        } else {
          setBase64TextOutput(base64ToUtf8(base64TextInput));
        }
      } catch (err: any) {
        setBase64Error(err.message || 'Conversion error');
      }
    }
  }, [base64TextInput, base64Direction, base64Mode]);

  const handleFileUploadForBase64 = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFileBase64Result({
        filename: file.name,
        size: file.size,
        dataUrl: e.target?.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  // --- URL Encoder State ---
  const [urlInput, setUrlInput] = useState('https://omnitoolkit.dev/search?q=developer tools&category=react&ref=github');
  const [urlDirection, setUrlDirection] = useState<'encode' | 'decode'>('encode');
  const [urlOutput, setUrlOutput] = useState('');

  useEffect(() => {
    try {
      if (urlDirection === 'encode') {
        setUrlOutput(encodeURIComponent(urlInput));
      } else {
        setUrlOutput(decodeURIComponent(urlInput));
      }
    } catch {
      setUrlOutput('Error: Invalid URL encoding');
    }
  }, [urlInput, urlDirection]);

  // Parsed URL Query Parameters
  const parsedQueryParams = useMemo(() => {
    try {
      const urlObj = new URL(urlInput);
      const params: { key: string; value: string }[] = [];
      urlObj.searchParams.forEach((val, key) => {
        params.push({ key, value: val });
      });
      return { host: urlObj.host, pathname: urlObj.pathname, params };
    } catch {
      return null;
    }
  }, [urlInput]);

  // --- Crypto Hashes State ---
  const [hashInput, setHashInput] = useState('omnitool-high-security-hash-seed-2026');
  const [hashes, setHashes] = useState<{ sha256: string; sha1: string; sha384: string; sha512: string }>({
    sha256: '',
    sha1: '',
    sha384: '',
    sha512: '',
  });

  useEffect(() => {
    async function updateHashes() {
      if (!hashInput) {
        setHashes({ sha256: '', sha1: '', sha384: '', sha512: '' });
        return;
      }
      const [sha256, sha1, sha384, sha512] = await Promise.all([
        computeCryptoHash(hashInput, 'SHA-256'),
        computeCryptoHash(hashInput, 'SHA-1'),
        computeCryptoHash(hashInput, 'SHA-384'),
        computeCryptoHash(hashInput, 'SHA-512'),
      ]);
      setHashes({ sha256, sha1, sha384, sha512 });
    }
    updateHashes();
  }, [hashInput]);

  // Download JSON
  const downloadJson = () => {
    if (!jsonResult.formatted) return;
    const blob = new Blob([jsonResult.formatted], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Sub-tool navigation tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('json')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all inline-flex items-center gap-2 ${
            activeTab === 'json'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-indigo-400'
          }`}
        >
          <Code2 className="w-4 h-4" />
          JSON Formatter & Validator
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('base64')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all inline-flex items-center gap-2 ${
            activeTab === 'base64'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-indigo-400'
          }`}
        >
          <Binary className="w-4 h-4" />
          Base64 & File Data URI
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('url')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all inline-flex items-center gap-2 ${
            activeTab === 'url'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-indigo-400'
          }`}
        >
          <Link2 className="w-4 h-4" />
          URL Encoder & Query Parser
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('hash')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all inline-flex items-center gap-2 ${
            activeTab === 'hash'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-indigo-400'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          SHA Cryptographic Hashes
        </button>
      </div>

      {/* 1. JSON FORMATTER & VALIDATOR */}
      {activeTab === 'json' && (
        <div className="space-y-4">
          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Indentation:</span>
              <div className="flex gap-1">
                {[2, 4].map((spaces) => (
                  <button
                    key={spaces}
                    type="button"
                    onClick={() => {
                      setJsonIndent(spaces);
                      if (jsonResult.isValid && jsonResult.formatted) {
                        setJsonInput(jsonResult.formatted);
                      }
                    }}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors ${
                      jsonIndent === spaces
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {spaces} Spaces
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  if (jsonResult.minified) {
                    setJsonInput(jsonResult.minified);
                  }
                }}
                className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              >
                Minify (1-Line)
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setJsonInput(
                    JSON.stringify(
                      {
                        company: "Global Logistics",
                        active: true,
                        shipments: [
                          { id: "PKG-9921", status: "Delivered", weightKg: 12.4 },
                          { id: "PKG-9922", status: "In Transit", weightKg: 5.1 }
                        ]
                      },
                      null,
                      2
                    )
                  );
                }}
                className="px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:underline"
              >
                Load Sample
              </button>

              <button
                type="button"
                onClick={() => setJsonInput('')}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                title="Clear input"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => copy(jsonResult.formatted || jsonInput, 'json')}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 border border-indigo-200 dark:border-indigo-800 transition-colors inline-flex items-center gap-1.5"
              >
                {copiedKey === 'json' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                Copy
              </button>

              <button
                type="button"
                onClick={downloadJson}
                disabled={!jsonResult.isValid}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 shadow-sm transition-colors inline-flex items-center gap-1.5 disabled:opacity-40"
              >
                <Download className="w-3.5 h-3.5" />
                Download .json
              </button>
            </div>
          </div>

          {/* Validation Status Banner */}
          {!jsonResult.isValid ? (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300 space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span className="text-xs font-bold">Invalid JSON Syntax Error</span>
                {jsonResult.errorLine && (
                  <span className="text-[11px] px-2 py-0.5 rounded bg-red-200 dark:bg-red-900 text-red-900 dark:text-red-100 font-mono">
                    Line {jsonResult.errorLine}, Column {jsonResult.errorColumn}
                  </span>
                )}
              </div>
              <p className="text-xs font-mono">{jsonResult.errorMessage}</p>
              {jsonResult.errorSnippet && (
                <pre className="p-2.5 rounded-lg bg-red-100 dark:bg-red-950 text-[11px] font-mono overflow-x-auto text-red-900 dark:text-red-200">
                  {jsonResult.errorSnippet}
                </pre>
              )}
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" />
              Valid JSON Structure — Ready for APIs and Production
            </div>
          )}

          {/* Editor Textarea */}
          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-inner">
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              rows={16}
              spellCheck={false}
              placeholder="Paste raw JSON here..."
              className="w-full p-4 text-xs font-mono bg-transparent text-emerald-400 focus:outline-none resize-y selection:bg-indigo-600 leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* 2. BASE64 ENCODER & FILE DATA URI */}
      {activeTab === 'base64' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setBase64Mode('text')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  base64Mode === 'text'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                Text UTF-8 Mode
              </button>
              <button
                type="button"
                onClick={() => setBase64Mode('file')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  base64Mode === 'file'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                File to Data URI
              </button>
            </div>

            {base64Mode === 'text' && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setBase64Direction(base64Direction === 'encode' ? 'decode' : 'encode')}
                  className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200"
                >
                  Direction: {base64Direction === 'encode' ? 'Text ➔ Base64' : 'Base64 ➔ Text'}
                </button>
              </div>
            )}
          </div>

          {base64Mode === 'text' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Input */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {base64Direction === 'encode' ? 'Raw UTF-8 Text Input' : 'Base64 String Input'}
                </span>
                <textarea
                  value={base64TextInput}
                  onChange={(e) => setBase64TextInput(e.target.value)}
                  rows={10}
                  className="w-full p-3 text-xs font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                />
              </div>

              {/* Output */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {base64Direction === 'encode' ? 'Base64 Encoded Output' : 'Decoded Text Output'}
                  </span>
                  <button
                    type="button"
                    onClick={() => copy(base64TextOutput, 'base64-text')}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                  >
                    {copiedKey === 'base64-text' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy
                  </button>
                </div>
                <textarea
                  readOnly
                  value={base64Error || base64TextOutput}
                  rows={10}
                  className={`w-full p-3 text-xs font-mono rounded-xl border focus:outline-none ${
                    base64Error
                      ? 'border-red-300 bg-red-50 text-red-600 dark:bg-red-950 dark:border-red-800 dark:text-red-400'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                  }`}
                />
              </div>
            </div>
          ) : (
            /* File to Base64 Data URI mode */
            <div className="space-y-4">
              <div
                onClick={() => fileDropRef.current?.click()}
                className="border-2 border-dashed border-slate-300 dark:border-slate-800 hover:border-indigo-500 rounded-2xl p-8 text-center cursor-pointer bg-white dark:bg-slate-900/60"
              >
                <input
                  ref={fileDropRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleFileUploadForBase64(e.target.files[0]);
                  }}
                />
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Upload className="w-8 h-8 text-indigo-500" />
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    Upload any image, icon, or file to generate Base64 Data URI
                  </p>
                  <p className="text-xs text-slate-400">
                    Ideal for embedding SVG or PNG logos directly into HTML & CSS
                  </p>
                </div>
              </div>

              {fileBase64Result && (
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {fileBase64Result.filename} ({(fileBase64Result.size / 1024).toFixed(1)} KB)
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => copy(fileBase64Result.dataUrl, 'data-uri')}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 inline-flex items-center gap-1.5 shadow-sm"
                    >
                      {copiedKey === 'data-uri' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      Copy Data URI
                    </button>
                  </div>
                  <textarea
                    readOnly
                    value={fileBase64Result.dataUrl}
                    rows={4}
                    className="w-full p-2.5 text-[11px] font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 3. URL ENCODER & QUERY STRING PARSER */}
      {activeTab === 'url' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Raw Input URL or String</span>
              <textarea
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                rows={5}
                className="w-full p-3 text-xs font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
              />
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  {urlDirection === 'encode' ? 'Encoded URL Component' : 'Decoded URL'}
                </span>
                <button
                  type="button"
                  onClick={() => copy(urlOutput, 'url-out')}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                >
                  {copiedKey === 'url-out' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy
                </button>
              </div>
              <textarea
                readOnly
                value={urlOutput}
                rows={5}
                className="w-full p-3 text-xs font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Parsed Query Parameters Table */}
          {parsedQueryParams && parsedQueryParams.params.length > 0 && (
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Extracted Query Parameters
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="p-2.5">Parameter Key</th>
                      <th className="p-2.5">Decoded Value</th>
                      <th className="p-2.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                    {parsedQueryParams.params.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                        <td className="p-2.5 font-semibold text-indigo-600 dark:text-indigo-400">{item.key}</td>
                        <td className="p-2.5 text-slate-700 dark:text-slate-300 break-all">{item.value}</td>
                        <td className="p-2.5 text-right font-sans">
                          <button
                            type="button"
                            onClick={() => copy(item.value, `param-${idx}`)}
                            className="text-[11px] text-slate-500 hover:text-indigo-500 inline-flex items-center gap-1"
                          >
                            {copiedKey === `param-${idx}` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                            Copy
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. SHA CRYPTOGRAPHIC HASHES */}
      {activeTab === 'hash' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Input Text / Password / Checksum Seed
            </span>
            <input
              type="text"
              value={hashInput}
              onChange={(e) => setHashInput(e.target.value)}
              placeholder="Type string to generate hashes..."
              className="w-full px-4 py-2.5 text-xs font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-3">
            {[
              { label: 'SHA-256 (Standard)', val: hashes.sha256, key: 'sha256' },
              { label: 'SHA-512 (High Security)', val: hashes.sha512, key: 'sha512' },
              { label: 'SHA-384', val: hashes.sha384, key: 'sha384' },
              { label: 'SHA-1 (Legacy / Git)', val: hashes.sha1, key: 'sha1' },
            ].map((h) => (
              <div
                key={h.key}
                className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 group"
              >
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    {h.label}
                  </span>
                  <p className="text-xs font-mono text-slate-800 dark:text-slate-200 truncate mt-0.5 select-all">
                    {h.val || '...'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => copy(h.val, h.key)}
                  className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                  title="Copy hash"
                >
                  {copiedKey === h.key ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
