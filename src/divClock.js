/**
 * Created by yangm11 on 7/9/2018.
 */
'use strict';

function init() {
  let h = document.getElementById('hour');
  let m = document.getElementById('minute');
  let s = document.getElementById('second');
  let d = new Date();
  h.style.transform = `rotate(${30 * (d.getHours() % 12 + (d.getMinutes() * 60 + d.getSeconds()) / 3600)  - 90}deg)`;
  m.style.transform = `rotate(${6 * d.getMinutes() + (d.getSeconds() / 60) - 90}deg)`;
  s.style.transform = `rotate(${6 * d.getSeconds() - 90}deg)`;
}

window.onload = function() {
  init();
};

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
}