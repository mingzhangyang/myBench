/**
 * Created by yangm11 on 8/3/2018.
 */

// import {detectShapes2} from '../../commonUse/algorithm/countShapes';
// console.log(detectShapes2);

(function () {

  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f66';
  ctx.fillRect(20, 20, 80, 80);
  ctx.fillStyle = 'blue';
  ctx.fillRect(200, 200, 80, 80);
  ctx.fillStyle = 'purple';
  ctx.fillRect(20, 200, 80, 80);

  let rows = 500;
  let cols = 500;
  let m = [];
  for (let i = 0; i < rows; i++) {
    m[i] = new Array(cols);
  }
  let data = ctx.getImageData(0, 0, 500, 500).data;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let idx = i * cols + j;
      let r = data[idx * 4];
      let g = data[idx * 4 + 1];
      let b = data[idx * 4 + 2];
      let y = data[idx * 4 + 4];
      // if (i < 10 && j < 10) {
      //   console.log(r, g, b, y);
      // }
      if (r === 0 && g === 0 && b === 0) {
        m[i][j] = 0;
      } else {
        m[i][j] = 1;
      }
    }
  }

  let sum = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      sum += m[i][j];
    }
  }

  let num = Object.keys(detectShapes2(m)).length;
  alert('There are ' + num + ' objects on the image');
})();
