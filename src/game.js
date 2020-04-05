import { Input } from './input.js';
import { Figure_type } from './figures_types.js';
import { Field } from './field.js';
import { Block } from './block.js';
import { Sound } from './sound.js';


export class Game {
  constructor(canvas, ctx, ui, background) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.ui = ui;
    this.background = background;
    this.deletionBlockSound = new Sound('../resources/deletion.mp3', 1, 1);
    this.deletionBlockSound.enable = true;

    this.score = 0;

    this.interval = null;

    this.isStarted = false;
    this.isPaused = false;

    this.gridStep = 80;
    this._setDeltaTime();

    this.isColorMathchingFinished = true;
  }

  init() {
    this._addEventListeners();
    this.ui.draw(null, this.score);
    this.ui.drawStartGame(this.canvas.width / 2, this.canvas.height / 2);
  }

  _createBlock() {
    this.block = new Block(0, 3, 11, 6, this.gridStep);
  }

  _createNextBlock() {
    this.nextBlock = new Block(0, 3, 11, 6, this.gridStep);
  }

  _setDeltaTime() {
    this.deltaTime = 5;
  }

  start() {
    this.isStarted = true;
    this.reset();
    this.draw();
    this.interval = this._setInterval();
  }

  stop() {
    this.isStarted = false;
    this.isPaused = false;
    this.nextBlock = null;
    clearInterval(this.interval);
  }

  reset() {
    this.score = 0;
    this.gameField = new Field(11, 7);
    this._createBlock();
    this._createNextBlock();
  }

  pause() {
    if (this.isPaused) {
      this.isPaused = false;
      this.interval = this._setInterval();
      this.draw();
    } else {
      clearInterval(this.interval);
      this.isPaused = true;
      this.ui.drawPaused(this.canvas.width / 2 + 15, this.canvas.height / 2);
    }
  }

  _setInterval() {
    return setInterval(this._tickGameLogic.bind(this), 100);
  }

  _tickGameLogic() {
    if (!this.isStarted) {
      return;
    }

    if (this.isPaused) {
      return;
    }

    if (this.isColorMathchingFinished) {
      if (this.deltaTime === 0) {
        if (this.block.move(this.gameField.field)) {
          if (this.gameField.addBlockToField(this.block)) {
            this._loseAction();
            return;
          } else {
            this.isColorMathchingFinished = false;
            this.block = this.nextBlock;
            this._createNextBlock();
          }
        }
        this._setDeltaTime();
      } else {
        this.deltaTime -= 1;
      }
    } else {
      this.deltaTime -= 0.5;
      if (this.deltaTime % 3 === 0) {
        this.score += this.gameField.deletionDestroyingFigures();
        this.gameField.moveFiguresToBottom();
        this.isColorMathchingFinished = this.gameField.checkColorMatching();
      }

      if (this.isColorMathchingFinished) {
        this._setDeltaTime();
      }
    }

    this.draw();
  }

  _loseAction() {
    this.stop();
    this.background.draw();
    this.draw(this.ctx);
    this.ui.drawGameOver(this.canvas.width / 2 + 10, this.canvas.height / 2 - 80);
    this.ui.drawStartGame(this.canvas.width / 2 + 10, this.canvas.height / 2);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    if (this.isColorMathchingFinished) {
      this.block.draw(this.ctx);
      this.ui.draw(this.nextBlock, this.score);
    }
    this.gameField.draw(this.ctx);
  }


  //******************************************/
  _addEventListeners() {
    document.addEventListener('keydown', this);
    document.addEventListener('deletion', this);
  }

  handleEvent(event) {
    this['_' + event.type](event);
  }

  _keydown(event) {
    if ((event.keyCode === Input.P || event.keyCode === Input.Space) && this.isStarted) {
      this.pause();
    } else if (event.keyCode === Input.T && this.isStarted) {
      this.stop();
    } else if (event.keyCode === Input.S || event.keyCode === Input.Down) {
      if (!this.isStarted) {
        this.start();
      } else if (this.isColorMathchingFinished) {
        this.block.move(this.gameField.field, 0);
        this.draw();
      }
    } 
    if (!this.isStarted || this.isPaused || !this.isColorMathchingFinished) {
      return;
    }
    if (event.keyCode === Input.A || event.keyCode === Input.Left) {
      this.block.move(this.gameField.field, -1);
      this.draw();
    } else if (event.keyCode === Input.D || event.keyCode === Input.Right) {
      this.block.move(this.gameField.field, 1);
      this.draw();
    } else if (event.keyCode === Input.Q || event.keyCode === Input.E || event.keyCode === Input.Up) {
      event.preventDefault();
      this.block.action();
      this.draw();
    }
  }

  _deletion(event) {
    this.deletionBlockSound.play();
  }
}