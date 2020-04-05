export class UI {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
  }

  draw(block, score) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this._drawScore(score);
    if (block) {
      this._drawNextBlock(block);
    }
  }

  _drawScore(score) {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '22px serif';
    this.ctx.fillText('Score: ' + score, this.canvas.width - 111 - String(score).length, 120);
    this.ctx.closePath();
  }

  _drawNextBlock(block) {
    block.drawUI(8.1, 2.5, this.ctx);
  }

  drawStartGame(x, y) {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'Red';
    this.ctx.strokeStyle = 'Gold';
    this.ctx.lineWidth = 1;
    this.ctx.font = 'bold 32px serif';
    this.ctx.fillText('Press "S" or "↓" key to start', x, y);
    this.ctx.strokeText('Press "S" or "↓" key to start', x, y);
    this.ctx.closePath();
  }

  drawGameOver(x, y) {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'Red';
    this.ctx.strokeStyle = 'Gold';
    this.ctx.lineWidth = 1;
    this.ctx.font = 'bold 38px serif';
    this.ctx.fillText('GAME OVER', x, y);
    this.ctx.strokeText('GAME OVER', x, y);
    this.ctx.closePath();
  }

  drawPaused(x, y) {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(x - 85, y - 20, 170, 35);

    this.ctx.beginPath();
    this.ctx.fillStyle = 'HotPink';
    // this.ctx.strokeStyle = 'black';
    // this.ctx.lineWidth = 1;
    this.ctx.font = 'bold 42px serif';
    this.ctx.fillText('PAUSED', x, y);
    // this.ctx.strokeText('PAUSED', x, y);
    this.ctx.closePath();
  }
}