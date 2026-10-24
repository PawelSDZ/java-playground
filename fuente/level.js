// ----- prueba de nivel por sección -----
  (function () {
    var groups = [];
    EXERCISES.forEach(function (e, i) {
      var g = groups[groups.length - 1];
      if (!g || g.name !== e.group) groups.push(g = { name: e.group, first: i, last: i });
      g.last = i;
    });
    function groupOf(i) { for (var k = 0; k < groups.length; k++) if (i >= groups[k].first && i <= groups[k].last) return k; return 0; }
    state.skipChallenge = state.skipChallenge || {};
    var done = document.createElement('div');
    done.className = 'challenge-done'; done.id = 'challengeDone'; done.hidden = true;
    done.innerHTML = '<p id="challengeDoneText"></p><div class="row"><button type="button" class="go" id="challengeNext"></button><button type="button" class="stay" id="challengeStay">Repasar esta sección</button></div>';
    $('altBox').insertAdjacentElement('afterend', done);

    function paintCard() {
      var k = groupOf(state.current), g = groups[k], card = $('challengeCard');
      var anySolved = false;
      for (var i = g.first; i <= g.last; i++) if (state.solved[EXERCISES[i].id]) anySolved = true;
      var show = state.current === g.first && g.last > g.first && !anySolved && !state.skipChallenge[g.name];
      card.hidden = !show;
      if (!show) return;
      var reto = EXERCISES[g.last];
      $('challengeTitle').textContent = '¿Ya dominas ' + g.name + '?';
      $('challengeText').textContent = 'Prueba el ejercicio más difícil de la sección, ' + reto.title + '. Si lo resuelves, podrás pasar directamente al siguiente tema.';
    }
    $('challengeGo').addEventListener('click', function () { var g = groups[groupOf(state.current)]; go(g.last); });
    $('challengeNo').addEventListener('click', function () {
      state.skipChallenge[groups[groupOf(state.current)].name] = true; save(); $('challengeCard').hidden = true;
    });
    hooks.render.push(paintCard);
    hooks.solved.push(function (e, auto) {
      if (auto) return;
      var i = EXERCISES.indexOf(e), k = groupOf(i), g = groups[k];
      if (i !== g.last) return;
      var pending = 0;
      for (var j = g.first; j < g.last; j++) if (!state.solved[EXERCISES[j].id]) pending++;
      if (!pending) return;
      var next = groups[k + 1];
      $('challengeDoneText').textContent = next
        ? '¡Reto superado! Dominas ' + g.name + '. Puedes pasar a ' + next.name + ' o repasar los ejercicios de esta sección que te faltan.'
        : '¡Has superado el último reto! Si quieres, repasa los ejercicios de ' + g.name + ' que te faltan.';
      var btn = $('challengeNext');
      btn.hidden = !next;
      if (next) btn.textContent = 'Ir a ' + next.name;
      done.hidden = false;
    });
    $('challengeNext').addEventListener('click', function () { var k = groupOf(state.current); if (groups[k + 1]) go(groups[k + 1].first); });
    $('challengeStay').addEventListener('click', function () {
      var g = groups[groupOf(state.current)];
      for (var j = g.first; j <= g.last; j++) if (!state.solved[EXERCISES[j].id]) { go(j); return; }
    });
    paintCard();
  })();