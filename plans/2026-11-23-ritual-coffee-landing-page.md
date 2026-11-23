# Plano de desenvolvimento — Ritual Coffee

**Data:** 23/11/2026  
**Status:** pronto para execução, implementação ainda não iniciada  
**Projeto:** landing page demonstrativa de cafeteria para portfólio  
**Raiz:** `E:\Kame CEO\Freelances\Site Master`  
**Objetivo:** criar uma experiência digital cinematográfica, premium, minimalista e altamente interativa, com identidade própria e animações memoráveis.

> **Instrução para o Codex executor:** este documento é a especificação do projeto. Execute as etapas na ordem indicada, leia `AGENTS.md` e os oito `SKILL.md` locais antes de começar e use os critérios de aceite de cada etapa. O escopo desta fase é somente o planejamento. **Não iniciar implementação, instalação de dependências ou geração de imagens até o usuário pedir a execução.**

---

## 1. Escopo e resultado esperado

Uma **landing page completa, em português**, de página única, que demonstre capacidade de direção de arte, frontend e motion design. A experiência deve funcionar como uma cafeteria-conceito que o visitante pode explorar e da qual pode simular um pedido.

**Incluído:**

- Identidade visual autoral, layout responsivo e storytelling visual.
- Hero tipográfico gigante com xícara como protagonista, fumaça/vapor e grãos de café.
- Sequências ativadas por rolagem, parallax, máscaras, transições de produtos, elementos flutuantes e uma cena com rotação controlada da xícara.
- Cardápio navegável com produtos e preços demonstrativos.
- Sacola/pedido simulado, com seleção de produtos, quantidades, total e confirmação visual.
- Seção de localização e horários demonstrativos, navegação acessível e rodapé completo.
- SEO básico, estados de interface, atenção a performance, acessibilidade e preferência por movimento reduzido.
- Verificação visual e técnica em desktop, tablet e mobile.

**Fora do escopo:** backend, autenticação, banco de dados, pagamentos, integração com delivery, envio efetivo de pedidos, administração, painel e dados reais de uma cafeteria existente.

**Critério principal:** o resultado deve impressionar nos primeiros segundos, recompensar o scroll, permitir descobrir cardápio e demonstrar pedido até o fim, mantendo leitura, clareza e boa navegação.

## 2. Conceito criativo e identidade

### Narrativa: do grão ao ritual

A página conta a história de um café como experiência sensorial. **O grão aparece, o calor se manifesta em vapor, a xícara ganha movimento, os sabores são descobertos e o visitante conclui seu próprio ritual.** O scroll controla essa narrativa sem travar a navegação.

**Assinatura verbal sugerida:** “Todo dia merece um ritual.”  
**Tom:** editorial, confiante, sensorial, conciso. Evitar textos publicitários genéricos, excesso de slogans, etiquetas decorativas e seções repetitivas.

### Direção visual

| Elemento | Proposta inicial | Uso |
| --- | --- | --- |
| Espresso profundo | `#201711` | Fundos dramáticos e cenas imersivas |
| Creme de aveia | `#F5F0E7` | Fundo principal e espaços de respiro |
| Caramelo tostado | `#B9784C` | Acentos pontuais, estados ativos |
| Café com leite | `#C6AA8E` | Superfícies secundárias e materiais |
| Grafite quente | `#312923` | Textos em fundos claros |
| Tipografia display | **Archivo Black**, ou alternativa visualmente equivalente testada | Hero, letras em escala editorial |
| Tipografia expressiva | **Instrument Serif** | Frases-chave, contraste sofisticado |
| Tipografia funcional | **Geist** | Navegação, textos e interações |

**Linguagem:** fotografia realista de produto, luz lateral de estúdio, sombras macias, granulação sutil, superfícies minerais, composição assimétrica, close-up macro, muito espaço negativo e contraste marcante entre cenas claras e escuras.

**Restrições estéticas:** nada de estética genérica de template, grades idênticas repetidas, ícones decorativos gratuitos, gradientes sem intenção ou animações que compitam com o conteúdo. A intensidade visual deve surgir da composição e da coreografia.

### Sistema de layout

