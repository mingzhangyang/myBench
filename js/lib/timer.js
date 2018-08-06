/**
 * Created by yangm11 on 3/23/2017.
 */
'use strict';


function startGame() {
  start = Date.now();
}

function pauseGame() {
  if (pause3) {
    alert('You have used up 3 opportunities of pausing the game!');
    return;
  }
  if (!pause1) {
    pause1 = Date.now();
    gap1 = pause1 -start;
    return;
  }
  if (!pause2) {
    pause2 = Date.now();
    gap2 = pause2 - restart1;
    return;
  }
  if (!pause3) {
    pause3 = Date.now();
    gap3 = pause3 - restart2;
  }
}

function restartGame() {
  if (restart3) {
    alert('No pause, no restart! :-)');
    return;
  }
  if (!restart1) {
    restart1 = Date.now();
    return;
  }
  if (!restart2) {
    restart2 = Date.now();
  }
  if (!restart3) {
    restart3 = Date.now();
  }
}

function timeFormating(n) {
  n = n / 1000;
  var h = Math.floor(n / (60 * 60));
  var m = Math.floor((n - 60 * 60 * (+h)) / 60);
  var s = (n - 60 * 60 * (+h)) % 60;
  return `${h} hours ${m} minutes ${s} seconds`;
}