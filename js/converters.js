/**
 * Created by yangm11 on 8/21/2018.
 */
'use strict';
function rgb2hex(r, g, b) {
  let res = '#';
  for (let t of arguments) {
    let th = Number(t).toString(16);
    res += th.length === 1 ? `0${th}` : th;
  }
  return res;
}

function processRGB(str) {
  let re = /(\d+),*\s*/g;
  return rgb2hex(re.exec(str)[1], re.exec(str)[1], re.exec(str)[1]);
}

function processHex(str) {
  let res = '';
  try {
    res = hex2rgb(str)
  } catch(err) {
    return {error: err};
  }
  return res;
}

(function () {
  let rgb2hex = document.getElementById('rgb2hex');
  let hex2rgb = document.getElementById('hex2rgb');
  let rgbCode = document.getElementById('rgb-code');
  let hexCode = document.getElementById('hex-code');
  let show = document.getElementsByClassName('example-show')[0];
  rgb2hex.addEventListener('click', function () {
    if (rgbCode.value.indexOf(',')) {
      alert('Please check your RGB code.');
      return;
    }
    hexCode.value = processRGB(rgbCode.value);
    show.style.backgroundColor = hexCode.value;
  });
  hex2rgb.addEventListener('click', function () {
    let res = processHex(hexCode.value);
    if (typeof res === 'object') {
      alert(res.error);
      return;
    }
    rgbCode.value = res;
    show.style.backgroundColor = res;
  })
})();



if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
  console.log(rgb2hex(33, 66, 99));
  console.log(processRGB('22, 33, 44'));
}