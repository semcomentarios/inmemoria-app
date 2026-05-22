// Tipos principais do projeto InMemória

export type HomageType = 'NOTA_FALECIMENTO' | 'SETIMO_DIA' | 'ARTE_PLACA' | 'VIDEO_HOMENAGEM';
export type LayoutType = 'RETANGULAR' | 'OVAL' | 'EDITORIAL';
export type FieldType = 'text' | 'date' | 'image' | 'select' | 'textarea';
export type ExportFormat = 'png' | 'mp4';

export interface FieldDefinition {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  validation?: (value: any) => boolean;
  dependsOn?: string[];
  constraints?: FieldConstraints;
}

export interface FieldConstraints {
  minLength?: number;
  maxLength?: number;
  minDate?: Date;
  maxDate?: Date;
  imageMaxSize?: number; // em MB
}

export interface FieldValue {
  id: string;
  value: any;
  validated: boolean;
}

export interface Template {
  id: string;
  name: string;
  type: HomageType;
  layout: LayoutType;
  backgroundUrl: string; // path do webp
  fields: FieldDefinition[];
  previewUrl?: string;
  createdAt: Date;
}

export interface HomageData {
  id: string;
  type: HomageType;
  templateId: string;
  fields: Map<string, any>;
  createdAt: Date;
  updatedAt: Date;
  premium: boolean;
}

export interface ExportOptions {
  format: ExportFormat;
  premium: boolean;
  quality?: 'low' | 'medium' | 'high';
  width?: number;
  height?: number;
}

export interface FlowStep {
  id: string;
  stepNumber: number;
  totalSteps: number;
  name: string;
  description: string;
  guideText?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}
