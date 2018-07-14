/**
 * Created by mingzhang on 7/14/18.
 */
'use strict';
(function () {
  function createTable(m, n) {
    // console.log('Hi');
    let frag = document.createDocumentFragment('table');
    for (let i = 0; i < m; i++) {
      let row = frag.appendChild(document.createElement('tr'));
      for (let j = 0; j < n; j++) {
        let c =document.createElement('td');
        c.info = {row: i, col: j};
        row.appendChild(c);
        // console.log(i, j);
      }
    }
    // console.log(frag);
    return frag;
  }

  document.getElementById('table-area').appendChild(createTable(20, 20));

  function initApp() {
    let defaultColor = 'black';
    let selected = '#66cdaa';
    let mousedown = false;
    let  cells = document.getElementsByTagName('td');
    for (let cell of cells) {
      cell.addEventListener('click', function () {
        this.style.backgroundColor = selected;
        cell.info.color = selected;
      });
      cell.addEventListener('mousedown', () => {
        mousedown = true;
      });
      cell.addEventListener('mouseup', () => {
        mousedown = false;
      });
      cell.addEventListener('mousemove',() => {
        if (mousedown) {
          cell.style.backgroundColor = selected;
          cell.info.color = selected;
        }
      })
    }

    let cs = document.getElementsByClassName('color');
    for (let c of cs) {
      c.addEventListener('click', function() {
        selected = this.style.backgroundColor;
        // console.log(selected);
      });
    }
    let era = document.getElementById('eraser');
    era.addEventListener('click', function () {
      // console.log(selected);
      selected = defaultColor;
      // console.log(selected);
    });
    let rst = document.getElementById('restore');
    rst.addEventListener('click', function () {
      // console.log(2);
      // console.log(cells.length);
      for (let cell of cells) {
        // console.log(typeof cell);
        cell.info.color = defaultColor;
        cell.style.backgroundColor = defaultColor;
        // console.log('o');
      }
    });
  }
  initApp();
  function exportData() {
    let res = [];
    let  cells = document.getElementsByTagName('td');
    for (let cell of cells) {
      res.push(cell.info);
    }
    window.localStorage.setItem('gridData', JSON.stringify(res));
    return res;
  }
// setInterval(report, 5000);

  let btn = document.getElementById('create-btn');
  btn.addEventListener('click', () => {
    let rows = document.getElementById('rows').value;
    let cols = document.getElementById('cols').value;
    if (+rows && + cols) {
      let tb = document.getElementById('table-area');
      while (tb.lastChild) {
        tb.removeChild(tb.lastChild);
      }
      tb.appendChild(createTable(+rows, +cols));
      // console.log(rows, cols);
      initApp();
    }
  });
})();

