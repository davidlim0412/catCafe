import {canvas_height, canvas_width} from './cafe.js';
const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

export class Cats {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.dy = 0;
      this.dx = 0;
      this.isWalking = false;
      this.isFalling = true;
      this.bouncesLeft = 2;
      this.height = 100;
      this.width = 125;
      this.walkSpeed = (Math.random() < 0.5)? 2: -2;
    }
    walk() {
      this.x += this.walkSpeed;
      if (this.x < 0|| this.x + this.width > canvas_width) {
        this.walkSpeed = -this.walkSpeed
      }
    }
  
    drag(newCursorX, newCursorY, cursorX, cursorY) {
      this.isFalling = true;
      this.isWalking = false;
      this.dy = (newCursorX - cursorX) * 0.2;
      this.dx = (newCursorY - cursorY) * 0.2;
      this.x = (cursorX < 0 || cursorX > canvas_width) ? clamp(cursorX, 0, canvas_width-this.width) : clamp(this.x + (newCursorX - cursorX), 0, canvas_width - this.width);
      this.y = (cursorY < 0 || cursorY > canvas_height) ? clamp(cursorY, 0, canvas_height-this.height) : clamp(this.y + (newCursorY - cursorY), 0, canvas_height - this.height);
  
    }
    fall() {
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
          this.isWalking = true;
        }
      }
      this.y += this.dy;
      this.x += this.dx;
    }
}