- Desktop com grid editorial de 12 colunas, largura máxima de conteúdo controlada e hero propositalmente fora do centro.
- Tablet adaptando posicionamento e profundidade; mobile com cenas recompostas, tipografia fluida e leitura linear.
- Grandes títulos com `clamp()`, espaços generosos e alinhamentos coerentes; superfícies de interação preservam áreas de toque adequadas.
- Navegação discreta sobreposta ao hero e com contraste adaptável nas seções seguintes.
- Texturas e ruído apenas quando contribuírem para materialidade e permanecerem discretos.

## 3. Mapa da experiência e coreografia por seção

Cada seção terá **um ponto focal próprio**, um papel na narrativa e um padrão de movimento distinto. Usar conteúdos e valores fictícios identificados como demonstrativos.

### Cena 01 — Abertura e hero cinematográfico

**Objetivo:** causar impacto imediato e apresentar a marca.

**Visual:** fundo creme ou espresso, palavra `RITUAL` em escala gigante atravessando a tela, `COFFEE` em contraponto, xícara premium em primeiro plano, vapor orgânico atrás da tipografia, grãos com profundidade em volta da xícara, CTA “Explorar o cardápio” e acesso à sacola.

**Movimentos:**

1. Entrada inicial curta com letras surgindo por máscara e stagger de 40–80 ms, sem bloquear a página com preloader.
2. Xícara entra com deslocamento, mudança suave de escala e pequena inclinação; estabiliza como elemento central.
3. Vapor contínuo, lento e irregular, com transparências e deformação orgânica. Pausar quando fora da viewport.
4. Grãos flutuam em órbitas sutis e reagem à rolagem; alguns cruzam planos à frente/atrás da xícara.
5. Ao sair do hero, xícara faz rotação parcial e o vapor conduz o olhar para a seção seguinte.

**Interações:** CTA com microinteração tátil, links de âncora, indicador discreto de rolagem. Evitar autoplay sonoro e cursor customizado invasivo.

### Cena 02 — Manifesto “Cada xícara, um ritual”

**Objetivo:** criar pausa editorial e estabelecer o conceito.

**Visual:** frase grande combinando sans + serif, retrato ou macrofotografia do preparo, contraste entre creme e café profundo.

**Movimentos:** texto revelado em blocos conforme entra em tela, imagem revelada com máscara e leve desfoque inicial, vapor do hero se dissipa pela borda. Movimento do conteúdo é único e legível, sem animar cada letra de um parágrafo longo.

### Cena 03 — Cardápio vivo e produtos em destaque

**Objetivo:** oferecer exploração real e demonstrar a qualidade do produto visual.

**Visual:** seletor editorial de 4–6 itens, por exemplo Espresso, Cappuccino, Flat White, Latte, Mocha e Cold Brew. Em desktop, fotografia grande e informações em coluna adjacente; em mobile, seletor rolável e fotografia dimensionada à tela.

**Movimentos:** troca de bebida com saída e entrada coordenadas, variação suave de ângulo/escala da xícara, fundo ou halo cromático relacionado ao produto e informações atualizadas com transição curta. As imagens devem parecer uma mesma família fotográfica.

**Interações:** selecionar produto, visualizar descrição/ingredientes/preço **ilustrativo**, adicionar à sacola, feedback imediato, navegação por teclado e mudança de seleção anunciada adequadamente.

### Cena 04 — Sequência imersiva de scroll “A arte do café”

**Objetivo:** ser o ápice técnico e visual da landing page.

**Visual:** cena teatral em fundo escuro, com xícara em destaque e três momentos — **Origem → Torra → Extração**. Um pequeno indicador de progresso informa a posição da sequência.

**Storyboard desktop sugerido:**

| Progresso local do scroll | Transformação visual | Mensagem |
| --- | --- | --- |
| 0–25% | Grãos entram em profundidade e orbitam lentamente um eixo; foco em textura macro | “Tudo começa no grão.” |
| 25–55% | Grãos convergem, luz aquece e transiciona para a bebida; fundo muda de temperatura | “O calor revela o caráter.” |
| 55–80% | Xícara rotaciona em continuidade, revelando volume e superfície do café; vapor nasce | “Precisão em cada extração.” |
| 80–100% | Vapor sobe, abre espaço e conduz à próxima cena; a xícara se acomoda | “O ritual ganha forma.” |

