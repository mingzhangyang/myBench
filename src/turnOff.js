/**
 * Created by yangm11 on 1/9/2018.
 */
'use strict';

(function (angular) {
  const app = angular.module('turnoff', []);
  app.controller('myCtrl', ['$scope', function ($scope) {
    $scope.instruction = `Clicking on a cell will change the color of it (red -> grey or 
            grey -> red), as well as the color of cells that are on the left, 
            top, right, bottom of the cell clicked. Try to make the number of 
            red cells in the matrix as large as possible.`;
    $scope.rows = 8;
    $scope.red = 0;
    $scope.grey = 0;
    $scope.max = 0;
    $scope.updateMatrix = function () {
      let res = [];
      $scope.red = 0;
      $scope.grey = 0;
      for (let i = 0; i < $scope.rows; i++) {
        let row = [];
        for (let j = 0; j < $scope.rows; j++) {
          let d = {
            row: i,
            col: j,
            value: Math.random() > 0.3 ? 0 : 1
          };
          row.push(d);
          if (d.value === 0) {
            $scope.grey += 1;
          } else {
            $scope.red += 1;
          }
        }
        res.push(row);
      }
      $scope.max = $scope.red;
      return res;
    };

    $scope.matrix = $scope.updateMatrix();

    $scope.getColor = function (v) {
      // console.log('setting color ', v);
      if (v === 0) {
        return {
          'background-color': 'grey'
        };
      }
      return {
        'background-color': '#f66'
      };
    };
    $scope.count = function () {
      $scope.red = 0;
      $scope.grey = 0;
      for (let i = 0; i < $scope.rows; i++) {
        for (let d of $scope.matrix[i]) {
          if (d.value === 0) {
            $scope.grey += 1;
          } else {
            $scope.red += 1;
          }
        }
      }
    };
    $scope.click = function (o) {
      o.value = o.value === 0 ? 1 : 0;
      let x = o.col - 1;
      let t;
      if (x > -1) {
        t =$scope.matrix[o.row][x];
        t.value = t.value === 0 ? 1 : 0;
      }
      x = o.row - 1;
      if (x > -1) {
        t = $scope.matrix[x][o.col];
        t.value = t.value === 0 ? 1 : 0;
      }
      x = o.col + 1;
      if (x < $scope.rows) {
        t = $scope.matrix[o.row][x];
        t.value = t.value === 0 ? 1 : 0;
      }
      x = o.row + 1;
      if (x < $scope.rows) {
        t = $scope.matrix[x][o.col];
        t.value = t.value === 0 ? 1 : 0;
      }
      $scope.count();
      if ($scope.red > $scope.max) {
        $scope.max = $scope.red;
      }
    };
  }]);
})(window.angular);

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
}