import {canvas_height, canvas_width} from './cafe.js';
const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

export class Cats {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.dy = 0;
      this.dx = 0;
      this.sprite = pet1;
      this.facingRight = (Math.random() < 0.5);
      this.action = "falling";
      this.bouncesLeft = 2;
      this.height = 100;
      this.width = 125;
    }
    idle() {
      if (getRndInteger(0, 300) == 0) {
        if (this.action == "standing") {
          this.action = "walking";
          this.facingRight = (Math.random() < 0.5);
          this.sprite = (this.facingRight)? standing1: standing1flipped;
        } else {
          this.action = "standing";
        }
      }
      if (this.action == "walking") {
        this.x +=(this.facingRight)? 3 : -3;
        if (this.x <= 0|| this.x + this.width >= canvas_width) {
          this.facingRight = (!this.facingRight)
          this.sprite = (this.facingRight)? standing1: standing1flipped;
          this.x = clamp(this.x, 0, canvas_width+ this.width);
        }
      }
    }
  
    drag(newCursorX, newCursorY, cursorX, cursorY) {
      this.sprite = falling1;
      let dx = newCursorX - cursorX;
      let dy = newCursorY - cursorY;
      this.action = "falling";
      this.dy = dy * 0.2;
      this.dx = dx * 0.2;
      this.x = (cursorX < 0 || cursorX > canvas_width) ? clamp(cursorX, 0, canvas_width-this.width) : clamp(this.x + dx, 0, canvas_width - this.width);
      this.y = (cursorY < 0 || cursorY > canvas_height) ? clamp(cursorY, 0, canvas_height-this.height) : clamp(this.y + dy, 0, canvas_height - this.height);
      this.sprite = grabbed1;
    }
    fall() {
      this.sprite = falling1;
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
          this.action = "standing";
          this.sprite = (this.facingRight)? standing1: standing1flipped;
        }
      }
      this.y += this.dy;
      this.x += this.dx;
    }
}

let standing1 = new Image();
standing1.src = "./sprites/standing1.png"
let standing1flipped = new Image();
standing1flipped.src = "./sprites/standing1flipped.png"
let falling1 = new Image();
falling1.src = "./sprites/falling1.png"
let pet1 = new Image();
pet1.src = "./sprites/pet1.png";
let grabbed1 = new Image();
grabbed1.src = "./sprites/grabbed1.png";