**Mecânica:** `GSAP ScrollTrigger` com uma única sequência pinada e timeline organizada, preferência por `scrub`, progresso previsível, animações reversíveis ao rolar para cima e nenhuma captura/impedimento de scroll nativo. A duração visual deve ser proporcional ao conteúdo (ponto de partida de 220–300vh, calibrar após testes).

**Rotação da xícara — decisão técnica:** priorizar modelo 3D leve, bem iluminado e otimizado se houver modelo/asset confiável. Alternativa de igual prioridade visual: sequência de frames de estúdio com ângulos consistentes, acionada pelo progresso da timeline. Escolher após prova de conceito visual e medição de performance. Uma foto única com transformação 2D **não** conta como rotação convincente do objeto.

**Mobile:** substituir o pin prolongado por três ou quatro momentos sequenciais com transições progressivas, imagem leve e navegação natural. **Movimento reduzido:** cenas estáticas ordenadas, texto sempre acessível, sem pin, loops, rotação ou parallax.

### Cena 05 — Atmosfera e galeria editorial

**Objetivo:** passar sensação física de uma cafeteria premium.

**Visual:** composições com fotos de balcão, barista, close-up de crema e materiais. Fotos com proporções variadas, bastante espaço negativo e títulos integrados às imagens.

**Movimentos:** entrada sequencial de imagens com máscaras, parallax moderado em camadas, recortes que se expandem suavemente e pequenas alterações de profundidade. Limitar a quantidade de imagens grandes simultâneas.

### Cena 06 — Monte seu pedido, demonstração interativa

**Objetivo:** transformar a landing page em uma demonstração funcional.

**Visual:** cardápio objetivo com filtros de categoria se agregarem valor, cartões limpos, botões “Adicionar” e sacola em drawer lateral / sheet mobile.

**Fluxo demonstrativo:**

1. Usuário escolhe um ou mais cafés.
2. O contador da sacola atualiza e fornece feedback discreto.
3. Na sacola, ajusta quantidade, remove itens e vê subtotal/total.
4. Ao finalizar, surge uma confirmação visual **“Pedido demonstrativo criado”** com número local ilustrativo e botão para começar novamente.

**Regras:** nenhum dado é enviado, nenhum pagamento é realizado, nenhum endereço ou dado pessoal é solicitado. Estado em memória no React é suficiente. Preços e moeda em `pt-BR` e `BRL`. Drawer com foco controlado, botão de fechar, `Escape`, foco retornando ao gatilho e tratamento de sacola vazia.

**Movimentos:** itens entram/saem com transição por layout, contador com pequeno pulso, drawer interrompível e confirmação com transformação breve. Movimento transacional deve priorizar rapidez.

### Cena 07 — Visite o Ritual

**Objetivo:** demonstrar horários, localização e caminho para visita.

**Visual:** layout dividido com quadro/mapa estilizado de bairro, bloco de horários e informações de visita. Exemplo editorial de localização: **“Vila Madalena, São Paulo · localização ilustrativa”**, sem inventar endereço exato ou criar link de rota falso.

**Conteúdo demonstrativo inicial:** segunda–sexta, 8h–19h; sábado–domingo, 9h–18h. Deixar todos os dados em um único arquivo para substituição. Se futuramente existir endereço real, adicionar link de direções e mapa correspondente.

**Movimentos:** reveal no bloco de texto, imagem de mapa/rua com transição em máscara e transição de cor na aproximação do rodapé.

### Cena 08 — Encerramento e rodapé marcante

**Objetivo:** fechar a narrativa e favorecer a navegação.

**Visual:** mensagem gigante “Seu próximo ritual começa aqui.”, assinatura `RITUAL COFFEE`, vapor ao fundo em movimento delicado, CTA para cardápio, horários, links úteis e crédito de conceito demonstrativo.

**Movimentos:** última ascensão de vapor, título com entrada progressiva e CTA com feedback de hover/focus. Evitar loop excessivo em rodapé que possa prejudicar leitura.

