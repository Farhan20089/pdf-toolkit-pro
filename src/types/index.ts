export type ToolId = 
  | 'image-compressor' 
  | 'pdf-converter'
  | 'qr-generator'
  | 'markdown-editor'
  | 'social-meta-tags' 
  | 'developer-tools' 
  | 'freelance-calculator';

export interface ToolMetadata {
  id: ToolId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  iconName: string;
  steps: {
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}
