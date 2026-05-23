'use client';

import { useHomageStore } from '@state/homageStore';
import { FlowStep } from '@types/index';

/**
 * Hook para usar o FlowController
 * Gerencia estado e ações do fluxo de homenagem
 */
export const useFlow = () => {
  const store = useHomageStore();

  const getCurrentStepInfo = () => {
    const step = store.currentStep;
    const total = store.totalSteps;
    return {
      current: step,
      total: total,
      percentage: (step / total) * 100,
      isFirst: step === 1,
      isLast: step === total,
    };
  };

  return {
    currentStep: store.currentStep,
    totalSteps: store.totalSteps,
    guideMode: store.guideMode,
    previewMode: store.previewMode,
    validationErrors: store.validationErrors,
    
    nextStep: store.nextStep,
    prevStep: store.prevStep,
    jumpToStep: store.jumpToStep,
    toggleGuideMode: store.toggleGuideMode,
    setPreviewMode: store.setPreviewMode,
    setValidationErrors: store.setValidationErrors,
    
    getCurrentStepInfo,
  };
};

/**
 * Hook para usar o FieldOrchestrator
 */
export const useFields = () => {
  const store = useHomageStore();
  const currentHomage = store.getCurrentHomage();

  const updateField = (fieldId: string, value: any) => {
    store.updateHomageField(fieldId, value);
  };

  const getField = (fieldId: string) => {
    return currentHomage?.fields.get(fieldId);
  };

  const getFieldValue = (fieldId: string, defaultValue?: any) => {
    return getField(fieldId) ?? defaultValue;
  };

  return {
    updateField,
    getField,
    getFieldValue,
    fields: currentHomage?.fields || new Map(),
  };
};

/**
 * Hook para usar a homenagem atual
 */
export const useCurrentHomage = () => {
  const store = useHomageStore();
  return {
    homage: store.getCurrentHomage(),
    homageId: store.currentHomageId,
    selectedTemplate: store.selectedTemplate,
    updateHomageField: store.updateHomageField,
  };
};