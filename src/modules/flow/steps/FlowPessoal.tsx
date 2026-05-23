'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFlow, useFields, useCurrentHomage } from '@state/hooks';
import { MobileHeader } from '@components/mobile/MobileHeader';
import { Button } from '@components/common/Button';
import { InputField } from '@components/common/InputField';
import { FlowProgress } from '../FlowProgress';
import { useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';

interface FlowPessoalProps {
  onComplete?: () => void;
}

/**
 * Etapa 1: Dados Pessoais
 * Campos: Foto, Nome, Nascimento, Falecimento
 */
export const FlowPessoal: React.FC<FlowPessoalProps> = ({ onComplete }) => {
  const router = useRouter();
  const flow = useFlow();
  const { updateField, getFieldValue } = useFields();
  const { homage } = useCurrentHomage();
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [photoPreview, setPhotoPreview] = useState<string>('');

  const nome = getFieldValue('nome', '');
  const nascimento = getFieldValue('nascimento', '');
  const falecimento = getFieldValue('falecimento', '');

  const handleNameChange = (value: string) => {
    updateField('nome', value);
    setErrors((prev) => ({ ...prev, nome: '' }));
  };

  const handleBirthDateChange = (value: string) => {
    updateField('nascimento', value);
    setErrors((prev) => ({ ...prev, nascimento: '' }));
  };

  const handleDeathDateChange = (value: string) => {
    updateField('falecimento', value);
    setErrors((prev) => ({ ...prev, falecimento: '' }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPhotoPreview(result);
        updateField('foto', result);
        setErrors((prev) => ({ ...prev, foto: '' }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!nome?.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!nascimento?.trim()) newErrors.nascimento = 'Data de nascimento é obrigatória';
    if (!falecimento?.trim()) newErrors.falecimento = 'Data de falecimento é obrigatória';
    if (!photoPreview) newErrors.foto = 'Foto é obrigatória';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      flow.nextStep();
      onComplete?.();
    } else {
      flow.setValidationErrors(errors);
    }
  };

  return (
    <div className="min-h-screen bg-in-cream">
      <MobileHeader
        title="Dados Pessoais"
        onBack={() => router.back()}
        showBack={true}
      />

      <div className="flex-1">
        {/* Conteúdo Principal */}
        <div className="p-4 md:p-6 max-w-2xl mx-auto mb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={flow.currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Guia */}
              {flow.guideMode && (
                <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                  <p className="text-blue-700 text-sm">
                    💡 <strong>Dica:</strong> Preencha com as informações do falecido. A foto será exibida
                    no template escolhido.
                  </p>
                </div>
              )}

              {/* Foto */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-in-dark mb-3">
                  Foto do Falecido *
                </label>
                <div className="flex flex-col gap-4">
                  <div className="border-2 border-dashed border-in-gold rounded-lg p-8 text-center hover:bg-in-gold hover:bg-opacity-5 transition-colors cursor-pointer relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {photoPreview ? (
                      <div className="relative">
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="max-h-40 mx-auto rounded"
                        />
                        <p className="text-xs text-gray-500 mt-2">Clique para trocar</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-in-gold text-2xl mb-2">📸</p>
                        <p className="text-in-dark font-medium">Clique para enviar foto</p>
                        <p className="text-gray-600 text-xs mt-1">PNG, JPG até 5MB</p>
                      </div>
                    )}
                  </div>
                  {errors.foto && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle size={16} />
                      {errors.foto}
                    </div>
                  )}
                </div>
              </div>

              {/* Nome */}
              <InputField
                label="Nome Completo *"
                value={nome}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Digite o nome completo"
                error={errors.nome}
                className="mb-6"
              />

              {/* Data Nascimento */}
              <InputField
                label="Data de Nascimento *"
                type="date"
                value={nascimento}
                onChange={(e) => handleBirthDateChange(e.target.value)}
                error={errors.nascimento}
                className="mb-6"
              />

              {/* Data Falecimento */}
              <InputField
                label="Data de Falecimento *"
                type="date"
                value={falecimento}
                onChange={(e) => handleDeathDateChange(e.target.value)}
                error={errors.falecimento}
                className="mb-6"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Bar - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <FlowProgress
          currentStep={flow.currentStep}
          totalSteps={flow.totalSteps}
          stepName="Dados Pessoais"
          guideMode={flow.guideMode}
          onPrev={flow.prevStep}
          onNext={handleNext}
          onToggleGuide={flow.toggleGuideMode}
          canGoNext={Object.keys(errors).length === 0}
        />
      </div>
    </div>
  );
};