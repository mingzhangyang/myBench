/**
 * Created by yangm11 on 5/12/2017.
 */
'use strict';

const stats = require('../../commonUse/statistics/stats');
const fs = require('fs');

let data;

function draw(inputId) {
  let p1 = new Promise(function (resolve, reject) {
    let foo = document.getElementById(inputId).files;
    let reader = new FileReader();
    reader.onload = function () {
      data = reader.result;
      resolve(data);
    };
    reader.readAsText(foo[0]);
  });
  let p2 = p1.then(function (str) {
    return new Promise(function (resolve, reject) {
      let csvLines = str.split('\n');
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
        result.values.push(line.slice(1));
      }
      resolve(result);
    });
  });
}



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
  let colorScheme = options.colorScheme || {start: [255, 255, 255], end: [0, 0, 255]};
  let margin = options.margin || {left: 100, right: 100, bottom: 100, top: 100
    };

  let width = w * data.values[0].length + 200 + margin.left + margin.right;
  let height = h * data.values.length + 200 + margin.bottom + margin.top;

  // let colorFuncs = [];
  // for (let i = 0, len = data.xLabels.length; i < len; i++) {
  //   let col = data.values.map((row) => row[i]);
  //   let min = stats.min(col);
  //   // let median = stats.median(row);
  //   let max = stats.max(col);
  //
  //   let cs = colorScale({
  //     min: min,
  //     max: max,
  //     start: colorScheme.start,
  //     end: colorScheme.end
  //   });
  //
  //   colorFuncs.push(function (v) {
  //     return `rgba(${cs.r(v)},${cs.g(v)},${cs.b(v)},1)`;
  //   });
  //
  // }

  let colorFunc;
  let min = data.values[0][0];
  let max = min;

  console.log(min, max);

  for (let i = 0; i < data.yLabels.length; i++) {
    for (let j = 0; j < data.xLabels.length; j++) {
      let t = data.values[i][j];
      if (t > max) {
        max = t;
      }
      if (t < min) {
        min = t;
      }
    }
  }

  console.log(min, max);

  if (typeof colorScheme.middle === 'undefined') {
    let cs = colorScale({
      min: min,
      max: max,
      start: colorScheme.start,
      end: colorScheme.end
    });
    colorFunc = function (v) {
      return `rgba(${cs.r(v)},${cs.g(v)},${cs.b(v)},1)`;
    }
  } else {
    let cs1 = colorScale({
      min: min,
      max: 1,
      start: colorScheme.start,
      end: colorScheme.middle
    });
    let cs2 = colorScale({
      min: 1,
      max: max,
      start: colorScheme.middle,
      end: colorScheme.end
    });
    colorFunc = function (v) {
      if (v < 1) {
        return `rgba(${cs1.r(v)},${cs1.g(v)},${cs1.b(v)},1)`;
      }
      if (v > 1) {
        return `rgba(${cs2.r(v)},${cs2.g(v)},${cs2.b(v)},1)`;
      }
      return `rgba(${colorScheme.middle[0]},${colorScheme.middle[1]},${colorScheme.middle[2]},1)`;
    }
  }

  let code = '<g>';
  let xRemarks = '<g>';

  for (let i = 0; i < data.xLabels.length; i++) {
    let col = data.values.map((row) => row[i]);
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

// let foo = colorScale({
//   min: 0,
//   max: 10,
//   start: [255, 125, 255],
//   end: [0, 0, 255]
// });
//
// console.log(foo.r(5));
// console.log(foo.g(5));
// console.log(foo.b(5));

let yue = fs.readFileSync('../../../Data/gutMicrobiome/allSamples/yue.csv', 'utf8');
console.log(typeof yue);
yue = prepDataForHeatmap(yue);
console.log(yue.values[147], yue.xLabels.length);

let avg = [322.7711111,	2078.235556, 471.7277778, 556.4644444, 408.3222222];
yue.values = yue.values.map(d => d.map((da, idx) => da / avg[idx]));

console.log(yue.values[147], yue.xLabels.length);

console.log(heatmap(yue, {
  colorScheme: {
    start: [255,255,255],
    // middle: [255,255,255],
    end: [0,0,255]
  }
}));
// console.log(yue.values.slice(-12, -10));