// UTF-8 Safe Base64 Encoding & Decoding
export function utf8ToBase64(str: string): string {
  try {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    );
  } catch (e) {
    throw new Error('Failed to encode string to Base64');
  }
}

export function base64ToUtf8(str: string): string {
  try {
    return decodeURIComponent(
      Array.prototype.map
        .call(atob(str), (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch (e) {
    throw new Error('Invalid Base64 string');
  }
}

// JSON Validation & Error Location Pinpointer
export interface JsonValidationResult {
  isValid: boolean;
  formatted?: string;
  minified?: string;
  errorMessage?: string;
  errorLine?: number;
  errorColumn?: number;
  errorSnippet?: string;
}

export function validateAndFormatJson(raw: string, indent = 2): JsonValidationResult {
  if (!raw.trim()) {
    return { isValid: true, formatted: '', minified: '' };
  }

  try {
    const parsed = JSON.parse(raw);
    const formatted = JSON.stringify(parsed, null, indent);
    const minified = JSON.stringify(parsed);
    return {
      isValid: true,
      formatted,
      minified,
    };
  } catch (err: any) {
    const message = err.message || 'Syntax Error';
    let line = 1;
    let col = 1;
    let snippet = '';

    // Attempt to extract position from "at position 42" or similar
    const posMatch = message.match(/at position (\d+)/i);
    if (posMatch) {
      const position = parseInt(posMatch[1], 10);
      const lines = raw.slice(0, position).split('\n');
      line = lines.length;
      col = lines[lines.length - 1].length + 1;
      
      const allLines = raw.split('\n');
      const errorLineText = allLines[line - 1] || '';
      snippet = `${errorLineText}\n${' '.repeat(Math.max(0, col - 1))}^`;
    }

    return {
      isValid: false,
      errorMessage: message,
      errorLine: line,
      errorColumn: col,
      errorSnippet: snippet,
    };
  }
}

// Web Crypto API SHA Hashes
export async function computeCryptoHash(text: string, algorithm: 'SHA-256' | 'SHA-384' | 'SHA-512' | 'SHA-1'): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
