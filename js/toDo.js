/**
 * Created by yangm11 on 8/19/2019.
 */
'use strict';

let items = document.getElementsByClassName('list-item');
for (let item of items) {
  item.addEventListener('click', () => {
    item.classList.toggle('checked');
  });
}