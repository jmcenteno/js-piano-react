import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './WaveformSelect.scss';

export default class WaveformSelect extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired
  }

  handleOnChange(e) {

    this.props.onChange(e.target.value);

  }

  render() {

    return (
      <div className={ styles['waveform-control'] }>
        <label>
          Waveform
          <select onChange={ this.handleOnChange.bind(this) }>
            {
              ['triangle', 'sine', 'square', 'sawtooth'].map((option, i) => {
                return (
                  <option key={ `option-${i}` } value={ option }>{ option }</option>
                );
              })
            }
          </select>
        </label>
      </div>
    );

  }

}
