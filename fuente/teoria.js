// Apartado de Teoría: pestañas Ejercicios / Teoría, índice de temas y ejemplos que se pueden ejecutar.
(function () {
  'use strict';
  var KEY = 'jp-teoria';
  var $ = function (id) { return document.getElementById(id); };
  var st = { view: 'ej', topic: TEORIA[0].id };
  try { var saved = JSON.parse(localStorage.getItem(KEY)); if (saved) { st.view = saved.view === 'teo' ? 'teo' : 'ej'; st.collapsed = saved.collapsed || {}; if (TEORIA.some(function (t) { return t.id === saved.topic; })) st.topic = saved.topic; } } catch (e) { }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { } }

  function esc(t) { return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  // `código` y **negrita** dentro de un texto
  function inline(t) { return esc(t).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>'); }
  var KW = /^(while|do|for|if|else|switch|case|default|break|continue|return|new|public|static|void|class|import|yield)$/;
  var TY = /^(int|long|double|boolean|char|String|StringBuilder|Scanner|true|false|null)$/;
  function highlight(src) {
    return src.replace(/\/\/.*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])'|[A-Za-z_]\w*|\d+(?:\.\d+)?|[^"'\/\w]+|[\s\S]/g, function (t) {
      var c = /^\/\//.test(t) ? 'c' : /^["']/.test(t) ? 's' : /^\d/.test(t) ? 'n' : TY.test(t) ? 't' : KW.test(t) ? 'k' : '';
      return c ? '<span class="' + c + '">' + esc(t) + '</span>' : esc(t);
    });
  }

  // ----- ejemplos ejecutables (con Scanner: se para y deja escribir en la consola, como en los ejercicios) -----
  function paint(out, r) {
    var at = 0;
    out.textContent = '';
    (r.echo || []).forEach(function (x) {
      out.appendChild(document.createTextNode(r.output.slice(at, x.at)));
      var sp = document.createElement('span'); sp.className = 'in'; sp.textContent = x.text + '\n'; out.appendChild(sp);
      at = x.at;
    });
    out.appendChild(document.createTextNode(r.output.slice(at)));
  }
  function runExample(box, lines) {
    var src = box.querySelector('textarea') ? box.querySelector('textarea').value : box.dataset.code;
    var out = box.querySelector('.out'), r;
    try { r = MiniJava.run(src, { input: lines, interactive: true }); } catch (e) { r = { ok: false, kind: 'limit', output: '', error: 'Algo ha fallado al ejecutar el ejemplo.' }; }
    out.hidden = false;
    paint(out, r);
    if (r.kind === 'input') {
      var inp = document.createElement('input');
      inp.className = 'stdin'; inp.spellcheck = false; inp.autocomplete = 'off';
      inp.setAttribute('aria-label', 'Escribe tu respuesta y pulsa Enter');
      inp.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') { ev.preventDefault(); runExample(box, lines.concat([inp.value])); } });
      out.appendChild(inp); inp.focus();
      return;
    }
    if (!r.ok) {
      var sp = document.createElement('span'); sp.className = 'e';
      if (r.output && !/\n$/.test(r.output)) out.appendChild(document.createTextNode('\n'));
      sp.textContent = r.kind === 'compile' ? 'Error de compilación (línea ' + r.line + '): ' + r.error
        : r.kind === 'runtime' ? r.error + ' (línea ' + r.line + ')' : r.error;
      out.appendChild(sp);
    } else if (!r.output) out.innerHTML = '<span class="m">(El programa no muestra nada)</span>';
  }
  function example(code) {
    var box = document.createElement('div');
    box.className = 'teo-ex'; box.dataset.code = code;
    box.innerHTML = '<div class="teo-ex-bar"><span>Ejemplo</span><div><button type="button" class="btn-ghost" data-a="edit">Editar</button> ' +
      '<button type="button" class="btn-run" data-a="run"><svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"></polygon></svg>Ejecutar</button></div></div>' +
      '<pre class="teo-code">' + highlight(code) + '</pre><pre class="out" hidden></pre>';
    box.addEventListener('click', function (ev) {
      var b = ev.target.closest('button'); if (!b) return;
      if (b.dataset.a === 'run') runExample(box, []);
      if (b.dataset.a === 'edit') {
        var ta = box.querySelector('textarea');
        if (ta) { // volver al ejemplo original
          box.replaceChild(Object.assign(document.createElement('pre'), { className: 'teo-code', innerHTML: highlight(code) }), ta);
          b.textContent = 'Editar'; box.querySelector('.out').hidden = true;
        } else {
          ta = document.createElement('textarea');
          ta.className = 'teo-code'; ta.value = code; ta.spellcheck = false; ta.setAttribute('aria-label', 'Código del ejemplo');
          ta.rows = code.split('\n').length + 1;
          box.replaceChild(ta, box.querySelector('pre.teo-code'));
          b.textContent = 'Deshacer cambios'; ta.focus();
        }
      }
    });
    return box;
  }

  // ----- pintar un tema -----
  function topic() { return TEORIA.filter(function (t) { return t.id === st.topic; })[0] || TEORIA[0]; }
  function render() {
    var t = topic(), art = $('teoArticle'), i = TEORIA.indexOf(t);
    art.innerHTML = '<div class="crumb"><span>' + esc(t.group) + '</span><span aria-hidden="true">/</span><span>Teoría</span></div>' +
      '<h1 class="title">' + esc(t.title) + '</h1><p class="teo-intro">' + inline(t.intro) + '</p>';
    var nh = 0;
    t.blocks.forEach(function (b) {
      var el;
      if (b.h) { el = document.createElement('h2'); el.textContent = b.h; el.id = 'teo-' + t.id + '-' + (nh++); }
      else if (b.p) { el = document.createElement('p'); el.innerHTML = inline(b.p); }
      else if (b.syntax) { el = document.createElement('div'); el.className = 'teo-syntax'; el.innerHTML = '<div class="label">Sintaxis</div><pre class="teo-code">' + highlight(b.syntax) + '</pre>'; }
      else if (b.code) el = example(b.code);
      else if (b.java) { el = document.createElement('div'); el.className = 'teo-ex'; el.innerHTML = '<div class="teo-ex-bar"><span>Código</span><span class="teo-norun">No se ejecuta aquí</span></div><pre class="teo-code">' + highlight(b.java) + '</pre>'; }
      else if (b.note) { el = document.createElement('div'); el.className = 'teo-note ' + (b.kind || 'tip'); el.innerHTML = '<b>' + (b.kind === 'warn' ? 'Cuidado' : 'Consejo') + '</b> ' + inline(b.note); }
      else if (b.list) { el = document.createElement('ul'); el.innerHTML = b.list.map(function (x) { return '<li>' + inline(x) + '</li>'; }).join(''); }
      else if (b.table) {
        el = document.createElement('div'); el.className = 'teo-table';
        el.innerHTML = '<table><thead><tr>' + b.table[0].map(function (c) { return '<th>' + inline(c) + '</th>'; }).join('') + '</tr></thead><tbody>' +
          b.table.slice(1).map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + inline(c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>';
      } else if (b.practice) {
        el = document.createElement('div'); el.className = 'teo-practice';
        el.innerHTML = '<h2>Practícalo</h2><div class="teo-practice-list"></div>';
        b.practice.forEach(function (id) {
          var e = EXERCISES.filter(function (x) { return x.id === id; })[0]; if (!e) return;
          var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'btn-line';
          btn.innerHTML = esc(e.title) + ' <span class="chip ' + esc(e.level) + '">' + esc(e.level) + '</span>';
          btn.addEventListener('click', function () { show('ej'); window.JP.goExercise(id); });
          el.querySelector('.teo-practice-list').appendChild(btn);
        });
      }
      if (el) art.appendChild(el);
    });
    $('teoPrev').disabled = i === 0; $('teoNext').disabled = i === TEORIA.length - 1;
    $('teoPrev').textContent = i > 0 ? '‹ ' + TEORIA[i - 1].title : 'Anterior';
    $('teoNext').textContent = i < TEORIA.length - 1 ? TEORIA[i + 1].title + ' ›' : 'Siguiente';
    $('teoSelect').value = t.id;
    document.querySelectorAll('#teoSide .ex-btn').forEach(function (b) { b.setAttribute('aria-current', b.dataset.id === t.id ? 'true' : 'false'); if (b.dataset.id === t.id && b.offsetParent) b.scrollIntoView({ block: 'nearest' }); });
  }
  // section: número de apartado (h) al que ir; sin él, al principio del tema
  function goTopic(id, section) {
    st.topic = id;
    var g = topic().group; if (st.collapsed && st.collapsed[g]) { delete st.collapsed[g]; paintGroups(); }
    save(); render();
    var h = section != null && $('teo-' + id + '-' + section);
    if (h) h.scrollIntoView({ block: 'start' });
    else try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) { window.scrollTo(0, 0); }
  }

  // índice: lateral en escritorio y desplegable en el móvil, agrupado como los ejercicios
  var CHEV = '<svg class="chev" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';
  function paintGroups() {
    document.querySelectorAll('#teoSide .group-head').forEach(function (h) {
      var c = !!(st.collapsed && st.collapsed[h.dataset.group]);
      h.setAttribute('aria-expanded', c ? 'false' : 'true');
      $(h.getAttribute('aria-controls')).hidden = c;
    });
  }
  function buildNav() {
    var side = $('teoSide'), sel = $('teoSelect'), last = null, og = null, items = null;
    TEORIA.forEach(function (t, i) {
      if (t.group !== last) {
        var head = document.createElement('button'); head.type = 'button'; head.className = 'group-head'; head.dataset.group = t.group;
        head.setAttribute('aria-controls', 'teo-grp-' + i);
        head.innerHTML = CHEV + '<span class="gname"></span><span class="group-count"></span>';
        head.querySelector('.gname').textContent = t.group;
        head.querySelector('.group-count').textContent = TEORIA.filter(function (x) { return x.group === t.group; }).length;
        head.addEventListener('click', function () {
          st.collapsed = st.collapsed || {};
          if (st.collapsed[t.group]) delete st.collapsed[t.group]; else st.collapsed[t.group] = true;
          save(); paintGroups();
        });
        side.appendChild(head);
        items = document.createElement('div'); items.id = 'teo-grp-' + i; side.appendChild(items);
        og = document.createElement('optgroup'); og.label = t.group; sel.appendChild(og); last = t.group;
      }
      var b = document.createElement('button'); b.type = 'button'; b.className = 'ex-btn'; b.dataset.id = t.id; b.textContent = t.title;
      b.addEventListener('click', function () { goTopic(t.id); });
      items.appendChild(b);
      var o = document.createElement('option'); o.value = t.id; o.textContent = t.title; og.appendChild(o);
    });
    var soon = document.createElement('p'); soon.className = 'teo-soon'; soon.textContent = 'Se irán añadiendo temas según avance el curso.'; side.appendChild(soon);
    sel.addEventListener('change', function () { goTopic(sel.value); });
    paintGroups();
  }

  // ----- pestañas -----
  function show(view) {
    st.view = view; save();
    $('ejView').hidden = view !== 'ej'; $('teoView').hidden = view !== 'teo';
    document.querySelectorAll('.tabs button').forEach(function (b) { b.setAttribute('aria-current', b.dataset.view === view ? 'page' : 'false'); });
  }
  document.querySelectorAll('.tabs button').forEach(function (b) { b.addEventListener('click', function () { show(b.dataset.view); }); });
  $('teoPrev').addEventListener('click', function () { var i = TEORIA.indexOf(topic()); if (i > 0) goTopic(TEORIA[i - 1].id); });
  $('teoNext').addEventListener('click', function () { var i = TEORIA.indexOf(topic()); if (i < TEORIA.length - 1) goTopic(TEORIA[i + 1].id); });
  // en cada ejercicio, un botón a los temas que lo ponen en «Practícalo»
  var BOOK = '<svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"></path><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"></path></svg>';
  function exerciseLinks() {
    var e = window.JP.current(), box = $('exTeoria');
    var topics = TEORIA.filter(function (t) { return t.blocks.some(function (b) { return b.practice && b.practice.indexOf(e.id) >= 0; }); });
    box.innerHTML = '';
    topics.forEach(function (t) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'teo-link';
      b.innerHTML = BOOK + 'Teoría: ' + esc(t.title);
      b.addEventListener('click', function () { show('teo'); goTopic(t.id); });
      box.appendChild(b);
    });
    box.hidden = !topics.length;
  }
  window.JP.onRender(exerciseLinks);
  window.JP.teoria = { show: show, goTopic: goTopic };

  buildNav(); render(); exerciseLinks(); show(st.view);
})();

// Las barras laterales ocupan solo el alto visible: así su scroll llega siempre al final.
(function () {
  function ajustar() {
    document.querySelectorAll('.side').forEach(function (s) {
      if (!s.offsetParent) return;
      var top = Math.max(s.getBoundingClientRect().top, 0);
      s.style.maxHeight = Math.max(window.innerHeight - top - 16, 200) + 'px';
    });
  }
  window.addEventListener('scroll', ajustar, { passive: true });
  window.addEventListener('resize', ajustar);
  document.addEventListener('click', function () { setTimeout(ajustar, 0); });
  ajustar();
})();
