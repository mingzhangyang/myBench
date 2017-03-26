/**
 * Created by yangm11 on 3/24/2017.
 */
'use strict';

function arraySubtraction(arr1, arr2) {
  return arr1.filter(function (d) {
    return arr2.indexOf(d) === -1;
  })
}

function sample(arr) {
  var t = Math.floor(arr.length * Math.random());
  return arr[t];
}
