export class Song {
  
  constructor() {

    this.interval = null;
    this.counter = 0;
    this.durations = this.getNoteDurations();
    this.isPlaying = false;

  }

  getNoteDurations(tempo = 1600) {

    return {
      whole: tempo,
      half: tempo / 2,
      quarter: tempo / 4,
      eigth: tempo / 8,
      sixteenth: tempo / 16
    };

  }

  start(score) {

    this.isPlaying = true;
    this.counter = 0;
    this.interval = global.setInterval(() => {

      if (score[this.counter]) {
        this.playNote(score[this.counter].keyCode, score[this.counter].duration);
      }

      this.counter += 1;

      if (this.counter >= score.length) {
        this.counter = 0;
      }

    }, this.durations.eigth);

  }

  stop() {

    this.isPlaying = false;
    this.counter = 0;
    clearInterval(this.interval);

  }

  playNote(keyCode, duration) {

    document.dispatchEvent(this.createEvent('keydown', keyCode));

    setTimeout(() => {
      document.dispatchEvent(this.createEvent('keyup', keyCode));
    }, duration);

  }

  createEvent(name, keyCode) {

    const event = new KeyboardEvent(name, {
      bubbles: true,
      cancelable: true,
      shiftKey: true
    });

    Object.defineProperty(event, 'keyCode', { value: keyCode });

    return event;

  }

}
