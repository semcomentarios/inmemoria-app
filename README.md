# InMemória - Plataforma de Homenagens

**Homenagens que Perduram** - Uma plataforma moderna e elegante para criar homenagens memoráveis com tecnologia adaptativa.

## 🎨 Visão Geral

InMemória é um aplicativo web que funciona como um app nativo mobile, permitindo usuários criar 4 tipos de homenagens:

1. **Nota Falecimento** - Comunicado elegante (1080x1080px)
2. **Sétimo Dia** - Convite para missa (1080x1080px)
3. **Arte Placa** - Placa memorável (20x30cm)
4. **Vídeo Homenagem** - Homenagem animada (MP4)

## 🏗️ Arquitetura

```
src/
├── core/
│   ├── engine/
│   │   ├── FieldOrchestrator.ts (gerencia campos dinâmicos)
│   │   └── TemplateEngine.ts (gerencia templates)
│   └── models/
│       └── Homage.ts (modelo de dados)
├── modules/
│   ├── flow/ (fluxos dos 4 tipos)
│   ├── canvas/ (renderização)
│   ├── editor/ (edição de campos)
│   └── guide/ (modo guia)
├── components/
│   ├── common/ (componentes reutilizáveis)
│   └── mobile/ (componentes mobile-first)
├── state/
│   ├── homageStore.ts (Zustand)
│   └── uiStore.ts
└── utils/
    ├── imageUtils.ts
    ├── dateUtils.ts
    └── exportUtils.ts
```

## 🚀 Padrões Modernos

- **Field Orchestrator Pattern**: Gerenciamento dinâmico de campos com dependências
- **Template Engine Pattern**: Renderização de templates com validação
- **Composable Flow Architecture**: Fluxos reutilizáveis e modulares
- **Mobile-First Design**: Tailwind CSS + PWA
- **Type-Safe**: 100% TypeScript

## 🛠️ Tecnologias

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Canvas**: Pixi.js
- **Fonts**: Playfair Display + Inter
- **Icons**: Lucide React

## 📦 Setup

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build
npm run build

# Start
npm start
```

## 🎯 Funcionalidades Principais

✅ FieldOrchestrator para gerenciamento de campos  
✅ TemplateEngine para renderização  
✅ Zustand para state management  
✅ Mobile-first UI  
✅ Preview em tempo real  
✅ Export PNG/MP4  
✅ Modo Guia  
✅ Modo Logo  

## 📝 Princípios

- **Respeito**: A memória merece o melhor tratamento
- **Simplicidade**: Interface intuitiva
- **Tecnologia**: Composição visual inteligente
- **Foco na memória**: Não em ferramentas

## 🔄 Alterações Cirúrgicas

A arquitetura permite mudanças fáceis:

- **Trocar Template**: Dados são mapeados automaticamente
- **Adicionar Campo**: Registrar no FieldOrchestrator
- **Novo Tipo**: Apenas um novo FlowStep
- **Novo Layout**: TemplateEngine valida compatibilidade

## 📱 Deploy

Configurado para Vercel com preview automático.

```bash
git push origin main
# Deploy automático no Vercel
```

## 📄 Licença

MIT
