/**
 * Created by yangm11 on 3/23/2017.
 */
'use strict';

var count = 0;
var board;
var rows;
var cols;
var numOfMines = 0;

function defaultLoad() {
  count = 0;
  numOfMines = 0;
  drawBoard(16, 16);
  addEL(16, 16);
}

function easyGame() {
  count = 0;
  numOfMines = 0;
  drawBoard(9, 9);
  addEL(9, 9);
}

function mediumGame() {
  count = 0;
  numOfMines = 0;
  drawBoard(16, 16);
  addEL(16, 16);
}

function professionalGame() {
  count = 0;
  numOfMines = 0;
  drawBoard(30, 16);
  addEL(30, 16);
}

function customGame() {
  count = 0;
  numOfMines = 0;
  var r = prompt('Please input the number of rows you would like to set?');
  var c = prompt('Please input the number of columns you would like to set?');
  console.log('r = ', r);
  console.log('c = ', c);
  drawBoard(+c, +r);
  addEL(+c, +r);
}

function createBoardObjec(m, n, p) {
  var i, j;
  p = p || 0.166;
  var result = {};
  var coor = '';
  for (i = 1; i <= m; i++) {
    for (j = 1; j <= n; j++) {
      coor = 'x' + i + 'y' + j;
      if (Math.random() > p) {
        result[coor] = {
          iniVal: 0,
          isMine: false
        };
      } else {
        result[coor] = {
          iniVal: 1,
          isMine: true
        };
      }
    }
  }
  return result;
}

function drawBoard(m, n, len) {
  board = createBoardObjec(m, n);
  rows = n;
  cols = m;
  len = len || 24;
  var width = m * len;
  var height = n * len;
  var i, j;
  var text = `<svg width="${width}" height="${height}">`;
  for (i = 1; i <= m; i++) {
    for (j = 1; j <= n; j++) {
      var rectX = (i-1) * len;
      var rectY = (j-1) * len;
      var textX = rectX + len/2;
      var textY = rectY + len/2;
      var val = board['x' + i + 'y' + j].isMine;
      var g;
      if (val) {
        numOfMines += 1;
        g = `<g id="x${i}y${j}">
<rect x="${rectX}" y="${rectY}" width="${len}" height="${len}" />
<text x="${textX}" y="${textY}" fill="red">&#9785</text>
</g>`
      } else {
        g = `<g id="x${i}y${j}">
<rect x="${rectX}" y="${rectY}" width="${len}" height="${len}" style="stroke-width:1" />
<text x="${textX}" y="${textY}"></text>
</g>`
      }
      text += g;
    }
  }
  text += '</svg>';
  document.getElementById('board').innerHTML = text;
}

function compute(elem) {
  if (board[elem.id].iniVal) {
    d3.select(`#${elem.id}`).select('rect').style('fill', 'grey');
    d3.select(`#${elem.id}`).select('text').style('opacity', 1);
    gameOver(cols, rows);
    setTimeout(function () {
      alert('Game Over! Try again!');
    }, 1500);
    return;
  }
  if (board[elem.id].clicked) {
    return;
  }
  count += 1;
  if (count === rows * cols - numOfMines) {
    youWin();
  }
  board[elem.id].clicked = true;
  d3.select(`#${elem.id}`).attr('class', 'clicked');
  var x = +(elem.id.split(/[xy]/)[1]);
  var y = +(elem.id.split(/[xy]/)[2]);
  var num = 0;
  for (var k = x-1; k <= x+1; k++) {
    for (var j = y-1; j <= y+1; j++) {
      var t = board[`x${k}y${j}`];
      if (t) {
        num += t.iniVal;
      }
    }
    num -= board[elem.id].iniVal; // This is redundant. Luckily, it's safe.
  }
  if (num) {
    d3.select(`#${elem.id}`).select('text').text(num + '');
  }
}

function addEL(m, n) {
  var i, j;
  var id;
  for (i = 1; i <= m; i++) {
    for (j = 1; j <= n; j++) {
      id = `x${i}y${j}`;
      document.getElementById(id).addEventListener('click', clickEvent);
      document.getElementById(id).addEventListener('contextmenu', rightClickEvent);
    }
  }
}

function clickEvent() {
  console.log('Step: %d, Coordinate: %s', count, this.id);
  compute(this);
}

function rightClickEvent() {
  console.log('rightClicked');
  if (board[this.id].clicked) {
    return;
  }
  if (board[this.id].mark === true) {
    d3.select('#' + this.id).classed('suspect', false);
    board[this.id].mark = '';
  } else {
    d3.select('#' + this.id).classed('suspect', true);
    board[this.id].mark = true;
  }
}

function gameOver(m, n) {
  var i, j;
  var coor;
  for (i = 1; i <= m; i++) {
    for (j = 1; j <= n; j++) {
      coor = `x${i}y${j}`;
      if (board[coor].clicked) {
        continue;
      }
      d3.select('#'+coor).attr('class', 'over');
      document.getElementById(coor).removeEventListener('click', clickEvent);
      document.getElementById(coor).removeEventListener('contextmenu', rightClickEvent);
    }
  }
}

function youWin() {
  var i, j;
  var coor;
  for (i = 1; i <= cols; i++) {
    for (j = 1; j <= rows; j++) {
      coor = `x${i}y${j}`;
      if (board[coor].isMine) {
        d3.select('#'+coor).attr('class', 'win');
        d3.select('#'+coor).select('text').text('X');
        document.getElementById(coor).removeEventListener('click', clickEvent);
        document.getElementById(coor).removeEventListener('contextmenu', rightClickEvent);
      }
    }
  }
  setTimeout(function () {
    alert('Congratulations! You Win the Game!');
  }, 1500);
}
