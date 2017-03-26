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

  //The function below only works with array of numbers and strings. No objects.
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

var model;
var selected;
var errs;
var count;
var numOfToBeFilled;
var hidden;

function drawBoard(p, n) {
  model = {};
  selected = '';
  errs = [];
  count = 0;
  numOfToBeFilled = 0;
  hidden = [];

  n = n || 64;
  var data = sudokuDataGenerator();
  while (true) {
    if (data) {
      break;
    }
    data = sudokuDataGenerator();
  }

  var svg = `<svg width="${n * 9 + 30 + n}" height="${n * 9 + 10}"><g transform="translate(5,5)">`;
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
      model[`r${j}c${k}`] = {
        uid: `r${j}c${k}`,
        val: data[j][k],
        show: t
      };
      if (t) {
        svg += `<g class="showG" id="r${j}c${k}"><text x="${k * n + n/2}" y="${j * n + n/2}">${data[j][k]}</text><rect x="${k * n}" y="${j * n}" width="${n}" height="${n}" /></g>`;
      } else {
        numOfToBeFilled += 1;
        hidden.push(model[`r${j}c${k}`]);
        svg += `<g class="hideG" id="r${j}c${k}"><text x="${k * n + n/2}" y="${j * n + n/2}"></text><rect x="${k * n}" y="${j * n}" width="${n}" height="${n}" /></g>`;
      }
    }
  }

  for (var h = 0; h < 9; h++) {
    svg += `<g class="nums" id="num${h+1}"><circle class="tobeselected" 
cx="${n * 9 + 20 + n/2}" cy="${h * n + n/2}" r="${n/2}"  /><text x="${n * 9 + 20 + n/2}" y="${h * n + n/2}">${h+1}</text></g>`;
  }
  svg += '</g></svg>';
  document.getElementById('board').innerHTML = svg;
  addEL();
}

function addEL() {
  for (var j = 0; j < 9; j++) {
    for (var k = 0; k < 9; k++) {
      if (!(model[`r${j}c${k}`].show)) {
        var g = document.getElementById(`r${j}c${k}`);
        g.addEventListener('click', select);
      }
    }
  }

  for (var h = 0; h < 9; h++) {
    document.getElementById('num' + (h+1)).addEventListener('click', chooseNum);
  }
}

function select() {
  console.log('clicked');
  if (this.id === selected) {
    return;
  }

  if (selected) {
    var cls = d3.select('#' + selected).attr('class');
    if (cls === 'sandr') {
      d3.select('#' + selected).attr('class', 'resolved');
    } else {
      d3.select('#' + selected).attr('class', 'clicked');
    }
  }

  selected = this.id;
  var cls = d3.select('#' + selected).attr('class');

  if (cls === 'resolved') {
    d3.select('#' + selected).attr('class', 'sandr');
  } else {
    d3.select('#' + selected).attr('class', 'selected');

  }
}

function chooseNum() {
  if (!selected) {
    return;
  }
  if (d3.select('#' + selected).attr('class') === 'sandr') {
    return;
  }
  var node = d3.select('#' + this.id);
  node.attr('class', 'inputting');
  var num = node.select('text').text();
  console.log(num);
  var g = d3.select('#' + selected);
  g.select('text').text('' + num);
  g.attr('class', 'sandr');
  count += 1;
  if (model[selected] !== num) {
    errs.push(selected);
  }
  setTimeout(function () {
    node.attr('class', 'nums');
    if (count === numOfToBeFilled) {
      if (errs.length === 0) {
        alert('Congratulations! You win the game!');
        return;
      }
      alert('There must be something wrong! Please check!');
    }
  }, 500);
}

function modifyInput() {
  var node = d3.select('#' + selected);
  if (node.attr('class') !== 'sandr') {
    alert('Please click to select the cell which you want to modify!');
    return;
  }
  node.select('text').text('');
  node.attr('class', 'selected');
  count -= 1;
}

function showHints() {
  var t = hidden[Math.floor(hidden.length * Math.random())];
  var g = d3.select('#' + t.uid);

  if (!selected) {
    selected = t.uid;
    g.attr('class', 'sandr');
    g.select('text').text(t.val);
    hidden = hidden.filter(function (d) {
      return d.uid !== t.uid;
    });
    count += 1;
  } else {
    var before = d3.select('#' + selected);
    if (before.attr('class') === 'selected') {
      before.attr('class', 'clicked');
    }
    if (before.attr('class') === 'sandr') {
      before.attr('class', 'resolved');
    }
    selected = t.uid;
    g.attr('class', 'sandr');
    g.select('text').text(t.val);
    hidden = hidden.filter(function (d) {
      return d.uid !== t.uid;
    });
    count += 1;
    if (count === numOfToBeFilled) {
      setTimeout(function () {
        if (errs.length !== 0) {
          alert('There must be something wrong! Please check!');
        } else {
          alert('Congratulations! You win the game!');
        }
      }, 500);
    }
  }
}

function getSelectVal() {
  var t = document.getElementById('level').value;
  switch (t) {
    case 'Easy':
      drawBoard(0.3, 64);
      break;
    case 'Normal':
      window.location.reload();
      break;
    case 'Hard':
      drawBoard(0.6, 64);
      break;
    case 'God':
      drawBoard(0.8, 64);
  }
}
