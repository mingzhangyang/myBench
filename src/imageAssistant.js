/**
 * Created by yangm11 on 8/1/2018.
 */
'use strict';

function setImgSrcLocal() {
  return new Promise((res, rej) => {
    let img = document.getElementById('img-store');
    let file = document.getElementById('local-image').files[0];
    if (!file) {
      alert('Please select an image from your computer.');
      return
    }
    if (!(/\.(jpe?g|png|gif)$/i.test(file.name))) {
      alert('Only JPG/JPEG, PNG, gif files are supported.');
      return;
    }
    let reader = new FileReader();
    reader.addEventListener('load', function() {
      img.src = reader.result;
      res('Image loaded.');
    }, false);
    reader.onerror = () => {
      rej('error happens');
    };
    reader.readAsDataURL(file);
  });
}

function setImgSrcRemote() {
  return new Promise((res, rej) => {
    let url = document.getElementById('remote-image').value;
    if (!url) {
      alert('Please provide the url of an image.');
      return;
    }
    if (!(/\.(jpe?g|png|gif)$/i.test(url))) {
      alert('Only JPG/JPEG, PNG, gif files are supported.');
      return;
    }
    let img = document.getElementById('img-store');
    img.src = url;
    img.onload = () => {
      res('Image loaded.')
    };
    img.onerror = () => {
      rej('error happens');
    };
  });
}

function drawCanvas() {
  restore();
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let img = document.getElementById('img-store');
  if (+img.width === 0 || +img.height === 0) {
    alert('No image data. Have you choose an image?');
  }
  // console.log(img.src);
  console.log(img.width, img.height);
  canvas.width = img.width;
  canvas.height = img.height;
  if (ctx) {
    ctx.drawImage(img, 0, 0);
    showRotationControl();
    showResizeControl();
  }
}

function gray() {

}

function invert() {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let img = document.getElementById('img-store');
  if (+img.width === 0 || +img.height === 0) {
    alert('No image data. Have you choose an image?');
  }
  // console.log(img.src);
  console.log(img.width, img.height);
  canvas.width = img.width;
  canvas.height = img.height;
  if (ctx) {
    ctx.drawImage(img, 0, 0);
    showRotationControl();
    showResizeControl();
  }
}

function restore() {
  let rs = document.querySelectorAll('input[type="range"]');
  for (let i = 0; i < rs.length; i++) {
    rs[i].value = i;
  }
  document.getElementById('canvas').style.transform = 'translate(-50%, -50%)';
}

function showRotationControl() {
  document.getElementsByClassName('for-rotation')[0].style.display = 'block';
}
function showResizeControl() {
  document.getElementsByClassName('for-resize')[0].style.display = 'block';
}

function init() {
  restore();
  document.getElementById('local-image').addEventListener('change', () => {
    setImgSrcLocal().then(drawCanvas).catch(console.log);
  });
  document.getElementById('remote-image').addEventListener('change', () => {
    setImgSrcRemote().then(drawCanvas).catch(console.log);
  });
  document.getElementById('buttons').addEventListener('click', function (evt) {
    if (evt.target.tagName === 'BUTTON') {
      switch (evt.target.innerText) {
        case 'Gray':
          break;
        case 'Invert':
          break;
        case 'Collage':

          break;
        case 'Cut':
          break;
        case 'Restore':
          restore();
          drawCanvas();
          break;
        default:
          alert('This should not be seen.');
      }
    }
  });
  document.getElementById('slider-1').addEventListener('input', function () {
    let v = this.value;
    let tp = document.getElementsByClassName('tooltiptext')[0];
    tp.innerText = v;
    tp.style.transform = `translateX(${v *31 / 30}px)`;
    let canvas = document.getElementById('canvas');
    // console.log(canvas.style.transform);
    if (canvas.style.transform.indexOf('rotate') === -1) {
      canvas.style.transform += ` rotate(${v}deg)`;
    } else {
      canvas.style.transform = canvas.style.transform.replace(/rotate\(-?\d+deg\)/gi, `rotate(${v}deg)`);
    }
  });
  document.getElementById('slider-2').addEventListener('input', function () {
    let v = +this.value;
    v = v >= 1 ? (v-1) * 10 + 1 : v;
    // console.log(v.toFixed(2));
    let tp = document.getElementsByClassName('tooltiptext')[1];
    tp.innerText = v.toFixed(2) + ' X';
    tp.style.transform = `translateX(${(+this.value-1)*125}px) rotate(90deg)`;
    let canvas = document.getElementById('canvas');
    // console.log(canvas.style.transform);
    if (canvas.style.transform.indexOf('scale') === -1) {
      canvas.style.transform += ` scale(${v.toFixed(2)})`;
    } else {
      canvas.style.transform = canvas.style.transform.replace(/scale\(\d\.*\d*\)/gi, `scale(${v.toFixed(2)})`);
    }
  });
  console.log('init invoked');
}

init();

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
}