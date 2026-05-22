import { create } from 'zustand';
import { HomageData, Template, ValidationResult } from '@types/index';
import { Homage } from '@core/models/Homage';

interface HomageState {
  // Estado
  homages: Map<string, HomageData>;
  currentHomageId: string | null;
  selectedTemplate: Template | null;
  currentStep: number;
  totalSteps: number;
  guideMode: boolean;
  logoMode: boolean;
  previewMode: 'live' | 'export';
  validationErrors: Record<string, string>;

  // Ações
  createHomage: (type: any, templateId: string, premium?: boolean) => void;
  setCurrentHomage: (homageId: string) => void;
  setSelectedTemplate: (template: Template) => void;
  updateHomageField: (fieldId: string, value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  jumpToStep: (step: number) => void;
  toggleGuideMode: () => void;
  setPreviewMode: (mode: 'live' | 'export') => void;
  setValidationErrors: (errors: Record<string, string>) => void;
  getCurrentHomage: () => HomageData | undefined;
}

export const useHomageStore = create<HomageState>((set, get) => ({
  homages: new Map(),
  currentHomageId: null,
  selectedTemplate: null,
  currentStep: 1,
  totalSteps: 5,
  guideMode: false,
  logoMode: true,
  previewMode: 'live',
  validationErrors: {},

  createHomage: (type, templateId, premium = false) => {
    const homage = new Homage(type, templateId, premium);
    const homages = new Map(get().homages);
    homages.set(homage.id, homage as HomageData);
    
    set({
      homages,
      currentHomageId: homage.id,
      currentStep: 1,
      logoMode: false,
    });
  },

  setCurrentHomage: (homageId: string) => {
    set({ currentHomageId: homageId });
  },

  setSelectedTemplate: (template: Template) => {
    set({ selectedTemplate: template });
  },

  updateHomageField: (fieldId: string, value: any) => {
    const currentId = get().currentHomageId;
    if (!currentId) return;

    const homages = new Map(get().homages);
    const homage = homages.get(currentId);
    if (homage) {
      homage.fields.set(fieldId, value);
      homage.updatedAt = new Date();
      homages.set(currentId, homage);
      set({ homages });
    }
  },

  nextStep: () => {
    const currentStep = get().currentStep;
    const totalSteps = get().totalSteps;
    if (currentStep < totalSteps) {
      set({ currentStep: currentStep + 1 });
    }
  },

  prevStep: () => {
    const currentStep = get().currentStep;
    if (currentStep > 1) {
      set({ currentStep: currentStep - 1 });
    }
  },

  jumpToStep: (step: number) => {
    const totalSteps = get().totalSteps;
    if (step >= 1 && step <= totalSteps) {
      set({ currentStep: step });
    }
  },

  toggleGuideMode: () => {
    set({ guideMode: !get().guideMode });
  },

  setPreviewMode: (mode: 'live' | 'export') => {
    set({ previewMode: mode });
  },

  setValidationErrors: (errors: Record<string, string>) => {
    set({ validationErrors: errors });
  },

  getCurrentHomage: () => {
    const currentId = get().currentHomageId;
    if (!currentId) return undefined;
    return get().homages.get(currentId);
  },
}));
