/**
 * Created by mingzhang on 3/21/17.
 */
'use strict';

// set the counter
let count = 0;

// initiate the board data object
let board;

// initiate whiteList, blackList, and trashBin as array
let whiteList = [];
let blackList = [];
let allClicked = [];
let trashBin = [];

// create the board object of 19 x 19
function createBoardObject(n) {
  let model = {};
  let coor;
  let i, j;
  for (i = 0; i < n; i++) {
    for (j = 0; j < n; j++) {
      coor = 'x' + i + 'y' + j;
      model[coor] = {
        x: i,
        y: j,
        clicked: false,
        class: '',
        mark: ''
      }
    }
  }
  return model;
}

// create the board svg of 19 x 19
function createBoard(n) {
  let i, j;
  let text = `<svg height="${n * 30}" width="${n * 30}">`;
  for (i = 0; i < n; i++) {
    text += `<line x1="${i * 30 + 15}" y1="15" x2="${i * 30 + 15}" 
y2="${n * 30 - 15}" style="stroke:rgb(0,0,0);stroke-width:2" />`;
    text += `<line x1="15" y1="${i * 30 + 15}" x2="${n * 30 - 15}" y2="${i * 30 + 15}" style="stroke:rgb(0,0,0);stroke-width:2" />`;
  }
  for (i = 0; i < n; i++) {
    for (j = 0; j < n; j++) {
      let x = i * 30 + 15;
      let y = j * 30 + 15;
      text += `<g id="x${i}y${j}">
<circle  cx="${x}" cy="${y}" r="15" stroke="black" stroke-opacity="0" />
<g class="marker">
<path d="M ${x-8} ${y-2} L ${x-2} ${y-2} L ${x-2} ${y-8} z"></path>
<path d="M ${x-8} ${y+2} L ${x-2} ${y+2} L ${x-2} ${y+8} z"></path>
<path d="M ${x+8} ${y-2} L ${x+2} ${y-2} L ${x+2} ${y-8} z"></path>
<path d="M ${x+8} ${y+2} L ${x+2} ${y+2} L ${x+2} ${y+8} z"></path>
</g>
<text id="text-x${i}y${j}" x="${i * 30 + 15}" y="${j * 30 + 15}"></text></g>`;
    }
  }
  text += '</svg>';
  document.getElementById('board').innerHTML = text;
  board = createBoardObject(n);
}

function click(elem) {
  let point = board[elem.id];
  if (point.clicked) {
    return;
  }
  // elem.style.display = 'block';
  if (count % 2 === 0) {
    d3.select(`#${elem.id}`).attr('class', 'black');
    point.clicked = true;
    count += 1;
    point.mark = count + '';
    point.class = 'black';
    d3.select(`#text-${elem.id}`).text(count + '');
    let g = elem.getElementsByTagName('g')[0];
    elem.removeChild(g);
    blackList.push(elem.id);
    allClicked.push(elem.id);
    trashBin.push(g);
  } else {
    d3.select(`#${elem.id}`).attr('class', 'white');
    point.clicked = true;
    count += 1;
    point.class = 'white';
    point.mark = count + '';
    d3.select(`#text-${elem.id}`).text(count + '');
    let g = elem.getElementsByTagName('g')[0];
    elem.removeChild(g);
    whiteList.push(elem.id);
    allClicked.push(elem.id);
    trashBin.push(g);
  }
}

function addEL(n) {
  console.log('start');
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      document.getElementById(`x${i}y${j}`).addEventListener('click', function () {
        console.log(this.id);
        click(this);
      });
    }
  }
}

function back() {
  if (allClicked.length === 0) {
    return;
  }
  let key = allClicked.pop();
  console.log(key);
  let point = board[key];
  point.class = '';
  point.mark = '';
  point.clicked = false;
  d3.select(`#${key}`).attr('class', 'removed');
  d3.select(`#text-${key}`).text('');

  count -= 1;

  let toBeRestored = trashBin.pop();
  document.getElementById(`${key}`).appendChild(toBeRestored);

  if (whiteList.slice(-1)[0] === key) {
    whiteList.pop();
  } else {
    blackList.pop();
  }
}

let dr =  {
  left: function (elem) {
    let cr = 'x' + (elem.x - 1) + 'y' + elem.y;
    return board[cr] ? board[cr] : null;
  },
  leftUp: function (elem) {
    let cr = 'x' + (elem.x - 1) + 'y' + (elem.y - 1);
    return board[cr] ? board[cr] : null;
  },
  up: function (elem) {
    let cr = 'x' + elem.x + 'y' + (elem.y - 1);
    return board[cr] ? board[cr] : null;
  },
  rightUp: function (elem) {
    let cr = 'x' + (elem.x + 1) + 'y' + (elem.y - 1);
    return board[cr] ? board[cr] : null;
  },
  right: function (elem) {
    let cr = 'x' + (elem.x + 1) + 'y' + elem.y;
    return board[cr] ? board[cr] : null;
  },
  rightDown: function (elem) {
    let cr = 'x' + (elem.x + 1) + 'y' + (elem.y + 1);
    return board[cr] ? board[cr] : null;
  },
  down: function (elem) {
    let cr = 'x' + elem.x  + 'y' + (elem.y + 1);
    return board[cr] ? board[cr] : null;
  },
  leftDown: function (elem) {
    let cr = 'x' + (elem.x - 1) + 'y' + (elem.y + 1);
    return board[cr] ? board[cr] : null;
  }
};
