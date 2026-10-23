export interface CompressionOptions {
  quality: number; // 0.1 to 1.0
  maxWidth?: number;
  maxHeight?: number;
  format: 'image/webp' | 'image/jpeg' | 'image/png';
  maintainAspectRatio: boolean;
}

export interface CompressionResult {
  blob: Blob;
  dataUrl: string;
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
  size: number;
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function compressImage(
  file: File | Blob,
  options: CompressionOptions
): Promise<CompressionResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Invalid image format'));
      img.onload = () => {
        const originalWidth = img.naturalWidth || img.width;
        const originalHeight = img.naturalHeight || img.height;

        let targetWidth = originalWidth;
        let targetHeight = originalHeight;

        if (options.maxWidth && options.maxHeight) {
          if (options.maintainAspectRatio) {
            const widthRatio = options.maxWidth / originalWidth;
            const heightRatio = options.maxHeight / originalHeight;
            const ratio = Math.min(widthRatio, heightRatio, 1); // Don't upscale unless requested
            targetWidth = Math.round(originalWidth * ratio);
            targetHeight = Math.round(originalHeight * ratio);
          } else {
            targetWidth = options.maxWidth;
            targetHeight = options.maxHeight;
          }
        } else if (options.maxWidth) {
          if (options.maintainAspectRatio) {
            const ratio = options.maxWidth / originalWidth;
            targetWidth = options.maxWidth;
            targetHeight = Math.round(originalHeight * ratio);
          } else {
            targetWidth = options.maxWidth;
          }
        } else if (options.maxHeight) {
          if (options.maintainAspectRatio) {
            const ratio = options.maxHeight / originalHeight;
            targetHeight = options.maxHeight;
            targetWidth = Math.round(originalWidth * ratio);
          } else {
            targetHeight = options.maxHeight;
          }
        }

        // HTML5 Canvas downsampling & high-quality interpolation
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, targetWidth);
        canvas.height = Math.max(1, targetHeight);
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        if (!ctx) {
          reject(new Error('Could not get 2D canvas context'));
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // For transparent PNGs converted to JPEG, fill white background
        if (options.format === 'image/jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, targetWidth, targetHeight);
        }

        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        // Convert to selected format & quality
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas toBlob conversion failed'));
              return;
            }
            const dataUrl = canvas.toDataURL(options.format, options.quality);
            resolve({
              blob,
              dataUrl,
              width: targetWidth,
              height: targetHeight,
              originalWidth,
              originalHeight,
              size: blob.size,
            });
          },
          options.format,
          options.quality
        );
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
