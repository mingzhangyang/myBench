/**
 * Created by yangm11 on 8/19/2019.
 */
'use strict';

let data = {
  all: [{
    content: 'This is the first item'
  }, {
    content: 'This is the second item'
  }, {
    content: 'This is the third item',
    completed: true
  }, {
    content: 'This is the fourth item',
    completed: true
  }],
  archived: [],
  completed: [{
    content: 'This is the third item',
    completed: true
  }, {
    content: 'This is the fourth item',
    completed: true
  }],
  shown: 'all'
};

class ToDoList {
  constructor(id, data) {
    if (data) {
      this.data = data;
    } else {
      this.data = {
        all: [],
        archived: [],
        completed: [],
        shown: 'all'
      };
    }
    this.targetId = id;
    this.partner = document.getElementById(this.targetId);
  }

  __createItemView(item) {
    let that = this;
    let f = document.createDocumentFragment();
    let d = f.appendChild(document.createElement('div'));
    d.classList.add('list-item');
    let it = d.appendChild(document.createElement('i'));
    it.classList.add('check-mark');
    if (item.completed) {
      d.classList.add('checked');
    }
    it.addEventListener('click', () => {
      d.classList.toggle('checked');
      item.completed = !item.completed;
      that.__updateData();
      that.__updateCount();
    });
    let sp = d.appendChild(document.createElement('span'));
    sp.innerText = item.content;
    let ic = d.appendChild(document.createElement('div'));
    ic.classList.add('icon-container');

    let ia = ic.appendChild(document.createElement('i'));
    ia.classList.add('archive-mark');

    if (that.data.shown === 'archived') {
      ia.style.opacity = '0';
      console.log(that.data);
      console.log(ia);
    } else {
      ia.addEventListener('click', () => {
        item.archived = !item.archived;
        d.classList.add('to-be-removed');
        that.__updateData();
        that.__updateCount();
        setTimeout(() => {
          d.parentElement.removeChild(d);
        }, 1000);
      });
    }

    let id = ic.appendChild(document.createElement('i'));
    id.classList.add('delete-mark');
    id.addEventListener('click', () => {
      item.deleted = true;
      d.classList.add('to-be-removed');
      that.__updateData();
      that.__updateCount();
      setTimeout(() => {
        d.parentElement.removeChild(d);
      }, 1000);
    });

    return f;
  }

  __updateData() {
    this.data.all = this.data.all.filter(item => !item.deleted);
    this.data.archived = this.data.all.filter(item => item.archived);
    this.data.completed = this.data.all.filter(item => item.completed);
  }

  __updateCount() {
    let footer = document.getElementById(this.targetId).lastElementChild;
    let n = this.data.all.filter(item => !item.completed).length;
    footer.firstChild.innerText = `${n} ${n > 1 ? 'items' : 'item'} left`;
  }

  generate() {
    let frag = document.createDocumentFragment();
    let header = frag.appendChild(document.createElement('div'));
    header.classList.add('list-header');
    let inp = header.appendChild(document.createElement('input'));
    inp.id = 'input-box';
    inp.placeholder = 'What do you want to add?';
    inp.setAttribute('type', "text");
    inp.addEventListener('change', () => {
      this.data.all.push({
        content: inp.value,
        completed: false,
        archived: false
      });
      this.data.all.shown = 'all';
      this.__updateView();
      inp.value = '';
    });

    let body = frag.appendChild(document.createElement('div'));
    body.classList.add('list-body');

    let footer = frag.appendChild(document.createElement('div'));
    footer.classList.add('list-footer');
    let sp = footer.appendChild(document.createElement('span'));
    sp.innerText = ` items left`;
    let d = footer.appendChild(document.createElement('div'));
    d.classList.add('icon-container');
    let i1 = d.appendChild(document.createElement('i'));
    i1.appendChild(document.createTextNode('All'));
    if (this.data.shown === 'all') {
      i1.classList.add('selected');
    }
    i1.addEventListener('click', () => {
      if (this.data.shown !== 'all') {
        this.data.shown = 'all';
        this.__updateView();
        i1.classList.add('selected');
        i1.nextElementSibling.classList.remove('selected');
        i1.nextElementSibling.nextElementSibling.classList.remove('selected');
      }
    });
    let i2 = d.appendChild(document.createElement('i'));
    i2.appendChild(document.createTextNode('Archive'));
    if (this.data.shown === 'archived') {
      i2.classList.add('selected');
    }
    i2.addEventListener('click', () => {
      if (this.data.shown !== 'archived') {
        this.data.shown = 'archived';
        this.__updateView();
        i2.classList.add('selected');
        i1.classList.remove('selected');
        i2.nextElementSibling.classList.remove('selected');
      }
    });
    let i3 = d.appendChild(document.createElement('i'));
    i3.appendChild(document.createTextNode('Completed'));
    if (this.data.shown === 'completed') {
      i3.classList.add('selected');
    }
    i3.addEventListener('click', () => {
      if (this.data.shown !== 'completed') {
        this.data.shown = 'completed';
        this.__updateView();
        i3.classList.add('selected');
        i1.classList.remove('selected');
        i2.classList.remove('selected');
      }
    });
    footer.appendChild(document.createElement('i')).innerText = 'clear completed';

    this.partner.appendChild(frag);
    this.__updateView();
  }

  __updateView() {
    this.__updateData();
    this.__updateCount();
    let body = document.getElementById(this.targetId).getElementsByClassName('list-body')[0];
    while (body.lastChild) {
      body.removeChild(body.lastChild);
    }
    switch (this.data.shown) {
      case 'archived':
        for (let item of this.data.archived) {
          body.appendChild(this.__createItemView(item));
        }
        break;
      case 'completed':
        for (let item of this.data.completed) {
          body.appendChild(this.__createItemView(item));
        }
        break;
      default:
        for (let item of this.data.all) {
          if (!item.archived) {
            body.appendChild(this.__createItemView(item));
          }
        }
    }

  }

  save() {

  }
}

let list = new ToDoList('container', data);
list.generate();