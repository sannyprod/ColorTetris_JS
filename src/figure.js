import { Figure_type, GameOverFigure, DestroyingFigure, getRandomType } from './figures_types.js';


export class Figure {
  constructor(col, row, gridStep) {
    this.col = col;
    this.row = row;
    this.width = gridStep;
    this.type = Figure_type[getRandomType()];
  }

  draw(ctx) {
    ctx.beginPath();

    if (this.type === Figure_type.rect) {
      this._drawRect(ctx);
    } else if (this.type === Figure_type.circle || this.type === GameOverFigure) {
      this._drawCircle(ctx);
    } else if (this.type === Figure_type.diamond) {
      this._drawDiamond(ctx);
    } else if (this.type === Figure_type.star) {
      this._drawStar(ctx);
    } else if (this.type === DestroyingFigure) {
      this._drawDestroying(ctx);
    }

    this._drawBorder(ctx);
  }

  _drawBorder(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.type;
    ctx.lineWidth = 4;
    ctx.rect(this.col * this.width, this.row * this.width, this.width, this.width);
    ctx.stroke();
    ctx.closePath();
  }

  _drawDestroying(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.type;
    ctx.lineWidth = 4;
    ctx.moveTo(this.col * this.width, this.row * this.width);
    ctx.lineTo(this.col * this.width + this.width, this.row * this.width + this.width);
    ctx.lineTo(this.col * this.width, this.row * this.width + this.width);
    ctx.lineTo(this.col * this.width + this.width, this.row * this.width);
    ctx.stroke();
  }

  _drawRect(ctx) {
    ctx.fillStyle = this.type;
    ctx.fillRect( this.col * this.width + this.width / 8,
                  this.row * this.width + this.width / 8,
                  this.width - this.width / 4,
                  this.width - this.width / 4);
  }

  _drawCircle(ctx) {
    ctx.fillStyle = this.type;
    ctx.arc(this.col * this.width + this.width / 2, 
            this.row * this.width + this.width / 2,
            this.width / 2.5,
            0,
            Math.PI * 2);
    ctx.fill();
  }

  _drawDiamond(ctx) {
    ctx.fillStyle = this.type;
    ctx.strokeStyle = this.type;
    ctx.lineWidth = 1;
    ctx.moveTo(this.col * this.width + this.width / 2, this.row * this.width + 10);
    ctx.lineTo(this.col * this.width + this.width - 10, this.row * this.width + this.width / 2);
    ctx.lineTo(this.col * this.width + this.width / 2, this.row * this.width + this.width - 10);
    ctx.lineTo(this.col * this.width + 10, this.row * this.width + this.width / 2);
    ctx.fill();
    ctx.stroke();
  }

  _drawStar(ctx) {
    ctx.fillStyle = this.type;
    ctx.strokeStyle = this.type;
    ctx.lineWidth = 1;

    ctx.moveTo(this.col * this.width + this.width*0.5, this.row * this.width + 10);
    ctx.lineTo(this.col * this.width + this.width*0.35 + 3, this.row * this.width + this.width*0.35 + 3);
    ctx.lineTo(this.col * this.width + 10, this.row * this.width + this.width*0.5);
    ctx.lineTo(this.col * this.width + this.width*0.35 + 3, this.row * this.width + this.width*0.65 - 3);
    ctx.lineTo(this.col * this.width + this.width*0.5, this.row * this.width + this.width - 10);
    ctx.lineTo(this.col * this.width + this.width*0.65 - 3, this.row * this.width + this.width*0.65 - 3);
    ctx.lineTo(this.col * this.width + this.width - 10, this.row * this.width + this.width*0.5);
    ctx.lineTo(this.col * this.width + this.width*0.65 - 3, this.row * this.width + this.width*0.35 + 3);
    ctx.lineTo(this.col * this.width + this.width*0.5, this.row * this.width + 10);

    ctx.stroke();
    ctx.fill();
  }

  drawUI(newCol, newRow, ctx) {
    let prevParams = {
      col: this.col,
      row: this.row,
    };

    this.col = newCol;
    this.row = newRow;

    this.draw(ctx);

    this.col = prevParams.col;
    this.row = prevParams.row;
  }

  move(direction) {
    if (direction === 0) {
      this.row += 1;
    }

    if (direction < 0) {
      this.col -= 1;
    }

    if (direction > 0) {
      this.col += 1;
    }
  }
}