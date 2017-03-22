/**
 * Created by mingzhang on 3/21/17.
 */
'use strict';

// set the counter
var count = 0;

// initiate the board data object
var board;

// create the board object of 19 x 19
function createBoardObject(n) {
  var i, j;
  var board = {};
  var coor;
  for (i = 0; i < n; i++) {
    for (j = 0; j < n; j++) {
      coor = 'x' + i + 'y' + j;
      board[coor] = {
        x: i,
        y: j,
        clicked: false,
        class: '',
        mark: ''
      }
    }
  }
  return board;
}

// create the board svg of 19 x 19
function createBoard(n) {
  var i, j;
  var text = `<svg height="${n * 30}" width="${n * 30}">`;
  for (i = 0; i < n; i++) {
    text += `<line x1="${i * 30 + 15}" y1="15" x2="${i * 30 + 15}" 
y2="${n * 30 - 15}" style="stroke:rgb(0,0,0);stroke-width:2" />`;
    text += `<line x1="15" y1="${i * 30 + 15}" x2="${n * 30 - 15}" y2="${i * 30 + 15}" style="stroke:rgb(0,0,0);stroke-width:2" />`;
  }
  for (i = 0; i < n; i++) {
    for (j = 0; j < n; j++) {
      text += `<g id="x${i}y${j}"><circle  cx="${i * 30 + 15}" cy="${j * 30 + 15}" r="15" 
stroke="black" 
stroke-opacity="0" /><text id="text-x${i}y${j}" x="${i * 30 + 15}" 
y="${j * 30 + 15}"></text></g>`;
    }
  }
  text += '</svg>';
  document.getElementById('board').innerHTML = text;
  board = createBoardObject(n);
}

function click(elem) {
  var point = board[elem.id];
  if (point.clicked) {
    return;
  }
  // elem.style.display = 'block';
  if (count % 2 === 0) {
    // elem.class = 'black';
    $(elem).attr('class', 'black');
    point.clicked = true;
    count += 1;
    point.mark = count;
    point.class = 'black';
    $(`#text-${elem.id}`).html = count + '';
  } else {
    // elem.class = 'white';
    $(elem).attr('class', 'white');
    point.clicked = true;
    count += 1;
    point.class = 'white';
    point.mark = count + "";
    $(`#text-${elem.id}`).html = count + '';
  }
}

function addEL(n) {
  console.log('start');
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      $(`#x${i}y${j}`).on('click', function () {
        console.log(this.id);
        click(this);
      });
    }
  }
}