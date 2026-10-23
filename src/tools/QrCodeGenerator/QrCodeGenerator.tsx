import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  QrCode, 
  Download, 
  Copy, 
  Check, 
  Wifi, 
  Globe, 
  Mail, 
  Type, 
  Palette, 
  ShieldCheck, 
  Sliders, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { useClipboard } from '../../hooks/useClipboard';

type QrMode = 'url' | 'wifi' | 'text' | 'email';

export function QrCodeGenerator() {
  const [mode, setMode] = useState<QrMode>('url');
  
  // Data inputs
  const [url, setUrl] = useState('https://omnitoolkit.dev');
  const [text, setText] = useState('OmniTool Client-Side Engine');
  const [emailTo, setEmailTo] = useState('support@omnitoolkit.dev');
  const [emailSubject, setEmailSubject] = useState('Inquiry');
  
  // Wi-Fi inputs
  const [wifiSsid, setWifiSsid] = useState('Guest_WiFi');
  const [wifiPassword, setWifiPassword] = useState('SuperSecretKey2026');
  const [wifiEncryption, setWifiEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [wifiHidden, setWifiHidden] = useState(false);

  // Styling inputs
  const [fgColor, setFgColor] = useState('#0f172a');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [size, setSize] = useState<number>(512);
  const [margin, setMargin] = useState<number>(2);

  const [dataUrl, setDataUrl] = useState<string>('');
  const [svgString, setSvgString] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { copy, copiedKey } = useClipboard();

  // Construct raw string to encode
  const payload = React.useMemo(() => {
    if (mode === 'url') {
      return url.trim() || 'https://omnitoolkit.dev';
    }
    if (mode === 'wifi') {
      return `WIFI:S:${wifiSsid};T:${wifiEncryption};P:${wifiPassword};H:${wifiHidden ? 'true' : 'false'};;`;
    }
    if (mode === 'email') {
      return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}`;
    }
    return text.trim() || 'Hello World';
  }, [mode, url, text, emailTo, emailSubject, wifiSsid, wifiPassword, wifiEncryption, wifiHidden]);

  // Generate QR code on canvas & SVG
  useEffect(() => {
    async function renderQr() {
      if (!canvasRef.current) return;
      try {
        await QRCode.toCanvas(canvasRef.current, payload, {
          width: size,
          margin,
          color: {
            dark: fgColor,
            light: bgColor,
          },
          errorCorrectionLevel: errorLevel,
        });

        const urlOut = canvasRef.current.toDataURL('image/png');
        setDataUrl(urlOut);

        const svgOut = await QRCode.toString(payload, {
          type: 'svg',
          margin,
          color: {
            dark: fgColor,
            light: bgColor,
          },
          errorCorrectionLevel: errorLevel,
        });
        setSvgString(svgOut);
      } catch (err) {
        console.error('QR Code generation failed:', err);
      }
    }
    renderQr();
  }, [payload, fgColor, bgColor, errorLevel, size, margin]);

  const downloadPng = () => {
    if (!dataUrl) return;
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `qrcode-${mode}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadSvg = () => {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `qrcode-${mode}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Type Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {[
          { id: 'url', label: 'Website URL', icon: Globe },
          { id: 'wifi', label: 'Wi-Fi Network', icon: Wifi },
          { id: 'text', label: 'Plain Text', icon: Type },
          { id: 'email', label: 'Email', icon: Mail },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = mode === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setMode(item.id as any)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all inline-flex items-center gap-2 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-indigo-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Stylist */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Content Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <QrCode className="w-4 h-4 text-indigo-500" />
              <span>Enter QR Code Data</span>
            </h4>

            {mode === 'url' && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Target Website URL
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            {mode === 'wifi' && (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Wi-Fi Network Name (SSID)
                  </label>
                  <input
                    type="text"
                    value={wifiSsid}
                    onChange={(e) => setWifiSsid(e.target.value)}
                    placeholder="e.g. CoffeeShop_Guest"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Password
                    </label>
                    <input
                      type="text"
                      value={wifiPassword}
                      onChange={(e) => setWifiPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Security Type
                    </label>
                    <select
                      value={wifiEncryption}
                      onChange={(e) => setWifiEncryption(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                    >
                      <option value="WPA">WPA/WPA2/WPA3 (Standard)</option>
                      <option value="WEP">WEP (Legacy)</option>
                      <option value="nopass">None (Open Network)</option>
                    </select>
                  </div>
                </div>

                <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={wifiHidden}
                    onChange={(e) => setWifiHidden(e.target.checked)}
                    className="rounded text-indigo-600"
                  />
                  <span>Hidden Network (SSID not broadcasted)</span>
                </label>
              </div>
            )}

            {mode === 'text' && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Text Content
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={4}
                  placeholder="Type any message, notes, or raw string..."
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            {mode === 'email' && (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Recipient Email
                  </label>
                  <input
                    type="email"
                    value={emailTo}
                    onChange={(e) => setEmailTo(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Subject"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 2. Visual Styling Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Palette className="w-4 h-4 text-indigo-500" />
              <span>Colors & Error Correction</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Foreground Color */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex justify-between">
                  <span>Foreground Color</span>
                  <span className="font-mono text-slate-400">{fgColor}</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-9 h-9 rounded-lg border border-slate-300 dark:border-slate-700 cursor-pointer p-0.5 bg-transparent"
                  />
                  <div className="flex gap-1.5">
                    {['#0f172a', '#4338ca', '#047857', '#b91c1c'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setFgColor(c)}
                        style={{ backgroundColor: c }}
                        className="w-6 h-6 rounded-full border border-white dark:border-slate-800 shadow-sm"
                        title={c}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Background Color */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex justify-between">
                  <span>Background Color</span>
                  <span className="font-mono text-slate-400">{bgColor}</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-9 h-9 rounded-lg border border-slate-300 dark:border-slate-700 cursor-pointer p-0.5 bg-transparent"
                  />
                  <div className="flex gap-1.5">
                    {['#ffffff', '#f8fafc', '#f1f5f9', '#fef3c7'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setBgColor(c)}
                        style={{ backgroundColor: c }}
                        className="w-6 h-6 rounded-full border border-slate-300 dark:border-slate-700 shadow-sm"
                        title={c}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Error Correction & Margins */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Error Recovery Level
                </label>
                <select
                  value={errorLevel}
                  onChange={(e) => setErrorLevel(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                >
                  <option value="L">Level L (7% recovery)</option>
                  <option value="M">Level M (15% recommended)</option>
                  <option value="Q">Level Q (25% high)</option>
                  <option value="H">Level H (30% best for print)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Quiet Zone Margin
                </label>
                <select
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                >
                  <option value={1}>Compact (1 block)</option>
                  <option value={2}>Standard (2 blocks)</option>
                  <option value={4}>Generous (4 blocks)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive QR Preview & Download */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-6 text-center">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Live Vector Preview
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-semibold">
              Scan with Phone
            </span>
          </div>

          {/* QR Canvas Display */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 inline-block mx-auto shadow-inner">
            <canvas
              ref={canvasRef}
              className="w-64 h-64 md:w-72 md:h-72 mx-auto rounded-xl object-contain"
            />
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono break-all px-2">
            Payload: {payload.length > 60 ? `${payload.substring(0, 60)}...` : payload}
          </p>

          {/* Export Actions */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={downloadPng}
              className="py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all inline-flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download PNG
            </button>

            <button
              type="button"
              onClick={downloadSvg}
              className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors inline-flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
            >
              <Download className="w-4 h-4" />
              Download SVG
            </button>
          </div>

          <button
            type="button"
            onClick={() => copy(dataUrl, 'qr-data-url')}
            className="w-full py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center justify-center gap-1.5 transition-colors"
          >
            {copiedKey === 'qr-data-url' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            Copy Base64 Data URL
          </button>
        </div>
      </div>
    </div>
  );
}
