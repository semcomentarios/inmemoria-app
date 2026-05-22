'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@components/common/Button';
import { Leaf } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-in-dark via-in-dark to-in-bronze">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="mb-8 animate-pulse">
          <Leaf className="w-16 h-16 text-in-gold mx-auto" />
        </div>

        <h1 className="font-playfair text-4xl md:text-6xl text-in-cream mb-4 font-bold">
          InMemória
        </h1>

        <p className="text-in-cream text-lg md:text-xl mb-2 max-w-md">
          Homenagens que Perduram
        </p>

        <p className="text-in-gold text-base md:text-lg max-w-lg mb-12">
          Plataforma inteligente para criar homenagens memoráveis com tecnologia
          adaptativa
        </p>

        <Link href="/produtos">
          <Button size="lg" variant="primary" className="mb-6">
            Começar Agora
          </Button>
        </Link>

        {/* Princípios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-3xl">
          <div className="bg-in-bronze bg-opacity-20 p-6 rounded-lg border border-in-gold border-opacity-30">
            <h3 className="font-playfair text-in-gold text-lg mb-2">
              Respeito
            </h3>
            <p className="text-in-cream text-sm">
              A memória merece o melhor tratamento
            </p>
          </div>

          <div className="bg-in-bronze bg-opacity-20 p-6 rounded-lg border border-in-gold border-opacity-30">
            <h3 className="font-playfair text-in-gold text-lg mb-2">
              Simplicidade
            </h3>
            <p className="text-in-cream text-sm">
              Interface intuitiva e acessível
            </p>
          </div>

          <div className="bg-in-bronze bg-opacity-20 p-6 rounded-lg border border-in-gold border-opacity-30">
            <h3 className="font-playfair text-in-gold text-lg mb-2">
              Tecnologia
            </h3>
            <p className="text-in-cream text-sm">
              Composição visual inteligente
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