## 4. Direção de animações e efeitos especiais

| Efeito | Abordagem técnica | Qualidade esperada / limite |
| --- | --- | --- |
| Vapor orgânico | Camadas SVG com máscaras, blur controlado e transformações compositadas; testar vídeo/frames otimizados somente se elevar o realismo | Fluxo irregular, sem parecer linhas geométricas repetidas; não comprometer FPS |
| Grãos flutuantes | Sprites/recortes com profundidade e movimentos transformados; poucos elementos simultâneos | Parallax e luz coerentes, sem poluição visual |
| Xícara rotacionando | GLB/Three.js otimizado ou sequência de frames vinculada ao scroll | Rotação visual real e contínua, reversível |
| Hero tipográfico | CSS + Motion, máscaras e stagger | Entrada sofisticada, sem atrasar interação |
| Storyboard pinado | GSAP + ScrollTrigger | Uma cena principal, scroll nativo preservado |
| Produtos alternáveis | Motion (`AnimatePresence`/layout quando apropriado) | Transição interruptível, mantendo identidade do produto |
| Galeria | Reveal via CSS/Motion + parallax medido | Ritmo editorial, sem animações redundantes |
| Drawer e microinterações | Motion ou CSS | Resposta entre 120–280 ms, foco consistente |

**Princípios obrigatórios:**

- Cada movimento deve orientar, reforçar materialidade ou contar uma parte da história.
- Preferir `transform` e `opacity`; animar filtros e `blur` somente em áreas controladas e medidas.
- Animações de interface rápidas; cenas narrativas podem ser mais longas porque o progresso é comandado pelo scroll.
- Evitar `transition: all`, listeners manuais intensivos de scroll, escala que parte de zero, timelines que brigam entre si e scroll hijacking.
- Garantir que trocas rápidas de produtos, abertura/fechamento do drawer e ida/volta no scroll possam ser interrompidas sem estados quebrados.
- Aplicar `prefers-reduced-motion: reduce` em **todas** as cenas; experiências importantes continuam legíveis e funcionais.
- Ativar efeitos de hover somente em dispositivos com suporte real a hover. Respeitar foco visível, teclado e toque.
- Para partículas/loops, pausar fora da viewport e quando a página estiver oculta, quando tecnicamente adequado.

## 5. Arquitetura de implementação proposta

Como o projeto é uma demonstração visual sem servidor, adotar como hipótese inicial **Vite + React + TypeScript + Tailwind CSS**. Stack complementar: **Motion** (`motion/react`) para componentes e interfaces, **GSAP + ScrollTrigger** exclusivamente para a cena de scroll complexa. **Three.js/React Three Fiber** somente se a escolha da xícara 3D passar na prova de qualidade/performance. Versões concretas devem ser conferidas na etapa de instalação.

**Princípios de arquitetura:**

- Aplicação estática, compilável e publicável em hospedagem estática.
- Dados demonstrativos centralizados em `src/data/` para produtos, horários e informações da marca.
- Componentes de UI separados das cenas, evitando acoplamento entre animação e lógica do pedido.
- Um único provedor/contexto simples para sacola **apenas se necessário**; caso contrário, levantar estado em componente pai.
- Hooks de movimento reutilizáveis somente quando repetição real justificar.
- Imagens locais otimizadas, `srcset`/`sizes` e poster/fallback em imagens críticas; importação de assets com nomes descritivos.
- Navegação por âncoras sem roteamento desnecessário.

**Estrutura-alvo sugerida (ajustar durante execução):**

```text
Site Master/
├── AGENTS.md
├── skills/
├── plans/
│   ├── 2026-11-23-ritual-coffee-landing-page.md
│   └── checkpoints/                 # criar durante a execução
├── public/
│   └── assets/
│       ├── brand/
│       ├── hero/
│       ├── products/
│       ├── gallery/
│       └── motion/                   # frames ou 3D, se aprovados tecnicamente
├── src/
│   ├── components/
│   │   ├── layout/                    # Header, Footer, SectionShell
│   │   ├── ui/                        # Button, Drawer, ProductSelector
│   │   └── motion/                    # Steam, CoffeeBeans, ScrollSequence
│   ├── sections/                      # Hero, Manifesto, Menu, Craft, Gallery,
│   │                                  # Order, Visit, Closing
│   ├── data/                          # products.ts, location.ts, brand.ts
│   ├── hooks/                         # somente se necessário
│   ├── styles/                        # tokens, base, motion e acessibilidade
│   ├── App.tsx
│   └── main.tsx
└── package.json
```

