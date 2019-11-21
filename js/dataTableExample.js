/**
 * Created by yangm11 on 8/10/2018.
 */
'use strict';

import DataTable from "../../data2table/src/js/datatable.js";
import { exampleData } from "./exampleData.js";
import { csvString2JSON } from "../../data2table/src/js/utils/utils.js";

// load data and create table
window.onload = function () {
  document.getElementById('paste').value = JSON.stringify(exampleData, null, '    ');
  // console.log(JSON.stringify(exampleData, null, '    '));
  let dt = new DataTable(exampleData, 'my-table', {
    caption: '',
    dataIsComplete: true,
    downloadFileName: 'data2table.test',
    dataToDownload: exampleData
  });
  dt.addFilter('Gene_symbol', 'value');
  // console.log(dt);
  dt.configureColumn('Aff_id', {
    label: 'uid',
    tips: 'unique identifier',
    sortable: true,
    width: '100px',
    align: 'center',
    formatter: 'highlight'
  });
  dt.configureColumn('Gene_symbol', {
    label: 'Gene Symbol',
    width: '100px',
    align: 'center'
  });
  dt.configureColumn('Gene_accession', {
    label: 'Accession',
    width: '120px',
    align: 'center',
  });
  dt.generate();
  // console.log(dt);
};

// page interaction logic
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
        if (['local-file-controller', 'paste-input-controller','url-input-controller'].indexOf(ctrl) !== -1) {
          mainContentArea.classList.remove('preview-folded');
        }
      } else {
        mainContentArea.classList.remove(state);
      }
    }
  });

  // add event listener to close icon of info-section
  document.getElementsByClassName('info-section')[0]
  .getElementsByTagName('i')[0]
  .addEventListener('click', function () {
    mainContentArea.classList
    .remove('info-section-active');
  });

  // add event listener to selecting local file
  let localFileSelector = document.getElementById('local');
  let textArea = document.getElementById('paste');
  localFileSelector.addEventListener('change', function () {
    let file = this.files[0];
    let re = /.+\.((csv)|(tsv)|(txt)|(json))$/i;
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

  // uncheck comma or tab if user focus on custom delimiter input
  document.getElementById('custom-delimiter')
  .addEventListener('focus', function() {
    let cb = document.getElementsByName('delimiter');
    cb[0].checked = false;
    cb[1].checked = false;
  });

  // add event listener to remote file url input
  document.getElementById('data-url')
  .addEventListener('change', function () {
    getData(this.value, 'paste', 'value');
  });

  // add event listener to 'generate button'
  document.getElementById('generate-the-table')
  .addEventListener('click', function () {
    // pull out user settings
    let delimiterValue = document.getElementById('delimiter-type')['delimiter'].value;
    let custDeli = document.getElementById('custom-delimiter').value;
    let firstLineAsColNames = document.getElementById('first-line-as-col-names').checked;
    let colNamesByUser = document.getElementById('user-defined-col-names').value;

    // console.log(firstLineAsColNames);
    // determine the file type
    let str = document.getElementById('paste').value.trim();

    // if the first char is not [, it can't be JSON
    if (str.charAt(0) !== '[') {
      let sep = '';
      if (delimiterValue && !custDeli) {
        sep = delimiterValue === 'tab' ? '\t' : ',';
      }
      if (!delimiterValue && custDeli) {
        sep = custDeli;
      }
      if (!sep) {
        alert('delimiter not set');
        return;
      }

      let data;
      try {
        data = csvString2JSON(str, sep, firstLineAsColNames);
      } catch (err) {
        alert('failed to convert data into JSON');
        return;
      }
      let dt = new DataTable(data, 'my-table');
      // if (colNamesByUser) {
      //   dt.setColumnNames(colNamesByUser.split(','));
      // }
      dt.generate();
    } else {
      let data;
      try {
        data = JSON.parse(str);
      } catch (err) {
        alert('failed to parse data into JSON');
        return;
      }
      let dt = new DataTable(data, 'my-table');
      // if (colNamesByUser) {
      //   dt.setColumnNames(colNamesByUser.split(','));
      // }
      dt.generate();
    }
  });



})();
