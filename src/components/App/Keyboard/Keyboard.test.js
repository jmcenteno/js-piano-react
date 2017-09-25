import React from 'react';
import ReactDOM from 'react-dom';

import Keyboard from './Keyboard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Keyboard />, div);
});
