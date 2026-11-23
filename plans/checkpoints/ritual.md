# Ritual Coffee

## Refinamentos da experiência de rolagem — 23/11/2026

- A abertura na xícara agora usa um recorte oval de 48 pontos, com orientação ajustada à perspectiva do café. O recorte cresce suavemente em conjunto com a câmera.
- A fotografia de preparo foi tratada localmente, ampliada e exportada como `public/images/preparo-hd.webp`, utilizada na abertura, na galeria e no manifesto. A origem tem 621 px, então o tratamento melhora a apresentação, mas não recupera detalhes fotográficos ausentes. A obtenção de uma fonte verdadeiramente maior permanece pendente devido ao bloqueio de acesso externo no ambiente local.
- A seção “Por dentro da Ritual” permanece fixa por 2,5 alturas de viewport e revela três fotografias, uma após a outra, com máscara circular inspirada na crema e passagem de vapor. Após a terceira foto, o restante da página volta a rolar normalmente.
- Links internos usam GSAP ScrollToPlugin com deslocamento contínuo e duração curta, preservando a interrupção por entrada do usuário. As setas da galeria percorrem as mesmas posições da sequência de rolagem.
- `npm run build`, `npm run lint`, `.qa/check-motion.mjs` e `.qa/check.mjs` passaram. A verificação cobriu 390 e 1440 px nas transições, cinco larguras na regressão geral, navegação por clique, percurso reverso e modo de movimento reduzido.

Entrega local em 23/11/2026. A implementação usa React, TypeScript, Vite, CSS e GSAP ScrollTrigger. O comando de build pré-renderiza o conteúdo em HTML e produz os arquivos estáticos em `dist/`.

## Marcos verificados

| Marco | Implementação e evidência |
| --- | --- |
| Identidade | A abertura e o cardápio usam imagens geradas para o projeto, famílias tipográficas locais e cerâmica marfim. As capturas do hero motivaram uma recomposição da xícara na tela estreita. |
| Página completa | As oito cenas incluem manifesto, cardápio, preparo, galeria, pedido, visita e encerramento. Conteúdo e horários também ficam legíveis no HTML pré-renderizado com JavaScript desativado. |
| Movimento | A abertura ocupa a altura da tela. A primeira rolagem aproxima a câmera, expande a máscara dentro do espresso e revela o preparo. A posição da câmera e a abertura da máscara retornam ao ponto inicial ao rolar para cima. Origem, Torra e Extração seguem em leitura contínua. |
| Pedido | Espresso e Cappuccino somaram R$ 25,00. Aumentar o Espresso resultou em R$ 34,00. Remover o Cappuccino deixou R$ 18,00. Fechar, reabrir, confirmar e começar novamente preservou os estados esperados. |
| Auditoria | Build, verificação de tipos e ESLint passaram. Foram inspecionadas capturas de desktop e celular, além da abertura em 360, 390, 768, 1440 e 1920 px. O teste percorreu a sacola com toque emulado e verificou Escape, foco, pausa e movimento reduzido. |

## Decisões e arquivos

- O catálogo demonstrativo tem quatro bebidas. Valores em centavos, ingredientes e horários ficam em `src/data/coffee.ts`.
- O script opcional `scripts/render-espresso.py` produz a tomada a partir da foto da cerâmica, com profundidade projetada, movimento próprio da crema e luz na borda. Os dois vídeos WebM prontos ocupam 169 KB e 144 KB. O primeiro quadro é uma imagem WebP responsiva.
- A entrada da marca, o vapor, a troca de bebidas e o aviso de adição usam CSS. GSAP e ScrollTrigger coordenam a câmera, a máscara e a passagem lateral da galeria. Motion anima a sacola, cujo código é carregado sob demanda no primeiro uso. A sacola permanece montada ao fechar, preservando a restauração do foco. Com movimento reduzido, a abertura apresenta a composição estática e omite o download da tomada.
- A revisão de desempenho encurtou o assentamento inicial da xícara de 880 ms para 460 ms e o da sombra para 600 ms. A troca de bebidas usa uma animação CSS de 230 ms.
- A revisão antes/depois está em `plans/revisao-de-animacoes.md`. As capturas locais e o relatório Lighthouse ficam em `.qa/`.
- O executável auxiliar do Impeccable não pôde criar seu cache. A direção e a revisão foram aplicadas a partir das referências locais da skill, do plano e das capturas reais.

## Desempenho e limites de verificação

Na medição móvel inicial do build com a abertura cinematográfica, o Lighthouse registrou desempenho **87**, acessibilidade **100**, LCP **3,2 s**, CLS **0** e TBT **270 ms**. As otimizações reduziram o JavaScript inicial de **80,01 KB gzip** para **75,91 KB gzip**, com a sacola transferida para um chunk de **4,72 KB gzip**, carregado ao abrir pela primeira vez.

As medições móveis posteriores oscilaram entre **87 e 100** pontos de desempenho, LCP simulado entre **1,8 e 3,1 s** e LCP observado em navegador local entre **0,55 e 0,75 s**. A acessibilidade permaneceu em **100** e o CLS entre **0 e 0,009**. A meta orientadora de LCP de **2,5 s** ainda não foi atingida consistentemente sob emulação de rede e CPU lentas. Build, verificação de tipos, ESLint e testes funcionais passaram após as alterações. A verificação cobriu cinco larguras (360, 390, 768, 1440 e 1920 px), navegação, rolagem reversa, sacola, teclado, foco e movimento reduzido, sem erros JavaScript ou HTTP.

## Execução

`npm ci` instala as dependências. `npm run dev` abre o servidor de desenvolvimento. `npm run build` gera a versão distribuível, e `npm run preview` serve esse build. A sacola guarda os itens em memória durante a visita.
