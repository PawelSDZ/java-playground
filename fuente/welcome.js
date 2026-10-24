// ----- bienvenida personalizada -----
  (function () {
    var LEVELS = /*LEVELS*/false;
    var overlay = $('welcomeOverlay'), editing = false, startIdx = 0;
    var nameLink = document.createElement('button');
    nameLink.type = 'button'; nameLink.className = 'name-link'; nameLink.id = 'nameLink';
    $('brandSub').insertAdjacentElement('afterend', nameLink);
    state.visits = (state.visits || 0) + 1; save();
    function paintName() {
      $('brandSub').textContent = state.name ? 'Hola, ' + state.name : 'Ejercicios de 1.º de DAM';
      $('brandSub').appendChild(nameLink);
      nameLink.textContent = state.name ? 'Cambiar nombre' : 'Poner mi nombre';
    }
    function open(edit) {
      editing = edit;
      $('askTitle').textContent = edit ? (state.name ? 'Cambiar tu nombre' : '¿Cómo te llamas?') : 'Te damos la bienvenida a Java Playground';
      $('askIntro').hidden = edit;
      if (LEVELS) $('levelField').hidden = edit;
      $('nameInput').value = edit ? (state.name || '') : '';
      $('skipName').textContent = edit ? 'Cancelar' : 'Prefiero no decirlo';
      $('askDialog').hidden = false; $('helloDialog').hidden = true;
      overlay.hidden = false; document.body.style.overflow = 'hidden';
      setTimeout(function () { $('nameInput').focus(); $('nameInput').select(); }, 50);
    }
    function close() { overlay.hidden = true; document.body.style.overflow = ''; }
    function finish(name) {
      state.name = name || ''; state.welcomed = true; save(); paintName();
      if (LEVELS && !editing) {
        var picked = document.querySelector('input[name="lvl"]:checked');
        state.level = picked ? picked.value : EXERCISES[0].group; save();
        startIdx = Math.max(0, EXERCISES.map(function (x) { return x.group; }).indexOf(state.level));
      }
      if (!name || editing) { close(); if (LEVELS && !editing) go(startIdx); else nameLink.focus(); return; }
      var se = EXERCISES[startIdx];
      $('helloGo').textContent = 'Ir al ejercicio ' + (startIdx + 1);
      $('helloText').textContent = 'Empieza por ' + se.title + ' (' + se.group + '). Si te atascas, tienes pistas que se desbloquean de una en una.';
      $('askDialog').hidden = true;
      $('helloTitle').textContent = '¡Hola, ' + name + '!';
      $('helloDialog').hidden = false;
      $('helloGo').focus();
    }
    $('askDialog').addEventListener('submit', function (ev) { ev.preventDefault(); finish($('nameInput').value.trim().slice(0, 30)); });
    $('skipName').addEventListener('click', function () { if (editing) { close(); nameLink.focus(); } else finish(''); });
    nameLink.addEventListener('click', function () { open(true); });
    $('helloGo').addEventListener('click', function () { close(); go(startIdx); });
    overlay.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') { if (!$('helloDialog').hidden || editing) close(); else finish(''); } });
    paintName();
    if (!state.welcomed) { open(false); return; }
    var done = EXERCISES.filter(function (e) { return state.solved[e.id]; }).length, left = EXERCISES.length - done, e = ex();
    if (state.visits < 2 || (!done && !Object.keys(state.code || {}).length)) return;
    $('welcomeTitle').textContent = state.name ? '¡Hola de nuevo, ' + state.name + '!' : '¡Hola de nuevo!';
    $('welcomeText').textContent = left === 0
      ? 'Has completado los ' + EXERCISES.length + ' ejercicios. Puedes repasar cualquiera desde la lista.'
      : 'Te quedaste en ' + e.title + ' (' + e.group + '). ' + (left === 1 ? 'Te falta 1 ejercicio.' : 'Te faltan ' + left + ' ejercicios.');
    $('welcomeCard').hidden = false;
    $('welcomeClose').addEventListener('click', function () { $('welcomeCard').hidden = true; });
    $('welcomeGo').addEventListener('click', function () { $('welcomeCard').hidden = true; codeEl.focus(); });
  })();