**Estados principais:** produto selecionado, itens da sacola (id/quantidade/preço congelado para o demo), drawer aberto/fechado e confirmação do pedido. Definir preços em unidades inteiras de centavos ou formato consistente, evitando somas inexatas. Usar `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`.

## 6. Plano de produção de assets e composição

Usar a skill `imagegen-frontend-web` para desenhar **uma composição visual horizontal por seção antes de produzir seus recortes e variantes finais**. A consistência fotográfica vale mais do que volume de imagens. Criar um pequeno conjunto de referências, paleta, direção de luz e ângulos de câmera compartilhados. A skill deve orientar geração no momento da execução, conforme as ferramentas disponíveis.

| ID | Arte/asset | Composição e intenção | Entrega esperada |
| --- | --- | --- | --- |
| A1 | Hero master | Xícara de cerâmica autoral, espresso e vapor, luz lateral, fundo com espaço para letras gigantes | Composição 16:9 + recortes responsivos |
| A2 | Xícara isolada | Mesmo design, produto sem fundo, ângulo compatível com motion | Recorte de alta qualidade ou modelo/frames consistentes |
| A3 | Grãos | Grãos detalhados com iluminação compatível | Poucos PNG/WebP com transparência ou 3D leve |
| A4 | Manifesto | Gesto de servir ou mão de barista, composição editorial | Foto 4:5 e variante horizontal |
| A5 | Família de produtos | 4–6 cafés fotografados com mesmo ponto de vista, copo/xícara e luz coerentes | WebP/AVIF dimensionados para showcase |
| A6 | Origem | Macro grãos e superfície de torra | Fundo/recorte para cena de scroll |
| A7 | Extração | Macro de café e crema | Fundo/recorte para cena de scroll |
| A8 | Galeria | Ambiente, balcão e detalhes com composições distintas | 3–4 imagens de proporções variadas |
| A9 | Visita | Rua ou interior conceitual, sem endereço factual | Visual ambientado para seção de horários |
| A10 | Ícones/marca | Identidade `RITUAL`, ícones essenciais e favicon | SVGs autorais e variantes claras/escuras |

**Regras de produção:**

1. Validar **primeiro** a estética do hero e de um produto. Se não parecerem parte da mesma marca, corrigir a direção antes do restante.
2. Garantir que nenhuma imagem tenha texto inventado por gerador. Todas as letras, preços e botões pertencem ao HTML.
3. Preparar versões mobile e desktop para cenas com recorte relevante.
4. Otimizar peso, dimensões, transparência e carregamento. Evitar baixar imagens gigantes para exibição pequena.
5. Para o efeito de rotação, não presumir que várias gerações estáticas aleatórias criem ângulos consistentes. Usar modelo/turntable controlado ou sequência produzida com geometria consistente.
6. Registrar origem/licença de imagens externas se forem usadas em vez de geração própria.

### Referências de composição para produção

**Hero:** product photography cinematográfica, cerâmica artesanal marfim, café intenso, luz lateral de janela, vapor realista e delicado, sombra longa, fundo minimalista quente, alto contraste, espaço negativo para tipografia sobreposta, **sem texto na imagem**.

**Cardápio:** mesa de estúdio minimalista, uma bebida por quadro, estética editorial premium, iluminação lateral uniforme, mesma câmera e direção de luz entre produtos, fundo coerente, alta definição de espuma/crema, **sem texto na imagem**.

**Galeria:** cenas humanas autênticas com mãos, equipamento e materiais, enquadramentos diferentes, luz natural e atmosfera acolhedora, sem parecer banco genérico de imagens.

## 7. Plano de execução por fases

### Fase 0 — Preparação e leitura das skills

