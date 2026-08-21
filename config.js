/* ============================================================
   CONFIG DA LINK-IN-BIO — é aqui que você mexe.
   O index.html não precisa ser tocado pra trocar links ou textos.
   ============================================================ */
window.BIO_CONFIG = {

  /* ---------- Perfil ---------- */
  perfil: {
    nome: "CABRELOA",
    handle: "@cabreloa",
    bio: "O Mago. Análise de jogo todo dia, resenha de verdade e leitura sem firula de guru. Desde 2018.",
    avatar: "img/avatar.webp"
  },

  /* ---------- Cards de link ----------
     Ordem = ordem na tela. O primeiro com `destaque: true`
     ganha o tratamento verde.

     `banner` é opcional: se você tiver a arte (tipo a referência,
     ~1200x545 / proporção 2.2:1), aponta pra ela em img/ e o card
     vira a imagem inteira. Sem banner, cai no layout ícone +
     título + subtitulo, que é o estado atual. */
  links: [
    {
      titulo: "GRUPO GRÁTIS NO TELEGRAM",
      subtitulo: "Análise todo dia e a resenha da galera",
      icone: "telegram",
      url: "https://telegram.me/+m75Z-mJHz7RjYTJh",
      destaque: true,
      banner: null
    },
    {
      titulo: "GRUPO VIP",
      subtitulo: "Entradas fechadas e leitura antecipada",
      icone: "coroa",
      url: "#TROCAR-LINK-VIP",
      banner: null
    },
    {
      titulo: "ODDS ALTAS",
      subtitulo: "As melhores odds do dia, na hora",
      icone: "raio",
      url: "#TROCAR-LINK-ODDS",
      banner: null
    }
  ],

  /* ---------- Redes sociais ----------
     Some da tela sozinho qualquer um que ficar com url vazia. */
  sociais: [
    { rede: "instagram", url: "#TROCAR-INSTAGRAM" },
    { rede: "youtube",   url: "#TROCAR-YOUTUBE" },
    { rede: "tiktok",    url: "#TROCAR-TIKTOK" },
    { rede: "x",         url: "#TROCAR-X" }
  ],

  /* ---------- Rodapé ---------- */
  rodape: {
    avisos: [
      "Apostas esportivas envolvem riscos. Nunca aposte o dinheiro do pão, apenas o da manteiga.",
      "Resultados passados não garantem lucros futuros.",
      "Conteúdo destinado apenas para maiores de 18 anos. Jogue com responsabilidade."
    ],
    copyright: "© 2026 Arena Affiliates"
  }
};
