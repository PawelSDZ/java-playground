// ----- solución de referencia al acertar, para comparar -----
  (function () {
    var box = document.createElement('div');
    box.className = 'alt solved-extra'; box.id = 'refBox'; box.hidden = true;
    box.innerHTML = '<div class="label">Solución de referencia</div><pre id="refCode"></pre><p id="refWhy"></p>';
    $('altBox').insertAdjacentElement('beforebegin', box);
    hooks.solved.push(function (e) {
      $('refCode').textContent = e.solution;
      $('refWhy').textContent = 'Compárala con la tuya: si llegas al mismo resultado de otra forma, también vale. ' + e.explanation;
      box.hidden = false;
    });
  })();