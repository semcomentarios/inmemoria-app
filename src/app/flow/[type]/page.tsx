'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useHomageStore } from '@state/homageStore';
import { FlowPessoal } from '../steps/FlowPessoal';
import { FlowVisual } from '../steps/FlowVisual';
import { HomageType } from '@types/index';

const FLOW_CONFIGS = {
  NOTA_FALECIMENTO: {
    name: 'Nota Falecimento',
    steps: 5,
  },
  SETIMO_DIA: {
    name: 'Sétimo Dia',
    steps: 4,
  },
  ARTE_PLACA: {
    name: 'Arte Placa',
    steps: 5,
  },
  VIDEO_HOMENAGEM: {
    name: 'Vídeo Homenagem',
    steps: 5,
  },
};

export default function FlowPage() {
  const router = useRouter();
  const params = useParams();
  const type = params?.type as string;
  const homageType = type?.toUpperCase().replace(/-/g, '_') as HomageType;
  const homageStore = useHomageStore();

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!type) {
      router.push('/produtos');
      return;
    }

    // Cria nova homenagem se não existir
    if (!homageStore.currentHomageId) {
      homageStore.createHomage(homageType, 'template_1', false);
    }

    setIsInitialized(true);
  }, [type, homageType, homageStore, router]);

  if (!isInitialized || !type) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Carregando...</p>
      </div>
    );
  }

  const currentStep = homageStore.currentStep;

  // Renderiza componente da etapa atual
  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <FlowPessoal />;
      case 2:
        return <FlowVisual />;
      case 3:
        return (
          <div className="p-4">
            <p>Etapa 3: Mensagens (Em desenvolvimento)</p>
          </div>
        );
      case 4:
        return (
          <div className="p-4">
            <p>Etapa 4: Informações/Fotos (Em desenvolvimento)</p>
          </div>
        );
      case 5:
        return (
          <div className="p-4">
            <p>Etapa 5: Revisar e Salvar (Em desenvolvimento)</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-in-cream">
      {renderStepComponent()}
    </div>
  );
}