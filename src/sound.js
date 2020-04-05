export class Sound {
  constructor(src, volume, endTime = Infinity, loop = false) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.setAttribute("loop", String(loop));
    // this.sound.setAttribute("autoplay", String(autoplay));
    // this.sound.setAttribute("type", "audio/mpeg");
    this.sound.style.display = "none";
    this.sound.volume = volume;
    this.endTime = endTime;
    this.isEnable = false;
    this.isPaused = false;

    this._addEventListeners();
  }

  set volume(value = 0) {
    this.sound.volume = value;
  }

  get volume(){
    return this.sound.volume;
  }

  set enable(value) {
    this.isEnable = value;
  }

  play() {
    if (this.isEnable) {
      if (!this.isPaused) {
        this.sound.currentTime = 0;
        this.isPaused = false;
      }
      this.sound.play();
    }
  }

  stop() {
    this.sound.pause();
  }

  pause() {
    this.sound.pause();
    this.paused = true;
  }

  _addEventListeners() {
    this.sound.addEventListener("timeupdate", (event) => {
      if (this.sound.currentTime > this.endTime) {
        this.sound.pause();
      }
    }, false);
  }
}