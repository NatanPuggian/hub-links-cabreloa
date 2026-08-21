/* ============================================================
   Link-in-bio do Cabreloa — montagem da página a partir do config.
   Edite config.js, não este arquivo.
   ============================================================ */
(function () {
  var C = window.BIO_CONFIG;
  if (!C) { console.error('[bio] config.js nao carregou'); return; }

  var $ = function (sel) { return document.querySelector(sel); };

  /* Escapa texto vindo do config antes de jogar no HTML.
     O config é nosso, mas um & ou < num título não pode quebrar a página. */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* Link ainda não configurado (os placeholders "#TROCAR-...") */
  function pendente(url) {
    return !url || url.charAt(0) === '#';
  }

  /* ---------- Ícones ---------- */
  var ICONES = {
    telegram: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    coroa:    '<path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/>',
    raio:     '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    link:     '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>'
  };

  /* SVGs de marca: viewBox 24 e path preenchido (fill, não stroke) */
  var SOCIAIS = {
    instagram: { label: 'Instagram', path: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.71-2.13 1.38C1.34 2.68.93 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.71 1.46 1.38 2.13.67.67 1.34 1.08 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.71 2.13-1.38.67-.67 1.08-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.71-1.46-1.38-2.13C21.32 1.34 20.65.93 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z' },
    youtube:   { label: 'YouTube',   path: 'M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.08 0 12 0 12s0 3.92.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z' },
    tiktok:    { label: 'TikTok',    path: 'M16.6 5.82a4.28 4.28 0 0 1-1.05-2.82h-3.3v13.2a2.59 2.59 0 0 1-2.6 2.5 2.6 2.6 0 1 1 .78-5.07V10.3a5.87 5.87 0 0 0-.78-.05A5.88 5.88 0 1 0 15.5 16.2V9.4a7.53 7.53 0 0 0 4.4 1.4V7.5a4.35 4.35 0 0 1-3.3-1.68Z' },
    x:         { label: 'X',         path: 'M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z' }
  };

  function svgLinha(inner) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
           'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + '</svg>';
  }

  /* ---------- Perfil ---------- */
  var p = C.perfil || {};
  $('#avatar').src = p.avatar || 'img/avatar.webp';
  $('#avatar').alt = 'Foto de ' + (p.nome || '');
  $('#nome').textContent = p.nome || '';
  $('#handle').textContent = p.handle || '';
  $('#bio').textContent = p.bio || '';
  if (!p.handle) $('#handle').hidden = true;

  /* ---------- Cards de link ---------- */
  var alvo = $('#links');
  var atraso = 0;
  (C.links || []).forEach(function (l) {
    if (pendente(l.url)) {
      // Sem link válido ainda: não renderiza um botão que leva a lugar nenhum.
      console.warn('[bio] link "' + l.titulo + '" sem URL — card escondido. Preencha no config.js');
      return;
    }
    atraso += 60;
    var a = document.createElement('a');
    a.href = l.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = 'anim ' + (l.banner ? 'card-banner' : 'card' + (l.destaque ? ' card-destaque' : ''));
    a.style.animationDelay = atraso + 'ms';
    a.setAttribute('data-bio-link', l.titulo || '');

    if (l.banner) {
      a.innerHTML = '<img src="' + esc(l.banner) + '" alt="' + esc(l.titulo) + '" loading="lazy" />';
    } else {
      a.innerHTML =
        '<span class="card-icone">' + svgLinha(ICONES[l.icone] || ICONES.link) + '</span>' +
        '<span class="card-texto">' +
          '<span class="card-titulo">' + esc(l.titulo) + '</span>' +
          (l.subtitulo ? '<span class="card-sub">' + esc(l.subtitulo) + '</span>' : '') +
        '</span>' +
        '<span class="card-seta">' + svgLinha('<path d="m9 18 6-6-6-6"/>') + '</span>';
    }
    alvo.appendChild(a);
  });

  /* ---------- Redes sociais ---------- */
  var box = $('#sociais');
  (C.sociais || []).forEach(function (s) {
    var meta = SOCIAIS[s.rede];
    if (!meta || pendente(s.url)) return;
    var a = document.createElement('a');
    a.href = s.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = 'social';
    a.setAttribute('aria-label', meta.label);
    a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + meta.path + '"/></svg>';
    box.appendChild(a);
  });
  if (!box.children.length) box.hidden = true;

  /* ---------- Rodapé ---------- */
  var rod = C.rodape || {};
  var avisos = $('#avisos');
  (rod.avisos || []).forEach(function (t) {
    var el = document.createElement('p');
    el.textContent = t;
    avisos.appendChild(el);
  });
  $('#copyright').textContent = rod.copyright || '';

  /* ---------- Gate de idade ---------- */
  var g = C.ageGate || {};
  var gate = $('#gate');
  var CHAVE = 'bio_idade_ok';

  function jaConfirmou() {
    try {
      var v = localStorage.getItem(CHAVE);
      if (!v) return false;
      var dias = g.lembrarDias == null ? 30 : g.lembrarDias;
      return (Date.now() - Number(v)) < dias * 864e5;
    } catch (e) {
      return false; // localStorage bloqueado (aba anônima, cookies off)
    }
  }

  function fecharGate() {
    try { localStorage.setItem(CHAVE, String(Date.now())); } catch (e) {}
    gate.hidden = true;
    document.body.classList.remove('gate-aberto');
  }

  if (!g.ativo || jaConfirmou()) {
    gate.hidden = true;
  } else {
    $('#gate-titulo').textContent = g.titulo || 'Verificação de Idade';
    $('#gate-pergunta').textContent = g.pergunta || 'Você tem 18 anos ou mais?';
    $('#gate-rodape').textContent = g.rodape || '';
    $('#gate-sim').textContent = g.labelSim || 'Sim, tenho 18+';
    $('#gate-nao').textContent = g.labelNao || 'Não';
    document.body.classList.add('gate-aberto');
    $('#gate-sim').addEventListener('click', fecharGate);
    $('#gate-nao').addEventListener('click', function () {
      window.location.href = g.urlRecusa || 'https://www.google.com';
    });
    $('#gate-sim').focus();
  }
})();
