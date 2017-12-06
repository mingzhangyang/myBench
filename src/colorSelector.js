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
function oneWayBinding(domElm, dataObj) {
  let internal = dataObj.data[dataObj.prop];
  Object.defineProperty(dataObj.data, dataObj.prop, {
    get: () => internal,
    set: v => {
      if (typeof domElm.elem.setAttribute === 'function') {
        domElm.elem.setAttribute(domElm.prop, v);
      } else {
        domElm.elem[domElm.prop] = v;
      }
      internal = v;
    }
  });
  return dataObj;
}

(function foo() {
  let rect = document.getElementById('demo');
  let size = document.getElementById('size-slider');
  let red = document.getElementById('red-slider');
  let green = document.getElementById('green-slider');
  let blue = document.getElementById('blue-slider');
  let opa = document.getElementById('opacity-slider');
  let rot = document.getElementById('rotation-slider');
  let rgbaCode = document.getElementById('rgba-code');

  let sizeObj = {
    width: size.value * 8 + 'px',
    height: size.value * 8 + 'px'
  };

  oneWayBinding({
    elem: rect.style,
    prop: 'width'
  }, {
    data: sizeObj,
    prop: 'width'
  });
  oneWayBinding({
    elem: rect.style,
    prop: 'height'
  }, {
    data: sizeObj,
    prop: 'height'
  });

  size.addEventListener('change', () => {
    console.log('size changed');
    sizeObj.width = size.value * 8 + 'px';
    sizeObj.height = size.value * 8 + 'px';
    // console.log(sizeObj);
  });

  let colorObj = {
    rgb: "rgb(" + red.value + ', ' + green.value + ', ' + blue.value + ')',
    opacity: opa.value / 10,
    rgbaCode: "rgba(" + red.value + ', ' + green.value + ', ' + blue.value + ', ' + opa.value / 10 + ')'
  };
  oneWayBinding({
    elem: rect.style,
    prop: "background-color"
  }, {
    data: colorObj,
    prop: "rgb"
  });
  oneWayBinding({
    elem: rect.style,
    prop: "opacity"
  }, {
    data: colorObj,
    prop: "opacity"
  });

  oneWayBinding({
    elem: rgbaCode,
    prop: 'value'
  }, {
    data: colorObj,
    prop: 'rgbaCode'
  });


  red.addEventListener('change', () => {
    console.log('red changed');
    colorObj.rgb = "rgb(" + red.value + ', ' + green.value + ', ' + blue.value + ')';
    colorObj.rgbaCode = "rgba(" + red.value + ', ' + green.value + ', ' + blue.value + ', ' + opa.value / 10 + ')';
    console.log(colorObj.rgb);
    console.log(colorObj.rgbaCode);
  });
  green.addEventListener('change', () => {
    colorObj.rgb = "rgb(" + red.value + ', ' + green.value + ', ' + blue.value + ')';
    colorObj.rgbaCode = "rgba(" + red.value + ', ' + green.value + ', ' + blue.value + ', ' + opa.value / 10 + ')';
  });
  blue.addEventListener('change', () => {
    colorObj.rgb = "rgb(" + red.value + ', ' + green.value + ', ' + blue.value + ')';
    colorObj.rgbaCode = "rgba(" + red.value + ', ' + green.value + ', ' + blue.value + ', ' + opa.value / 10 + ')';
  });
  opa.addEventListener('change', () => {
    colorObj.opacity = opa.value / 10;
    colorObj.rgbaCode = "rgba(" + red.value + ', ' + green.value + ', ' + blue.value + ', ' + opa.value / 10 + ')';
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
      colorObj.rgb = "rgb(" + red.value + ', ' + green.value + ', ' + blue.value + ')';
      colorObj.opacity = opa.value / 10;
    } catch (err) {
      alert("Please input a valid rgba code");
    }
  });


  let rotObj = {
    transform: 'rotate(0deg)'
  };

  oneWayBinding({
    elem: rect.style,
    prop: 'transform'
  }, {
    data: rotObj,
    prop: 'transform'
  });

  rot.addEventListener('change', () => {
    console.log('rotating');
    rotObj.transform = 'rotate(' + rot.value + 'deg)'
  });

})();

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
}