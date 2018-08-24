/**
 * Created by yangm11 on 8/10/2018.
 */
'use strict';

function splitLineB(s, sep) {
  sep = sep || ',';
  var elem = '';
  var quo = 0;
  var array = [];

  for (var i = 0; i < s.length; i++) {
    if (s[i] === '"') {
      if (quo === 0) {
        quo++;
      } else {
        quo--;
      }
    }
    if (s[i] === sep) {
      if (quo === 0) {
        array.push(elem);
        elem = '';
        continue;
      }
    }
    elem  += s[i];
  }
  array.push(elem);
  return array;
}

function csvString2JSON(str, firstLineAsColName) {
  let arr = str.split('\n').map(line => line.trim());
  arr = arr.map(line => splitLineB(line));
  let colNames = [];
  let num = 0;
  if (firstLineAsColName) {
    colNames = arr[0];
    num = 1;
  } else {
    for (let i = 0; i < arr[0].length; i++) {
      colNames.push(`Col #${i+1}`);
    }
  }
  let res = [];
  for (num; num < arr.length; num++) {
   let obj = {};
   for (let k = 0; k < colNames.length; k++) {
     obj[colNames[k]] = arr[num][k];
   }
   res.push(obj);
  }
  return res;
}

function jsonArrayToJsonObj(arr) {
  let colNames = [];
  for (let i = 0; i < arr[0].length; i++) {
    colNames.push(`Col #${i+1}`);
  }
  let res = [];
  for (let k = 0; k < arr.length; k++) {
    let obj = {};
    for (let h = 0; h < colNames.length; h++) {
      obj[colNames[h]] = arr[k][h];
    }
    res.push(obj);
  }
  return res;
}

if (typeof module !== 'undefined' && module.parent) {

} else if (typeof module !== 'undefined' && !module.parent) {
  // test code go here
} else if (typeof window !== 'undefined') {
  document.body.onload = function () {
    let dt = new DataTable(exampleData, 'my-table');
    dt.generate();
    console.log(dt);
  };
  (function addEventListeners (){
    let mainContentArea = document.getElementsByClassName('main-content-area')[0];

    // add event listener to fold/unfold arrows
    let foldIndicator = document.getElementsByClassName('fold-indicator')[0];
    foldIndicator.addEventListener('click', function () {
      mainContentArea.classList
        .toggle('preview-folded');
    });

    // add event listener to side bar, using event delegation to handle
    // different control icons
    let sideBar = document.getElementsByClassName('left-side-bar')[0];
    sideBar.addEventListener('click', function (evt) {
      let target = evt.target;
      let ctrlStateParis = [
        {
          ctrl: 'info-section-controller',
          state: 'info-section-active'
        }, {
          ctrl: 'local-file-controller',
          state: 'local-file-active'
        },
        {
          ctrl: 'paste-input-controller',
          state: 'paste-input-active'
        },
        {
          ctrl: 'url-input-controller',
          state: 'url-input-active'
        },
        {
          ctrl: 'table-setting-panel-controller',
          state: 'table-setting-panel-active'
        },
        {
          ctrl: 'graph-setting-panel-controller',
          state: 'graph-setting-panel-active'
        },
        {
          ctrl: 'style-setting-panel-controller',
          state: 'style-setting-panel-active'
        },
        {
          ctrl: 'export-setting-panel-controller',
          state: 'export-setting-panel-active'
        }
      ];

      for (let {ctrl, state} of ctrlStateParis) {
        if (target.classList.contains(ctrl) || target.parentElement.classList.contains(ctrl)) {
          mainContentArea.classList.add(state);
        } else {
          mainContentArea.classList.remove(state);
        }
      }
    });

    // add event listener to close icon of info-section
    let infoSection = document.getElementsByClassName('info-section')[0];
    infoSection.addEventListener('click', function () {
      mainContentArea.classList
        .remove('info-section-active');
    });

    // add event listener to selecting local file
    let localFileSelector = document.getElementById('local');
    let textArea = document.getElementById('paste');
    localFileSelector.addEventListener('change', function () {
      let file = this.files[0];
      let re = /.+\.((csv)|(tsv)|(txt)|(json)$/i;
      if (!re.test(file.name)) {
        alert('Expected file types: .txt, .csv, .tsv');
        return;
      }
      let reader = new FileReader();
      reader.onload = function() {
        textArea.value = this.result;
      };
      reader.onerror = function () {
        alert('Error happens reading the file.');
      };
      reader.readAsText(file);
    });

    let inp = document.getElementById('custom-delimiter');
    inp.addEventListener('focus', function() {
      let cb = document.getElementsByName('delimiter');
      cb[0].checked = false;
      cb[1].checked = false;
    });

    // add event listener to generate button
    let generateBtn = document.getElementById('generate-the-table');
    let firstLineAsColNames = document.getElementById('first-line-as-col-names')['flacn'].value;
    let colNamesByUser = document.getElementById('user-defined-col-names');

    generateBtn.addEventListener('click', function () {

    });
  })();
}