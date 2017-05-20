/**
 * Created by yangm11 on 5/12/2017.
 */
'use strict';

let data;


function readDataFromCSV(inputId) {
  let foo = document.getElementById(inputId).files;
  let reader = new FileReader();
  reader.onload = function () {
    data = reader.result;
  };
  reader.readAsText(foo[0]);
}


function prepDataForHeatmap(str) {
  let csvLines = str.split('\n');
  csvLines = csvLines.map((d) => d.trim());
  csvLines = csvLines.filter((d) => d);
  let result = {
    yLabels: [],
    values: []
  };
  for (let i = 0, len = csvLines.length; i < len; i++) {
    let line = csvLines[i].split(',');
    if (i === 0) {
      result['xLabels'] = line.slice(1);
      continue;
    }
    result.yLabels.push(line[0]);
    result.values.push(line.slice(1).map((d) => +d));
  }
  return result;
}

function heatmap(data, options) {
  options = options || {};
  let w = options.cellWidth || 80;
  let h = options.cellHeight || 25;
  let tv = options.thresholdValues;
  let colorScheme = options.colorScheme || {start: [255, 255, 255], end: [0, 0, 255]};

  // let margin = options.margin || {left: 100, right: 100, bottom: 100, top: 100
  //   };
  // let width = w * data.values[0].length + 200 + margin.left + margin.right;
  // let height = h * data.values.length + 200 + margin.bottom + margin.top;

  let colorFuncs = [];
  let min;
  let max;

  if (typeof colorScheme.threshold === 'undefined') {
    for (let i = 0; i < data.xLabels.length; i++) {
      let col = data.values.map(row => row[i]);
      min = stats.min(col);
      max = stats.max(col);
      let cs = colorScale({
        min: min,
        max: max,
        start: colorScheme.start,
        end: colorScheme.end
      });
      colorFuncs.push(function (v) {
        return `rgba(${cs.r(v)},${cs.g(v)},${cs.b(v)},1)`;
      });
    }
  } else {
    for (let i = 0; i < data.xLabels.length; i++) {
      let col = data.values.map(row => row[i]);
      let ctv;
      min = stats.min(col);
      max = stats.max(col);
      if (tv === undefined || tv.length !== data.xLabels.length) {
        ctv = stats.median(col);
      } else {
        ctv = tv[i];
      }
      let cs1 = colorScale({
        min: min,
        max: ctv,
        start: colorScheme.start,
        end: colorScheme.threshold
      });
      let cs2 = colorScale({
        min: ctv,
        max: max,
        start: colorScheme.threshold,
        end: colorScheme.end
      });

      colorFuncs.push(function (v) {
        if (v < ctv) {
          return `rgba(${cs1.r(v)},${cs1.g(v)},${cs1.b(v)},1)`;
        }
        if (v > ctv) {
          return `rgba(${cs2.r(v)},${cs2.g(v)},${cs2.b(v)},1)`;
        }
        return `rgba(${colorScheme.threshold[0]},${colorScheme.threshold[1]},${colorScheme.threshold[2]},1)`;
      });
    }
  }

  let code = '<g>';
  let xRemarks = '<g>';

  for (let i = 0; i < data.xLabels.length; i++) {
    let col = data.values.map((row) => row[i]);
    let colorFunc = colorFuncs[i];
    for (let j = 0; j < col.length; j++) {
      code += `<rect x="${w * i}" y="${h * j}" width="${w}" height="${h}" fill="${colorFunc(col[j])}"></rect>`;
    }
    let cx = w * i + w / 2;
    let cy = h * (col.length) + 20;
    xRemarks += `<path d="M${cx} ${cy - 15} v 8" stroke="#000"></path><text x="${cx}" y="${cy}" text-anchor="start" alignment-baseline="central" transform="rotate(45 ${cx} ${cy})">${data.xLabels[i]}</text>`;
  }

  let yRemarks = '<g>';
  let xr = w * data.xLabels.length + 20;
  for (let k = 0; k < data.yLabels.length; k++) {
    yRemarks += `<path d="M${xr - 15} ${h * k + h / 2} h 8" stroke="#000"></path><text x="${xr}" y="${h * k + h / 2}" text-anchor="start" alignment-baseline="central">${data.yLabels[k]}</text>`;
  }

  code += xRemarks + '</g>' + yRemarks + '</g></g>';

  return code;

}

