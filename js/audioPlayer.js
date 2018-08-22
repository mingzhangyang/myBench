/**
 * Created by yangm11 on 8/21/2018.
 */
'use strict';

(function () {
  let audioPlayer = document.getElementById('audio-player');
  let startPause = document.getElementById('start-pause-icon');
  startPause.addEventListener('click', () => {
    audioPlayer.classList.toggle('playing');
    audioPlayer.classList.toggle('paused');
  });

  let icons = document.getElementsByClassName('control-icon');
  for (let icon of icons) {
    icon.addEventListener('click', function () {
      icon.classList.add('control-icon-active');
      setTimeout(function () {
        icon.classList.remove('control-icon-active');
      }, 1000);
    });
  }

  let loopOrder = document.getElementById('loop-order-icon');
  loopOrder.addEventListener('click', function () {
    audioPlayer.classList.toggle('randomly-ordered');
  });
})();

if (typeof module !== 'undefined' && module.parent) {
  // Node environment, required as module
}
else if (typeof window === 'object') {
// Browser environment
    } else {
  // Node environment, run directly
  // test code go here
}