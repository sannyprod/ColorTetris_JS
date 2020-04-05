import { GameOverFigure, DestroyingFigure } from './figures_types.js';
import { Block } from './block.js';


export class Field {
  constructor(rows, cols) {
    this.lastRow = rows;
    this.lastCol = cols;
    this.field = this._createField();
    this.elementsOnDelete = [];
  }

  _createField() {
    let field = [];

    for (let i = 0; i < this.lastRow; i++) {
      let colArray = [];
      for (let j = 0; j < this.lastCol; j++) {
        colArray.push(0);
      }
      field.push(colArray);
    }

    return field;
  }

  addBlockToField(block) {
    let isGameOver = false;
    block.figures.forEach(element => {
      if (element.row >= 0) {
        this.field[element.row][element.col] = element;
      } else {
        isGameOver = true;
      }
    });

    if (isGameOver) {
      this.setGameOverColor();
      return true;
    }
  }

  checkColorMatching() {
    this._checkHorizontal();
    this._checkVertical();

    if (this.elementsOnDelete.length) {
      this.elementsOnDelete.forEach(element => {
        this.field[element.row][element.col].type = DestroyingFigure;
      });

      document.dispatchEvent(new Event('deletion'));

      return false;
    } else {
      return true;
    }
  }

  _checkHorizontal() {
    for (let row = 0; row < this.lastRow; row++) {
      let rowArr = [];
      for (let col = 0; col < this.lastCol - 1; col++) {
        if (this.field[row][col]) {
          rowArr.push({row: row, col: col});
          if (this.field[row][col].type !== this.field[row][col + 1].type) {
            if (rowArr.length > 2) {
              rowArr.forEach(element => {
                this.elementsOnDelete.push(element);
              });
            }
            rowArr = [];
          } else if (col === this.lastCol - 2) {
            if (this.field[row][col + 1] && this.field[row][col].type === this.field[row][col + 1].type) {
              rowArr.push({row: row, col: col + 1});
            }
            if (rowArr.length > 2) {
              rowArr.forEach(element => {
                this.elementsOnDelete.push(element);
              });
            }
          }
        }
      }
    }
  }

  _checkVertical() {
    for (let col = 0; col < this.lastCol; col++) {
      let colArr = [];
      for (let row = 0; row < this.lastRow - 1; row++) {
        if (this.field[row][col]) {
          colArr.push({row: row, col: col});
          if (this.field[row][col].type !== this.field[row + 1][col].type) {
            if (colArr.length > 2) {
              colArr.forEach(element => {
                this.elementsOnDelete.push(element);
              });
            }
            colArr = [];
          } else if (row === this.lastRow - 2) {
            if (this.field[row + 1][col] && this.field[row][col].type === this.field[row + 1][col].type) {
              colArr.push({row: row + 1, col: col});
            }
            if (colArr.length > 2) {
              colArr.forEach(element => {
                this.elementsOnDelete.push(element);
              });
            }
          }
        }
      }
    }
  }

  deletionDestroyingFigures() {
    let scoreCount = 0;

    for (let i = 0; i < this.lastRow; i++) {
      for (let j = 0; j < this.lastCol; j++) {
        if (this.field[i][j]) {
          if (this.field[i][j].type === DestroyingFigure) {
            this.field[i][j] = 0;
            scoreCount++;
          }
        }
      }
    }
    this.elementsOnDelete = [];

    return scoreCount * (scoreCount - 2) * 10 ;
  }

  moveFiguresToBottom() {
    for (let i = 0; i < this.lastCol; i++) {
      for (let j = 0; j < this.lastRow - 1; j++) {
        let k = this.lastRow - 1;
        while (k > 0) {
          if (!this.field[k][i]) {
            if (typeof this.field[k][i] !== typeof this.field[k-1][i]) {
              this.field[k][i] = this.field[k-1][i];
              this.field[k][i].row += 1;
              this.field[k-1][i] = 0;
            }
          }
          k--;
        }
      }
    }
  }

  draw(ctx) {
    this.field.forEach(col => {
      col.forEach(row => {
        if (row) {
          row.draw(ctx);
        }
      });
    });
  }

  setGameOverColor() {
    this.field.forEach(col => {
      col.forEach(row => {
        if (row) {
          row.type = GameOverFigure;
        }
      });
    });
  }
}