'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFlow, useFields, useCurrentHomage } from '@state/hooks';
import { MobileHeader } from '@components/mobile/MobileHeader';
import { Button } from '@components/common/Button';
import { FlowProgress } from '../FlowProgress';
import { useRouter } from 'next/navigation';
import { Canvas } from '@modules/canvas/Canvas';
import { LayoutType, Template } from '@types/index';
import clsx from 'clsx';

const LAYOUTS: { id: LayoutType; name: string; description: string }[] = [
  {
    id: 'RETANGULAR',
    name: 'Retangular',
    description: 'Layout clássico com foto destacada',
  },
  {
    id: 'OVAL',
    name: 'Oval',
    description: 'Foto em formato oval',
  },
  {
    id: 'EDITORIAL',
    name: 'Editorial',
    description: 'Foto como fundo expandido',
  },
];

const MOCK_TEMPLATES: Template[] = [
  {
    id: 'template_1',
    name: 'Clássico',
    type: 'NOTA_FALECIMENTO',
    layout: 'RETANGULAR',
    backgroundUrl: '/templates/classic.webp',
    fields: [],
    createdAt: new Date(),
  },
  {
    id: 'template_2',
    name: 'Elegante',
    type: 'NOTA_FALECIMENTO',
    layout: 'RETANGULAR',
    backgroundUrl: '/templates/elegant.webp',
    fields: [],
    createdAt: new Date(),
  },
  {
    id: 'template_3',
    name: 'Moderno',
    type: 'NOTA_FALECIMENTO',
    layout: 'OVAL',
    backgroundUrl: '/templates/modern.webp',
    fields: [],
    createdAt: new Date(),
  },
];

interface FlowVisualProps {
  onComplete?: () => void;
}

/**
 * Etapa 2: Estilo Visual
 * Campos: Layout, Templates, Preview vivo
 */
export const FlowVisual: React.FC<FlowVisualProps> = ({ onComplete }) => {
  const router = useRouter();
  const flow = useFlow();
  const { updateField, getFieldValue } = useFields();
  const { homage, selectedTemplate } = useCurrentHomage();

  const selectedLayout = (getFieldValue('layout', 'RETANGULAR') as LayoutType) || 'RETANGULAR';
  const selectedTemplateId = getFieldValue('templateId', 'template_1');
  const currentTemplate = MOCK_TEMPLATES.find((t) => t.id === selectedTemplateId) || MOCK_TEMPLATES[0];
  const [previewError, setPreviewError] = useState<string | null>(null);

  const handleLayoutSelect = (layout: LayoutType) => {
    updateField('layout', layout);
  };

  const handleTemplateSelect = (templateId: string) => {
    updateField('templateId', templateId);
  };

  const handleNext = () => {
    flow.nextStep();
    onComplete?.();
  };

  const filteredTemplates = MOCK_TEMPLATES.filter((t) => t.layout === selectedLayout);

  return (
    <div className="min-h-screen bg-in-cream">
      <MobileHeader
        title="Estilo Visual"
        onBack={() => router.back()}
        showBack={true}
      />

      <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 mb-24">
        {/* Painel de Controles - Left */}
        <div className="w-full lg:w-1/3">
          <AnimatePresence mode="wait">
            <motion.div
              key={flow.currentStep}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Guia */}
              {flow.guideMode && (
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                  <p className="text-blue-700 text-sm">
                    💡 <strong>Dica:</strong> Escolha um layout que reflita a personalidade e respeite
                    a memória do falecido.
                  </p>
                </div>
              )}

              {/* Seleção de Layout */}
              <div>
                <h3 className="font-playfair text-lg font-bold text-in-dark mb-3">
                  Layout
                </h3>
                <div className="space-y-2">
                  {LAYOUTS.map((layout) => (
                    <button
                      key={layout.id}
                      onClick={() => handleLayoutSelect(layout.id)}
                      className={clsx(
                        'w-full p-3 text-left rounded-lg border-2 transition-all',
                        selectedLayout === layout.id
                          ? 'border-in-gold bg-in-gold bg-opacity-10'
                          : 'border-gray-200 hover:border-in-gold'
                      )}
                    >
                      <p className="font-semibold text-in-dark">{layout.name}</p>
                      <p className="text-sm text-gray-600">{layout.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Seleção de Templates */}
              <div>
                <h3 className="font-playfair text-lg font-bold text-in-dark mb-3">
                  Templates
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {filteredTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateSelect(template.id)}
                      className={clsx(
                        'w-full p-3 text-left rounded-lg border-2 transition-all',
                        currentTemplate.id === template.id
                          ? 'border-in-gold bg-in-gold bg-opacity-10'
                          : 'border-gray-200 hover:border-in-gold'
                      )}
                    >
                      <p className="font-semibold text-in-dark">{template.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Preview - Right */}
        <div className="w-full lg:w-2/3">
          <h3 className="font-playfair text-lg font-bold text-in-dark mb-3">
            Preview em Tempo Real
          </h3>
          <div className="bg-white rounded-lg p-4 shadow-lg">
            {homage && currentTemplate ? (
              <Canvas
                template={currentTemplate}
                data={homage}
                layout={selectedLayout}
                width={1080}
                height={1080}
                onError={(error) => setPreviewError(error.message)}
              />
            ) : (
              <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
                <p className="text-gray-600">Carregando preview...</p>
              </div>
            )}
            {previewError && (
              <p className="text-red-600 text-sm mt-2">Erro no preview: {previewError}</p>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <FlowProgress
          currentStep={flow.currentStep}
          totalSteps={flow.totalSteps}
          stepName="Estilo Visual"
          guideMode={flow.guideMode}
          onPrev={flow.prevStep}
          onNext={handleNext}
          onToggleGuide={flow.toggleGuideMode}
          canGoNext={true}
        />
      </div>
    </div>
  );
};