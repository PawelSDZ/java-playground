// Búsqueda de la cabecera: temas de Teoría (va al apartado concreto) y ejercicios (por título y por lo que usa la solución).
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var input = $('searchInput'), box = $('searchResults'), items = [], sel = -1;
  function esc(t) { return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  // minúsculas y sin tildes; «do while», «foreach»… se escriben de una sola forma
  function norm(t) {
    return t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/\bdo\s*-?\s*while\b/g, 'do-while').replace(/\bfor\s*-?\s*each\b/g, 'for-each')
      .replace(/\bwhile\s*\(\s*true\s*\)/g, 'while-true').replace(/\bmatrices\b/g, 'matriz').replace(/\barrays?\b|\bvectore?s?\b/g, 'array');
  }
  function words(t) { return norm(t).split(/[^a-z0-9ñ_\-]+/).filter(Boolean); }

  // ----- lo que usa cada ejercicio, sacado de su solución -----
  function tags(e) {
    var src = e.solution.replace(/"(?:\\.|[^"\\])*"/g, '""').replace(/\/\/.*$/gm, ''), t = [];
    var add = function (cond, name) { if (cond && t.indexOf(name) < 0) t.push(name); };
    var whiles = (src.match(/\bwhile\s*\(/g) || []).length, dos = (src.match(/\bdo\s*\{/g) || []).length;
    add(/\bfor\s*\([^:;)]*;/.test(src), 'for');
    add(/\bfor\s*\([^;)]*:/.test(src), 'for-each');
    add(whiles > dos, 'while');
    add(dos > 0, 'do-while');
    add(/\bwhile\s*\(\s*true\s*\)/.test(src), 'while-true');
    add(/\b(for|while)\b[\s\S]*\{[^}]*\b(for|while)\b/.test(src) && (e.req || []).some(function (q) { return /dentro/.test(q.msg); }), 'bucles anidados');
    add(/\bif\s*\(/.test(src), 'if');
    add(/\belse\s+if\b/.test(src), 'else if');
    add(/\bswitch\s*\(/.test(src), 'switch');
    add(/\bbreak\s*;/.test(src), 'break');
    add(/\bcontinue\s*;/.test(src), 'continue');
    add(/\?[^;]*:/.test(src), 'ternario');
    add(/\[\s*\]|new\s+\w+\s*\[/.test(src), 'array');
    add(/\[\s*\]\s*\[\s*\]|\]\s*\[/.test(src), 'matriz');
    add(/\bScanner\b/.test(src), 'scanner');
    add(/\bString\b/.test(src), 'string');
    add(/\(\s*(int|double|long|char)\s*\)/.test(src), 'casting');
    add(/%/.test(src), 'resto %');
    (src.match(/\.\s*([a-zA-Z]+)\s*\(/g) || []).forEach(function (m) {
      var n = m.replace(/[.\s(]/g, '');
      if (!/^(println|print|printf)$/.test(n)) add(true, n);   // salen en todos: no sirven para buscar
    });
    (src.match(/\b(Math|Arrays|Integer|Double|Character|String|StringBuilder)\s*\.\s*([a-zA-Z]+)/g) || []).forEach(function (m) { add(true, m.replace(/\s/g, '')); });
    add(/\bStringBuilder\b/.test(src), 'StringBuilder');
    return t;
  }
  var EX = EXERCISES.map(function (e) { var tg = tags(e); return { e: e, tags: tg, title: words(e.title + ' ' + e.group), tw: tg.map(norm) }; });

  // ----- apartados de la teoría -----
  function plain(b) { return b.p || b.syntax || b.code || b.java || b.note || (b.list || []).join(' ') || (b.table || []).map(function (r) { return r.join(' '); }).join(' ') || ''; }
  var SEC = [];
  TEORIA.forEach(function (t) {
    var cur = { t: t, n: null, head: '', text: '' };
    SEC.push(cur);
    t.blocks.forEach(function (b) {
      if (b.h) { cur = { t: t, n: SEC.filter(function (s) { return s.t === t && s.n != null; }).length, head: b.h, text: '' }; SEC.push(cur); }
      else cur.text += ' ' + plain(b).replace(/[`*]/g, '');
    });
  });

  // las palabras de Java se buscan enteras: «for» no tiene que encontrar «forma»
  var KEYWORD = /^(for|while|do|do-while|for-each|if|else|switch|case|break|continue|int|char|long|new|null|true|false|return|var|final)$/;
  // cada palabra buscada tiene que aparecer; puntúa más si está en el título o el encabezado
  function scoreWords(q, fields) {
    var total = 0;
    for (var i = 0; i < q.length; i++) {
      var best = 0;
      fields.forEach(function (f) {
        if (f.exact && f.exact.indexOf(q[i]) >= 0) best = Math.max(best, f.w + 2);
        else if (f.words.some(function (w) { return KEYWORD.test(q[i]) ? w === q[i] : w.indexOf(q[i]) === 0; })) best = Math.max(best, f.w);
      });
      if (!best) return 0;
      total += best;
    }
    return total;
  }
  function snippet(text, q) {
    var n = norm(text), at = -1;
    q.forEach(function (w) { var i = n.indexOf(w); if (i >= 0 && (at < 0 || i < at)) at = i; });
    if (at < 0) return '';
    var from = Math.max(0, at - 40), s = text.slice(from, from + 120).trim();
    return (from > 0 ? '…' : '') + s + (from + 120 < text.length ? '…' : '');
  }
  function search(raw) {
    var q = words(raw); if (!q.length) return [];
    var res = [];
    SEC.forEach(function (s) {
      var sc = scoreWords(q, [{ words: words(s.t.title), w: 6 }, { words: words(s.head), w: 4 }, { words: words(s.text), w: 1 }]);
      if (sc && !(s.n == null && !s.text.trim())) res.push({ kind: 'teo', sc: sc + 0.5, s: s, snip: snippet(s.head + ' ' + s.text, q) });
    });
    EX.forEach(function (x) {
      var sc = scoreWords(q, [{ words: x.title, w: 5 }, { words: x.tw.join(' ').split(' '), exact: x.tw, w: 3 }]);
      if (sc) res.push({ kind: 'ej', sc: sc, x: x, hit: x.tags.filter(function (t) { var nt = norm(t); return q.some(function (w) { return nt.indexOf(w) === 0; }); }) });
    });
    return res.sort(function (a, b) { return b.sc - a.sc; });
  }

  // ----- lista de resultados -----
  function paint() {
    var res = search(input.value);
    box.innerHTML = ''; items = []; sel = -1;
    if (!input.value.trim()) { box.hidden = true; return; }
    var teo = res.filter(function (r) { return r.kind === 'teo'; }).slice(0, 6), ej = res.filter(function (r) { return r.kind === 'ej'; });
    if (!teo.length && !ej.length) { box.innerHTML = '<p class="sr-empty">No hay nada con «' + esc(input.value.trim()) + '».</p>'; box.hidden = false; return; }
    [['Teoría', teo], ['Ejercicios', ej]].forEach(function (g) {
      if (!g[1].length) return;
      var h = document.createElement('div'); h.className = 'sr-group'; h.textContent = g[0] + (g[0] === 'Ejercicios' ? ' (' + g[1].length + ')' : ''); box.appendChild(h);
      g[1].forEach(function (r) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'sr-item'; b.setAttribute('role', 'option');
        if (r.kind === 'teo') {
          b.innerHTML = '<span class="sr-title">' + esc(r.s.t.title) + (r.s.head ? ' <span class="sr-sub">› ' + esc(r.s.head) + '</span>' : '') + '</span>' +
            (r.snip ? '<span class="sr-snip">' + esc(r.snip) + '</span>' : '');
          b.addEventListener('click', function () { close(); window.JP.teoria.show('teo'); window.JP.teoria.goTopic(r.s.t.id, r.s.n); });
        } else {
          b.innerHTML = '<span class="sr-title">' + esc(r.x.e.title) + ' <span class="lv ' + esc(r.x.e.level) + '">' + esc(r.x.e.level) + '</span></span>' +
            '<span class="sr-snip">' + esc(r.x.e.group) + (r.hit.length ? ' · usa ' + r.hit.map(esc).join(', ') : '') + '</span>';
          b.addEventListener('click', function () { close(); window.JP.teoria.show('ej'); window.JP.goExercise(r.x.e.id); });
        }
        box.appendChild(b); items.push(b);
      });
    });
    box.hidden = false;
  }
  function close() { box.hidden = true; input.value = ''; items = []; sel = -1; input.blur(); }
  function mark(i) {
    if (!items.length) return;
    sel = (i + items.length) % items.length;
    items.forEach(function (b, j) { b.setAttribute('aria-selected', j === sel ? 'true' : 'false'); });
    items[sel].scrollIntoView({ block: 'nearest' });
  }
  input.addEventListener('input', paint);
  input.addEventListener('focus', function () { if (input.value.trim()) paint(); });
  input.addEventListener('keydown', function (ev) {
    if (ev.key === 'ArrowDown') { ev.preventDefault(); mark(sel + 1); }
    else if (ev.key === 'ArrowUp') { ev.preventDefault(); mark(sel - 1); }
    else if (ev.key === 'Enter') { ev.preventDefault(); if (items.length) items[sel < 0 ? 0 : sel].click(); }
    else if (ev.key === 'Escape') { close(); }
  });
  document.addEventListener('click', function (ev) { if (!ev.target.closest('.search')) box.hidden = true; });
})();
