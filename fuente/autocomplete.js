  // ----- sugerencias al escribir: variables y, después de un punto, métodos -----
  (function () {
    var API = MiniJava.api, area = $('codeArea');
    var box = document.createElement('ul');
    box.className = 'ac'; box.id = 'acList'; box.setAttribute('role', 'listbox'); box.hidden = true;
    area.appendChild(box);
    codeEl.setAttribute('aria-autocomplete', 'list'); codeEl.setAttribute('aria-controls', 'acList');
    var items = [], sel = 0, from = 0, suppress = false;

    var TYPES = 'int|long|double|boolean|char|String|StringBuilder';
    // variables declaradas (datos de entrada + tu código), con su tipo
    function declared(text) {
      var vars = {}, m;
      var clean = text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '').replace(/"(?:\\.|[^"\\\n])*"/g, '""').replace(/'(?:\\.|[^'\\\n])'/g, "' '");
      var re = new RegExp('\\b(' + TYPES + ')((?:\\s*\\[\\s*\\])*)\\s+([A-Za-z_$][\\w$]*)', 'g');
      while ((m = re.exec(clean))) {
        var type = m[1] + m[2].replace(/\s/g, '');
        vars[m[3]] = type;
        // int a = 1, b = 2;  → también b
        var rest = clean.slice(re.lastIndex), depth = 0, i = 0, cur = '';
        for (; i < rest.length; i++) {
          var c = rest[i];
          if ('({['.indexOf(c) >= 0) depth++;
          else if (')}]'.indexOf(c) >= 0) { if (!depth) break; depth--; }
          else if ((c === ';' || c === ':') && !depth) break;
          else if (c === ',' && !depth) { var n = /^\s*([A-Za-z_$][\w$]*)/.exec(rest.slice(i + 1)); if (n) vars[n[1]] = type; }
        }
      }
      return vars;
    }
    function sig(params) { return '(' + params.join(', ') + ')'; }
    function fromTable(tbl) {
      var out = [];
      Object.keys(tbl).forEach(function (name) {
        tbl[name].forEach(function (o) { out.push({ name: name, label: name + sig(o[0]), ret: o[1], call: true, args: o[0].length > 0 }); });
      });
      return out;
    }
    var SPECIAL = {
      num2: [['número', 'número'], 'número'], num1: [['número'], 'número'], any1: [['valor'], 'String'],
      arrToString: [['array'], 'String'], sort: [['array'], 'void'], fill: [['array', 'valor'], 'void'],
      arrEquals: [['array', 'array'], 'boolean'], join: [['String', 'String...'], 'String'], format: [['String', 'valores...'], 'String']
    };
    function staticMembers(cls) {
      var out = [], tbl = API.STATIC[cls] || {}, fields = API.STATIC_FIELDS[cls] || {};
      Object.keys(tbl).forEach(function (name) {
        var spec = tbl[name];
        if (spec === 'copyOf') {
          var p = name === 'copyOf' ? ['array', 'int'] : ['array', 'int', 'int'];
          out.push({ name: name, label: name + sig(p), ret: 'array', call: true, args: true });
        } else if (typeof spec === 'string') {
          var sp = SPECIAL[spec];
          out.push({ name: name, label: name + sig(sp[0]), ret: sp[1], call: true, args: true });
        } else spec.forEach(function (o) { out.push({ name: name, label: name + sig(o[0]), ret: o[1], call: true, args: o[0].length > 0 }); });
      });
      Object.keys(fields).forEach(function (f) { out.push({ name: f, label: f, ret: fields[f], call: false }); });
      return out;
    }
    function membersOf(target, vars) {
      if (target === 'System') return [{ name: 'out', label: 'out', ret: 'PrintStream', call: false }];
      if (target === 'System.out') return [
        { name: 'println', label: 'println(valor)', ret: 'void', call: true, args: true },
        { name: 'print', label: 'print(valor)', ret: 'void', call: true, args: true },
        { name: 'printf', label: 'printf(String, valores...)', ret: 'void', call: true, args: true }];
      var t = vars[target];
      if (t === 'String') return fromTable(API.STRING_METHODS);
      if (t === 'StringBuilder') return fromTable(API.SB_METHODS);
      if (t && /\[\]$/.test(t)) return [{ name: 'length', label: 'length', ret: 'int', call: false }];
      if (!t && (API.STATIC[target] || API.STATIC_FIELDS[target])) return staticMembers(target);
      return [];
    }

    function close() { box.hidden = true; items = []; codeEl.setAttribute('aria-expanded', 'false'); codeEl.removeAttribute('aria-activedescendant'); }
    function paint() {
      box.textContent = '';
      items.forEach(function (it, i) {
        var li = document.createElement('li');
        li.id = 'ac' + i; li.setAttribute('role', 'option'); li.setAttribute('aria-selected', String(i === sel));
        var a = document.createElement('span'); a.textContent = it.label; li.appendChild(a);
        if (it.ret) { var b = document.createElement('small'); b.textContent = it.ret; li.appendChild(b); }
        li.addEventListener('mousedown', function (ev) { ev.preventDefault(); sel = i; accept(); });
        box.appendChild(li);
      });
      codeEl.setAttribute('aria-activedescendant', 'ac' + sel);
      var on = box.children[sel]; if (on && on.scrollIntoView) on.scrollIntoView({ block: 'nearest' });
    }
    var charW = 0;
    function place() {
      if (!charW) { var probe = document.createElement('span'); probe.textContent = 'MMMMMMMMMM'; var pcs = getComputedStyle(codeEl); probe.style.cssText = 'position:absolute;visibility:hidden;white-space:pre'; probe.style.fontFamily = pcs.fontFamily; probe.style.fontSize = pcs.fontSize; probe.style.fontVariantLigatures = 'none'; document.body.appendChild(probe); charW = probe.getBoundingClientRect().width / 10; probe.remove(); }
      var cs = getComputedStyle(codeEl), lh = parseFloat(cs.lineHeight);
      var before = codeEl.value.slice(0, from), line = before.split('\n').length - 1;
      var col = before.slice(before.lastIndexOf('\n') + 1).replace(/\t/g, '    ').length;
      var left = codeEl.offsetLeft + parseFloat(cs.paddingLeft) + col * charW - codeEl.scrollLeft;
      var top = codeEl.offsetTop + parseFloat(cs.paddingTop) + (line + 1) * lh - codeEl.scrollTop + 2;
      box.style.left = Math.max(4, Math.min(left, area.clientWidth - 234)) + 'px';
      box.style.top = top + 'px';
    }
    function update() {
      var pos = codeEl.selectionStart;
      if (pos !== codeEl.selectionEnd) return close();
      var v = codeEl.value, line = v.slice(v.lastIndexOf('\n', pos - 1) + 1, pos);
      // no sugerir dentro de textos o comentarios
      var bare = line.replace(/"(?:\\.|[^"\\])*"/g, '""').replace(/'(?:\\.|[^'\\])'/g, "''");
      if (/"|\/\//.test(bare.replace(/""|''/g, ''))) return close();
      var vars = declared((hasInput(ex()) ? ex().input + '\n' : '') + v), list = [], prefix, m;
      if ((m = /((?:[A-Za-z_$][\w$]*\.)*[A-Za-z_$][\w$]*)\.([A-Za-z_$][\w$]*)?$/.exec(line))) {
        prefix = m[2] || '';
        list = membersOf(m[1], vars).filter(function (it) { return it.name.toLowerCase().indexOf(prefix.toLowerCase()) === 0; })
          .sort(function (x, y) { return x.name < y.name ? -1 : x.name > y.name ? 1 : x.label.length - y.label.length; });
      } else if ((m = /(^|[^\w$.])([A-Za-z_$][\w$]*)$/.exec(line))) {
        prefix = m[2];
        if (prefix.length < 2) return close();
        // si estás escribiendo el nombre de una variable nueva (int con...), no hay nada que sugerir
        if (new RegExp('\\b(' + TYPES + ')(\\s*\\[\\s*\\])*\\s+$').test(line.slice(0, line.length - prefix.length))) return close();
        list = Object.keys(vars).filter(function (n) { return n !== prefix && n.toLowerCase().indexOf(prefix.toLowerCase()) === 0; })
          .sort().map(function (n) { return { name: n, label: n, ret: vars[n], call: false }; });
      } else return close();
      if (!list.length || (list.length === 1 && list[0].name === prefix && !list[0].call)) return close();
      items = list.slice(0, 40); sel = 0; from = pos - prefix.length;
      box.hidden = false; codeEl.setAttribute('aria-expanded', 'true');
      paint(); place();
    }
    function accept() {
      var it = items[sel], pos = codeEl.selectionStart;
      if (!it) return close();
      var text = it.name + (it.call ? '()' : ''), caret = from + it.name.length + (it.call ? (it.args ? 1 : 2) : 0);
      // si ya hay paréntesis justo después, no se duplican
      if (it.call && codeEl.value.charAt(pos) === '(') { text = it.name; caret = from + it.name.length + 1; }
      suppress = true;
      insertText(text, from, pos);
      codeEl.setSelectionRange(caret, caret);
      suppress = false;
      close();
    }
    codeEl.addEventListener('input', function () { if (!suppress) update(); });
    codeEl.addEventListener('blur', close);
    codeEl.addEventListener('click', close);
    codeEl.addEventListener('scroll', function () { if (!box.hidden) place(); });
    // va antes que el resto de atajos del editor (Tab, Enter, Esc)
    area.addEventListener('keydown', function (ev) {
      if (box.hidden || ev.target !== codeEl) return;
      var k = ev.key, n = items.length;
      if (k === 'ArrowDown' || k === 'ArrowUp') { ev.preventDefault(); ev.stopPropagation(); sel = (sel + (k === 'ArrowDown' ? 1 : n - 1)) % n; paint(); return; }
      if ((k === 'Tab' && !ev.shiftKey) || (k === 'Enter' && !ev.ctrlKey && !ev.metaKey && !ev.shiftKey)) { ev.preventDefault(); ev.stopPropagation(); accept(); return; }
      if (k === 'Escape') { ev.preventDefault(); ev.stopPropagation(); close(); return; }
      if (k === 'ArrowLeft' || k === 'ArrowRight' || k === 'Home' || k === 'End' || k === 'PageUp' || k === 'PageDown') close();
    }, true);
    hooks.render.push(close);
  })();
