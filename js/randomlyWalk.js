/**
 * Created by yangm11 on 7/5/2018.
 */
'use strict';

class Point {
  constructor(ctx, x, y, radius, step) {
    this.x = x;
    this.y = y;
    this.radius = radius ? radius : 2;
    this.x0 = 0;
    this.y0 = 0;
    this.step = step ? step : 10;
    this.ctx = ctx;
  }
  move() {
    this.x0 = this.x;
    this.y0 = this.y;
    let r = Math.random();
    let xStep = Math.random() * this.step;
    if (r > 0.5) {
      this.x += xStep;
    } else {
      this.x -= xStep;
    }
    r = Math.random();
    let yStep = Math.random() * this.step;
    if (r > 0.5) {
      this.y += yStep;
    } else {
      this.y -= yStep;
    }
  }
  reset() {
    this.x = 0;
    this.y = 0;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x0, this.y0, this.radius, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(this.x0, this.y0);
    ctx.lineTo(this.x, this.y);
    ctx.closePath();
    ctx.stroke();
  }
  walk(n) {
    for (let i = 0; i < n; i++) {
      this.move();
      this.draw(this.ctx);
    }
  }
}

function pullSetting() {
  return {
    stepCount: +document.getElementById('step-count').value,
    stepLength: +document.getElementById('step-length').value,
    strokeColor: document.getElementById('stroke-color').value
  }
}

function randomWalk() {
  let myc = document.getElementById('my-canvas');
  let rect = myc.getBoundingClientRect();
  let w = rect.width;
  let h = rect.height;
  let userSetting = pullSetting();
  let ctx = myc.getContext('2d');
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = userSetting.strokeColor;
  let p = new Point(ctx, (+w)/2, (+h)/2, 2, userSetting.stepLength);
  p.walk(userSetting.stepCount);
  console.log('debug');
  console.log(w);
  console.log(h);
  console.log(userSetting);
}

window.onload = function () {
  randomWalk();
  let inputs = document.getElementsByTagName('input');
  for (let input of inputs) {
    input.addEventListener('change', randomWalk);
  }
};

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
}