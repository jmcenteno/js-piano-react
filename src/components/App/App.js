import React, { Component } from 'react';
import classnames from 'classnames';

import * as NotesService from '../../services/notes/notes.service';
import * as Songs from '../../songs';
import WaveformSelect from './WaveformSelect';
import Keyboard from './Keyboard';
import styles from './App.scss';
import globalStyles from '../../index.scss';

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      notes: [],
    };

    this.song = new Songs.Demo();

  }

  componentDidMount() {

    this.setState({
      notes: NotesService.getNotes()
    });

  }

  waveformSelect(value) {

    this.state.notes.forEach(item => {
      item.sound.stop();
    });

    this.setState({ notes: NotesService.getNotes(value) });

  }

  handleKeyboardClicks() {

    if (this.state.showInstructions) {
      return;
    }

    this.setState({ showInstructions: true });

    setTimeout(() => {
      this.setState({ showInstructions: false });
    }, 3000);

  }

  toggleDemoSong() {
    
    if (!this.song.isPlaying) {
      this.song.play();
      this.setState({ playing: true });
    } else {
      this.song.stop();
      this.setState({ playing: false });
    }

  }

  render() {

    const { notes, playing } = this.state;

    return (
      <div className={ styles.container }>
        <div className={ styles.top }>
          <h1 className={ styles.title }>
            JS Piano
            <small>Web Audio API</small>
          </h1>
          <div className={ styles.controls }>
            <WaveformSelect onChange={ this.waveformSelect.bind(this) } />
            <button
              type="button"
              className={ styles.btn }
              onClick={ this.toggleDemoSong.bind(this) }>
              <i 
                className={ classnames(globalStyles.fa, {
                  [globalStyles['fa-play']]: !playing,
                  [globalStyles['fa-stop']]: playing
                }) }>
              </i>
            </button>
          </div>
        </div>
        <Keyboard notes={ notes } onClick={ this.handleKeyboardClicks.bind(this) } />
        <div className={ globalStyles.clearfix }></div>
        <div className={ classnames(styles.instructions, { [styles.show]: this.state.showInstructions }) }>
          Use your keyboard to play notes
        </div>
      </div>
    );

  }

}
