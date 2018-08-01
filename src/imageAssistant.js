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
  }
}

function gray() {

}

function invert() {

}

function showRotationControl() {
  let ctrl = document.getElementsByClassName('for-rotation')[0];
  ctrl.style.display = 'block';
}

function init() {
  document.getElementById('local-image').addEventListener('change', () => {
    setImgSrcLocal().then(drawCanvas).catch(console.log);
  });
  document.getElementById('remote-image').addEventListener('change', () => {
    setImgSrcRemote().then(drawCanvas).catch(console.log);
  });
  document.getElementById('buttons').addEventListener('click', function (evt) {
    if (evt.target.tagName === 'BUTTON') {
      switch (evt.target.innerText) {
        case 'Show':
          drawCanvas();
          break;
        case 'Gray':
          break;
        case 'Invert':
          break;
        case 'Rotate':
          showRotationControl();
          break;
        case 'Cut':
          break;
        case 'Restore':
          drawCanvas();
          break;
        default:
          alert('This should not be seen.');
      }
    }
  });
  document.getElementById('slider').addEventListener('input', function () {
    let v = this.value;
    let tp = document.getElementsByClassName('tooltiptext')[0];
    tp.innerText = v;
    tp.style.transform = `translateX(${v *31 / 30}px)`;
    document.getElementById('canvas-area').style.transform = `rotate(${v}deg)`;
  });
  console.log('init invoked');
}

init();

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
}