# Link-in-bio — Cabreloa

Página de links pro Instagram do Cabreloa. HTML + CSS + JS puro, sem build,
sem framework, sem dependência.

Estrutura inspirada na referência (raquelmaia.com.br/linkbio): avatar circular,
bio curta, cards de link empilhados, fileira de redes sociais e rodapé de jogo
responsável. O visual segue a identidade da
LP `free.cabreloa` (fundo escuro + verde, Bebas Neue + Inter), não o da
referência — é a bio dele, tem que parecer dele.

## Estrutura

```
cabreloa-linkbio/
├── index.html       → esqueleto da página (raramente precisa mexer)
├── config.js        → perfil, links, redes, gate e rodapé ← É AQUI QUE VOCÊ MEXE
├── assets/
│   ├── style.css    → estilo (CSS à mão, ~7 KB)
│   └── app.js       → monta a página a partir do config + gate de idade
└── img/
    ├── avatar.webp  → foto do perfil (placeholder: recorte da LP)
    └── favicon.ico
```

## Rodar local

```bash
npx --yes serve -l 4174 cabreloa-linkbio
```

## Como mexer

Tudo em `config.js`. Nada de HTML.

**Trocar um link:** acha o item em `links` e troca a `url`.

**Adicionar um link:** copia um bloco e cola. Ícones prontos: `telegram`,
`coroa`, `raio`, `link`.

**Ordem na tela** = ordem no array. O card com `destaque: true` fica verde.

**Card com arte** (igual à referência): se você tiver o banner, joga em `img/`
e aponta `banner: "img/nome.jpg"`. O card vira a imagem inteira. Proporção da
referência é ~2.2:1 (ex: 1200×545). Sem `banner`, usa o layout ícone + título
+ subtítulo, que é o estado atual.

**Redes sociais:** disponíveis `instagram`, `youtube`, `tiktok`, `x`.

### Link sem URL some da tela

Qualquer link ou rede com `url` vazia ou começando com `#` **não é
renderizado**, e um aviso aparece no console. Isso é de propósito: é melhor o
card sumir do que o seguidor clicar e cair em lugar nenhum. Por isso os
`#TROCAR-...` no config não aparecem na página até serem preenchidos.

## Sobre o gate de idade

A referência tem um modal de "você tem 18 anos ou mais?" na entrada. Chegou a
ser implementado aqui e foi **removido a pedido** — a página abre direto nos
links, sem interstício.

O aviso +18 continua no rodapé, junto com os avisos de jogo responsável.

Se um dia precisar de volta, está no histórico do git (commit
`8d9cd00`), é só reverter a remoção.

## Deploy na Vercel

1. Import do repositório
2. Framework Preset: `Other`
3. Build Command: **vazio**
4. Output Directory: `.`

Sem variáveis de ambiente. Não adicione `package.json` — a Vercel tentaria
rodar um build e quebraria um site que é estático puro.

## Tracking

Herdado da LP, os mesmos IDs:

- GA4 `G-3LCDCQZPC3`
- Meta Pixel `1344726187578487` (PageView, carregado após o first paint)

**Confirmar se é isso mesmo.** Faz sentido usar o mesmo pixel pra alimentar o
público do Instagram, mas se a bio tiver que reportar separado da LP, troque
os IDs no `index.html`.

Não tem Trackgram aqui: os links vão direto pro destino. Se quiser rastrear
clique por clique, dá pra plugar o mesmo `tracker.js` da LP.

## Pendências

- [ ] Preencher `url` do VIP e do Odds Altas no `config.js`
- [ ] Preencher as 4 redes sociais
- [ ] Trocar `img/avatar.webp` pela foto de perfil de verdade
      (o atual é um recorte da imagem da LP, serve mas não é ideal)
- [ ] Confirmar `nome`, `handle` e `bio`
- [ ] Confirmar os IDs de GA4 e Pixel
