/**
 * Created by yangm11 on 5/5/2017.
 */
'use strict';

var sudoku = `<div><a href="html/sudoku.html" target="_blank"><img src="images/suduko.png" width="150" height="150">
</a><strong>Sudoku</strong>, 数独, is a logic-based, combinatorial number-placement puzzle. The objective is to fill a 9×9 grid with digits so that each column, each row, and each of the nine 3×3 subgrids that compose the grid (also called "boxes", "blocks", "regions", or "subsquares") contains all of the digits from 1 to 9. The puzzle setter provides a partially completed grid, which for a well-posed puzzle has a unique solution. Learn more about suduko at Wikipedia (<a href="https://en.wikipedia.org/wiki/Sudoku" target="_blank">English</a>,<a href="https://zh.wikipedia.org/wiki/%E6%95%B8%E7%8D%A8" target="_blank">中文</a>). <a class="play" href="html/sudoku.html" target="_blank">Click the image to play sudoku in your browser</a>. <em><strong>Hint:</strong></em>1. Choose the level of your interest. 2. Modify your input with the 'Modify' button. 3. Click 'Hints' button to get one block resolved each time.</div>`;

var minesweeper = `<div><a href="html/minesweeper.html" target="_blank"><img src="images/minesweeper.PNG" width="150"
height="150"></a><strong>Minesweeper</strong>, 扫雷, is a single-player puzzle game. The objective of the game is to clear a rectangular board containing hidden "mines" without detonating any of them, with help from clues about the number of neighboring mines in each field.Feel free to remind yourself the old good time. Learn more about minesweeper at Wikipedia (<a href="https://en.wikipedia.org/wiki/Minesweeper_(video_game)" target="_blank"><strong>English</strong></a>, <a href="https://zh.wikipedia.org/zh-cn/%E8%B8%A9%E5%9C%B0%E9%9B%B7" target="_blank"><strong>中文</strong></a>). <a class="play" href="html/minesweeper.html" target="_blank">Click the picture to play the game!</a> You can create custom layout, any number of rows and columns depends on you. Go challenge yourself. <strong><em>Hint</em> </strong>:1. Choose 9x9, 16x16, 30x16 or create  your own layout. 2. Use right-click to mark the suspected position.</div>`;

var gobang = `<div><a href="html/gobang.html" target="_blank"><img src="images/gobang.PNG" width="150" height="150">
 </a><strong>Five in a Row</strong>, also known as 五子棋, 五子连珠, Gobang, or Gomoku, is an abstract strategy board game. The winner is the first player to get an unbroken row of five stones horizontally, vertically, or diagonally. The current version only supports human mode. You can play with yourself or together with your friend. Playing with computer (algorithm) will be coming later soon. Learn more about the game at Wikipedia(<a href="https://en.wikipedia.org/wiki/Gomoku" target="_blank"><strong>English</strong></a>, <a href="https://zh.wikipedia.org/wiki/%E4%BA%94%E5%AD%90%E6%A3%8B" target="_blank"><strong>中文</strong></a>). <a class="play" href="html/gobang.html"> Click the picture to play the game!</a> Go challenge and Enjoy!</div>`;

var svgclock = `<div><a href="html/svgClock.html" target="_blank"><img src="images/svgclock.png" width="150" height="150"></a><strong>SVG Clock: </strong>A very basic clock drawn on SVG. You can set the background color of the clock, change the color of the hands, change the font of numbers shown on the clock.If you are interested in the code that draw the clock, please refer to src/svgClock.js for details.</div>`;

var piechart = `<div><a href="html/pieChart.html" target="_blank"><img class="left-edge" src="images/pieChart.PNG" width="150" height="150"></a><strong>Pie Chart Generator: </strong>An easy pie chart generator. Just input new data or update the existing data, the pie chart will update automatically. You are free set the fill color for each part by inputting the colors of your style sequentially. To be noted, all the colors are filled by CSS, so that you can choose Hex, RGBA or just English words to declare your style. Each color name should be separated by semi colon (;). You can also set the color of the strokes, which is set to be transparent by default. The inner radius and outer radius adjust the size of the pie chart. Inner radius is 0 by default, which generate a pie chart, set it not to be 0 if you'd like to get annulus chart. The parameter 'Mark In/Out' determines where the notations will be on the chart: inner of the chart or out of the chart. You can also take one or more parts from the chart if you like. Just specify the names and separate them by semi colon (;). Enjoy!</div>`;

