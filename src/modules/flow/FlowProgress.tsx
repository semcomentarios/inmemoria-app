'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@components/common/Button';
import clsx from 'clsx';

interface FlowProgressProps {
  currentStep: number;
  totalSteps: number;
  stepName: string;
  guideMode: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToggleGuide?: () => void;
  canGoNext?: boolean;
}

export const FlowProgress: React.FC<FlowProgressProps> = ({
  currentStep,
  totalSteps,
  stepName,
  guideMode,
  onPrev,
  onNext,
  onToggleGuide,
  canGoNext = true,
}) => {
  const percentage = (currentStep / totalSteps) * 100;
  const isFirst = currentStep === 1;
  const isLast = currentStep === totalSteps;

  return (
    <div className="w-full bg-white border-b border-gray-200 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-playfair text-xl md:text-2xl text-in-dark font-bold">
            {stepName}
          </h2>
          <p className="text-gray-600 text-sm">
            Etapa {currentStep} de {totalSteps}
          </p>
        </div>

        {onToggleGuide && (
          <button
            onClick={onToggleGuide}
            className={clsx(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all',
              guideMode
                ? 'bg-in-gold text-in-dark'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            {guideMode ? '✓ Modo Guia' : 'Modo Guia'}
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-in-gold to-in-bronze"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">{Math.round(percentage)}% completo</p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-3 justify-between">
        <Button
          variant="secondary"
          size="sm"
          onClick={onPrev}
          disabled={isFirst}
          className="flex items-center gap-2"
        >
          <ChevronLeft size={18} />
          Anterior
        </Button>

        <div className="flex gap-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={clsx(
                'h-2 rounded-full transition-all',
                index < currentStep
                  ? 'bg-in-gold w-4'
                  : index === currentStep - 1
                    ? 'bg-in-gold w-8'
                    : 'bg-gray-300 w-2'
              )}
            />
          ))}
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={onNext}
          disabled={isLast || !canGoNext}
          className="flex items-center gap-2"
        >
          {isLast ? 'Finalizar' : 'Próximo'}
          {!isLast && <ChevronRight size={18} />}
        </Button>
      </div>
    </div>
  );
};