- [ ] Ler `AGENTS.md` e integralmente `skills/{impeccable,design-taste-frontend,high-end-visual-design,animate,emil-design-eng,imagegen-frontend-web,improve-animations,review-animations}/SKILL.md`, incluindo referências necessárias a cada fase.
- [ ] Verificar estado da pasta e dependências de sistema antes de iniciar a implementação.
- [ ] Criar projeto Vite/React/TS e instalar somente dependências justificadas.
- [ ] Definir comandos `dev`, `build`, `preview`, `lint` e validações possíveis de TypeScript.
- [ ] Criar checkpoint inicial com decisões e pendências em `plans/checkpoints/`.

**Aceite:** app inicial sobe, build funciona, estrutura mínima pronta e oito skills mapeadas para as próximas etapas.

### Fase 1 — Direção de arte e linguagem visual

- [ ] Com `impeccable`, `design-taste-frontend` e `high-end-visual-design`, construir tokens de tipografia, cores, espaços, grid, raios, sombras e estados.
- [ ] Definir layout dos oito blocos em desktop e mobile, com hierarquia distinta por cena.
- [ ] Definir navegação, seção ativa se relevante, estados de botão, foco e sacola.
- [ ] Usar `imagegen-frontend-web` para compor hero, produtos e referências das demais seções.
- [ ] Validar no navegador, em tamanho real, **hero + cardápio** antes de multiplicar a linguagem.

**Aceite:** duas seções-piloto comprovam identidade consistente, aparência premium e legibilidade em telas estreitas.

### Fase 2 — Estrutura semântica e conteúdo completo

- [ ] Implementar header, todas as oito seções e footer em layout responsivo.
- [ ] Centralizar catálogo demonstrativo, preços, horário e localização fictícia em `src/data/`.
- [ ] Configurar títulos, navegação por âncora, links funcionais, texto alternativo e contraste.
- [ ] Preparar variantes de imagens e placeholders de carga sem mudanças bruscas de layout.
- [ ] Garantir fluxo completo de leitura e navegação com JS/motion reduzidos quando possível.

**Aceite:** página inteira navegável e agradável visualmente antes das animações complexas.

### Fase 3 — Motion system e hero

- [ ] Com `animate` e `emil-design-eng`, definir curva/easing, duração, stagger e regras de interrupção.
- [ ] Implementar entrada tipográfica, xícara, vapor e grãos em camadas com profundidade.
- [ ] Conectar saída do hero à entrada do manifesto, mantendo progressão contínua.
- [ ] Pausar efeitos ambientes fora de cena e aplicar `prefers-reduced-motion`.
- [ ] Testar estabilidade em desktop e dispositivo móvel intermediário.

**Aceite:** hero impactante, fluido, sem saltos ao carregar ou animações que prejudiquem interação.

### Fase 4 — Narrativa de scroll e transições de showcase

- [ ] Criar prova de conceito da rotação real da xícara e escolher 3D ou turntable conforme qualidade/performance.
- [ ] Construir storyboard de origem/torra/extração com `GSAP ScrollTrigger`, sincronizado ao progresso.
- [ ] Implementar reversibilidade e desmontagem correta dos triggers ao desmontar componentes e no resize.
- [ ] Implementar transições do seletor de produtos e galeria editorial com Motion/CSS.
- [ ] Criar versão mobile curta e sem pin prolongado; respeitar movimento reduzido.

**Aceite:** transições reversíveis e coerentes, nenhuma cena em branco ou travada ao rolar rapidamente, resize e navegação por teclado preservados.

### Fase 5 — Cardápio e sacola demonstrativa

- [ ] Implementar seleção de produtos e adição sem duplicação acidental.
- [ ] Mostrar itens, preços, quantidades, remover e atualizar total corretamente.
- [ ] Criar drawer responsivo com acessibilidade de diálogo e feedback de estado.
- [ ] Criar confirmação visual claramente marcada como simulação, com opção de novo pedido.
- [ ] Tratar sacola vazia, clique rápido repetido, fechamento durante transição e mobile touch.

**Aceite:** fluxo completo funciona de ponta a ponta sem backend e sem erros de total/estado.

### Fase 6 — Visita, detalhes e refinamento editorial

