import {Cats} from './catclass.js';

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

//useful functions
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
//=================================================

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let canvas_width = canvas.width;
let canvas_height = canvas.height;
export {canvas_width, canvas_height};
let catsList = [];
let currentCat = null;
let cursorX;
let cursorY;
addEventListener("resize", function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas_width = canvas.width;
  canvas_height = canvas.height;
  for (let cat of catsList) {
    cat.isFalling = true;
  }
})
//==============Screen/setup above=======
addEventListener("mouseup", function(event) {
  if (currentCat != null) {
    releaseCat();
  }
});

addEventListener("mousedown", function(event) {
  if (event.buttons !== 1) {return;} //proceed if left click
  event.preventDefault();
  cursorX = parseInt(event.pageX);
  cursorY = parseInt(event.pageY);
  //functions under
  detectGrab(cursorX, cursorY);
});

addEventListener("mousemove", function(event) {
  if (currentCat == null) {return;}
  if (event.buttons !== 1) {
    releaseCat();
    return;
  }
  let newCursorX = parseInt(event.pageX);
  let newCursorY = parseInt(event.pageY);
  //=========delta functions here==============
  currentCat.drag(newCursorX, newCursorY, cursorX, cursorY);
  cursorX = newCursorX;
  cursorY = newCursorY;
});

//================CURSOR ABOVE================
//=================CATS BELOW=================
let releaseCat = function() {
  currentCat.bouncesLeft = 2;
  currentCat = null;
}

let detectGrab = function(curX, curY) {
  for (let cat of catsList) {
    if (curX >= cat.x && curX <= cat.x+cat.width && curY >= cat.y && curY <= cat.y+cat.height) {
      currentCat = cat;
      currentCat.dy = 0;
      currentCat.dx = 0;
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas_width, canvas_height);
  
  
  for (let cat of catsList) {
    let sprite = (cat.isFalling)? falling1:standing1;
    if (cat.isPet == true) {sprite = pet1;}
    context.drawImage(sprite, cat.x, cat.y, cat.width, cat.height);
    if (cat != currentCat && cat.isFalling) {
      cat.fall();
    }
    if (cat.isWalking == true) {
      cat.walk();
    }
  }
}

for (let i = 0; i < 5; i++) {
  catsList.push(new Cats(getRndInteger(100, canvas_width-125), 100));
}
//sprites below


let standing1 = new Image();
standing1.src = "./sprites/standing1.png"
let falling1 = new Image();
falling1.src = "./sprites/falling1.png"
let pet1 = new Image();
pet1.src = "./sprites/pet1.png";
animate();