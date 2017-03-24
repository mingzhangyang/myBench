/**
 * Created by yangm11 on 3/24/2017.
 */
'use strict';

function sudokuDataGenerator() {
  var result = [];
  var row;
  var i, j;
  for (i = 0; i < 9; i++) {
    row = [];
    for (j = 0; j < 9; j++) {
      row[j] = 0;
    }
    result[i] = row;
  }

  function arrSubtraction(arr1, arr2) {
    return arr1.filter(function (d) {
      return arr2.indexOf(d) === -1;
    })
  }

  function sample(arr) {
    var t = Math.floor(arr.length * Math.random());
    return arr[t];
  }

  var m, n;
  var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var collection;
  var t;
  for (i = 0; i < 9; i++) {
    m = i % 3;
    for (j = 0; j < 9; j++) {
      n = j % 3;
      collection = [0];

      for (var x = 0; x < i; x++) {
        collection.push(result[x][j]);
      }
      for (var y = 0; y < j; y++) {
        collection.push(result[i][y]);
      }
      switch (m + '' + n) {
        case '00':
          t = sample(arrSubtraction(arr, collection));
          if (t) {
            result[i][j] = t;
          } else {
            return;
          }

          break;

        case '01':
          t = sample(arrSubtraction(arr, collection));
          if (t) {
            result[i][j] = t;
          } else {
            return;
          }
          break;

        case '02':
          t = sample(arrSubtraction(arr, collection));
          if (t) {
            result[i][j] = t;
          } else {
            return;
          }
          break;

        case '10':
          collection.push(result[i - 1][j + 1]);
          collection.push(result[i - 1][j + 2]);
          t = sample(arrSubtraction(arr, collection));
          if (t) {
            result[i][j] = t;
          } else {
            return;
          }
          break;

        case '11':
          collection.push(result[i - 1][j - 1]);
          collection.push(result[i - 1][j + 1]);
          t = sample(arrSubtraction(arr, collection));
          if (t) {
            result[i][j] = t;
          } else {
            return;
          }
          break;

        case '12':
          collection.push(result[i - 1][j - 2]);
          collection.push(result[i - 1][j - 1]);
          t = sample(arrSubtraction(arr, collection));
          if (t) {
            result[i][j] = t;
          } else {
            return;
          }
          break;

        case '20':
          collection.push(result[i - 2][j + 1]);
          collection.push(result[i - 2][j + 2]);
          collection.push(result[i - 1][j + 1]);
          collection.push(result[i - 1][j + 2]);
          t = sample(arrSubtraction(arr, collection));
          if (t) {
            result[i][j] = t;
          } else {
            return;
          }
          break;

        case '21':
          collection.push(result[i - 2][j - 1]);
          collection.push(result[i - 2][j + 1]);
          collection.push(result[i - 1][j - 1]);
          collection.push(result[i - 1][j + 1]);
          t = sample(arrSubtraction(arr, collection));
          if (t) {
            result[i][j] = t;
          } else {
            return;
          }
          break;

        case '22':
          collection.push(result[i - 2][j - 2]);
          collection.push(result[i - 2][j - 1]);
          collection.push(result[i - 1][j - 2]);
          collection.push(result[i - 1][j - 1]);

          t = sample(arrSubtraction(arr, collection));
          if (t) {
            result[i][j] = t;
          } else {
            return;
          }
          break;
      }
    }
  }
  return result;
}

// var sk = [];
// for (var i = 0; i < 1000; i++) {
//   var x = sudokuDataGenerator();
//   if (x) {
//     sk.push(x);
//   }
// }
//
// console.log(sk);

var model = {};
var selected = '';

function drawBoard(p, n) {
  n = n || 64;
  var data = sudokuDataGenerator();
  while (true) {
    if (data) {
      break;
    }
    data = sudokuDataGenerator();
  }

  var svg = `<svg width="${n * 9 + 20 + n}" height="${n * 9}">`;
  for (var i = 0; i <= 9; i++) {
    if (i % 3 === 0) {
      svg += `<line class="borderLine" x1="${n * i}" y1="0" x2="${n * i}" y2="${n * 9}" />`;
      svg += `<line class="borderLine" x1="0" y1="${n * i}" x2="${n * 9}" y2="${n * i}" />`;
    }

    svg += `<line class="normalLine" x1="${n * i}" y1="0" x2="${n * i}" y2="${n * 9}" />`;
    svg += `<line class="normalLine" x1="0" y1="${n * i}" x2="${n * 9}" y2="${n * i}" />`;

  }

  for (var j = 0; j < 9; j++) {
    for (var k = 0; k < 9; k++) {
      var t = (Math.random() > p);
      model[`x${j}y${k}`] = {
        val: data[j][k],
        show: t
      };
      if (t) {
        svg += `<g class="showG" id="x${j}y${k}"><text x="${k * n + n/2}" y="${j * n + n/2}">${data[j][k]}</text><rect x="${k * n}" y="${j * n}" width="${n}" height="${n}" /></g>`;
      } else {
        svg += `<g class="hideG" id="x${j}y${k}"><text x="${k * n + n/2}" y="${j * n + n/2}"></text><rect x="${k * n}" y="${j * n}" width="${n}" height="${n}" /></g>`;
      }
    }
  }

  for (var h = 0; h < 9; h++) {
    svg += `<rect class="tobeselected" x="${n * 9 + 20}" y="${h * n}" width="${n}" height="${n}" />`;
  }
  svg += '</svg>';
  document.getElementById('board').innerHTML = svg;
  addEL();
}

function addEL() {
  for (var j = 0; j < 9; j++) {
    for (var k = 0; k < 9; k++) {
      if (!(model[`x${j}y${k}`].show)) {
        var g = document.getElementById(`x${j}y${k}`);
        g.addEventListener('click', select);
      }
    }
  }
}

function select() {
  console.log('clicked');
  if (this.id === selected) {
    return;
  }
  if (selected) {
    d3.select('#' + selected).attr('class', 'clicked');
  }
  selected = this.id;
  d3.select('#' + this.id).attr('class', 'selected');
}

function input() {

}