var heatmap = `<div><a href="html/heatmap.html" target="_blank"><img class="left-edge" src="images/heatmap.PNG" width="150" height="150"></a><strong>Heat Map Generator: </strong>An easy heat map generator. Select the CSV file on your computer, then visualize it as a heat map to seize critical points of your data. In this application, please select colors of your interest using RGB values, i.e. "255, 0, 0" for <span class="red">red</span>, "0, 255, 0" for <span class="green">green</span>, "0, 0, 255" for <span class="blue">blue</span>, "255, 255, 255" for white and "0, 0, 0" for black. Learn about RGB colors at Wikipedia <strong><a href="https://en.wikipedia.org/wiki/RGB_color_space">HERE</a></strong>. Please see the "Requirements for using this App properly" section to learn more about this easy tool.</div>`;



// let colorSelector = `<div><a href="html/colorSelector.html" target="_blank"><img class="left-edge" js="images/colorSelector.PNG" width="150" height="150"></a><strong>Color Selector:</strong>A tool for selecting your favorite colors and get the RGBA code. There are three ways to go through colors: 1) adjust the red, green, blue, and opacity parameters by sliding; 2) directly input the rgba code to check the color; 3) click the "I am feeling good" button to generate a color randomly. Once a color catches your eyes, you can save it and compare with others that interests you by clicking the "Save & Compare button". Hope this tool will help you find the right colors for you! <a href="html/colorSelector.html" target="_blank"><strong>Check it here</strong></a>.</div>`;

let colorSelector = {
  type: 'div',
  child: [
    {
      type: 'a',
      href: 'html/colorSelector.html',
      target: '_blank',
      child: {
        type: 'img',
        class: 'left-edge',
        src: 'images/colorSelector.PNG',
        width: 150,
        height: 150
      }
    }, {
      type: 'strong',
      child: {
        type: 'textContent',
        content: 'Color Selector:'
      }
    }, {
      type: 'textContent',
      content: 'A tool for selecting your favorite colors and get the RGBA' +
      ' code. There are three ways to go through colors: 1) adjust the red,' +
      ' green, blue, and opacity parameters by sliding; 2) directly input' +
      ' the rgba code to check the color; 3) click the "I am feeling good"' +
      ' button to generate a color randomly. Once a color catches your eyes,' +
      ' you can save it and compare with others that interests you by' +
      ' clicking the "Save & Compare button". Hope this tool will help you' +
      ' find the right colors for you! '
    }, {
      type: 'a',
      href: "html/colorSelector.html",
      target: '_blank',
      child: {
        type: 'strong',
        child: {
          type: 'textContent',
          content: 'Check it here'
        }
      }
    }
  ]
};

let turnOff = {
  type: 'div',
  child: [
    {
      type: 'a',
      href: 'html/turnOff.html',
      target: '_blank',
      child: {
        type: 'img',
        class: 'right-edge',
        src: 'images/turnOff.PNG',
        width: 150,
        height: 150
      }
    }, {
      type: 'strong',
      child: {
        type: 'textContent',
        content: 'Turn on lights:'
      }
    }, {
      type: 'textContent',
      content: 'You get a matrix in two colors, grey and red. Click on a' +
      ' cell in the matrix will change the color the cell clicked, as well' +
      ' as the color of cells that on the left, top, right and bottom of the' +
      ' cell clicked, which means red cell will change to grey and grey cell' +
      ' will change to red. Try your best to make the number of red cells as' +
      ' large as possible. This is a naive example of using AngularJS in the' +
      ' web page.'
    }, {
      type: 'a',
      href: "html/turnOff.html",
      target: '_blank',
      child: {
        type: 'strong',
        child: {
          type: 'textContent',
          content: 'Check it here'
        }
      }
    }
  ]
};

let list = `
<div>
<h3>Others:</h3>
<ul class="list">
<li><a href="html/cssAnimationTest.html" target="_blank">CSS Animation Test 
Collection</a></li>
<li><a href="html/randomlyWalk.html" target="_blank">Random Walk on Canvas (Brownian Motion)</a></li>
<li><a href="html/slider.html" target="_blank">A prototype for switching slides</a></li>
<li><a href="html/divClock.html" target="_blank">A clock built solely with divs</a></li>
<li><a href="html/taiji.html" target="_blank">A TaiJiTu created with divs</a></li>
<li><a href="html/solarSystem.html" target="_blank">A toy simulation of solar system</a></li>
<li><a href="html/hungryFish.html" target="_blank">A PacMan simulation</a></li>
<li><a href="html/Spiral.html" target="_blank">Draw spiral in SVG</a></li>
<li><a href="html/tree.html" target="_blank">Simulation of tree command in Bash</a></li>
<li><a href="html/gridDrawer.html" target="_blank">Draw on grids</a></li>
<li><a href="html/dataTable.html" target="_blank">Show me the table</a></li>
<li><a href="html/countObjects.html" target="_blank">Count objects in an image</a></li>
<li><a href="html/imageAssistant.html" target="_blank">Manipulate images with CSS and 
canvas</a></li>
<li><a href="html/converters.html" target="_blank">Converters</a></li>
</ul>
</div>`;