import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Game from './components/Game.js';


class App extends Component {
  render() {
    return (
      <Game/>
    );
  }
}

render(<App />, document.getElementById('root'));