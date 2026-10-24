// Auditoría: para cada ejercicio prueba la solución oficial y los casos de pruebas/casos.js
// (ok = deben darse por buenos, bad = no deben colar) en la página experimental real.
// Uso (desde fuente/):  NODE_PATH=$(npm root -g) node pruebas/auditoria.js
const path = require('path');
const { chromium } = require('playwright');
const CASES = require('./casos.js');
// Diferencias conocidas y aceptadas a propósito (ver LEEME.md)
const ESPERADAS = ['r5|INCORRECTA ACEPTADA', 'r1|VÁLIDA RECHAZADA'];

(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.join(__dirname, '..', 'salida', 'pruebas_completa.html')); await p.waitForTimeout(400);
  await p.click('#skipName');
  const ex = await p.evaluate(() => EXERCISES.map(e => ({ id: e.id, title: e.title, starter: e.starter, solution: e.solution })));
  let problems = 0, expected = 0, total = 0;
  const fallo = (id, tipo, msg) => {
    if (ESPERADAS.includes(id + '|' + tipo)) { expected++; return; }
    problems++; console.log('✗', id, '|', tipo, '|', msg);
  };
  for (let i = 0; i < ex.length; i++) {
    const e = ex[i];
    await p.evaluate(i => { document.querySelector('.ex-btn[data-i="' + i + '"]').click(); }, i);
    const tryCode = async (code) => {
      await p.fill('#code', code); await p.click('#runBtn');
      return { badge: (await p.textContent('#badge')).trim(), note: (await p.textContent('#note')).trim() };
    };
    const r0 = await tryCode(e.solution); total++;
    if (!(r0.badge.startsWith('¡Correcto!') && !r0.badge.includes('formato'))) fallo(e.id, 'SOLUCIÓN OFICIAL', r0.badge + ' ' + r0.note);
    const c = CASES[e.id] || { ok: [], bad: [] };
    for (const code of c.ok) {
      const r = await tryCode(e.starter + code); total++;
      if (!r.badge.startsWith('¡Correcto!')) fallo(e.id, 'VÁLIDA RECHAZADA', r.badge + ' | ' + code.replace(/\n/g, ' ⏎ '));
    }
    for (const code of c.bad) {
      const r = await tryCode(e.starter + code); total++;
      if (r.badge.startsWith('¡Correcto!')) fallo(e.id, 'INCORRECTA ACEPTADA', r.badge + ' | ' + code.replace(/\n/g, ' ⏎ '));
    }
  }
  console.log('\nEjercicios:', ex.length, '| pruebas:', total, '| problemas:', problems, '| diferencias conocidas:', expected, '| errores JS:', errs.length ? errs : 'ninguno');
  await b.close();
  process.exit(problems || errs.length ? 1 : 0);
})();
