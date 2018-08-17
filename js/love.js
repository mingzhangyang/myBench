/**
 * Created by yangm11 on 8/17/2018.
 */
'use strict';
(function() {
  let arr = [];
  let N = 60;
  let R = 100; // radius
  let unitAngle = 2 * Math.PI / N;
  for (let i = 0; i < N; i++) {
    arr.push((i + .5) * unitAngle);
  }
// console.log(arr);
  let coor = arr.map(d => {
    return {
      x: R * Math.sin(d),
      y: R - R * Math.cos(d)
    };
  });
// console.log(coor);
  let div = document.getElementsByClassName('inner')[0];
  for (let i = 0; i < N; i++) {
    let c = document.createElement('div');
    c.classList.add('circle');
    let d = Math.sqrt(Math.pow(coor[i].x, 2) + Math.pow(coor[i].y, 2)) * 2;
    // console.log(d);
    c.style.width = d + 'px';
    c.style.height = d + 'px';
    c.style.left = coor[i].x + 'px';
    c.style.top = coor[i].y + 'px';
    c.style.transform = `translate(-50%, -50%)`;
    div.appendChild(c);
  }
})();
if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
}