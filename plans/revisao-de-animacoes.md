# Revisão de movimento da Ritual Coffee

## Revisão da abertura em tela cheia

| Antes | Depois | Por quê |
| --- | --- | --- |
| O manifesto aparecia na primeira tela. | A composição ocupa a altura do viewport e a navegação fica sobre o cenário. | Preserva a leitura conjunta da marca e da xícara desde o primeiro quadro. |
| O preparo usava um modelo visualmente diferente da cerâmica da abertura. | A câmera acompanha a própria cerâmica fotografada até o plano da crema. | Borda, alça e superfície mantêm continuidade durante a aproximação. |
| O vapor subia como linhas e a superfície do espresso permanecia imóvel. | Camadas de vapor se dispersam, um reflexo percorre a borda e a crema continua em movimento durante o assentamento. | Os movimentos têm velocidades e origens distintas. |
| A principal sequência por rolagem chegava depois do cardápio. | A primeira rolagem revela o barista por uma máscara elíptica sincronizada com a câmera. | A transição apresenta o preparo dentro da primeira cena. |

No desktop, a faixa de fotos acompanha brevemente a rolagem e cede o controle ao visitante quando ele usa teclado, botões ou gesto lateral. No celular, a faixa usa rolagem horizontal nativa. As medições e os cenários de teste estão no checkpoint ativo.

## Auditoria da primeira versão

Auditoria de implementação em 23/11/2026. O escopo inclui a abertura, a sequência de preparo, o seletor de bebidas e a sacola. As referências usadas foram os critérios de `improve-animations` e `review-animations` do projeto.

| Prioridade e localização | Antes | Depois | Por quê |
| --- | --- | --- | --- |
| Alta · `src/components/Bag.tsx` e `src/style.css` | Fechar durante a entrada substituía uma animação por outra a partir da posição aberta. | O diálogo usa uma transição interrompível de transform, entrada de 230 ms e saída de 145 ms. | Escape durante a entrada preserva a posição já percorrida. |
| Alta · `src/components/Bag.tsx` | Remover um item desmontava o botão em foco. | O foco avança para um controle de quantidade disponível ou para a ação da sacola vazia. O total tem anúncio acessível. | Quem usa teclado consegue continuar o pedido. |
| Média · `src/App.tsx` | O aviso podia desaparecer durante o uso por teclado. Adições sucessivas da mesma bebida repetiam o anúncio. | O aviso mantém sua ação enquanto ela tem foco e inclui a quantidade atual. | Cada adição tem feedback distinguível. |
| Média · `src/sections/Hero.tsx` | Os movimentos do vapor e dos grãos só pausavam ao sair da abertura ou trocar de aba. | Um controle acessível pausa e retoma as camadas ambientes. A preferência de movimento reduzido apresenta a cena estática. | O visitante pode interromper o movimento enquanto lê. |
| Média · `src/sections/scroll-scene.ts` | Cada evento de progresso reaplicava o quadro e a classe de todas as etapas. | A sequência atualiza o atlas ao mudar de quadro e a etapa ao atravessar seu limite. O código da cena carrega sob consulta de mídia. | A rotação preserva seus 48 ângulos com menos trabalho repetido. |
| Média · `src/style.css` | O pires avançava sobre a chamada em largura de celular. | A foto ganhou tamanho e posição próprios no celular e a chamada recebeu espaço abaixo da cerâmica. | A composição preserva a leitura e a área de toque. |
| Baixa · `src/App.tsx` | Cada alteração de quantidade recriava o contador e reiniciava sua animação. | O contador atualiza no mesmo elemento. | Ajustes rápidos têm resposta imediata. |

**Parecer.** O movimento acompanha a tarefa de cada seção. A rotação avança e recua pela posição de rolagem. No celular e com movimento reduzido, as três etapas permanecem disponíveis em ordem de leitura. O checklist de entrega registra a cobertura e os limites da verificação em navegador.