function colorScale(options) {
  let min = options.min;
  let max = options.max;
  let start = options.start || [255, 255, 255];
  let end = options.end || [0, 0, 255];

  let rF = function (val) {
    return Math.round(start[0] + (val - min) * (end[0] - start[0]) / (max - min));
  };

  let gF = function (val) {
    return Math.round(start[1] + (val - min) * (end[1] - start[1]) / (max - min));
  };

  let bF = function (val) {
    return Math.round(start[2] + (val - min) * (end[2] - start[2]) / (max - min));
  };

  return {
    r: rF,
    g: gF,
    b: bF
  }
}

function preview() {
  let foo = document.getElementById('upload-btn').files;
  if (foo.length === 0) {
    alert('Please select your file to visualize!');
    return;
  }
  let anw = true;
  if (foo[0].name.slice(-3) !== 'csv') {
    anw = confirm(`The file you selected is ${foo[0].name}. It seems not to be CSV file, are you sure to proceed?`);
  }
  if (!anw) {
    return;
  }
  let reader = new FileReader();
  reader.onload = function () {
    data = reader.result;
    let t = data.replace(/\r?\n/g, '<br>');
    document.getElementById('preview-area').className = 'shown';
    document.getElementById('preview-area').innerHTML = t;
  };
  reader.readAsText(foo[0]);
}

function switchMode() {
  let t = document.getElementById('mode1').checked;
  if (t) {
    document.getElementById('mode-one').className = 'shown';
    document.getElementById('mode-two').className = 'hidden';
  } else {
    document.getElementById('mode-one').className = 'hidden';
    document.getElementById('mode-two').className = 'shown';
  }
}

function getOpts() {
  let w = document.getElementById('cell-width');
  let h = document.getElementById('cell-height');
  w = w.value ? +w.value : +w.placeholder;
  h = h.value ? +h.value : +h.placeholder;

  let tv = document.getElementById('threshold-value').value;
  tv = tv === '' ? undefined : tv.split(',').map(d => +d);


  let minColor, thresholdColor, maxColor;
  let t = document.getElementById('mode1').checked;
  if (t) {
    minColor = document.getElementById('m1-min');
    maxColor = document.getElementById('m1-max');
    minColor = minColor.value ? minColor.value : '255,255,255';
    maxColor = maxColor.value ? maxColor.value : '0,90,255';
    minColor = minColor.split(',').map(d => +d);
    maxColor = maxColor.split(',').map(d => +d);
    if (minColor.length !== 3 || maxColor.length !==3) {
      alert('Please see tips for more detail. Default color scheme applied.');
      minColor = [255, 255, 255];
      maxColor = [0, 90, 255];
    }
  } else {
    minColor = document.getElementById('m2-min');
    maxColor = document.getElementById('m2-max');
    thresholdColor = document.getElementById('threshold');
    minColor = minColor.value ? minColor.value : '255, 102, 102';
    maxColor = maxColor.value ? maxColor.value : '0,90,255';
    thresholdColor = thresholdColor.value ? thresholdColor.value : '255,255,255';
    minColor = minColor.split(',').map(d => +d);
    maxColor = maxColor.split(',').map(d => +d);
    thresholdColor = thresholdColor.split(',').map(d => +d);
    if (minColor.length !== 3 || maxColor.length !==3 || thresholdColor.length !== 3) {
      alert('Please see tips for more detail. Default color scheme applied.');
      minColor = [255, 102, 102];
      maxColor = [0, 90, 255];
      thresholdColor = [255, 255, 255];
    }
  }
  return {
    cellWidth: w,
    cellHeight: h,
    thresholdValues: tv,
    colorScheme: {
      start: minColor,
      threshold: thresholdColor,
      end: maxColor
    }
  };
}

function generate() {
  let foo = document.getElementById('upload-btn').files;
  if (foo.length === 0) {
    alert('Please select your file to visualize!');
    return;
  }
  let anw = true;
  if (foo[0].name.slice(-3) !== 'csv') {
    anw = confirm(`The file you selected is ${foo[0].name}. It seems not to be CSV file, are you sure to proceed?`);
  }
  if (!anw) {
    return;
  }
  let reader = new FileReader();
  reader.onload = function () {
    data = reader.result;
    try {
      data = prepDataForHeatmap(data);
    } catch(err) {
      alert(err);
      return;
    }
    document.getElementById('preview-area').className = 'hidden';
    let svg = document.getElementById('chart-code');
    let opts = getOpts();
    console.log(opts);
    let width = opts.cellWidth * data.values[0].length + 250;
    let height = opts.cellHeight * data.values.length + 250;
    svg.setAttribute('width', width + '');
    svg.setAttribute('height', height + '');
    svg.innerHTML = heatmap(data, opts);
  };
  reader.readAsText(foo[0]);
}
