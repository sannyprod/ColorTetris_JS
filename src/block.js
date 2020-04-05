import { Figure_type, getRandomType } from './figures_types.js';
import { Figure } from './figure.js';


export class Block {
  constructor(row, col, maxRow, maxCol, gridStep) {
    this.row = row;
    this.col = col;
    this.maxCol = maxCol;
    this.maxRow = maxRow;
    this.width = gridStep;
    this.height = gridStep * 3;

    this.figures = this._createFigures();
  }

  _createFigures() {
    let figures = [];

    figures.push(new Figure(this.col, -2, this.width));
    figures.push(new Figure(this.col, -1, this.width));
    figures.push(new Figure(this.col, 0, this.width));

    return figures;
  }

  draw(ctx) {
    this._drawFigures(ctx);
  }

  _drawFigures(ctx) {
    this.figures.forEach(element => {
      element.draw(ctx);
    });
  }

  drawUI(newCol, newRow, ctx) {
    let count = 0;
    this.figures.forEach(element => {
      element.drawUI(newCol, newRow + count, ctx);
      count++;
    });
  }

  move(gameField, direction = 0) {
    if (this._checkSideCollision(gameField, direction)) {
      return;
    }

    if (direction === 0 && this._checkBottomCollision(gameField)) {
      return true;
    }

    if (direction > 0) {
      this.col += 1;
    } else if (direction < 0) {
      this.col -= 1;
    }

    if (direction === 0) {
      this.row += 1;
    }

    this._moveFigures(direction);
  }

  _checkSideCollision(gameField, direction) {
    if (direction > 0 && (this.col === this.maxCol || gameField[this.row][this.col + 1]) 
        || direction < 0 && (this.col === 0 || gameField[this.row][this.col - 1])) {
      return true;
    }
  }

  _checkBottomCollision(gameField) {
    if (this.row === this.maxRow - 1) {
      return true;
    } else if (gameField[this.row + 1][this.col]) {
      return true;
    }
  }

  _moveFigures(direction) {
    this.figures.forEach(element => {
      element.move(direction);
    });
  }

  action() {
    let tmp = this.figures[0].row;
    this.figures[0].row = this.figures[2].row;
    this.figures[2].row = tmp;
    
    tmp = this.figures[1].row;
    this.figures[1].row = this.figures[0].row;
    this.figures[0].row = tmp;

    [this.figures[0], this.figures[2]] = [this.figures[2], this.figures[0]];
    [this.figures[1], this.figures[2]] = [this.figures[2], this.figures[1]];
  }
}