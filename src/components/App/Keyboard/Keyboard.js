import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { findDOMNode } from 'react-dom';

import Sound from '../../../services/notes/sound';
import styles from './Keyboard.scss'

export default class Keyboard extends Component {
  
  static propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
      noteName: PropTypes.string.isRequired,
      frequency: PropTypes.number.isRequired,
      keyName: PropTypes.string.isRequired,
      keyCode: PropTypes.number.isRequired,
      sound: PropTypes.instanceOf(Sound).isRequired
    })),
    onClick: PropTypes.func.isRequired
  }

  componentDidMount() {

    window.addEventListener('keydown', this.play.bind(this));
    window.addEventListener('keyup', this.stop.bind(this));

    window.addEventListener('touchstart', this.play.bind(this));
    window.addEventListener('touchend', this.stop.bind(this));

  }

  play(e) {

    e.preventDefault();
    
    const element = e.target;
    let keyCode = e['keyCode'] || element.getAttribute('data-key');
    const note = this.getNoteByKeyCode(keyCode);

    if (!note) {
      return;
    }

    note.sound.play();

    if (keyCode === 186) {
      keyCode = 59;
    }
    
    findDOMNode(this)
      .querySelector(`li[data-key="${keyCode}"]`)
      .classList.add(styles.playing);

  }

  stop(e) {

    const element = e.target;
    let keyCode = e['keyCode'] || element.getAttribute('data-key');
    const note = this.getNoteByKeyCode(keyCode);

    if (!note) {
      return;
    }

    note.sound.stop();

    if (keyCode === 186) {
      keyCode = 59;
    }

    findDOMNode(this)
      .querySelector(`li[data-key="${keyCode}"]`)
      .classList.remove(styles.playing);
    //document.querySelector(`li[data-key="${keyCode}"]`).classList.remove('playing');

  }

  getNoteByKeyCode(keyCode) {
    
    if (keyCode === 186) {
      keyCode = 59;
    }

    return this.props.notes.find((item) => item.keyCode === keyCode);

  }

  render() {

    const { notes } = this.props;

    return (
      <ul className={ styles.keyboard }>
        {
          notes.map((item, i) => {

            const className = classnames(styles.key, {
              [styles.white]: item.noteName.indexOf('#') === -1,
              [styles.black]: item.noteName.indexOf('#') !== -1,
              [styles.playing]: item.sound.pressed
            });

            return (
              <li
                key={ `key-${i}` }
                className={ className }
                onClick={ this.props.onClick }
                data-key={ item.keyCode }
              />
            );

          })
        }
      </ul>
    );

  }

}
