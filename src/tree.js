/**
 * Created by yangm11 on 7/13/2018.
 */
'use strict';

class Foo {
  constructor(name) {
    this.name = name;
  }
}
class Dir {
  constructor(name) {
    this.name = name;
    this.children = [];
  }
  addChild(v) {
    switch (typeof v) {
      case 'string':
        this.children.push({
          name: v
        });
        break;
      case 'object':
        if (v.name && v.children) {
          this.children.push({
            name: v.name,
            children: v.children
          });
        }
        break;
    }
  }
}
// obj should be a object with name and children properties
function tree(obj, last, depth) {
  let html = '';
  for (let i = 0; i < depth; i++) {
    html = `<span class="blank">--</span>${html}`;
  }
  if (depth === 0) {
    html += `<span class=root>${obj.name}</span>`
  } else {
    if (last) {
      html += `<span class="tail-node">${obj.name}</span>`;
    } else {
      html += `<span class="node">${obj.name}</span>`;
    }
  }
  if (obj.children) {
    let N = obj.children.length;
    for (let i = 0; i < N; i++) {
      html += '<br>' + tree(obj.children[i], i === N-1, depth+1);
    }
  }
  // html += `<br>`;
  // console.log(html);
  return html;
}

/**
 * This function return an valid data structure for tree function
 * @param arr is an array of objects and arrays
 */


if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
  let obj = new Dir('root');
  let x = new Dir('About this page');
  let x1 = new Dir('What it does?');
  x1.addChild('This is a prototype,');
  x1.addChild('which print the tree layout on screen.');
  let x2 = new Dir('How it is built?');
  x2.addChild('It is built with HTML/CSS/JavaScript.');
  x2.addChild('Currently, it is only a toy. It may be polished in future.');
  x2.addChild('It should be easy with CSS to customize the view, i.e.' +
      ' folding or unfolding, which is like a breeze.');
  let x3 = new Dir('Say Hi to');
  x3.addChild('HTML');
  x3.addChild('CSS');
  x3.addChild('JavaScript');
  x.addChild(x1);
  x.addChild(x2);
  x.addChild(x3);
  obj.addChild(x);
  let y = new Dir('About me');
  let y1 = new Dir('Who am I?');
  let y2 = new Dir('What is next?');
  y1.addChild('I live on Earth, :-)');
  y1.addChild('I am a programmer working on biological data analysis and' +
      ' visualization.');
  y1.addChild('I believe web is the great platform to share, visualize, and' +
      ' interact with data, of course, including biological data.');
  y1.addChild('Find me on Github with the link below:');
  y1.addChild('https://github.com/mingzhangyang');
  y2.addChild('Create more projects on web to help the pubic find or' +
      ' understand biological data easily, ');
  y2.addChild('and help the biologists to create' +
      ' and share their data easily.');
  y.addChild(y1);
  y.addChild(y2);
  let z = new Dir('The END');
  z.addChild('Thank you for your time.');
  obj.addChild(y);
  obj.addChild(z);
  // console.dir(obj, {depth: null});
  let area = document.getElementById('tree-area');
  area.innerHTML = tree(obj, true, 0);
}