- [ ] Finalizar horários, localização ilustrativa, contato demonstrativo sem links falsos e footer.
- [ ] Uniformizar microcopy, espaçamento, transições de cor e ritmo de leitura.
- [ ] Revisar componentes e estados seguindo `impeccable` e `high-end-visual-design`.
- [ ] Inserir SEO básico (título, descrição, Open Graph, favicon, heading único, `lang=pt-BR`).

**Aceite:** página final completa, consistente e utilizável em todos os pontos de entrada.

### Fase 7 — Revisão intensiva de animações

- [ ] Aplicar **`improve-animations`** em modo de auditoria, gerando plano de correções priorizado em `plans/` com impacto e localização.
- [ ] Executar as correções identificadas de prioridade alta e média, mantendo o escopo da landing page.
- [ ] Aplicar **`review-animations`** com veredito e tabela **antes / depois / por quê**.
- [ ] Revisar narrativa, ritmo, interrupção, estabilidade de layout, composição, respeito a reduced motion e capacidade de interação.
- [ ] Repetir a revisão quando ajustes alterarem as cenas principais.

**Aceite:** auditorias registradas, problemas críticos eliminados e parecer final claro sobre a experiência animada.

### Fase 8 — QA visual, performance e entrega

- [ ] Validar `build`, lint, TypeScript e fluxo normal do site; corrigir falhas.
- [ ] Testar viewport pequeno (~360–390 px), tablet (~768 px), desktop (~1440 px) e tela ampla.
- [ ] Inspecionar screenshots de todas as seções em desktop/mobile para avaliar cortes, alinhamentos, layering, tipografia e contraste.
- [ ] Testar scroll rápido, reverso, resize, toque, mouse, teclado, foco, drawer e preferência de movimento reduzido.
- [ ] Medir Core Web Vitals/Lighthouse, avaliar imagens e efeitos que pesem na renderização e otimizar gargalos reais.
- [ ] Validar alt text, navegação por teclado, `aria` pertinente, ordem de leitura e ausência de overflow horizontal.
- [ ] Produzir checkpoint final com arquivos entregues, comandos, testes executados e pendências reais.

**Aceite:** site completo, build aprovado, principais fluxos e breakpoints verificados, sem defeitos críticos de animação ou acessibilidade.

## 8. Aplicação explícita das oito skills

| Skill instalada | Fases | Responsabilidade no projeto |
| --- | --- | --- |
| `impeccable` | 1, 2, 6, 8 | Direção de UX, conteúdo, acabamento, audit visual por screenshots e padrões de layout |
| `design-taste-frontend` | 1, 2, 3, 4 | Personalidade editorial, composição ousada, tipografia, ritmo espacial e linguagem visual |
| `high-end-visual-design` | 1, 2, 6, 8 | Identidade premium, hierarquia, assimetria, microdetalhes e responsividade |
| `animate` | 3, 4, 5 | Sistema de motion, transições e significados do movimento, durações e reduced motion |
| `emil-design-eng` | 3, 4, 5 | Naturalidade física, springs, interrupções, easing, hover, movimento de interface |
| `imagegen-frontend-web` | 1, 3, 4, 6 | Composição visual por seção, consistência de assets, direção de fotografia e recortes |
| `improve-animations` | 7 | Auditoria e plano priorizado de melhorias de animações existentes |
| `review-animations` | 7, 8 | Revisão final crítica e tabela antes/depois/justificativa |

**Regra para execução:** consultar também os arquivos auxiliares relevantes citados por cada `SKILL.md`, como receitas e padrões de animação e referências de design. Não tratar os nomes das skills como substitutos da leitura de suas instruções.

## 9. Checkpoints e controle de execução

Durante a implementação, manter **um checkpoint ativo** em `plans/checkpoints/`, indicando data, fase, decisões técnicas, evidências de validação e próximo trabalho. Ao concluir uma fase, substituir o checkpoint anterior por um checkpoint atualizado. Manter este plano principal como referência estável e registrar desvios de escopo no checkpoint vigente. Não criar checkpoints para etapas que não foram executadas.

Marcos de verificação:

1. **C1 — Identidade aprovada:** hero e produto piloto expressam a marca.
2. **C2 — Página íntegra:** oito seções completas, legíveis e responsivas, ainda que com motion parcial.
3. **C3 — Experiência cinematográfica:** hero, vapor, grãos e xícara/scroll implementados e navegáveis.
4. **C4 — Fluxo funcional:** cardápio, sacola e pedido demonstrativo concluídos.
5. **C5 — Auditoria visual e motion:** revisões concluídas, responsividade e desempenho validados.

Depois de cada marco, registrar **o que foi feito, como foi verificado e o que ainda falta**. Não declarar um marco concluído só porque seu código foi escrito.

## 10. Metas de qualidade e testes de aceite

**Metas orientadoras, a aferir em build de produção:**

| Área | Meta |
| --- | --- |
| Performance mobile | Lighthouse Performance **≥ 90** quando viável em ambiente de medição controlado |
| Acessibilidade | Lighthouse Accessibility **≥ 95**, acrescido de verificação manual |
| LCP | ≤ 2,5 s em condições de Core Web Vitals aplicáveis |
| CLS | ≤ 0,1 |
| INP | ≤ 200 ms em condições de medição aplicáveis |
| Fluidez | Transições sem travamentos perceptíveis em dispositivo intermediário; verificar frames durante cenas pesadas |
| Navegação | Sem scroll horizontal indevido ou armadilhas de foco |
| Reduced motion | Experiência íntegra e utilizável sem loops, pin e efeitos cinéticos fortes |

**Cenários de aceite obrigatórios:**

- Abre a página e visualiza `RITUAL` e a xícara com boa composição antes que assets secundários terminem de carregar.
- Desce lentamente e rapidamente, volta para cima e verifica que a história continua sincronizada, sem conteúdo sobreposto ou desaparecendo.
- Troca vários produtos em sequência rápida e vê somente o estado final correto.
- Adiciona dois cafés, muda quantidades, remove um, fecha e reabre a sacola e confirma o total correto.
- Finaliza o fluxo demonstrativo e recebe confirmação clara, sem qualquer envio de rede de pedido.
- Consulta horários e localização ilustrativa sem links quebrados ou informações apresentadas como reais.
- Usa tab, Enter, Espaço e Escape na navegação e no drawer; foco permanece visível.
- Ativa `prefers-reduced-motion`, verifica todas as seções e consegue acessar cardápio, horários e pedido.
- Em 360/390/768/1440 px, não há cortes indevidos de produto/título, controles minúsculos nem falta de contraste.

## 11. Prioridades de execução e decisões condicionais

**Prioridade P0 — indispensável:** hero premium, conteúdo completo, cardápio, pedido simulado, localização, horários, responsividade, acessibilidade e build.

**Prioridade P1 — assinatura visual:** vapor orgânico, grãos em profundidade, rotação real da xícara, sequência pinada, produtos com transições, galeria editorial e acabamento fino.

**Prioridade P2 — somente com margem de performance:** efeitos de luz/reflexo adicionais, reações sutis ao ponteiro, partículas suplementares e detalhes decorativos extras. Esses efeitos devem ser cortados se sacrificarem legibilidade ou fluidez.

**Dependências reais:**

- A técnica da xícara rotativa depende da qualidade do modelo/turntable disponível e de testes no dispositivo-alvo.
- Vapor e grãos precisam ter boa aparência **parados** antes de receber animação.
- Fotografia de produtos deve estar padronizada antes de programar transições entre itens.
- A auditoria `improve-animations` só faz sentido quando os efeitos estiverem implementados.

## 12. Definição final de pronto

O Ritual Coffee estará pronto quando **todas as oito seções** formarem uma landing page visualmente coesa, a narrativa de scroll e as animações principais estiverem estáveis e reversíveis, o cardápio e a sacola concluírem um pedido fictício completo, a experiência mobile preservar qualidade e usabilidade, os efeitos respeitarem movimento reduzido e o build de produção passar com verificações documentadas. O projeto deve poder ser demonstrado publicamente como **conceito de portfólio**.

**Próxima ação autorizável:** executar a **Fase 0**, seguir os marcos e registrar checkpoints. Este arquivo, nesta entrega, constitui **somente o plano de desenvolvimento**.
