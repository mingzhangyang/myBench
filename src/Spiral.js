/**
 * Created by yangm11 on 7/12/2018.
 */
'use strict';

function draw(n) {
  let svg = document.getElementById('svg');
  let angle = 360 / n;
  console.log(angle);
  let dx = 150 * Math.sin(angle / 180 * Math.PI);
  let dy = 150 * Math.cos(angle / 180 * Math.PI);
  let endPx = 300 + dx;
  let endPy = 150 - dy;
  console.log(endPx, endPy);
  let context = '';
  let i = 0;
  for (i; i < n; i++) {
    context += `<g transform="rotate(${angle * i}, 300, 300)" class="${i % 2
    === 0 ? 'red' : 'white'}"><path d="M300 300 A 150 150 0 1 1 ${endPx} ${endPy} A 150 150 0 0 0 300 300" ></g> `;
  }
  svg.innerHTML = context;
}
draw(20);
document.getElementById('number').addEventListener('change', function () {
  let n = +this.value;
  if (n) {
    if (n < 3) {
      alert('Numbers smaller than 3 is not allowed.');
      return;
    }
    if (n % 2 !== 0) {
      alert('An even number expected. However, will draw with the odd number.')
    }
    draw(n);
  } else {
    alert(`Failed to convert "${this.value}" to number.`);
  }
});
document.getElementById('btn').addEventListener('click', function () {
  let v = document.getElementById('number').value
  let n = +v;
  if (n) {
    if (n < 3) {
      alert('Numbers smaller than 3 is not allowed.');
      return;
    }
    if (n % 2 !== 0) {
      alert('An even number expected. However, will draw with the odd number.')
    }
    draw(n);
  } else {
    alert(`Failed to convert "${v}" to number.`);
  }
});

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
}