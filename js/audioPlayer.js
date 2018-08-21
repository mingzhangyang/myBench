/**
 * Created by yangm11 on 8/21/2018.
 */
'use strict';

(function () {
  let audioPlayer = document.getElementById('audio-player');
  let startPause = document.getElementsByClassName('start-pause-icon')[0];
  startPause.addEventListener('click', () => {
    audioPlayer.classList.toggle('playing');
    audioPlayer.classList.toggle('paused');
  })
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