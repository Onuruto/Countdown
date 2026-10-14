(function () {
  'use strict';

  // Fester Zielzeitpunkt: 15. Oktober 2026, 15:21 Uhr MESZ (= 13:21 UTC)
  var TARGET = Date.UTC(2026, 9, 15, 13, 21, 0);

  function el(id) {
    return document.getElementById(id);
  }

  function pad(n) {
    return (n < 10 ? '0' : '') + n;
  }

  function render() {
    var left = TARGET - Date.now();

    if (left <= 0) {
      document.body.classList.add('over');
      document.body.classList.remove('final');
      el('over').hidden = false;
      return;
    }

    document.body.classList.toggle('final', left <= 3600000);

    var t = Math.floor(left / 1000);
    el('d').textContent = pad(Math.floor(t / 86400));
    el('h').textContent = pad(Math.floor((t % 86400) / 3600));
    el('m').textContent = pad(Math.floor((t % 3600) / 60));
    el('s').textContent = pad(t % 60);
  }

  render();
  setInterval(render, 250);

  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) render();
  });
})();