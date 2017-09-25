const audioContext = new AudioContext();

export default class Sound {

  constructor(frequency, waveform = 'triangle') {

    this.oscillator = audioContext.createOscillator();
    this.pressed = false;

    if (frequency) {
      this.oscillator.frequency.value = frequency;
    }

    this.oscillator.type = waveform;
    this.oscillator.start(0);

  }

  play() {

    if (this.pressed) {
      return;
    }

    this.pressed = true;
    this.oscillator.connect(audioContext.destination);

  }

  stop() {

    this.pressed = false;
    this.oscillator.disconnect();

  }

}
