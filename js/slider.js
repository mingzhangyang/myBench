/**
 * Created by yangm11 on 7/6/2018.
 */
'use strict';

function ctrl() {
  let cur = 0;
  let slides = document.getElementsByClassName('slides');
  let indicators = document.getElementsByClassName('indicator');
  let toLeft = document.getElementById('to-left');
  let toRight = document.getElementById('to-right');
  toRight.addEventListener('click', function () {
    // console.log(cur);
    if (cur < slides.length-1) {
      slides[cur].classList.remove('current');
      slides[cur].classList.add('gone');
      indicators[cur].classList.remove('selected');
      cur++;
      slides[cur].classList.remove('upcoming');
      slides[cur].classList.add('current');
      indicators[cur].classList.add('selected');
    }
  });
  toLeft.addEventListener('click', function () {
    // console.log(cur);
    if (cur > 0) {
      slides[cur].classList.remove('current');
      slides[cur].classList.add('upcoming');
      indicators[cur].classList.remove('selected');
      cur--;
      slides[cur].classList.remove('gone');
      slides[cur].classList.add('current');
      indicators[cur].classList.add('selected');
    }
  });
  for (let i = 0; i < indicators.length; i++) {
    indicators[i].addEventListener('click', function() {
      cur = i;
      slides[i].classList.add('current');
      slides[i].classList.remove('gone', 'upcoming');
      indicators[i].classList.add('selected');
      for (let j = 0; j < i; j++) {
        slides[j].classList.remove('current', 'upcoming');
        slides[j].classList.add('gone');
        indicators[j].classList.remove('selected');
      }
      for (let k = i+1; k < indicators.length; k++) {
        slides[k].classList.remove('current', 'gone');
        slides[k].classList.add('upcoming');
        indicators[k].classList.remove('selected');
      }
    });
  }
}
ctrl();

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
}