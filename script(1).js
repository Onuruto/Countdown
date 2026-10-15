(function () {
  'use strict';

  // Fester Zielzeitpunkt: 20 Stunden ab Mi 14.10.2026 19:00 Uhr
  // = Do, 15. Oktober 2026, 15:00 Uhr MESZ (= 13:00 UTC)
  var TARGET = Date.UTC(2026, 9, 15, 13, 0, 0);

  var body = document.body;
  var lastSecond = null;
  var knockedOut = false;
  var hitTimer = null;

  function el(id) {
    return document.getElementById(id);
  }

  function pad(n) {
    return (n < 10 ? '0' : '') + n;
  }

  // Treffer: Klasse kurz entfernen, Reflow erzwingen, neu setzen — sonst
  // startet die Animation beim zweiten Mal nicht.
  function hit() {
    body.classList.remove('hit');
    void body.offsetWidth;
    body.classList.add('hit');

    clearTimeout(hitTimer);
    hitTimer = setTimeout(function () {
      body.classList.remove('hit');
    }, 460);
  }

  function knockout() {
    knockedOut = true;
    body.classList.remove('final');
    body.classList.add('over');
    el('ko').hidden = false;
    hit();
  }

  function render() {
    var left = TARGET - Date.now();

    if (left <= 0) {
      if (!knockedOut) knockout();
      return;
    }

    body.classList.toggle('final', left <= 3600000);

    var t = Math.floor(left / 1000);
    var s = t % 60;

    el('d').textContent = pad(Math.floor(t / 86400));
    el('h').textContent = pad(Math.floor((t % 86400) / 3600));
    el('m').textContent = pad(Math.floor((t % 3600) / 60));
    el('s').textContent = pad(s);

    if (s !== lastSecond) {
      if (lastSecond !== null) hit();
      lastSecond = s;
    }
  }

  render();
  setInterval(render, 100);

  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) render();
  });
})();
