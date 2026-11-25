# Ritual Coffee

Landing page conceitual de uma cafeteria de cafés especiais, desenvolvida como projeto de portfólio. A experiência apresenta a marca por meio de fotografia, narrativa visual e animações ao longo da navegação.

## ☕ Acesse o site

**[Abrir Ritual Coffee](https://merakiritualcoffee.netlify.app/)**

## Sobre o projeto

A página acompanha a jornada do café, do grão à xícara. O visitante pode conhecer a proposta da cafeteria, explorar as bebidas, descobrir etapas de preparo e navegar por uma galeria visual.

Também é possível montar um pedido demonstrativo pela sacola interativa.

## Funcionalidades

- Landing page responsiva, com navegação por seções.
- Abertura cinematográfica com animações e vídeo da bebida.
- Transições e cenas sincronizadas com a rolagem da página.
- Cardápio interativo com quatro bebidas e preços ilustrativos.
- Sacola demonstrativa com adição e remoção de itens, ajuste de quantidades e cálculo do total.
- Galeria de fotografias com navegação entre as cenas.
- Conteúdo sobre origem, torra e extração do café.
- Suporte à preferência de movimento reduzido e navegação por teclado.
- HTML pré-renderizado para melhorar a disponibilidade do conteúdo e a indexação.

## Tecnologias

- React 19
- TypeScript
- Vite 7
- GSAP e ScrollTrigger
- Motion
- CSS

## Executar localmente

### Pré-requisitos

- Node.js
- npm

### Instalação

```bash
npm ci
```

### Desenvolvimento

```bash
npm run dev
```

O Vite iniciará o servidor local e exibirá o endereço para acessar a página no navegador.

### Build de produção

```bash
npm run build
```

O comando verifica os tipos TypeScript, gera a versão de produção e pré-renderiza o conteúdo HTML. Os arquivos finais ficam no diretório `dist/`.

Para visualizar a versão de produção localmente:

```bash
npm run preview
```

### Verificações

```bash
npm run typecheck
npm run lint
```

## Estrutura do projeto

```text
.
├── public/
│   ├── images/          # Fotografias e vídeos utilizados na página
│   ├── favicon.svg
│   └── mapa.svg
├── scripts/             # Scripts de pré-renderização e geração de mídia
├── src/
│   ├── components/      # Componentes reutilizáveis e sacola
│   ├── data/            # Cardápio, preços e informações demonstrativas
│   ├── sections/        # Seções e cenas da landing page
│   ├── App.tsx
│   ├── main.tsx
│   └── style.css
├── plans/               # Plano de desenvolvimento e checkpoints
├── index.html
└── package.json
```

## Observação

Ritual Coffee é uma cafeteria-conceito criada para demonstração em portfólio. Produtos, preços, endereço e horários são ilustrativos. A sacola simula a montagem de um pedido no navegador, sem realizar pedidos reais ou processar pagamentos.
