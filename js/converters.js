/**
 * Created by yangm11 on 8/21/2018.
 */
'use strict';

(function () {
  function processRGB(str) {
    let re = /(\d+),*\s*/g;
    let res = '';
    try {
      res = rgb2hex(+re.exec(str)[1], +re.exec(str)[1], +re.exec(str)[1]);
    } catch (err) {
      return {error: err};
    }
    return res;
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

  let rgb2hexArrow = document.getElementById('rgb2hex');
  let hex2rgbArrow = document.getElementById('hex2rgb');
  let rgbCode = document.getElementById('rgb-code');
  let hexCode = document.getElementById('hex-code');
  let show = document.getElementsByClassName('example-show')[0];
  rgb2hexArrow.addEventListener('click', function () {
    let res = processRGB(rgbCode.value);
    if (typeof res === 'object') {
      console.log(res.error); // debugging
      alert('Please check your RGB code.');
      return;
    }
    hexCode.value = res;
    show.style.backgroundColor = res;
  });
  hex2rgbArrow.addEventListener('click', function () {
    let res = processHex(hexCode.value);
    if (typeof res === 'object') {
      console.log(res.error); // debugging
      alert('Please check your HEX code.');
      return;
    }
    rgbCode.value = res;
    show.style.backgroundColor = res;
  })
})();



if (typeof module !== 'undefined' && module.parent) {

} else if (typeof window === 'object') {

} else {
  // test code go here
  console.log(rgb2hex(33, 66, 99));
  console.log(processRGB('22, 33, 44'));
}