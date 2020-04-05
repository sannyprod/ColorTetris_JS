export class Background {
  constructor(canvas, ctx, rows, cols, gridStep) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.rows = rows;
    this.cols = cols;
    this.gridStep = gridStep;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this._drawBackground();
    this._drawBorder();
    this._drawSeparators();
  }

  _drawBackground() {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  _drawBorder() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#777';
    this.ctx.lineWidth = 5;
    this.ctx.rect(2, 2, this.cols * this.gridStep + 13, this.rows * this.gridStep + 3);
    this.ctx.stroke();
    this.ctx.lineWidth = 1;
  }

  _drawSeparators() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = '#b8c';
        this.ctx.moveTo(10 + j * this.gridStep + 4, i * this.gridStep);
        this.ctx.lineTo(10 + j * this.gridStep + this.gridStep - 4, i * this.gridStep);
        this.ctx.stroke();
      }
    }
  }
}