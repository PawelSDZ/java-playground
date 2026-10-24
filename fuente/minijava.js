/* MiniJava: intérprete de un subconjunto de Java para el playground.
   Soporta: int, long, double, boolean, char, String; operadores; if/else; while; do-while; for;
   break/continue; switch (clásico, con flechas y como expresión); métodos de String (también con
   expresiones regulares: replaceAll, replaceFirst, matches, split); StringBuilder; Math, Integer,
   Double, Character, String.valueOf;
   System.out.println/print/printf y String.format. */
var MiniJava = (function () {
  'use strict';

  // ---------- errores ----------
  function CompileError(msg, line) { this.kind = 'compile'; this.message = msg; this.line = line; }
  function JavaException(cls, msg, line) { this.kind = 'runtime'; this.cls = cls; this.message = msg; this.line = line; }
  function Limit(msg) { this.kind = 'limit'; this.message = msg; }
  function cerr(msg, line) { throw new CompileError(msg, line); }

  // ---------- lexer ----------
  var KEYWORDS = ['int', 'long', 'double', 'boolean', 'char', 'float', 'byte', 'short', 'void', 'if', 'else', 'while',
    'for', 'do', 'break', 'continue', 'return', 'true', 'false', 'null', 'final', 'new', 'class', 'public', 'private',
    'protected', 'static', 'switch', 'case', 'default', 'var', 'import', 'package', 'instanceof', 'try', 'catch'];
  var OPS = ['>>>=', '<<=', '>>=', '>>>', '...', '==', '!=', '<=', '>=', '&&', '||', '++', '--', '+=', '-=', '*=', '/=', '%=',
    '&=', '|=', '^=', '<<', '>>', '->', '::', '+', '-', '*', '/', '%', '=', '<', '>', '!', '~', '?', ':', ';', ',', '.',
    '(', ')', '{', '}', '[', ']', '&', '|', '^', '@'];

  function lex(src) {
    var toks = [], i = 0, line = 1, n = src.length;
    function readEscape() {
      var c = src[i + 1];
      var map = { n: '\n', t: '\t', r: '\r', b: '\b', f: '\f', '0': '\0', s: ' ', '\\': '\\', "'": "'", '"': '"' };
      if (c === 'u') {
        var hex = src.substr(i + 2, 4);
        if (!/^[0-9a-fA-F]{4}$/.test(hex)) cerr('illegal unicode escape', line);
        i += 6; return String.fromCharCode(parseInt(hex, 16));
      }
      if (!(c in map)) cerr('illegal escape character in string literal', line);
      i += 2; return map[c];
    }
    while (i < n) {
      var ch = src[i];
      if (ch === '\n') { line++; i++; continue; }
      if (/\s/.test(ch)) { i++; continue; }
      if (ch === '/' && src[i + 1] === '/') { while (i < n && src[i] !== '\n') i++; continue; }
      if (ch === '/' && src[i + 1] === '*') {
        var end = src.indexOf('*/', i + 2);
        if (end < 0) cerr('unclosed comment', line);
        for (var k = i; k < end; k++) if (src[k] === '\n') line++;
        i = end + 2; continue;
      }
      if (ch === '"') {
        if (src.substr(i, 3) === '"""') cerr('Los bloques de texto (""") no están soportados en este playground', line);
        var s = '', startLine = line; i++;
        while (true) {
          if (i >= n || src[i] === '\n') cerr('unclosed string literal', startLine);
          if (src[i] === '"') { i++; break; }
          if (src[i] === '\\') s += readEscape(); else s += src[i++];
        }
        toks.push({ k: 'str', v: s, line: startLine }); continue;
      }
      if (ch === "'") {
        i++; var c2;
        if (src[i] === "'") cerr('empty character literal', line);
        if (src[i] === '\\') c2 = readEscape(); else c2 = src[i++];
        if (src[i] !== "'") cerr('unclosed character literal', line);
        i++; toks.push({ k: 'char', v: c2.charCodeAt(0), line: line }); continue;
      }
      if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(src[i + 1] || ''))) {
        var m = /^(0[xX][0-9a-fA-F_]+[lL]?|(?:[0-9][0-9_]*)?\.?[0-9_]*(?:[eE][+-]?[0-9]+)?[lLdDfF]?)/.exec(src.slice(i));
        var raw = m[0]; i += raw.length;
        var clean = raw.replace(/_/g, '');
        var tok;
        if (/^0[xX]/.test(clean)) {
          var isL = /[lL]$/.test(clean);
          tok = { k: 'num', t: isL ? 'long' : 'int', v: parseInt(clean.replace(/[lL]$/, ''), 16), raw: raw };
        } else if (/[fF]$/.test(clean)) {
          cerr('El tipo float no está soportado en este playground: usa double', line);
        } else if (/[lL]$/.test(clean)) {
          tok = { k: 'num', t: 'long', v: parseInt(clean.slice(0, -1), 10), raw: raw };
        } else if (/[.eEdD]/.test(clean)) {
          tok = { k: 'num', t: 'double', v: parseFloat(clean.replace(/[dD]$/, '')), raw: raw };
        } else {
          if (clean.length > 1 && clean[0] === '0') cerr('Los números que empiezan por 0 (octales) no están soportados', line);
          tok = { k: 'num', t: 'int', v: Number(clean), raw: raw };
        }
        tok.line = line; toks.push(tok); continue;
      }
      if (/[\p{L}_$]/u.test(ch)) {
        var id = /^[\p{L}_$][\p{L}\p{N}_$]*/u.exec(src.slice(i))[0]; i += id.length;
        toks.push({ k: KEYWORDS.indexOf(id) >= 0 ? 'kw' : 'id', v: id, line: line }); continue;
      }
      var op = null;
      for (var j = 0; j < OPS.length; j++) if (src.substr(i, OPS[j].length) === OPS[j]) { op = OPS[j]; break; }
      if (!op) cerr("illegal character: '" + ch + "'", line);
      i += op.length; toks.push({ k: 'op', v: op, line: line });
    }
    toks.push({ k: 'eof', v: '<EOF>', line: line });
    return toks;
  }

  // ---------- parser ----------
  var PRIMS = ['int', 'long', 'double', 'boolean', 'char'];
  function Parser(toks) { this.t = toks; this.p = 0; }
  Parser.prototype = {
    peek: function (o) { return this.t[this.p + (o || 0)]; },
    next: function () { return this.t[this.p++]; },
    is: function (v, o) { var t = this.peek(o); return (t.k === 'op' || t.k === 'kw') && t.v === v; },
    accept: function (v) { if (this.is(v)) { this.p++; return true; } return false; },
    expect: function (v) {
      var t = this.peek();
      if (!this.is(v)) {
        var where = t.k === 'eof' ? 'reached end of file while parsing' : "'" + v + "' expected";
        cerr(where, t.k === 'eof' ? t.line : (v === ';' ? this.prevLine() : t.line));
      }
      return this.next();
    },
    prevLine: function () { return this.p > 0 ? this.t[this.p - 1].line : 1; },

    program: function () {
      // ¿programa completo con clase o solo instrucciones?
      while (this.is('import') || this.is('package')) { while (!this.is(';') && this.peek().k !== 'eof') this.next(); this.expect(';'); }
      var save = this.p, hasClass = false;
      for (var i = this.p; i < this.t.length; i++) { if (this.t[i].k === 'kw' && this.t[i].v === 'class') { hasClass = true; break; } }
      if (!hasClass) { var body = []; while (this.peek().k !== 'eof') body.push(this.statement()); return { k: 'Block', body: body, line: 1 }; }
      this.p = save;
      while (this.is('public') || this.is('final')) this.next();
      this.expect('class');
      if (this.peek().k !== 'id') cerr('<identifier> expected', this.peek().line);
      this.next(); this.expect('{');
      var main = null;
      while (!this.is('}')) {
        if (this.peek().k === 'eof') cerr('reached end of file while parsing', this.peek().line);
        var start = this.peek();
        while (this.is('public') || this.is('static') || this.is('private') || this.is('final')) this.next();
        if (this.is('void') && this.peek(1).v === 'main') {
          this.next(); this.next(); this.expect('(');
          while (!this.is(')')) { if (this.peek().k === 'eof') cerr("')' expected", this.peek().line); this.next(); }
          this.expect(')');
          if (this.peek().k !== 'op' || this.peek().v !== '{') cerr("'{' expected", this.peek().line);
          main = this.block();
        } else {
          cerr('En este playground solo se admite el método main (aún no hemos visto otros métodos ni atributos)', start.line);
        }
      }
      this.expect('}');
      if (this.peek().k !== 'eof') cerr('class, interface, enum, or record expected', this.peek().line);
      if (!main) cerr('No se ha encontrado el método main', 1);
      return main;
    },
    block: function () {
      var line = this.expect('{').line, body = [];
      while (!this.is('}')) {
        if (this.peek().k === 'eof') cerr('reached end of file while parsing', this.peek().line);
        body.push(this.statement());
      }
      this.expect('}');
      return { k: 'Block', body: body, line: line };
    },
    isTypeStart: function () {
      var t = this.peek();
      if (t.k === 'kw' && PRIMS.indexOf(t.v) >= 0) return true;
      if (t.k === 'kw' && (t.v === 'float' || t.v === 'byte' || t.v === 'short' || t.v === 'var')) return true;
      if (t.k === 'id' && t.v === 'String' && (this.peek(1).k === 'id' || (this.peek(1).v === '[' && this.peek(2).v === ']'))) return true;
      if (t.k === 'id' && /^[A-Z]/.test(t.v) && this.peek(1).k === 'id') return true;
      if (t.k === 'kw' && PRIMS.indexOf(t.v) >= 0) return true;
      return false;
    },
    type: function () {
      var t = this.next();
      if (t.v === 'float') cerr('El tipo float no está soportado en este playground: usa double', t.line);
      if (t.v === 'byte' || t.v === 'short') cerr('El tipo ' + t.v + ' no está soportado en este playground: usa int', t.line);
      if (t.v === 'var') cerr('var no está soportado en este playground: escribe el tipo (int, String...)', t.line);
      if (t.k === 'id' && t.v === 'Scanner') cerr('Leer datos del teclado (Scanner) no está soportado en este playground: los datos de entrada ya vienen en variables', t.line);
      if (t.k === 'id' && t.v !== 'String' && t.v !== 'StringBuilder') cerr('cannot find symbol\n  símbolo: class ' + t.v + '\n(este playground solo admite int, long, double, boolean, char, String y StringBuilder)', t.line);
      var ty = t.v;
      while (this.is('[') && this.is(']', 1)) { this.next(); this.next(); ty += '[]'; }
      if (this.is('[')) cerr("']' expected", t.line);
      return ty;
    },
    statement: function () {
      var t = this.peek();
      if (this.is('{')) return this.block();
      if (this.is(';')) { this.next(); return { k: 'Empty', line: t.line }; }
      if (this.is('if')) {
        this.next(); this.expect('('); var c = this.expr(); this.expect(')');
        var th = this.statement(), el = null;
        if (this.accept('else')) el = this.statement();
        return { k: 'If', cond: c, then: th, els: el, line: t.line };
      }
      if (this.is('while')) {
        this.next(); this.expect('('); var c2 = this.expr(); this.expect(')');
        return { k: 'While', cond: c2, body: this.statement(), line: t.line };
      }
      if (this.is('do')) {
        this.next(); var b = this.statement(); this.expect('while'); this.expect('(');
        var c3 = this.expr(); this.expect(')'); this.expect(';');
        return { k: 'DoWhile', cond: c3, body: b, line: t.line };
      }
      if (this.is('for')) {
        this.next(); this.expect('(');
        var init = [], cond = null, upd = [];
        if (!this.is(';')) {
          if (this.peek().k === 'id' && this.is(':', 1)) cerr('Falta el tipo de la variable del for-each (por ejemplo: for (String nombre : nombres))', t.line);
          if (this.isTypeStart() || this.is('final')) {
            var save = this.p; this.accept('final');
            var fty = this.type(), fnm = this.peek();
            if (fnm.k === 'id' && this.is(':', 1)) {
              this.next(); this.next();
              var iter = this.expr(); this.expect(')');
              return { k: 'ForEach', type: fty, name: fnm.v, iter: iter, body: this.statement(), line: t.line };
            }
            this.p = save; init.push(this.varDecl(false));
          }
          else { init.push(this.exprStmtExpr()); while (this.accept(',')) init.push(this.exprStmtExpr()); }
        }
        this.expect(';');
        if (!this.is(';')) cond = this.expr();
        this.expect(';');
        if (!this.is(')')) { upd.push(this.exprStmtExpr()); while (this.accept(',')) upd.push(this.exprStmtExpr()); }
        this.expect(')');
        return { k: 'For', init: init, cond: cond, upd: upd, body: this.statement(), line: t.line };
      }
      if (this.is('break')) { this.next(); this.expect(';'); return { k: 'Break', line: t.line }; }
      if (this.is('continue')) { this.next(); this.expect(';'); return { k: 'Continue', line: t.line }; }
      if (this.is('return')) {
        this.next();
        if (!this.is(';')) cerr('incompatible types: unexpected return value', t.line);
        this.expect(';'); return { k: 'Return', line: t.line };
      }
      if (this.is('switch')) return this.switchNode(false);
      if (t.k === 'id' && t.v === 'yield' && !this.is('=', 1) && !this.is('.', 1) && !this.is('[', 1) && !this.is('++', 1) && !this.is('--', 1)) {
        this.next(); var yv = this.expr(); this.expect(';');
        return { k: 'Yield', e: yv, line: t.line };
      }
      if (this.is('try')) cerr('try/catch no está soportado en este playground', t.line);
      if (this.is('else')) cerr("'else' without 'if'", t.line);
      if (this.isTypeStart() || this.is('final')) { var d = this.varDecl(true); return d; }
      var e = this.exprStmtExpr();
      this.expect(';');
      return { k: 'ExprStmt', expr: e, line: t.line };
    },
    switchNode: function (isExpr) {
      var line = this.expect('switch').line;
      this.expect('('); var sel = this.expr(); this.expect(')');
      this.expect('{');
      var cases = [], arrow = null;
      while (!this.is('}')) {
        var ct = this.peek();
        if (ct.k === 'eof') cerr('reached end of file while parsing', ct.line);
        var labels = [], isDefault = false;
        if (this.accept('default')) isDefault = true;
        else if (this.accept('case')) {
          do {
            if (this.is('default')) { this.next(); isDefault = true; }
            else labels.push(this.ternary());
          } while (this.accept(','));
        } else cerr("case, default, or '}' expected", ct.line);
        var isArrow;
        if (this.accept('->')) isArrow = true;
        else { this.expect(':'); isArrow = false; }
        if (arrow === null) arrow = isArrow;
        else if (arrow !== isArrow) cerr('different case kinds used in the switch\n(no mezcles case con : y case con -> en el mismo switch)', ct.line);
        var body = [];
        if (isArrow) {
          if (this.is('{')) body.push(this.block());
          else if (isExpr) { var be = this.expr(); this.expect(';'); body.push({ k: 'ArrowExpr', e: be, line: be.line }); }
          else { var es = this.exprStmtExpr(); this.expect(';'); body.push({ k: 'ExprStmt', expr: es, line: es.line }); }
        } else {
          while (!this.is('case') && !this.is('default') && !this.is('}')) {
            if (this.peek().k === 'eof') cerr('reached end of file while parsing', this.peek().line);
            body.push(this.statement());
          }
        }
        cases.push({ labels: labels, isDefault: isDefault, body: body, line: ct.line });
      }
      this.expect('}');
      return { k: isExpr ? 'SwitchExpr' : 'Switch', sel: sel, cases: cases, arrow: !!arrow, line: line };
    },
    exprStmtExpr: function () {
      var e = this.expr();
      if (['Assign', 'IncDec', 'Call'].indexOf(e.k) < 0) cerr('not a statement', e.line);
      return e;
    },
    varDecl: function (needSemi) {
      var line = this.peek().line, isFinal = false;
      if (this.accept('final')) isFinal = true;
      var ty = this.type(), decls = [];
      do {
        var nt = this.next();
        if (nt.k !== 'id') cerr(nt.k === 'kw' ? "'" + nt.v + "' es una palabra reservada y no se puede usar como nombre de variable" : '<identifier> expected', nt.line);
        var dty = ty;
        while (this.is('[') && this.is(']', 1)) { this.next(); this.next(); dty += '[]'; }
        var init = null;
        if (this.accept('=')) init = this.is('{') ? this.arrayLit() : this.expr();
        decls.push({ name: nt.v, init: init, line: nt.line, type: dty });
      } while (this.accept(','));
      if (needSemi) this.expect(';');
      return { k: 'VarDecl', type: ty, decls: decls, final: isFinal, line: line };
    },

    arrayLit: function () {
      var line = this.expect('{').line, elems = [];
      if (!this.is('}')) {
        do {
          if (this.is('}')) break;
          elems.push(this.is('{') ? this.arrayLit() : this.expr());
        } while (this.accept(','));
      }
      this.expect('}');
      return { k: 'ArrayLit', elems: elems, line: line };
    },
    expr: function () { return this.assign(); },
    assign: function () {
      var left = this.ternary();
      var t = this.peek();
      if (t.k === 'op' && ['=', '+=', '-=', '*=', '/=', '%='].indexOf(t.v) >= 0) {
        this.next();
        if (left.k !== 'Name' && left.k !== 'Index') cerr('unexpected type\n  required: variable\n  found:    value', t.line);
        var right = this.assign();
        return { k: 'Assign', op: t.v, target: left, value: right, line: t.line };
      }
      if (t.k === 'op' && ['&=', '|=', '^=', '<<=', '>>=', '>>>='].indexOf(t.v) >= 0) cerr('El operador ' + t.v + ' no está soportado en este playground', t.line);
      return left;
    },
    ternary: function () {
      var c = this.bin(0);
      if (this.is('?')) {
        var line = this.next().line; var a = this.ternary(); this.expect(':'); var b = this.ternary();
        return { k: 'Cond', cond: c, a: a, b: b, line: line };
      }
      return c;
    },
    bin: function (lvl) {
      var LV = [['||'], ['&&'], ['|'], ['^'], ['&'], ['==', '!='], ['<', '>', '<=', '>=', 'instanceof'], ['<<', '>>', '>>>'], ['+', '-'], ['*', '/', '%']];
      if (lvl >= LV.length) return this.unary();
      var left = this.bin(lvl + 1);
      while (true) {
        var t = this.peek();
        if ((t.k === 'op' || t.k === 'kw') && LV[lvl].indexOf(t.v) >= 0) {
          if (['|', '^', '&', '<<', '>>', '>>>', 'instanceof'].indexOf(t.v) >= 0) cerr('El operador ' + t.v + ' no está soportado en este playground' + (t.v === '&' ? ' (¿querías usar &&?)' : t.v === '|' ? ' (¿querías usar ||?)' : ''), t.line);
          this.next();
          var right = this.bin(lvl + 1);
          left = { k: 'Bin', op: t.v, a: left, b: right, line: t.line };
        } else return left;
      }
    },
    unary: function () {
      var t = this.peek();
      if (t.k === 'op' && (t.v === '++' || t.v === '--')) {
        this.next(); var target = this.unary();
        if (target.k !== 'Name' && target.k !== 'Index') cerr('unexpected type\n  required: variable\n  found:    value', t.line);
        return { k: 'IncDec', op: t.v, prefix: true, target: target, line: t.line };
      }
      if (t.k === 'op' && (t.v === '-' || t.v === '+' || t.v === '!')) {
        this.next(); var e = this.unary();
        return { k: 'Unary', op: t.v, e: e, line: t.line };
      }
      if (t.k === 'op' && t.v === '~') cerr('El operador ~ no está soportado en este playground', t.line);
      // cast
      if (t.k === 'op' && t.v === '(') {
        var n1 = this.peek(1), n2 = this.peek(2);
        if (((n1.k === 'kw' && (PRIMS.indexOf(n1.v) >= 0 || n1.v === 'float' || n1.v === 'byte' || n1.v === 'short')) || (n1.k === 'id' && n1.v === 'String')) && n2.v === ')') {
          if (n1.v === 'float' || n1.v === 'byte' || n1.v === 'short') cerr('El tipo ' + n1.v + ' no está soportado en este playground', t.line);
          this.next(); this.next(); this.next();
          var ce = this.unary();
          return { k: 'Cast', to: n1.v, e: ce, line: t.line };
        }
      }
      return this.postfix();
    },
    postfix: function () {
      var e = this.primary();
      while (true) {
        var t = this.peek();
        if (this.is('.')) {
          this.next(); var nm = this.next();
          if (nm.k !== 'id') cerr('<identifier> expected', nm.line);
          if (this.is('(')) {
            this.next(); var args = [];
            if (!this.is(')')) { args.push(this.expr()); while (this.accept(',')) args.push(this.expr()); }
            this.expect(')');
            e = { k: 'Call', target: e, name: nm.v, args: args, line: nm.line };
          } else e = { k: 'Field', target: e, name: nm.v, line: nm.line };
        } else if (this.is('(') && e.k === 'Name') {
          cerr('cannot find symbol\n  símbolo: method ' + e.name + '\n(en este playground solo puedes llamar a métodos de clases como String o Math)', t.line);
        } else if (this.is('[')) {
          this.next(); var idx = this.expr(); this.expect(']');
          e = { k: 'Index', arr: e, idx: idx, line: t.line };
        } else if (t.k === 'op' && (t.v === '++' || t.v === '--')) {
          if (e.k !== 'Name' && e.k !== 'Index') cerr('unexpected type\n  required: variable\n  found:    value', t.line);
          this.next(); e = { k: 'IncDec', op: t.v, prefix: false, target: e, line: t.line };
        } else return e;
      }
    },
    primary: function () {
      var t = this.next();
      if (t.k === 'num') {
        if (t.t === 'int' && t.v > 2147483648) cerr('integer number too large', t.line);
        if (t.t === 'int' && t.v === 2147483648) return { k: 'Lit', type: 'int', v: t.v, big: true, line: t.line };
        return { k: 'Lit', type: t.t, v: t.v, line: t.line };
      }
      if (t.k === 'str') return { k: 'Lit', type: 'String', v: t.v, line: t.line };
      if (t.k === 'char') return { k: 'Lit', type: 'char', v: t.v, line: t.line };
      if (t.k === 'kw' && (t.v === 'true' || t.v === 'false')) return { k: 'Lit', type: 'boolean', v: t.v === 'true', line: t.line };
      if (t.k === 'kw' && t.v === 'null') return { k: 'Lit', type: 'null', v: null, line: t.line };
      if (t.k === 'id') return { k: 'Name', name: t.v, line: t.line };
      if (t.k === 'op' && t.v === '(') { var e = this.expr(); this.expect(')'); return { k: 'Paren', e: e, line: t.line }; }
      if (t.k === 'kw' && t.v === 'switch') { this.p--; return this.switchNode(true); }
      if (t.k === 'kw' && t.v === 'new') {
        var bt = this.next();
        if (bt.k === 'id' && (bt.v === 'StringBuilder' || bt.v === 'String') && this.is('(')) {
          this.next(); var cargs = [];
          if (!this.is(')')) { cargs.push(this.expr()); while (this.accept(',')) cargs.push(this.expr()); }
          this.expect(')');
          return { k: 'NewObj', cls: bt.v, args: cargs, line: t.line };
        }
        if (!((bt.k === 'kw' && PRIMS.indexOf(bt.v) >= 0) || (bt.k === 'id' && bt.v === 'String'))) {
          if (bt.k === 'id' && bt.v === 'Scanner') cerr('Leer datos del teclado (Scanner) no está soportado en este playground: los datos de entrada ya vienen en variables', bt.line);
          cerr('En este playground, new solo se puede usar para crear arrays (por ejemplo: new int[5]), un StringBuilder o un String', bt.line);
        }
        if (!this.is('[')) cerr("'[' expected (en este playground new solo crea arrays)", bt.line);
        var dims = [], extra = 0;
        while (this.is('[')) {
          this.next();
          if (this.is(']')) { this.next(); extra++; }
          else { if (extra) cerr("']' expected", bt.line); dims.push(this.expr()); this.expect(']'); }
        }
        var ntype = bt.v; for (var q = 0; q < dims.length + extra; q++) ntype += '[]';
        var ninit = null;
        if (this.is('{')) { if (dims.length) cerr('array creation with both dimension expression and initialization is illegal', bt.line); ninit = this.arrayLit(); }
        else if (!dims.length) cerr('array dimension missing', bt.line);
        return { k: 'NewArray', type: ntype, dims: dims, init: ninit, line: t.line };
      }
      if (t.k === 'eof') cerr('reached end of file while parsing', t.line);
      if (t.k === 'kw' && PRIMS.indexOf(t.v) >= 0) cerr("'.class' expected (¿has declarado una variable en un sitio donde no se puede?)", t.line);
      cerr('illegal start of expression', t.line);
    }
  };

  // ---------- comprobación de tipos (como hace javac antes de ejecutar) ----------
  var NUM = { char: 1, int: 2, long: 3, double: 4 };
  function own(o, k) { return Object.prototype.hasOwnProperty.call(o, k); }
  function isNum(t) { return own(NUM, t); }
  function isArr(t) { return typeof t === 'string' && t.slice(-2) === '[]'; }
  function elemT(t) { return t.slice(0, -2); }
  function isRef(t) { return t === 'String' || t === 'StringBuilder' || t === 'null' || isArr(t); }
  function promote(a, b) {
    if (a === 'double' || b === 'double') return 'double';
    if (a === 'long' || b === 'long') return 'long';
    return 'int';
  }
  function unaryPromote(t) { return t === 'char' ? 'int' : t; }
  function isConst(n) {
    if (n.k === 'Lit') return n.type !== 'null';
    if (n.k === 'Paren') return isConst(n.e);
    if (n.k === 'Unary') return isConst(n.e);
    if (n.k === 'Bin') return isConst(n.a) && isConst(n.b);
    if (n.k === 'Cast') return isConst(n.e);
    return false;
  }
  function assignable(to, from, node) {
    if (to === from) return true;
    if ((to === 'String' || to === 'StringBuilder' || isArr(to)) && from === 'null') return true;
    if (isNum(to) && isNum(from)) {
      if (NUM[from] <= NUM[to] && !(to === 'char')) return true;
      if (to === 'char' && from === 'int' && isConst(node)) {
        try { var v = constValue(node); if (v >= 0 && v <= 65535) return true; } catch (e) { }
      }
      if (to === 'char' && from === 'char') return true;
    }
    return false;
  }
  function constValue(n) {
    // evaluación simple de una constante entera para la conversión a char
    var r = evalExpr(n, { lookup: function () { throw 1; } });
    return r;
  }
  function needAssignable(to, from, node, line) {
    if (from === 'void') cerr("'void' type not allowed here", line);
    if (!assignable(to, from, node)) {
      if (isNum(to) && isNum(from)) cerr('incompatible types: possible lossy conversion from ' + from + ' to ' + to, line);
      cerr('incompatible types: ' + (from === 'null' ? '<null>' : from) + ' cannot be converted to ' + to, line);
    }
  }

  var STRING_METHODS = {
    length: [[[], 'int']],
    charAt: [[['int'], 'char']],
    substring: [[['int'], 'String'], [['int', 'int'], 'String']],
    indexOf: [[['String'], 'int'], [['char'], 'int'], [['String', 'int'], 'int'], [['char', 'int'], 'int']],
    lastIndexOf: [[['String'], 'int'], [['char'], 'int'], [['String', 'int'], 'int'], [['char', 'int'], 'int']],
    contains: [[['String'], 'boolean']],
    startsWith: [[['String'], 'boolean'], [['String', 'int'], 'boolean']],
    endsWith: [[['String'], 'boolean']],
    equals: [[['Object'], 'boolean']],
    equalsIgnoreCase: [[['String'], 'boolean']],
    compareTo: [[['String'], 'int']],
    compareToIgnoreCase: [[['String'], 'int']],
    isEmpty: [[[], 'boolean']],
    isBlank: [[[], 'boolean']],
    trim: [[[], 'String']],
    strip: [[[], 'String']],
    stripLeading: [[[], 'String']],
    stripTrailing: [[[], 'String']],
    toUpperCase: [[[], 'String']],
    toLowerCase: [[[], 'String']],
    toCharArray: [[[], 'char[]']],
    toString: [[[], 'String']],
    replace: [[['char', 'char'], 'String'], [['String', 'String'], 'String']],
    concat: [[['String'], 'String']],
    repeat: [[['int'], 'String']],
    replaceAll: [[['String', 'String'], 'String']],
    replaceFirst: [[['String', 'String'], 'String']],
    matches: [[['String'], 'boolean']],
    split: [[['String'], 'String[]'], [['String', 'int'], 'String[]']]
  };
  var SB_METHODS = {
    append: [[['Object'], 'StringBuilder']],
    insert: [[['int', 'Object'], 'StringBuilder']],
    reverse: [[[], 'StringBuilder']],
    toString: [[[], 'String']],
    length: [[[], 'int']],
    charAt: [[['int'], 'char']],
    setCharAt: [[['int', 'char'], 'void']],
    deleteCharAt: [[['int'], 'StringBuilder']],
    delete: [[['int', 'int'], 'StringBuilder']],
    replace: [[['int', 'int', 'String'], 'StringBuilder']],
    indexOf: [[['String'], 'int'], [['String', 'int'], 'int']],
    lastIndexOf: [[['String'], 'int'], [['String', 'int'], 'int']],
    substring: [[['int'], 'String'], [['int', 'int'], 'String']],
    isEmpty: [[[], 'boolean']],
    setLength: [[['int'], 'void']],
    equals: [[['Object'], 'boolean']]
  };
  var STATIC = {
    Math: {
      max: 'num2', min: 'num2', abs: 'num1',
      pow: [[['double', 'double'], 'double']], sqrt: [[['double'], 'double']], cbrt: [[['double'], 'double']],
      floor: [[['double'], 'double']], ceil: [[['double'], 'double']], round: [[['double'], 'long']],
      random: [[[], 'double']],
      floorDiv: [[['int', 'int'], 'int'], [['long', 'long'], 'long']], floorMod: [[['int', 'int'], 'int'], [['long', 'long'], 'long']]
    },
    Integer: { parseInt: [[['String'], 'int']], toString: [[['int'], 'String']], valueOf: [[['String'], 'int']] },
    Double: { parseDouble: [[['String'], 'double']], toString: [[['double'], 'String']] },
    Long: { parseLong: [[['String'], 'long']] },
    Boolean: { parseBoolean: [[['String'], 'boolean']] },
    Character: {
      isDigit: [[['char'], 'boolean']], isLetter: [[['char'], 'boolean']], isLetterOrDigit: [[['char'], 'boolean']],
      isUpperCase: [[['char'], 'boolean']], isLowerCase: [[['char'], 'boolean']], isWhitespace: [[['char'], 'boolean']],
      toUpperCase: [[['char'], 'char']], toLowerCase: [[['char'], 'char']], getNumericValue: [[['char'], 'int']],
      isAlphabetic: [[['int'], 'boolean']]
    },
    String: { valueOf: 'any1', format: 'format', join: 'join' },
    Arrays: { toString: 'arrToString', deepToString: 'arrToString', sort: 'sort', fill: 'fill', equals: 'arrEquals', copyOf: 'copyOf', copyOfRange: 'copyOf' }
  };
  var STATIC_FIELDS = {
    Math: { PI: 'double', E: 'double' },
    Integer: { MAX_VALUE: 'int', MIN_VALUE: 'int' },
    Long: { MAX_VALUE: 'long', MIN_VALUE: 'long' },
    Double: { MAX_VALUE: 'double', MIN_VALUE: 'double' }
  };

  function argFits(param, argT, node) {
    if (param === 'Object') return argT !== 'void';
    return assignable(param, argT, node);
  }
  function pickOverload(list, argTypes, args, name, line, owner) {
    var cands = list.filter(function (o) { return o[0].length === argTypes.length; });
    for (var i = 0; i < cands.length; i++) {
      var ok = cands[i][0].every(function (p, j) { return argFits(p, argTypes[j], args[j]); });
      if (ok) return cands[i];
    }
    // char se puede pasar donde va int
    var sig = name + '(' + argTypes.map(function (t) { return t === 'null' ? '<null>' : t; }).join(',') + ')';
    if (!cands.length) cerr('method ' + name + ' in class ' + owner + ' cannot be applied to given types;\n  found: ' + sig, line);
    cerr('incompatible types in call ' + owner + '.' + sig + '\n  esperado: ' + owner + '.' + name + '(' + cands[0][0].join(',') + ')', line);
  }

  function Scope(parent) { this.vars = Object.create(null); this.parent = parent; }
  Scope.prototype.find = function (n) { var s = this; while (s) { if (n in s.vars) return s.vars[n]; s = s.parent; } return null; };

  function check(node, scope, ctx) {
    switch (node.k) {
      case 'Block': {
        var s = new Scope(scope);
        node.body.forEach(function (st) { check(st, s, ctx); });
        return;
      }
      case 'Empty': case 'Return': return;
      case 'VarDecl':
        node.decls.forEach(function (d) {
          if (scope.find(d.name)) cerr('variable ' + d.name + ' is already defined in method main(String[])', d.line);
          if (d.init && d.init.k === 'ArrayLit') checkArrayLit(d.type, d.init, scope, ctx);
          else if (d.init) {
            if (d.init.k === 'Lit' && d.init.big) cerr('integer number too large', d.line);
            var it = typeOf(d.init, scope, ctx);
            needAssignable(d.type, it, d.init, d.line);
          }
          scope.vars[d.name] = { type: d.type, init: !!d.init, final: node.final };
        });
        return;
      case 'ExprStmt': typeOf(node.expr, scope, ctx); return;
      case 'If':
        needBool(node.cond, scope, ctx);
        checkSub(node.then, scope, ctx);
        if (node.els) checkSub(node.els, scope, ctx);
        return;
      case 'While': case 'DoWhile':
        needBool(node.cond, scope, ctx);
        ctx.loops++; checkSub(node.body, scope, ctx); ctx.loops--;
        return;
      case 'For': {
        var fs = new Scope(scope);
        node.init.forEach(function (i) { if (i.k === 'VarDecl') check(i, fs, ctx); else typeOf(i, fs, ctx); });
        if (node.cond) needBool(node.cond, fs, ctx);
        node.upd.forEach(function (u) { typeOf(u, fs, ctx); });
        ctx.loops++; checkSub(node.body, fs, ctx); ctx.loops--;
        return;
      }
      case 'ForEach': {
        var at = typeOf(node.iter, scope, ctx);
        if (!isArr(at)) cerr('for-each not applicable to expression type\n  required: array or java.lang.Iterable\n  found:    ' + at + (at === 'String' ? '\n(para recorrer un String letra a letra usa un for con charAt)' : ''), node.line);
        if (scope.find(node.name)) cerr('variable ' + node.name + ' is already defined in method main(String[])', node.line);
        needAssignable(node.type, elemT(at), { k: 'Name' }, node.line);
        var es = new Scope(scope);
        es.vars[node.name] = { type: node.type, init: true, final: false };
        ctx.loops++; checkSub(node.body, es, ctx); ctx.loops--;
        return;
      }
      case 'Break': if (!ctx.loops && !ctx.sw) cerr('break outside switch or loop', node.line); return;
      case 'Switch': checkSwitch(node, scope, ctx, false); return;
      case 'Yield':
        if (!ctx.yields) cerr('yield outside of switch expression', node.line);
        var yt = typeOf(node.e, scope, ctx);
        if (yt === 'void') cerr("'void' type not allowed here", node.line);
        ctx.yields.push(node.e);
        return;
      case 'Continue': if (!ctx.loops) cerr('continue outside of loop', node.line); return;
    }
  }
  function containsYield(st) {
    if (!st || typeof st !== 'object') return false;
    if (st.k === 'Yield') return true;
    if (st.k === 'SwitchExpr') return false;
    for (var key in st) if (key !== 'line' && containsYield(st[key])) return true;
    return false;
  }
  function checkSwitch(n, scope, ctx, isExpr) {
    var st = typeOf(n.sel, scope, ctx);
    if (!(st === 'int' || st === 'char' || st === 'String')) {
      if (st === 'long' || st === 'double' || st === 'boolean') cerr('constant label of type ' + st + ' is not compatible with switch\n(en este playground, switch funciona con int, char y String)', n.sel.line);
      cerr('patterns in switch statements are not supported\n(en este playground, switch funciona con int, char y String)', n.sel.line);
    }
    var seen = {}, hasDefault = false;
    n.cases.forEach(function (c) {
      if (c.isDefault) { if (hasDefault) cerr('duplicate default label', c.line); hasDefault = true; }
      c.labels.forEach(function (l) {
        var lt = typeOf(l, scope, ctx);
        var isC = st === 'String' ? (l.k === 'Lit' && lt === 'String') : isConst(l);
        if (!isC) cerr('constant expression required\n(en case solo puedes poner valores fijos, como 3, \'a\' o "lunes")', l.line);
        if (st === 'String' ? lt !== 'String' : !assignable(st, lt, l)) cerr('constant label of type ' + lt + ' is not compatible with ' + st, l.line);
        var key = st === 'String' ? 's' + l.v : 'n' + constValue(l);
        if (own(seen, key)) cerr('duplicate case label', l.line);
        seen[key] = true;
      });
    });
    var inner = new Scope(scope), saved = ctx.sw;
    if (!isExpr) {
      ctx.sw = (ctx.sw || 0) + 1;
      n.cases.forEach(function (c) {
        if (n.arrow) c.body.forEach(function (b) { check(b, new Scope(scope), ctx); });
        else c.body.forEach(function (b) { check(b, inner, ctx); });
      });
      ctx.sw = saved;
      return 'void';
    }
    if (!n.arrow) cerr('En este playground, el switch que devuelve un valor tiene que usar flechas (case 1 -> ...)', n.line);
    if (!hasDefault) cerr('the switch expression does not cover all possible input values\n(añade un default -> ...)', n.line);
    var results = [], savedY = ctx.yields, savedL = ctx.loops;
    n.cases.forEach(function (c) {
      var b = c.body[0];
      if (b.k === 'ArrowExpr') {
        var t = typeOf(b.e, scope, ctx);
        if (t === 'void') cerr("'void' type not allowed here\n(en un switch que devuelve un valor, cada case tiene que dar un valor)", b.line);
        results.push(b.e);
      } else {
        if (!containsYield(b)) cerr('switch rule completes without providing a value\n(dentro de las llaves usa yield para devolver el valor)', c.line);
        ctx.yields = results; ctx.loops = 0; ctx.sw = 0;
        check(b, scope, ctx);
        ctx.yields = savedY; ctx.loops = savedL; ctx.sw = saved;
      }
    });
    var rt = results[0].type;
    for (var i = 1; i < results.length; i++) {
      var x = results[i].type;
      if (x === rt) continue;
      if (isNum(x) && isNum(rt)) rt = promote(rt, x);
      else if (x === 'null' && isRef(rt)) continue;
      else if (rt === 'null' && isRef(x)) rt = x;
      else cerr('incompatible types in switch expression: ' + rt + ' and ' + x, results[i].line);
    }
    if (rt === 'null') rt = 'String';
    return rt;
  }
  function checkArrayLit(t, lit, scope, ctx) {
    if (!isArr(t)) cerr('illegal initializer for ' + t, lit.line);
    lit.type = t;
    var et = elemT(t);
    lit.elems.forEach(function (e) {
      if (e.k === 'ArrayLit') checkArrayLit(et, e, scope, ctx);
      else { var ty = typeOf(e, scope, ctx); needAssignable(et, ty, e, e.line); }
    });
  }
  function needIndex(e, scope, ctx) {
    var it = typeOf(e, scope, ctx);
    if (it === 'int' || it === 'char') return;
    if (isNum(it)) cerr('incompatible types: possible lossy conversion from ' + it + ' to int', e.line);
    cerr('incompatible types: ' + it + ' cannot be converted to int', e.line);
  }
  function checkSub(st, scope, ctx) {
    if (st.k === 'VarDecl') cerr('variable declaration not allowed here', st.line);
    check(st, st.k === 'Block' ? scope : new Scope(scope), ctx);
  }
  function needBool(e, scope, ctx) {
    var t = typeOf(e, scope, ctx);
    if (t !== 'boolean') {
      if (e.k === 'Assign' && e.op === '=') cerr('incompatible types: ' + t + ' cannot be converted to boolean\n(¿querías comparar con == en lugar de asignar con =?)', e.line);
      cerr('incompatible types: ' + t + ' cannot be converted to boolean', e.line);
    }
  }
  function isStaticClass(n, scope) {
    return n.k === 'Name' && !scope.find(n.name) && (own(STATIC, n.name) || own(STATIC_FIELDS, n.name) || n.name === 'System');
  }
  function typeOf(n, scope, ctx) { var t = typeOf0(n, scope, ctx); n.type = t; return t; }
  function typeOf0(n, scope, ctx) {
    switch (n.k) {
      case 'Lit':
        if (n.big) cerr('integer number too large', n.line);
        return n.type;
      case 'Paren': return typeOf(n.e, scope, ctx);
      case 'ArrayLit': cerr('illegal start of expression\n(las llaves { } solo se pueden usar al declarar el array o con new)', n.line);
      case 'NewArray':
        n.dims.forEach(function (d) { needIndex(d, scope, ctx); });
        if (n.init) checkArrayLit(n.type, n.init, scope, ctx);
        return n.type;
      case 'Index': {
        var art = typeOf(n.arr, scope, ctx);
        if (!isArr(art)) cerr('array required, but ' + art + ' found' + (art === 'String' ? '\n(para sacar una letra de un String usa charAt)' : ''), n.line);
        needIndex(n.idx, scope, ctx);
        return elemT(art);
      }
      case 'Name': {
        var v = scope.find(n.name);
        if (!v) {
          if (own(STATIC, n.name) || n.name === 'System') cerr('cannot find symbol\n  símbolo: variable ' + n.name, n.line);
          cerr('cannot find symbol\n  símbolo: variable ' + n.name, n.line);
        }
        if (!v.init) cerr('variable ' + n.name + ' might not have been initialized', n.line);
        return v.type;
      }
      case 'Field': {
        if (isStaticClass(n.target, scope)) {
          var cls = n.target.name;
          if (cls === 'System' && (n.name === 'out' || n.name === 'err')) return 'PrintStream';
          var f = own(STATIC_FIELDS, cls) && own(STATIC_FIELDS[cls], n.name) && STATIC_FIELDS[cls][n.name];
          if (!f) cerr('cannot find symbol\n  símbolo: variable ' + n.name + '\n  ubicación: class ' + cls, n.line);
          return f;
        }
        var tt = typeOf(n.target, scope, ctx);
        if (isArr(tt)) {
          if (n.name === 'length') return 'int';
          cerr('cannot find symbol\n  símbolo: variable ' + n.name, n.line);
        }
        if (tt === 'String') {
          if (n.name === 'length') cerr('cannot find symbol\n  símbolo: variable length\n(en un String, length es un método: escribe length())', n.line);
          cerr('cannot find symbol\n  símbolo: variable ' + n.name + '\n  ubicación: class String', n.line);
        }
        if (tt === 'StringBuilder') cerr('cannot find symbol\n  símbolo: variable ' + n.name + '\n  ubicación: class StringBuilder' + (n.name === 'length' ? '\n(length es un método: escribe length())' : ''), n.line);
        if (isNum(tt) || tt === 'boolean') cerr(tt + ' cannot be dereferenced', n.line);
        cerr('cannot find symbol: ' + n.name, n.line);
      }
      case 'Call': return typeCall(n, scope, ctx);
      case 'NewObj': {
        var nat = n.args.map(function (a) { return typeOf(a, scope, ctx); });
        if (n.cls === 'StringBuilder') {
          if (nat.length === 0 || (nat.length === 1 && (nat[0] === 'String' || nat[0] === 'int' || nat[0] === 'char' || nat[0] === 'StringBuilder'))) return 'StringBuilder';
        } else if (nat.length === 1 && (nat[0] === 'char[]' || nat[0] === 'String' || nat[0] === 'StringBuilder')) return 'String';
        else if (nat.length === 0) return 'String';
        cerr('no suitable constructor found for ' + n.cls + '(' + nat.join(',') + ')', n.line);
      }
      case 'SwitchExpr': return checkSwitch(n, scope, ctx, true);
      case 'Unary': {
        var et = typeOf(n.e, scope, ctx);
        if (n.op === '!') { if (et !== 'boolean') cerr("bad operand type " + et + " for unary operator '!'", n.line); return 'boolean'; }
        if (!isNum(et)) cerr("bad operand type " + et + " for unary operator '" + n.op + "'", n.line);
        return unaryPromote(et);
      }
      case 'IncDec': {
        var vt = typeOf(n.target, scope, ctx);
        if (n.target.k === 'Index') { if (!isNum(vt)) cerr("bad operand type " + vt + " for unary operator '" + n.op + "'", n.line); return vt; }
        var vv = scope.find(n.target.name);
        if (vv.final) cerr('cannot assign a value to final variable ' + n.target.name, n.line);
        if (!isNum(vt)) cerr("bad operand type " + vt + " for unary operator '" + n.op + "'", n.line);
        return vt;
      }
      case 'Cast': {
        var ct = typeOf(n.e, scope, ctx);
        if (n.to === 'String') { if (ct !== 'String' && ct !== 'null') cerr('incompatible types: ' + ct + ' cannot be converted to String', n.line); return 'String'; }
        if (n.to === 'boolean') { if (ct !== 'boolean') cerr('incompatible types: ' + ct + ' cannot be converted to boolean', n.line); return 'boolean'; }
        if (!isNum(ct)) cerr('incompatible types: ' + ct + ' cannot be converted to ' + n.to, n.line);
        return n.to;
      }
      case 'Bin': {
        var a = typeOf(n.a, scope, ctx), b = typeOf(n.b, scope, ctx), op = n.op;
        var bad = function () { cerr("bad operand types for binary operator '" + op + "'\n  first type:  " + a + "\n  second type: " + b, n.line); };
        if (a === 'void' || b === 'void') cerr("'void' type not allowed here", n.line);
        if (op === '+') {
          if (a === 'String' || b === 'String') return 'String';
          if (isNum(a) && isNum(b)) return promote(a, b);
          bad();
        }
        if (op === '-' || op === '*' || op === '/' || op === '%') { if (isNum(a) && isNum(b)) return promote(a, b); bad(); }
        if (op === '<' || op === '>' || op === '<=' || op === '>=') { if (isNum(a) && isNum(b)) return 'boolean'; bad(); }
        if (op === '==' || op === '!=') {
          if (isNum(a) && isNum(b)) return 'boolean';
          if (a === 'boolean' && b === 'boolean') return 'boolean';
          if (isRef(a) && isRef(b) && (a === b || a === 'null' || b === 'null')) return 'boolean';
        if (isRef(a) && isRef(b) && (a === 'String' || a === 'StringBuilder') && (b === 'String' || b === 'StringBuilder')) cerr('incomparable types: ' + a + ' and ' + b + '\n(para comparar el texto usa sb.toString().equals(...))', n.line);
          cerr("incomparable types: " + a + " and " + b, n.line);
        }
        if (op === '&&' || op === '||') { if (a === 'boolean' && b === 'boolean') return 'boolean'; bad(); }
        bad();
      }
      case 'Cond': {
        needBool(n.cond, scope, ctx);
        var x = typeOf(n.a, scope, ctx), y = typeOf(n.b, scope, ctx);
        if (x === y) return x;
        if (isNum(x) && isNum(y)) return promote(x, y);
        if (x === 'null' && isRef(y)) return y;
        if (y === 'null' && isRef(x)) return x;
        cerr('incompatible types in conditional expression: ' + x + ' and ' + y, n.line);
      }
      case 'Assign': {
        if (n.target.k === 'Index') {
          var lt = typeOf(n.target, scope, ctx), rtt = typeOf(n.value, scope, ctx);
          if (n.op === '=') { needAssignable(lt, rtt, n.value, n.line); return lt; }
          if (n.op === '+=' && lt === 'String') { if (rtt === 'void') cerr("'void' type not allowed here", n.line); return 'String'; }
          if (isNum(lt) && isNum(rtt)) return lt;
          cerr("bad operand types for binary operator '" + n.op[0] + "'\n  first type:  " + lt + "\n  second type: " + rtt, n.line);
        }
        var v2 = scope.find(n.target.name);
        if (!v2) cerr('cannot find symbol\n  símbolo: variable ' + n.target.name, n.target.line);
        if (v2.final && (v2.init || n.op !== '=')) cerr('cannot assign a value to final variable ' + n.target.name, n.line);
        n.target.type = v2.type;
        var rt = typeOf(n.value, scope, ctx);
        if (n.op === '=') { needAssignable(v2.type, rt, n.value, n.line); v2.init = true; return v2.type; }
        if (!v2.init) cerr('variable ' + n.target.name + ' might not have been initialized', n.line);
        if (n.op === '+=' && v2.type === 'String') { if (rt === 'void') cerr("'void' type not allowed here", n.line); return 'String'; }
        if (isNum(v2.type) && isNum(rt)) return v2.type;
        cerr("bad operand types for binary operator '" + n.op[0] + "'\n  first type:  " + v2.type + "\n  second type: " + rt, n.line);
      }
    }
    cerr('expresión no soportada', n.line);
  }
  function typeCall(n, scope, ctx) {
    var argT;
    // System.out.println / print / printf
    if (n.target.k === 'Field' && isStaticClass(n.target.target, scope) && n.target.target.name === 'System') {
      if (n.target.name !== 'out' && n.target.name !== 'err') cerr('cannot find symbol\n  símbolo: variable ' + n.target.name + '\n  ubicación: class System', n.target.line);
      argT = n.args.map(function (a) { return typeOf(a, scope, ctx); });
      argT.forEach(function (t) { if (t === 'void') cerr("'void' type not allowed here", n.line); });
      if (n.name === 'println') { if (argT.length > 1) cerr('no suitable method found for println(' + argT.join(',') + ')\n(println recibe un solo valor: une las partes con +)', n.line); return 'void'; }
      if (n.name === 'print') { if (argT.length !== 1) cerr('no suitable method found for print(' + argT.join(',') + ')' + (argT.length > 1 ? '\n(print recibe un solo valor: une las partes con +)' : ''), n.line); return 'void'; }
      if (n.name === 'printf' || n.name === 'format') { if (!argT.length || argT[0] !== 'String') cerr('no suitable method found for printf', n.line); n.fmt = true; return 'void'; }
      cerr('cannot find symbol\n  símbolo: method ' + n.name + '\n  ubicación: variable out of type PrintStream', n.line);
    }
    if (isStaticClass(n.target, scope)) {
      var cls = n.target.name, tbl = STATIC[cls];
      if (cls === 'System' || !tbl || !own(tbl, n.name)) cerr('cannot find symbol\n  símbolo: method ' + n.name + '\n  ubicación: class ' + cls, n.line);
      argT = n.args.map(function (a) { return typeOf(a, scope, ctx); });
      var spec = tbl[n.name];
      if (spec === 'num2') {
        if (argT.length !== 2 || !isNum(argT[0]) || !isNum(argT[1])) cerr('no suitable method found for ' + n.name + '(' + argT.join(',') + ')', n.line);
        return promote(argT[0], argT[1]);
      }
      if (spec === 'num1') {
        if (argT.length !== 1 || !isNum(argT[0])) cerr('no suitable method found for ' + n.name + '(' + argT.join(',') + ')', n.line);
        return unaryPromote(argT[0]);
      }
      if (spec === 'any1') {
        if (argT.length !== 1 || argT[0] === 'void') cerr('no suitable method found for valueOf', n.line);
        return 'String';
      }
      if (spec === 'arrToString') {
        if (argT.length !== 1 || !(isArr(argT[0]) || argT[0] === 'null')) cerr('no suitable method found for ' + n.name + '(' + argT.join(',') + ')\n(' + 'Arrays.' + n.name + ' recibe un array)', n.line);
        return 'String';
      }
      if (spec === 'sort') {
        if (argT.length !== 1 || !isArr(argT[0])) cerr('no suitable method found for sort(' + argT.join(',') + ')', n.line);
        var se = elemT(argT[0]);
        if (!(isNum(se) || se === 'String')) cerr('Arrays.sort en este playground solo ordena arrays de números, char o String', n.line);
        return 'void';
      }
      if (spec === 'fill') {
        if (argT.length !== 2 || !isArr(argT[0])) cerr('no suitable method found for fill(' + argT.join(',') + ')', n.line);
        needAssignable(elemT(argT[0]), argT[1], n.args[1], n.line);
        return 'void';
      }
      if (spec === 'arrEquals') {
        if (argT.length !== 2 || !isRef(argT[0]) || !isRef(argT[1]) || argT[0] === 'String' || argT[1] === 'String') cerr('no suitable method found for equals(' + argT.join(',') + ')', n.line);
        return 'boolean';
      }
      if (spec === 'join') {
        if (argT.length < 2 || argT[0] !== 'String') cerr('no suitable method found for join(' + argT.join(',') + ')', n.line);
        var rest = argT.slice(1);
        if (rest.length === 1 && rest[0] === 'String[]') { n.joinArr = true; return 'String'; }
        if (rest.every(function (x) { return x === 'String' || x === 'null'; })) return 'String';
        cerr('no suitable method found for join(' + argT.join(',') + ')\n(String.join necesita un separador y después un String[] o varios String)', n.line);
      }
      if (spec === 'copyOf') {
        var want = n.name === 'copyOf' ? 2 : 3;
        if (argT.length !== want || !isArr(argT[0])) cerr('no suitable method found for ' + n.name + '(' + argT.join(',') + ')', n.line);
        for (var ci = 1; ci < want; ci++) needIndex(n.args[ci], scope, ctx);
        return argT[0];
      }
      if (spec === 'format') { if (!argT.length || argT[0] !== 'String') cerr('no suitable method found for format', n.line); return 'String'; }
      return pickOverload(spec, argT, n.args, n.name, n.line, cls)[1];
    }
    var tt = typeOf(n.target, scope, ctx);
    argT = n.args.map(function (a) { return typeOf(a, scope, ctx); });
    if (tt === 'String') {
      var ms = own(STRING_METHODS, n.name) && STRING_METHODS[n.name];
      if (!ms) cerr('cannot find symbol\n  símbolo: method ' + n.name + '(' + argT.join(',') + ')\n  ubicación: class String', n.line);
      return pickOverload(ms, argT, n.args, n.name, n.line, 'String')[1];
    }
    if (tt === 'StringBuilder') {
      var sm = own(SB_METHODS, n.name) && SB_METHODS[n.name];
      if (!sm) cerr('cannot find symbol\n  símbolo: method ' + n.name + '(' + argT.join(',') + ')\n  ubicación: class StringBuilder', n.line);
      return pickOverload(sm, argT, n.args, n.name, n.line, 'StringBuilder')[1];
    }
    if (tt === 'null') cerr('<null> cannot be dereferenced', n.line);
    if (isArr(tt)) cerr('cannot find symbol\n  símbolo: method ' + n.name + '(' + argT.join(',') + ')' + (n.name === 'length' ? '\n(en un array, length no lleva paréntesis: escribe .length)' : '\n(los arrays no tienen ese método; mira la clase Arrays)'), n.line);
    if (isNum(tt) || tt === 'boolean') cerr(tt + ' cannot be dereferenced\n(los tipos primitivos como ' + tt + ' no tienen métodos)', n.line);
    cerr('cannot find symbol: method ' + n.name, n.line);
  }

  // ---------- ejecución ----------
  function JStr(s) { this.s = s; }
  function JSB(s) { this.s = s; this.sb = true; }
  var interned = {};
  function lit(s) { if (!interned.hasOwnProperty(s)) interned[s] = new JStr(s); return interned[s]; }

  var hashSeed = 0;
  function JArr(t, a) { this.t = t; this.a = a; this.h = ((0x1b6d3586 + Math.imul(++hashSeed, 0x2f9a3c1)) >>> 0).toString(16); }
  function arrCode(t) {
    var pre = '';
    while (isArr(t)) { pre += '['; t = elemT(t); }
    return pre + ({ int: 'I', long: 'J', double: 'D', char: 'C', boolean: 'Z' }[t] || 'Ljava.lang.String;');
  }
  function defaultFor(t) { return (isArr(t) || t === 'String') ? null : (t === 'boolean' ? false : 0); }
  var cellCount = 0;
  function makeArr(t, dims, i, line) {
    var len = dims[i];
    if (len < 0) throw new JavaException('java.lang.NegativeArraySizeException', String(len), line);
    cellCount += len;
    if (cellCount > 2000000) throw new Limit('El array es demasiado grande para este playground.');
    var et = elemT(t), a = new Array(len);
    for (var k = 0; k < len; k++) a[k] = i + 1 < dims.length ? makeArr(et, dims, i + 1, line) : defaultFor(et);
    return new JArr(t, a);
  }
  function arrToStr(o, deep) {
    if (o === null) return 'null';
    var et = elemT(o.t);
    return '[' + o.a.map(function (e) { return deep && isArr(et) ? arrToStr(e, true) : str(e, et); }).join(', ') + ']';
  }
  function fmtDouble(d) {
    if (isNaN(d)) return 'NaN';
    if (d === Infinity) return 'Infinity';
    if (d === -Infinity) return '-Infinity';
    if (d === 0) return Object.is(d, -0) ? '-0.0' : '0.0';
    var a = Math.abs(d);
    if (a >= 1e-3 && a < 1e7) {
      var s = String(d);
      if (s.indexOf('e') >= 0) s = d.toFixed(20).replace(/0+$/, '');
      if (s.indexOf('.') < 0) s += '.0';
      return s;
    }
    var e = d.toExponential(); // "1.2345e+7"
    var parts = e.split('e'), m = parts[0], ex = parts[1].replace('+', '');
    if (m.indexOf('.') < 0) m += '.0';
    return m + 'E' + ex;
  }
  function str(v, t) {
    if (isArr(t)) return v === null ? 'null' : arrCode(t) + '@' + v.h;
    if (t === 'String' || t === 'StringBuilder' || t === 'null') return v === null ? 'null' : v.s;
    if (t === 'char') return String.fromCharCode(v);
    if (t === 'double') return fmtDouble(v);
    if (t === 'boolean') return v ? 'true' : 'false';
    return String(v);
  }
  function toInt(x) { // (int) desde double, como Java
    if (isNaN(x)) return 0;
    if (x >= 2147483647) return 2147483647;
    if (x <= -2147483648) return -2147483648;
    return Math.trunc(x) | 0;
  }
  function toLong(x) {
    if (isNaN(x)) return 0;
    if (x >= 9223372036854775807) return 9223372036854775807;
    if (x <= -9223372036854775808) return -9223372036854775808;
    return Math.trunc(x);
  }
  function convert(v, from, to) {
    if (from === to) return v;
    if (to === 'double') return v;
    if (to === 'long') return from === 'double' ? toLong(v) : v;
    if (to === 'int') {
      if (from === 'double') return toInt(v);
      if (from === 'long') return Number(BigInt.asIntN(32, BigInt(Math.trunc(v))));
      return v;
    }
    if (to === 'char') {
      var iv = from === 'double' ? toInt(v) : v;
      return ((iv % 65536) + 65536) % 65536;
    }
    return v;
  }
  function arith(op, a, b, t, line) {
    if (t === 'double') {
      if (op === '+') return a + b; if (op === '-') return a - b; if (op === '*') return a * b;
      if (op === '/') return a / b;
      if (op === '%') return a % b;
    }
    if (t === 'int') {
      if (op === '+') return (a + b) | 0; if (op === '-') return (a - b) | 0; if (op === '*') return Math.imul(a, b);
      if (op === '/') { if (b === 0) throw new JavaException('java.lang.ArithmeticException', '/ by zero', line); return (a / b) | 0; }
      if (op === '%') { if (b === 0) throw new JavaException('java.lang.ArithmeticException', '/ by zero', line); return (a % b) | 0; }
    }
    // long (aprox. con números de JS)
    if (op === '+') return a + b; if (op === '-') return a - b; if (op === '*') return a * b;
    if (op === '/') { if (b === 0) throw new JavaException('java.lang.ArithmeticException', '/ by zero', line); return Math.trunc(a / b); }
    if (op === '%') { if (b === 0) throw new JavaException('java.lang.ArithmeticException', '/ by zero', line); return a % b; }
  }

  function javaTrim(s) {
    var st = 0, en = s.length;
    while (st < en && s.charCodeAt(st) <= 32) st++;
    while (en > st && s.charCodeAt(en - 1) <= 32) en--;
    return s.slice(st, en);
  }
  function needObj(o, line) { if (o === null) throw new JavaException('java.lang.NullPointerException', null, line); }
  function idxErr(i, len, line) { throw new JavaException('java.lang.StringIndexOutOfBoundsException', 'Index ' + i + ' out of bounds for length ' + len, line); }

  // expresiones regulares de Java traducidas a las de JavaScript (casi siempre se escriben igual)
  var POSIX = { Lower: 'a-z', Upper: 'A-Z', Alpha: 'a-zA-Z', Digit: '0-9', Alnum: 'a-zA-Z0-9', Punct: '!-\\/:-@\\[-`{-~', Space: ' \\t\\n\\x0B\\f\\r', XDigit: '0-9a-fA-F' };
  function javaRegex(p, line, wrapAll) {
    var flags = 'g', src = p, m = /^\(\?([a-zA-Z]+)\)/.exec(src);
    if (m) { src = src.slice(m[0].length); if (m[1].indexOf('i') >= 0) flags += 'i'; if (m[1].indexOf('s') >= 0) flags += 's'; if (m[1].indexOf('m') >= 0) flags += 'm'; }
    src = src.replace(/\\p\{(Lower|Upper|Alpha|Digit|Alnum|Punct|Space|XDigit)\}/g, function (all, k, off) {
      var inClass = (src.slice(0, off).match(/\[/g) || []).length > (src.slice(0, off).match(/\]/g) || []).length;
      return inClass ? POSIX[k] : '[' + POSIX[k] + ']';
    }).replace(/\\P\{(Lower|Upper|Alpha|Digit|Alnum|Punct|Space|XDigit)\}/g, function (all, k) { return '[^' + POSIX[k] + ']'; })
      .replace(/\\A/g, '^').replace(/\\[zZ]/g, '$').replace(/\\h/g, '[ \\t\\xA0]');
    if (/\\[pP]\{/.test(src)) flags += 'u';
    if (wrapAll) src = '^(?:' + src + ')$';
    try { return new RegExp(src, flags); }
    catch (e) { throw new JavaException('java.util.regex.PatternSyntaxException', 'La expresión regular "' + p + '" no es válida', line); }
  }
  function findAll(re, s, max) {
    var res = [], m;
    re.lastIndex = 0;
    while ((max < 0 || res.length < max) && (m = re.exec(s))) {
      res.push(m);
      if (m[0] === '') re.lastIndex++;
      if (re.lastIndex > s.length) break;
    }
    return res;
  }
  function expandReplacement(rep, m, line) {
    var out = '';
    for (var i = 0; i < rep.length; i++) {
      var c = rep[i];
      if (c === '\\') {
        i++;
        if (i >= rep.length) throw new JavaException('java.lang.IllegalArgumentException', 'character to be escaped is missing', line);
        out += rep[i];
      } else if (c === '$') {
        i++;
        if (i >= rep.length) throw new JavaException('java.lang.IllegalArgumentException', 'Illegal group reference: group index is missing', line);
        if (rep[i] === '{') {
          var e = rep.indexOf('}', i), nm = e < 0 ? '' : rep.slice(i + 1, e);
          if (e < 0 || !m.groups || !own(m.groups, nm)) throw new JavaException('java.lang.IllegalArgumentException', 'No group with name {' + nm + '}', line);
          out += m.groups[nm] == null ? '' : m.groups[nm]; i = e;
        } else if (/[0-9]/.test(rep[i])) {
          var g = +rep[i];
          if (g >= m.length) throw new JavaException('java.lang.IndexOutOfBoundsException', 'No group ' + g, line);
          while (i + 1 < rep.length && /[0-9]/.test(rep[i + 1]) && g * 10 + (+rep[i + 1]) < m.length) { g = g * 10 + (+rep[i + 1]); i++; }
          out += m[g] == null ? '' : m[g];
        } else throw new JavaException('java.lang.IllegalArgumentException', 'Illegal group reference', line);
      } else out += c;
    }
    return out;
  }
  function regexReplace(s, regex, rep, all, line) {
    var ms = findAll(javaRegex(regex, line), s, all ? -1 : 1), out = '', last = 0;
    ms.forEach(function (m) { out += s.slice(last, m.index) + expandReplacement(rep, m, line); last = m.index + m[0].length; });
    return out + s.slice(last);
  }
  function regexSplit(s, regex, limit, line) {
    var ms = findAll(javaRegex(regex, line), s, -1), list = [], index = 0;
    for (var i = 0; i < ms.length; i++) {
      var m = ms[i], st = m.index, en = st + m[0].length;
      if (limit > 0 && list.length >= limit - 1) break;
      if (st === 0 && en === 0) continue; // sin texto vacío al principio si el separador no ocupa nada
      if (en === 0 && st === 0) continue;
      if (index === 0 && st === 0 && en === 0) continue;
      list.push(s.slice(index, st)); index = en;
    }
    if (index === 0 && !list.length) return [s];
    list.push(s.slice(index));
    if (limit === 0) while (list.length && list[list.length - 1] === '') list.pop();
    return list;
  }
  function callSB(o, name, args, argT, line) {
    needObj(o, line);
    var s = o.s;
    var text = function (i) { return argT[i] === 'char[]' ? (needObj(args[i], line), args[i].a.map(function (c) { return String.fromCharCode(c); }).join('')) : str(args[i], argT[i]); };
    var sbIdx = function (i, len, incl) { if (i < 0 || (incl ? i > len : i >= len)) throw new JavaException('java.lang.StringIndexOutOfBoundsException', 'index ' + i + ',length ' + len, line); };
    switch (name) {
      case 'append': o.s = s + text(0); return o;
      case 'insert': sbIdx(args[0], s.length, true); o.s = s.slice(0, args[0]) + text(1) + s.slice(args[0]); return o;
      case 'reverse': o.s = Array.from(s).reverse().join(''); return o;
      case 'toString': return new JStr(s);
      case 'length': return s.length;
      case 'isEmpty': return s.length === 0;
      case 'charAt': sbIdx(args[0], s.length, false); return s.charCodeAt(args[0]);
      case 'setCharAt': sbIdx(args[0], s.length, false); o.s = s.slice(0, args[0]) + String.fromCharCode(args[1]) + s.slice(args[0] + 1); return undefined;
      case 'deleteCharAt': sbIdx(args[0], s.length, false); o.s = s.slice(0, args[0]) + s.slice(args[0] + 1); return o;
      case 'delete': case 'replace': {
        var a0 = args[0], a1 = Math.min(args[1], s.length);
        if (a0 < 0 || a0 > s.length || a0 > args[1]) throw new JavaException('java.lang.StringIndexOutOfBoundsException', 'start ' + a0 + ', end ' + args[1] + ', length ' + s.length, line);
        o.s = s.slice(0, a0) + (name === 'replace' ? (needObj(args[2], line), args[2].s) : '') + s.slice(a1); return o;
      }
      case 'indexOf': needObj(args[0], line); return s.indexOf(args[0].s, args.length > 1 ? Math.max(0, args[1]) : 0);
      case 'lastIndexOf': needObj(args[0], line); return args.length > 1 ? (args[1] < 0 ? -1 : s.lastIndexOf(args[0].s, args[1])) : s.lastIndexOf(args[0].s);
      case 'substring': {
        var b = args[0], e = args.length > 1 ? args[1] : s.length;
        if (b < 0 || e > s.length || b > e) throw new JavaException('java.lang.StringIndexOutOfBoundsException', 'start ' + b + ', end ' + e + ', length ' + s.length, line);
        return new JStr(s.slice(b, e));
      }
      case 'setLength': if (args[0] < 0) throw new JavaException('java.lang.StringIndexOutOfBoundsException', 'String index out of range: ' + args[0], line); o.s = args[0] <= s.length ? s.slice(0, args[0]) : s + '\0'.repeat(args[0] - s.length); return undefined;
      case 'equals': return args[0] === o;
    }
  }

  function callString(o, name, args, argT, line) {
    needObj(o, line);
    var s = o.s;
    var arg = function (i) { return argT[i] === 'char' ? String.fromCharCode(args[i]) : (args[i] && args[i].s !== undefined ? args[i].s : args[i]); };
    var argStr = function (i) { if (args[i] === null) throw new JavaException('java.lang.NullPointerException', null, line); return arg(i); };
    switch (name) {
      case 'length': return s.length;
      case 'charAt': if (args[0] < 0 || args[0] >= s.length) idxErr(args[0], s.length, line); return s.charCodeAt(args[0]);
      case 'substring': {
        var b = args[0], e = args.length > 1 ? args[1] : s.length;
        if (b < 0 || e > s.length || b > e) throw new JavaException('java.lang.StringIndexOutOfBoundsException', 'begin ' + b + ', end ' + e + ', length ' + s.length, line);
        return new JStr(s.slice(b, e));
      }
      case 'indexOf': return s.indexOf(argStr(0), args.length > 1 ? Math.max(0, args[1]) : 0);
      case 'lastIndexOf': return args.length > 1 ? (args[1] < 0 ? -1 : s.lastIndexOf(argStr(0), args[1])) : s.lastIndexOf(argStr(0));
      case 'contains': return s.indexOf(argStr(0)) >= 0;
      case 'startsWith': return args.length > 1 ? (args[1] >= 0 && s.startsWith(argStr(0), args[1])) : s.startsWith(argStr(0));
      case 'endsWith': return s.endsWith(argStr(0));
      case 'equals': return argT[0] === 'String' && args[0] !== null && args[0].s === s;
      case 'equalsIgnoreCase': {
        if (args[0] === null || args[0].s.length !== s.length) return false;
        for (var q = 0; q < s.length; q++) {
          var c1 = s[q], c2 = args[0].s[q];
          if (c1 !== c2 && c1.toUpperCase() !== c2.toUpperCase() && c1.toLowerCase() !== c2.toLowerCase()) return false;
        }
        return true;
      }
      case 'compareTo': case 'compareToIgnoreCase': {
        var x = s, y = argStr(0);
        if (name === 'compareToIgnoreCase') { x = x.toLowerCase(); y = y.toLowerCase(); }
        var lim = Math.min(x.length, y.length);
        for (var i = 0; i < lim; i++) if (x.charCodeAt(i) !== y.charCodeAt(i)) return x.charCodeAt(i) - y.charCodeAt(i);
        return x.length - y.length;
      }
      case 'isEmpty': return s.length === 0;
      case 'isBlank': return s.trim().length === 0;
      case 'trim': { var tr = javaTrim(s); return tr === s ? o : new JStr(tr); }
      case 'strip': return new JStr(s.trim());
      case 'stripLeading': return new JStr(s.replace(/^\s+/, ''));
      case 'stripTrailing': return new JStr(s.replace(/\s+$/, ''));
      case 'toUpperCase': return new JStr(s.toUpperCase());
      case 'toLowerCase': return new JStr(s.toLowerCase());
      case 'replace': return new JStr(s.split(argStr(0)).join(argStr(1)));
      case 'concat': return new JStr(s + argStr(0));
      case 'toString': return o;
      case 'toCharArray': return new JArr('char[]', s.split('').map(function (c) { return c.charCodeAt(0); }));
      case 'replaceAll': case 'replaceFirst': return new JStr(regexReplace(s, argStr(0), argStr(1), name === 'replaceAll', line));
      case 'matches': return javaRegex(argStr(0), line, true).test(s);
      case 'split': {
        var parts = regexSplit(s, argStr(0), args.length > 1 ? args[1] : 0, line);
        cellCount += parts.length;
        return new JArr('String[]', parts.map(function (x) { return new JStr(x); }));
      }
      case 'repeat': if (args[0] * s.length > 1000000) throw new Limit('El texto generado con repeat es demasiado largo para este playground.'); if (args[0] < 0) throw new JavaException('java.lang.IllegalArgumentException', 'count is negative: ' + args[0], line); return new JStr(s.repeat(args[0]));
    }
  }

  // String.format / printf (formato con configuración regional española, como un PC en español)
  function jformat(fmt, vals, types, line) {
    var out = '', ai = 0;
    var re = /%(-)?(0)?(\d+)?(?:\.(\d+))?([dfsScbBneE%])/g, last = 0, m;
    while ((m = re.exec(fmt))) {
      out += fmt.slice(last, m.index); last = re.lastIndex;
      var conv = m[5];
      if (conv === '%') { out += '%'; continue; }
      if (conv === 'n') { out += '\n'; continue; }
      if (ai >= vals.length) throw new JavaException('java.util.MissingFormatArgumentException', "Format specifier '" + m[0] + "'", line);
      var v = vals[ai], t = types[ai]; ai++;
      var piece;
      if (conv === 'd') {
        if (!(t === 'int' || t === 'long')) throw new JavaException('java.util.IllegalFormatConversionException', 'd != ' + javaClass(t), line);
        piece = String(v);
      } else if (conv === 'f' || conv === 'e' || conv === 'E') {
        if (t !== 'double') throw new JavaException('java.util.IllegalFormatConversionException', 'f != ' + javaClass(t), line);
        var prec = m[4] !== undefined ? +m[4] : 6;
        piece = conv === 'f' ? roundHalfUp(v, prec).replace('.', ',') : v.toExponential(prec).replace('.', ',');
      } else if (conv === 'c') {
        piece = t === 'char' ? String.fromCharCode(v) : String.fromCharCode(v);
      } else if (conv === 'b' || conv === 'B') {
        piece = t === 'boolean' ? String(v) : String(v !== null);
      } else {
        piece = str(v, t);
        if (conv === 'S') piece = piece.toUpperCase();
        if (m[4] !== undefined) piece = piece.slice(0, +m[4]);
      }
      var w = m[3] ? +m[3] : 0;
      while (piece.length < w) piece = m[1] ? piece + ' ' : (m[2] ? '0' + piece : ' ' + piece);
      out += piece;
    }
    out += fmt.slice(last);
    return out;
  }
  function javaClass(t) { return { int: 'java.lang.Integer', long: 'java.lang.Long', double: 'java.lang.Double', char: 'java.lang.Character', boolean: 'java.lang.Boolean', String: 'java.lang.String' }[t] || t; }
  function roundHalfUp(v, prec) {
    if (!isFinite(v)) return str(v, 'double');
    var neg = v < 0; v = Math.abs(v);
    var s = fmtDouble(v);
    if (s.indexOf('E') >= 0) { return (neg ? '-' : '') + v.toFixed(prec); }
    var parts = s.split('.'), ip = parts[0], fp = parts[1] || '';
    if (fp.length <= prec) { fp = fp + '0'.repeat(prec - fp.length); return (neg ? '-' : '') + ip + (prec ? '.' + fp : ''); }
    var digits = (ip + fp.slice(0, prec)).split('').map(Number);
    if (+fp[prec] >= 5) {
      var k = digits.length - 1;
      while (k >= 0) { if (digits[k] === 9) { digits[k] = 0; k--; } else { digits[k]++; break; } }
      if (k < 0) digits.unshift(1);
    }
    var all = digits.join(''), il = all.length - prec;
    var res = all.slice(0, il) + (prec ? '.' + all.slice(il) : '');
    return (neg && /[1-9]/.test(res) ? '-' : (neg ? '-' : '')) + res;
  }

  function callStatic(cls, name, args, argT, line, n) {
    var a = args;
    switch (cls + '.' + name) {
      case 'Math.max': return Math.max(a[0], a[1]);
      case 'Math.min': return Math.min(a[0], a[1]);
      case 'Math.abs': return n.type === 'int' ? Math.abs(a[0]) | 0 : Math.abs(a[0]);
      case 'Math.pow': return Math.pow(a[0], a[1]);
      case 'Math.sqrt': return Math.sqrt(a[0]);
      case 'Math.cbrt': return Math.cbrt(a[0]);
      case 'Math.floor': return Math.floor(a[0]);
      case 'Math.ceil': return Math.ceil(a[0]);
      case 'Math.round': return isNaN(a[0]) ? 0 : toLong(Math.floor(a[0] + 0.5));
      case 'Math.random': return Math.random();
      case 'Math.floorDiv': case 'Math.floorMod': {
        if (a[1] === 0) throw new JavaException('java.lang.ArithmeticException', '/ by zero', line);
        var fd = Math.floor(a[0] / a[1]);
        return name === 'floorDiv' ? fd : a[0] - fd * a[1];
      }
      case 'Character.isAlphabetic': return /\p{Alphabetic}/u.test(String.fromCodePoint(a[0]));
      case 'Arrays.copyOf': case 'Arrays.copyOfRange': {
        needObj(a[0], line);
        var from = name === 'copyOf' ? 0 : a[1], to = name === 'copyOf' ? a[1] : a[2], src = a[0].a;
        if (name === 'copyOf' && to < 0) throw new JavaException('java.lang.NegativeArraySizeException', String(to), line);
        if (name === 'copyOfRange' && (from < 0 || from > src.length)) throw new JavaException('java.lang.ArrayIndexOutOfBoundsException', 'Array index out of range: ' + from, line);
        if (name === 'copyOfRange' && from > to) throw new JavaException('java.lang.IllegalArgumentException', from + ' > ' + to, line);
        var copy = [], cdef = defaultFor(elemT(argT[0]));
        for (var q = from; q < to; q++) copy.push(q < src.length ? src[q] : cdef);
        cellCount += copy.length;
        return new JArr(argT[0], copy);
      }
      case 'Integer.parseInt': case 'Integer.valueOf': case 'Long.parseLong': {
        needObj(a[0], line);
        var s = a[0].s;
        if (!/^[+-]?\d+$/.test(s)) throw new JavaException('java.lang.NumberFormatException', 'For input string: "' + s + '"', line);
        var v = parseInt(s, 10);
        if (name !== 'parseLong' && (v > 2147483647 || v < -2147483648)) throw new JavaException('java.lang.NumberFormatException', 'For input string: "' + s + '"', line);
        return v;
      }
      case 'Integer.toString': return new JStr(String(a[0]));
      case 'Double.toString': return new JStr(fmtDouble(a[0]));
      case 'Double.parseDouble': {
        needObj(a[0], line);
        var ds = javaTrim(a[0].s);
        if (!/^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?[dD]?$/.test(ds)) throw new JavaException('java.lang.NumberFormatException', ds === '' ? 'empty String' : 'For input string: "' + a[0].s + '"', line);
        return parseFloat(ds);
      }
      case 'Boolean.parseBoolean': return a[0] !== null && a[0].s.toLowerCase() === 'true';
      case 'Character.isDigit': return /[0-9]/.test(String.fromCharCode(a[0]));
      case 'Character.isLetter': return /\p{L}/u.test(String.fromCharCode(a[0]));
      case 'Character.isLetterOrDigit': return /[\p{L}\p{Nd}]/u.test(String.fromCharCode(a[0]));
      case 'Character.isUpperCase': return /\p{Lu}/u.test(String.fromCharCode(a[0]));
      case 'Character.isLowerCase': return /\p{Ll}/u.test(String.fromCharCode(a[0]));
      case 'Character.isWhitespace': return /[ \t\n\r\f\v\u001c-\u001f]/.test(String.fromCharCode(a[0]));
      case 'Character.toUpperCase': { var u = String.fromCharCode(a[0]).toUpperCase(); return u.length === 1 ? u.charCodeAt(0) : a[0]; }
      case 'Character.toLowerCase': { var l = String.fromCharCode(a[0]).toLowerCase(); return l.length === 1 ? l.charCodeAt(0) : a[0]; }
      case 'Character.getNumericValue': { var c = String.fromCharCode(a[0]); return /[0-9]/.test(c) ? +c : (/[a-z]/i.test(c) ? c.toLowerCase().charCodeAt(0) - 87 : -1); }
      case 'String.valueOf':
        if (argT[0] === 'char[]') { needObj(a[0], line); return new JStr(a[0].a.map(function (c) { return String.fromCharCode(c); }).join('')); }
        return new JStr(str(a[0], argT[0]));
      case 'String.join': {
        var parts = n.joinArr ? (needObj(a[1], line), a[1].a) : a.slice(1);
        return new JStr(parts.map(function (p) { return p === null ? 'null' : p.s; }).join(a[0] === null ? 'null' : a[0].s));
      }
      case 'Arrays.toString': return new JStr(arrToStr(a[0], false));
      case 'Arrays.deepToString': return new JStr(arrToStr(a[0], true));
      case 'Arrays.fill': { needObj(a[0], line); var fv = argT[1] === 'null' ? null : convert(a[1], argT[1], elemT(argT[0])); for (var fi = 0; fi < a[0].a.length; fi++) a[0].a[fi] = fv; return undefined; }
      case 'Arrays.equals': {
        var x = a[0], y = a[1];
        if (x === y) return true;
        if (x === null || y === null || x.a.length !== y.a.length) return false;
        var eT = elemT(argT[0] === 'null' ? argT[1] : argT[0]);
        for (var ei = 0; ei < x.a.length; ei++) {
          var p = x.a[ei], r = y.a[ei];
          if (eT === 'String') { if (p === null ? r !== null : (r === null || p.s !== r.s)) return false; }
          else if (eT === 'double') { if (!(Object.is(p, r) || (isNaN(p) && isNaN(r)))) return false; }
          else if (p !== r) return false;
        }
        return true;
      }
      case 'Arrays.sort': {
        needObj(a[0], line);
        var st = elemT(argT[0]), cmp;
        if (st === 'String') { a[0].a.forEach(function (e) { if (e === null) throw new JavaException('java.lang.NullPointerException', null, line); }); cmp = function (p, q) { return p.s < q.s ? -1 : p.s > q.s ? 1 : 0; }; }
        else if (st === 'double') cmp = function (p, q) {
          if (isNaN(p)) return isNaN(q) ? 0 : 1; if (isNaN(q)) return -1;
          if (p < q) return -1; if (p > q) return 1;
          if (p === 0 && q === 0) { var np = Object.is(p, -0), nq = Object.is(q, -0); return np === nq ? 0 : (np ? -1 : 1); }
          return 0;
        };
        else cmp = function (p, q) { return p - q; };
        a[0].a.sort(cmp);
        return undefined;
      }
      case 'String.format': return new JStr(jformat(a[0].s, a.slice(1), argT.slice(1), line));
    }
  }
  var FIELD_VALUES = { 'Math.PI': Math.PI, 'Math.E': Math.E, 'Integer.MAX_VALUE': 2147483647, 'Integer.MIN_VALUE': -2147483648,
    'Long.MAX_VALUE': 9223372036854775807, 'Long.MIN_VALUE': -9223372036854775808, 'Double.MAX_VALUE': Number.MAX_VALUE, 'Double.MIN_VALUE': Number.MIN_VALUE };

  function Env(parent) { this.v = Object.create(null); this.parent = parent; }
  Env.prototype.lookup = function (n) { var e = this; while (e) { if (n in e.v) return e; e = e.parent; } return null; };

  var BREAK = {}, CONTINUE = {}, RETURN = {};

  function evalExpr(n, env, rt) {
    switch (n.k) {
      case 'Lit': return n.type === 'String' ? lit(n.v) : n.v;
      case 'Paren': return evalExpr(n.e, env, rt);
      case 'Name': { var e = env.lookup(n.name); return e.v[n.name]; }
      case 'Field':
        if (n.target.type && isArr(n.target.type)) { var fo = evalExpr(n.target, env, rt); needObj(fo, n.line); return fo.a.length; }
        return FIELD_VALUES[n.target.name + '.' + n.name];
      case 'ArrayLit': return evalLit(n, env, rt);
      case 'NewObj': {
        var na = n.args.map(function (a) { return evalExpr(a, env, rt); }), nt0 = n.args.length ? n.args[0].type : null;
        if (n.cls === 'StringBuilder') {
          if (nt0 === 'String' || nt0 === 'StringBuilder') { needObj(na[0], n.line); return new JSB(na[0].s); }
          if (nt0 === 'int' && na[0] < 0) throw new JavaException('java.lang.NegativeArraySizeException', String(na[0]), n.line);
          return new JSB('');
        }
        if (!n.args.length) return new JStr('');
        needObj(na[0], n.line);
        return new JStr(nt0 === 'char[]' ? na[0].a.map(function (c) { return String.fromCharCode(c); }).join('') : na[0].s);
      }
      case 'SwitchExpr': {
        var sc = pickCase(n, env, rt);
        if (!sc) return undefined;
        var sb0 = sc.body[0];
        if (sb0.k === 'ArrowExpr') { var av = evalExpr(sb0.e, env, rt); return sb0.e.type === 'null' ? null : convert(av, sb0.e.type, n.type); }
        var yr = exec(sb0, new Env(env), rt);
        if (!yr || !yr.yld) throw new Limit('El switch ha terminado sin devolver un valor.');
        return yr.t === 'null' ? null : convert(yr.v, yr.t, n.type);
      }
      case 'NewArray':
        if (n.init) return evalLit(n.init, env, rt);
        return makeArr(n.type, n.dims.map(function (d) { return evalExpr(d, env, rt); }), 0, n.line);
      case 'Index': {
        var ao = evalExpr(n.arr, env, rt), ai = evalExpr(n.idx, env, rt);
        checkIdx(ao, ai, n.line);
        return ao.a[ai];
      }
      case 'Unary': {
        var x = evalExpr(n.e, env, rt);
        if (n.op === '!') return !x;
        if (n.op === '+') return x;
        return n.type === 'int' ? (-x) | 0 : -x;
      }
      case 'Cast': {
        var cv = evalExpr(n.e, env, rt);
        return convert(cv, n.e.type, n.to);
      }
      case 'Bin': {
        var op = n.op;
        if (op === '&&') return evalExpr(n.a, env, rt) && evalExpr(n.b, env, rt);
        if (op === '||') return evalExpr(n.a, env, rt) || evalExpr(n.b, env, rt);
        var a = evalExpr(n.a, env, rt), b = evalExpr(n.b, env, rt);
        var ta = n.a.type, tb = n.b.type;
        if (op === '+' && n.type === 'String') return new JStr(str(a, ta) + str(b, tb));
        if (op === '==' || op === '!=') {
          var eq = (isNum(ta) && isNum(tb)) ? a === b : a === b;
          return op === '==' ? eq : !eq;
        }
        if (op === '<') return a < b; if (op === '>') return a > b; if (op === '<=') return a <= b; if (op === '>=') return a >= b;
        var pt = promote(ta, tb);
        return arith(op, a, b, pt, n.line);
      }
      case 'Cond': return evalExpr(n.cond, env, rt) ? convert(evalExpr(n.a, env, rt), n.a.type, n.type === 'null' ? n.a.type : n.type) : convert(evalExpr(n.b, env, rt), n.b.type, n.type === 'null' ? n.b.type : n.type);
      case 'Assign': {
        if (n.target.k === 'Index') {
          var tobj = evalExpr(n.target.arr, env, rt), tix = evalExpr(n.target.idx, env, rt), et2 = n.target.type, nv2;
          if (n.op === '=') {
            var rv = evalExpr(n.value, env, rt);
            checkIdx(tobj, tix, n.line);
            nv2 = n.value.type === 'null' ? null : convert(rv, n.value.type, et2);
          } else {
            checkIdx(tobj, tix, n.line);
            var curv = tobj.a[tix], rv2 = evalExpr(n.value, env, rt);
            if (et2 === 'String') nv2 = new JStr(str(curv, 'String') + str(rv2, n.value.type));
            else { var pp = promote(et2, n.value.type); nv2 = convert(arith(n.op[0], curv, rv2, pp, n.line), pp, et2); }
          }
          tobj.a[tix] = nv2;
          return nv2;
        }
        var ee = env.lookup(n.target.name), tt = n.target.type;
        var val = evalExpr(n.value, env, rt), res;
        if (n.op === '=') res = n.value.type === 'null' ? null : convert(val, n.value.type, tt);
        else {
          var cur = ee.v[n.target.name], bop = n.op[0];
          if (tt === 'String') res = new JStr(str(cur, 'String') + str(val, n.value.type));
          else { var p = promote(tt, n.value.type); res = convert(arith(bop, cur, val, p, n.line), p, tt); }
        }
        ee.v[n.target.name] = res;
        return res;
      }
      case 'IncDec': {
        var t = n.target.type, old, ie, iobj, iix;
        if (n.target.k === 'Index') { iobj = evalExpr(n.target.arr, env, rt); iix = evalExpr(n.target.idx, env, rt); checkIdx(iobj, iix, n.line); old = iobj.a[iix]; }
        else { ie = env.lookup(n.target.name); old = ie.v[n.target.name]; }
        var nv = n.op === '++' ? old + 1 : old - 1;
        if (t === 'int') nv = nv | 0; else if (t === 'char') nv = ((nv % 65536) + 65536) % 65536;
        if (n.target.k === 'Index') iobj.a[iix] = nv; else ie.v[n.target.name] = nv;
        return n.prefix ? nv : old;
      }
      case 'Call': {
        var args = n.args.map(function (a) { return evalExpr(a, env, rt); });
        var argT = n.args.map(function (a) { return a.type; });
        if (n.target.k === 'Field' && n.target.target.k === 'Name' && n.target.target.name === 'System' && !env.lookup('System')) {
          var text;
          if (n.name === 'printf' || n.name === 'format') { needObj(args[0], n.line); text = jformat(args[0].s, args.slice(1), argT.slice(1), n.line); }
          else if (argT[0] === 'char[]') { needObj(args[0], n.line); text = args[0].a.map(function (c) { return String.fromCharCode(c); }).join('') + (n.name === 'println' ? '\n' : ''); }
          else text = (args.length ? str(args[0], argT[0]) : '') + (n.name === 'println' ? '\n' : '');
          rt.write(text);
          return undefined;
        }
        if (n.target.k === 'Name' && !env.lookup(n.target.name) && own(STATIC, n.target.name)) return callStatic(n.target.name, n.name, args, argT, n.line, n);
        var obj = evalExpr(n.target, env, rt);
        if (n.target.type === 'StringBuilder') return callSB(obj, n.name, args, argT, n.line);
        return callString(obj, n.name, args, argT, n.line);
      }
    }
  }

  function checkIdx(o, i, line) {
    if (o === null) throw new JavaException('java.lang.NullPointerException', null, line);
    if (i < 0 || i >= o.a.length) throw new JavaException('java.lang.ArrayIndexOutOfBoundsException', 'Index ' + i + ' out of bounds for length ' + o.a.length, line);
  }
  function evalLit(lit, env, rt) {
    var et = elemT(lit.type);
    cellCount += lit.elems.length;
    return new JArr(lit.type, lit.elems.map(function (e) {
      if (e.k === 'ArrayLit') return evalLit(e, env, rt);
      var v = evalExpr(e, env, rt);
      return e.type === 'null' ? null : convert(v, e.type, et);
    }));
  }
  function caseKey(v, t) { return t === 'String' ? 's' + v.s : 'n' + v; }
  function pickCase(n, env, rt) {
    var v = evalExpr(n.sel, env, rt), t = n.sel.type;
    if (t === 'String') needObj(v, n.sel.line);
    if (!n.keys) {
      n.keys = n.cases.map(function (c) { return c.labels.map(function (l) { var lv = evalExpr(l, env, rt); return t === 'String' ? 's' + lv.s : 'n' + convert(lv, l.type, t); }); });
    }
    var k = caseKey(v, t), def = null;
    for (var i = 0; i < n.cases.length; i++) {
      if (n.keys[i].indexOf(k) >= 0) { n.lastIdx = i; return n.cases[i]; }
      if (n.cases[i].isDefault && def === null) def = i;
    }
    n.lastIdx = def;
    return def === null ? null : n.cases[def];
  }
  function exec(st, env, rt) {
    rt.tick();
    switch (st.k) {
      case 'Block': {
        var be = new Env(env);
        for (var i = 0; i < st.body.length; i++) { var r = exec(st.body[i], be, rt); if (r) return r; }
        return null;
      }
      case 'Empty': return null;
      case 'VarDecl':
        st.decls.forEach(function (d) {
          var v;
          if (d.init && d.init.k === 'ArrayLit') v = evalLit(d.init, env, rt);
          else if (d.init) { var iv = evalExpr(d.init, env, rt); v = d.init.type === 'null' ? null : convert(iv, d.init.type, d.type); }
          env.v[d.name] = v;
        });
        return null;
      case 'ExprStmt': evalExpr(st.expr, env, rt); return null;
      case 'If':
        if (evalExpr(st.cond, env, rt)) return exec(st.then, new Env(env), rt);
        if (st.els) return exec(st.els, new Env(env), rt);
        return null;
      case 'While':
        while (evalExpr(st.cond, env, rt)) {
          rt.tick();
          var w = exec(st.body, new Env(env), rt);
          if (w === BREAK) break; if (w && w !== CONTINUE) return w;
        }
        return null;
      case 'DoWhile':
        do {
          rt.tick();
          var dw = exec(st.body, new Env(env), rt);
          if (dw === BREAK) break; if (dw && dw !== CONTINUE) return dw;
        } while (evalExpr(st.cond, env, rt));
        return null;
      case 'For': {
        var fe = new Env(env);
        st.init.forEach(function (i) { if (i.k === 'VarDecl') exec(i, fe, rt); else evalExpr(i, fe, rt); });
        while (!st.cond || evalExpr(st.cond, fe, rt)) {
          rt.tick();
          var f = exec(st.body, new Env(fe), rt);
          if (f === BREAK) break; if (f && f !== CONTINUE) return f;
          st.upd.forEach(function (u) { evalExpr(u, fe, rt); });
        }
        return null;
      }
      case 'ForEach': {
        var arr = evalExpr(st.iter, env, rt);
        if (arr === null) throw new JavaException('java.lang.NullPointerException', null, st.line);
        var len = arr.a.length, iet = elemT(st.iter.type);
        for (var k = 0; k < len; k++) {
          rt.tick();
          var le = new Env(env);
          le.v[st.name] = arr.a[k] === null ? null : convert(arr.a[k], iet, st.type);
          var fr = exec(st.body, le, rt);
          if (fr === BREAK) break; if (fr && fr !== CONTINUE) return fr;
        }
        return null;
      }
      case 'Switch': {
        var c0 = pickCase(st, env, rt);
        if (!c0) return null;
        var se = new Env(env);
        if (st.arrow) { var ar = exec(c0.body[0], new Env(env), rt); return ar === BREAK ? null : ar; }
        // las variables declaradas en un case existen en todo el switch (aunque se salte su declaración)
        st.cases.forEach(function (c) { c.body.forEach(function (b) { if (b.k === 'VarDecl') b.decls.forEach(function (d) { se.v[d.name] = undefined; }); }); });
        for (var ci = st.lastIdx; ci < st.cases.length; ci++) {
          for (var bi = 0; bi < st.cases[ci].body.length; bi++) {
            var sr = exec(st.cases[ci].body[bi], se, rt);
            if (sr === BREAK) return null;
            if (sr) return sr;
          }
        }
        return null;
      }
      case 'Yield': return { yld: true, v: evalExpr(st.e, env, rt), t: st.e.type };
      case 'Break': return BREAK;
      case 'Continue': return CONTINUE;
      case 'Return': return RETURN;
    }
  }

  // ---------- API ----------
  function run(source, opts) {
    opts = opts || {};
    var out = '', steps = 0, maxSteps = opts.maxSteps || 2000000, maxOut = opts.maxOut || 100000;
    interned = {}; hashSeed = 0; cellCount = 0;
    var rt = {
      write: function (s) { out += s; if (out.length > maxOut) throw new Limit('El programa ha escrito demasiado texto en la consola: puede que tengas un bucle infinito.'); },
      tick: function () { if (++steps > maxSteps) throw new Limit('El programa está tardando demasiado: puede que tengas un bucle infinito (revisa la condición y la actualización del bucle).'); }
    };
    var ast;
    try {
      ast = new Parser(lex(source)).program();
      check(ast, new Scope(null), { loops: 0, sw: 0 });
    } catch (e) {
      if (e instanceof CompileError) return { ok: false, kind: 'compile', output: '', error: e.message, line: e.line };
      throw e;
    }
    try {
      exec(ast, new Env(null), rt);
      return { ok: true, output: out };
    } catch (e) {
      if (e instanceof JavaException) return { ok: false, kind: 'runtime', output: out, error: 'Exception in thread "main" ' + e.cls + (e.message !== null ? ': ' + e.message : ''), line: e.line };
      if (e instanceof Limit) return { ok: false, kind: 'limit', output: out, error: e.message };
      if (e instanceof RangeError) return { ok: false, kind: 'limit', output: out, error: 'El programa es demasiado complejo para este playground.' };
      throw e;
    }
  }
  return { run: run, formatDouble: fmtDouble, api: { STRING_METHODS: STRING_METHODS, SB_METHODS: SB_METHODS, STATIC: STATIC, STATIC_FIELDS: STATIC_FIELDS } };
})();
if (typeof module !== 'undefined') module.exports = MiniJava;
