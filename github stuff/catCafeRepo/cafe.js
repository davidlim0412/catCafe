var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

//useful functions
const clamp = (num, min, max) => Math.min(Math.max(num, min), max)
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
//=================================================

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let canvas_width = canvas.width;
let canvas_height = canvas.height;

let catsList = [];
let currentCat = null;
let cursorX;
let cursorY;
let cursor_dx;
let cursor_dy;

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
  currentCat.drag(newCursorX - cursorX, newCursorY - cursorY);
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
  for (let shape of catsList) {
    if (curX >= shape.x && curX <= shape.x+shape.width && curY >= shape.y && curY <= shape.y+shape.height) {
      currentCat = shape;
      shape.dy = 0;
      shape.dx = 0;
      shape.isFalling = true;
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas_width, canvas_height);
  
  
  for (let cat of catsList) {
    context.drawImage(standing1, cat.x, cat.y, cat.width, cat.height);
    if (cat != currentCat && cat.isFalling) {
      cat.fall();
    }
  }
}


function Cats(x, y) {
  this.x = x;
  this.y = y;
  this.dy = 0;
  this.dx = 0;
  this.isFalling = true;
  this.bouncesLeft = 2;
  this.height = 100;
  this.width = 125;
  
  this.drag = function(dx, dy) {
    this.isFalling = true;
    this.dy = dy * 0.2;
    this.dx = dx * 0.2;
    this.y = clamp(this.y + dy, 0, canvas_height - this.height);
    this.x = clamp(this.x + dx, 0, canvas_width - this.width);
  }
  this.fall = function() {
    if (this.y <= 0) {
      this.dy = -this.dy * 0.5;
      this.y = 0;
    }
    this.dy += 0.4;
    if (this.x < 0 || this.x + this.width > canvas_width) { //check sides
      this.x = (this.x < 0)? 0: canvas_width-this.width;
      this.dx = -this.dx * 0.3;
    }
    if (this.y + this.height > canvas_height) {     
      this.y = canvas_height - this.height;
      this.dy = -this.dy * 0.3;
      this.dx = this.dx * 0.3;
      if (--this.bouncesLeft <= 0) {
        this.dx = 0;
        this.dy = 0;
        this.isFalling = false;
      }
    }
    this.y += this.dy;
    this.x += this.dx;
  }
}
for (let i = 0; i < 5; i++) {
  catsList.push(new Cats(getRndInteger(100, canvas_width-125), 100));
}
//sprites below


let standing1 = new Image();
standing1.src = "file:///C:/Users/david/code/github%20stuff/catCafeRepo/sprites/standing1.png"

animate();