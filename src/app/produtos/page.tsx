'use client';

import React from 'react';
import Link from 'next/link';
import { MobileHeader } from '@components/mobile/MobileHeader';
import { Button } from '@components/common/Button';
import { Image, Video, Square, Scroll } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PRODUCTS = [
  {
    id: 'NOTA_FALECIMENTO',
    name: 'Nota Falecimento',
    description: 'Comunicado com elegância (1080x1080px)',
    icon: Scroll,
    steps: 5,
    color: 'from-slate-600 to-slate-800',
  },
  {
    id: 'SETIMO_DIA',
    name: 'Sétimo Dia',
    description: 'Convite para missa (1080x1080px)',
    icon: Square,
    steps: 4,
    color: 'from-amber-700 to-amber-900',
  },
  {
    id: 'ARTE_PLACA',
    name: 'Arte Placa',
    description: 'Placa memorável (20x30cm)',
    icon: Image,
    steps: 5,
    color: 'from-orange-700 to-orange-900',
  },
  {
    id: 'VIDEO_HOMENAGEM',
    name: 'Vídeo Homenagem',
    description: 'Homenagem animada (MP4)',
    icon: Video,
    steps: 5,
    color: 'from-purple-700 to-purple-900',
  },
];

export default function Produtos() {
  const router = useRouter();

  const handleSelectProduct = (productId: string) => {
    router.push(`/flow/${productId}`);
  };

  return (
    <div className="min-h-screen bg-in-cream">
      <MobileHeader
        title="Escolha o tipo de Homenagem"
        onBack={() => router.back()}
        showBack={true}
      />

      <div className="p-4 md:p-6 max-w-4xl mx-auto">
        <p className="text-center text-in-dark mb-8 text-sm md:text-base">
          Selecione o tipo de homenagem que deseja criar
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRODUCTS.map((product) => {
            const IconComponent = product.icon;
            return (
              <div
                key={product.id}
                className={`bg-gradient-to-br ${product.color} rounded-lg p-6 text-white cursor-pointer transform transition-transform hover:scale-105`}
                onClick={() => handleSelectProduct(product.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <IconComponent size={32} />
                  <span className="text-xs bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    {product.steps} etapas
                  </span>
                </div>

                <h2 className="font-playfair text-2xl mb-2 font-bold">
                  {product.name}
                </h2>

                <p className="text-sm opacity-90 mb-6">{product.description}</p>

                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  className="border-white text-white hover:bg-white hover:text-in-dark"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectProduct(product.id);
                  }}
                >
                  Começar
                </Button>
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-in-bronze bg-opacity-10 rounded-lg border border-in-gold border-opacity-30">
          <p className="text-center text-in-dark text-sm md:text-base">
            <strong>Dica:</strong> Você pode gerenciar seus projetos a qualquer
            momento na seção "Meus Projetos"
          </p>
        </div>
      </div>
    </div>
  );
}
