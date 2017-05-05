/**
 * Created by yangm11 on 5/5/2017.
 */
'use strict';

var count = 0;

function addRow() {
  count += 1;
  if (count > 6) {
    alert('Hmm, it seems pie chart is not a good option for your data ...');
    return;
  }
  var tr = document.createElement('tr');
  tr.innerHTML = '<td><input></td><td><input></td>';
  tr.addEventListener('change', draw);
  var table = document.getElementById('dataTable');
  table.appendChild(tr);
}

function getData() {
  var inputs = document.getElementById('dataTable').getElementsByTagName('input');
  inputs = Array.from(inputs, function (d) {
    return {
      value: d.value,
      placeholder: d.placeholder
    }
  });
  inputs = inputs.map(function (d) {
    if (d.value) {
      return d.value;
    }
    if (d.placeholder) {
      return d.placeholder;
    }
    return '';
  });
  var names = inputs.filter(function (d, i) {
    return i % 2 === 0;
  });
  var values = inputs.filter(function (d, i) {
    return i % 2 === 1;
  });

  var result = [];

  for (let i = 0; i < names.length; i++) {
    if (values[i] && names[i]) {
      result.push({
        name: names[i],
        value: +(values[i])
      });
    }
  }

  return result;
}

function getValue(inputElem) {
  if (inputElem.value) {
    return inputElem.value;
  }
  if (inputElem.placeholder) {
    return inputElem.placeholder;
  }
  return '';
}

function getConfig() {
  let fillColors = document.getElementById('fillColors').value;
  fillColors = fillColors.trim();
  fillColors = fillColors.split(';');
  fillColors = fillColors.map(d => d.trim());
  // console.log(fillColors);

  let colorGen = (function* () {
      let i = 0;
      while (1) {
        yield fillColors[i++];
      }
    })();


  let innerR = +(getValue(document.getElementById('innerR')));
  let outerR = +(getValue(document.getElementById('outerR')));
  let strokeColor = getValue(document.getElementById('strokeColor'));
  let markPos = getValue(document.getElementById('notationPos'));
  let takeout = getValue(document.getElementById('takeOut'));

  takeout = takeout.split(',');
  takeout = takeout.map(d => d.trim());
  return {
    colorFunc: function () {
      let color = colorGen.next();
      if (color.value) {
        return color.value;
      }
      return 'random';
    },
    innerRadius: innerR,
    outerRadius: outerR,
    strokeColor: strokeColor,
    notationPos: markPos,
    takeOut: takeout
  }
}

function draw() {
  let data = getData();
  console.log(data);
  let config = getConfig();
  // console.log(config);
  config.center = [0, 0];
  try {
    document.getElementById('chart').innerHTML = myc.pieChart(data, config);
  } catch (err) {
    alert(err);
  }
}

function addListeners() {
  let btn = document.getElementById('btn-add');
  btn.addEventListener('click', addRow);

  let inputs = document.getElementsByClassName('monitor');
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', draw);
  }

  let textArea = document.getElementById('fillColors');
  textArea.addEventListener('change', draw);
}

addListeners();

