/**
 * Created by yangm11 on 12/6/2017.
 */
'use strict';
/**
 * One-way binding of the DOM element with data object, the DOM element will
 * update as the data changed
 * @param domElm, format: {elem: obj, prop: "prop"}
 * @param dataObj, format: {data: obj, prop: "prop"}
 */

(function foo() {
  let rect = document.getElementById('demo');
  let size = document.getElementById('size-slider');
  let red = document.getElementById('red-slider');
  let green = document.getElementById('green-slider');
  let blue = document.getElementById('blue-slider');
  let opa = document.getElementById('opacity-slider');
  let rot = document.getElementById('rotation-slider');
  let rgbaCode = document.getElementById('rgba-code');

  size.addEventListener('change', () => {
    console.log('size changed');
    rect.style.width = size.value * 8 + 'px';
    rect.style.height = size.value * 8 + 'px';
    // console.log(sizeObj);
  });

  red.addEventListener('change', () => {
    // console.log('red changed');
    rect.style.backgroundColor = "rgb(" + red.value + ', ' + green.value + ', ' + blue.value + ')';
    // rect.style.opacity = opa.value / 10;
    rgbaCode.value = "rgba(" + red.value + ', ' + green.value + ', ' + blue.value + ', ' + opa.value / 10 + ')';
    // console.log(colorObj.rgb);
    // console.log(colorObj.rgbaCode);
  });
  green.addEventListener('change', () => {
    rect.style.backgroundColor = "rgb(" + red.value + ', ' + green.value + ', ' + blue.value + ')';
    // rect.style.opacity = opa.value / 10;
    rgbaCode.value = "rgba(" + red.value + ', ' + green.value + ', ' + blue.value + ', ' + opa.value / 10 + ')';
  });
  blue.addEventListener('change', () => {
    rect.style.backgroundColor = "rgb(" + red.value + ', ' + green.value + ', ' + blue.value + ')';
    // rect.style.opacity = opa.value / 10;
    rgbaCode.value = "rgba(" + red.value + ', ' + green.value + ', ' + blue.value + ', ' + opa.value / 10 + ')';
  });
  opa.addEventListener('change', () => {
    // rect.style.backgroundColor = "rgb(" + red.value + ', ' + green.value + ', ' + blue.value + ')';
    rect.style.opacity = opa.value / 10;
    rgbaCode.value = "rgba(" + red.value + ', ' + green.value + ', ' + blue.value + ', ' + opa.value / 10 + ')';
  });

  rgbaCode.addEventListener('change', () => {
    let c = rgbaCode.value.slice(5, -1);
    c = c.split(',');
    console.log(c);
    try {
      red.value = c[0].trim();
      green.value = c[1].trim();
      blue.value = c[2].trim();
      opa.value = c[3].trim() * 10;
      rect.style.backgroundColor = "rgb(" + red.value + ', ' + green.value + ', ' + blue.value + ')';
      rect.style.opacity = opa.value / 10;
    } catch (err) {
      alert("Please input a valid rgba code");
    }
  });


  rot.addEventListener('change', () => {
    console.log('rotating');
    rect.style.transform = 'rotate(' + rot.value + 'deg)'
  });


  let cur = '';
  let btn = document.getElementById('btn-click-1');
  btn.addEventListener('click', () => {
    let c = "rgba(" + red.value + ', ' + green.value + ', ' + blue.value + ', ' + opa.value / 10 + ')';
    if (c !== cur) {
      let div = document.createElement('div');
      div.className = 'color-picked-unit';
      let area = document.getElementById('show-area');
      area.appendChild(div);
      let subDiv = document.createElement('div');
      subDiv.className = 'color-picked';
      subDiv.style.backgroundColor = c;
      div.appendChild(subDiv);
      subDiv = document.createElement('div');
      subDiv.className = 'color-code';
      subDiv.innerText = c;
      div.appendChild(subDiv);

      cur = c;
    }
  });

  let rand = document.getElementById('btn-click-2');
  rand.addEventListener('click', () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let o = Math.floor(Math.random() * 10 + 1);
    red.value = r;
    green.value = g;
    blue.value = b;
    opa.value = o;
    rect.style.backgroundColor = "rgb(" + r + ', ' + g + ', ' + b + ')';
    rect.style.opacity = o / 10;
    rgbaCode.value = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + (o / 10) + ')';
  });

})();

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
}