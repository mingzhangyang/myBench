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
      text += `<circle id="x${i}y${j}" cx="${i * 30 + 15}" cy="${j * 30 + 15}" r="15" 
stroke="black" 
stroke-opacity="0" />`;
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
    var t = document.createElement('text');
    $(t).attr('x', point.x * 30 + 15 + "");
    $(t).attr('y', point.y * 30 + 15 + "");
    $(t).attr('fill', 'white');
    $(t).attr('text-anchor', 'middle');
    $(t).attr('alignment-baseline', "central");
    $(t).attr('opacity', 1);
    // t.x = point.x * 30 + 15 + "";
    // t.y = point.y * 30 + 15 + "";
    // t.fill = "white";
    t.innerHTML = count + "";
    $('svg')[0].appendChild(t);
  } else {
    // elem.class = 'white';
    $(elem).attr('class', 'white');
    point.clicked = true;
    count += 1;
    point.class = 'white';
    point.mark = count + "";
    var t = document.createElement('text');
    $(t).attr('x', point.x * 30 + 15 + "");
    $(t).attr('y', point.y * 30 + 15 + "");
    $(t).attr('fill', 'black');
    $(t).attr('text-anchor', 'middle');
    $(t).attr('alignment-baseline', "central");
    $(t).attr('opacity', 1);
    // t.x = point.x * 30 + 15 + "";
    // t.y = point.y * 30 + 15 + "";
    // t.fill = 'black';
    t.innerHTML = count + "";
    $('svg')[0].appendChild(t);
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