import { Background } from './background.js';
import { Game } from './game.js';
import { UI } from './ui.js';
import { Sound } from './sound.js';


export class Core {
  constructor() {
    this._setCanvases();
    this._setContexts();
    this._setFieldParams();
    this._createCoreObjects();
    this._createBackgroundMusic();
    this._createMusicButton();
    this._appendMusicButton();
    this.isMusicOn = false;
  }

  _setContexts() {
    this.contexts = {
      gameCtx: this.canvases.gameCanvas.getContext('2d'),
      backgroundCtx: this.canvases.backgroundCanvas.getContext('2d'),
      uiCtx: this.canvases.uiCanvas.getContext('2d')
    }
  }

  _setCanvases() {
    this.canvases = {
      gameCanvas: document.getElementById('game'),
      backgroundCanvas: document.getElementById('background'),
      uiCanvas: document.getElementById('ui')
    }
  }

  _setFieldParams() {
    this.gridStep = 80;
    this.rows = Math.round(this.canvases.gameCanvas.height / this.gridStep);
    this.cols = Math.round(this.canvases.gameCanvas.width / this.gridStep);
  }

  _createMusicButton() {
    this.musicButton = document.createElement('button');
    this.musicButton.id = 'music';
    this.musicButton.classList.add('off');
    this.musicButton.addEventListener('click', this);
  }

  _appendMusicButton() {
    let image = new Image();
    image.src = '../resources/sound_off.png';
    image.src = '../resources/sound_on.png';
    document.body.appendChild(this.musicButton);
  }

  _createCoreObjects() {
    this.background = new Background(this.canvases.backgroundCanvas, this.contexts.backgroundCtx, this.rows, this.cols, this.gridStep);
    this.ui = new UI(this.canvases.uiCanvas, this.contexts.uiCtx);
    this.game = new Game(this.canvases.gameCanvas, this.contexts.gameCtx, this.ui, this.background);
  }

  _createBackgroundMusic() {
    this.backMusic = new Sound('../resources/background.mp3', 1, Infinity, true);
    this.backMusic.enable = true;
  }

  init() {
    this.background.draw();
    this.game.init();
  }

  handleEvent(event) {
    let method = '_on' + event.type;
    this[method](event);
  }

  _onclick(event) {
    if (event.target.id === 'music') {
      if (!this.isMusicOn) {
        // this.backMusic.volume = 0;
        this.backMusic.play();
      } else {
        // this.backMusic.volume = 1;
        this.backMusic.stop();
      }

      this.isMusicOn = !this.isMusicOn;

      this.musicButton.classList.toggle('on');
      this.musicButton.classList.toggle('off');
    }
  }
}