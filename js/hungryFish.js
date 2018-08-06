/**
 * Created by yangm11 on 7/10/2018.
 */
'use strict';

function init() {
  let c = document.getElementById('uid-1');
  let field = document.getElementById('field');
  let b = document.getElementById('bait');
  function pursue (evt) {
    let des = {
      x: evt.clientX,
      y: evt.clientY
    };

    let p0 = field.getBoundingClientRect();
    b.style.top = `${des.y - p0.top - 20}px`;
    b.style.left = `${des.x - p0.left - 20}px`;
    b.classList.remove('hidden');
    setTimeout(function () {
      b.classList.add('hidden');
      // console.log('should disappear');
    }, Math.random() * 1000 + 1000);
    let pre = c.getBoundingClientRect();
    if (pre.left < des.x - 200) {
      c.style.top = `${des.y - p0.top - 100}px`;
      setTimeout(function () {
        c.style.left = `${des.x - p0.left - 100}px`;
        // setTimeout(() => {
        //   b.classList.add('hidden');
        // }, 1000);
      }, 900);
    } else {
      c.style.left = `${des.x - p0.left - 300}px`;
      c.style.top = `${des.y - p0.top - 100}px`;
      setTimeout(function () {
        c.style.left = `${des.x - p0.left - 100}px`;
        // setTimeout(() => {
        //   b.classList.add('hidden');
        // }, 1000);
      }, 1000);
    }
  }
// field.addEventListener('mousemove', function (evt) {
//   pursue(evt);
// });
  field.addEventListener('click', function (evt) {
    pursue(evt);
  });
}
init();

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
}