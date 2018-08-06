/**
 * Created by yangm11 on 5/1/2017.
 */
'use strict';

var intervalID, time, offset;

offset = new Date().getTimezoneOffset() / 60;

updateClock();

var inputs = document.getElementsByTagName('input');
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('change', function () {
    try {
      updateClock();
    } catch (e) {
      alert(e);
    }
  });
}

function createCircle(radius, fill, color) {
  var circle = `<circle r="${radius}" fill="${fill}" stroke="${color}" stroke-width="3px"></circle>`;
  var marks = '<g class="marks" stroke="#000" stroke-width="3px"' +
    ' stroke-linecap="round">';
  for (let i = 0; i < 60; i++) {
    if (i % 5 === 0) {
      marks += `<line x1="0" y1="${-radius + 6}" x2="0" y2="${-radius}" stroke-width="5px" stroke="#f66" transform="rotate(${6 * i})"></line>`;
      continue;
    }
    marks += `<line x1="0" y1="${-radius + 4}" x2="0" y2="${-radius}" transform="rotate(${6 * i})"></line>`;
  }
  marks += '</g>';
  var num = `<g class="numbers" font-family="Times New Roman" font-size="2em">`;
  for (let i = 0; i < 12; i++) {
    num += `<g transform="rotate(${30 * i})"><text x="0" y="${-radius + 30}" text-anchor="middle" alignment-baseline="middle" transform="rotate(${-30 * i} 0 ${-radius + 30})">${i ? i : 12}</text></g>`;
  }
  num += '</g>';
  return circle + marks + num;
}

function createHand(loops, className, idName, width, color, radius) {
  var hand = `<g class="${className}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-opacity="0">`;
  for (let i = 0; i < loops; i++) {
    hand += `<line id="${idName + i}" x1="0" y1="0" x2="0" y2="${-radius}" transform="rotate(${360 / loops * i})"></line>`
  }
  hand += '</g>';
  return hand;
}

function setTimeObj(tz) {
  var d = new Date();
  var hb = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();

  hb = hb > 11 ? hb - 12 : hb;
  hb += (tz + offset);
  hb = hb > 11 ? hb - 12 : hb;
  var ha = Math.floor(m / 6);

  return {
    h: hb * 10 + ha,
    m: m,
    s: s
  }
}

function setClock(tz) {
  var t = setTimeObj(tz);
  if (t.h !== time.h) {
    document.getElementById('h' + time.h).style.strokeOpacity = 0;
    time.h = t.h;
    document.getElementById('h' + time.h).style.strokeOpacity = 1;
  }
  if (t.m !== time.m) {
    document.getElementById('m' + time.m).style.strokeOpacity = 0;
    time.m = t.m;
    document.getElementById('m' + time.m).style.strokeOpacity = 1;
  }
  if (t.s !== time.s) {
    document.getElementById('s' + time.s).style.strokeOpacity = 0;
    time.s = t.s;
    document.getElementById('s' + time.s).style.strokeOpacity = 1;
  }
}

function updateClock() {
  console.log('going to update');
  window.clearInterval(intervalID);

  var bgc = document.getElementById('background').value;
  var hd = document.getElementById('hourhand').value;
  var md = document.getElementById('minutehand').value;
  var sd = document.getElementById('secondhand').value;
  var tz = document.getElementById('timezone').value;

  bgc = bgc ? bgc : 'transparent';
  hd = hd ? hd : 'red';
  md = md ? md : 'blue';
  sd = sd ? sd : '#000';
  tz = tz ? Number(tz) : -offset;

  var c = createCircle(250, bgc, '#f66');
  var mH = createHand(60, 'minuteHand', 'm', '5px', md, 180);
  var sH = createHand(60, 'secondHand', 's', '3px', sd, 200);
  var hH = createHand(120, 'hourHand', 'h', '8px', hd, 160);

  document.getElementById('clock').innerHTML = c + hH + mH + sH;

  time = {
    h: 0, // h is not exactly the hour
    m: 0,
    s: 0
  };

  document.getElementById('s' + time.s).style.strokeOpacity = 1;
  document.getElementById('m' + time.m).style.strokeOpacity = 1;
  document.getElementById('h' + time.h).style.strokeOpacity = 1;

  setClock(tz);

  intervalID = setInterval(function () {
    setClock(tz);
  }, 1000);

  console.log('updated!');
}


// var time = {
//   h: 0, // h is not exactly the hour
//   m: 0,
//   s: 0,
//   t: 0,
//   all: 0
// };

//  document.getElementById('s' + time.s).style.strokeOpacity = 1;
//  document.getElementById('m' + time.m).style.strokeOpacity = 1;
//  document.getElementById('h' + time.h).style.strokeOpacity = 1;

//  setInterval(function () {
//    time.all += 1;
//
//    let t1 = Math.floor(time.t / 6);
//
//    document.getElementById('s' + time.s).style.strokeOpacity = 0;
//
//    if (time.s < 59) {
//      time.s += 1;
//      document.getElementById('s' + time.s).style.strokeOpacity = 1;
//    } else {
//      time.s = 0;
//      document.getElementById('s' + time.s).style.strokeOpacity = 1;
//      document.getElementById('m' + time.m).style.strokeOpacity = 0;
//      time.t += 1;
//      if (time.t === 720) {
//        time.t = 0;
//      }
//      if (time.m < 59) {
//        time.m += 1;
//        document.getElementById('m' + time.m).style.strokeOpacity = 1;
//      } else {
//        time.m = 0;
//        document.getElementById('m' + time.m).style.strokeOpacity = 1;
//      }
//    }
//
//    let t2 = Math.floor(time.t / 6);
//
//    // console.log(t1, t2);
//
//    if (t2 !== t1) {
//      document.getElementById('h' + time.h).style.strokeOpacity = 0;
//      if (time.h < 119) {
//        time.h += 1;
//        document.getElementById('h' + time.h).style.strokeOpacity = 1;
//      } else {
//        time.h = 0;
//        document.getElementById('h' + time.h).style.strokeOpacity = 1;
//      }
//
//    }
//
//  }, 1000);

