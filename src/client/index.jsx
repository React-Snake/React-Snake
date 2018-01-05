import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { GameWindow, Board } from './components';
import reducers from './reducers';

import game from './game.json';

import './styles/index.css';

const store = createStore(reducers, Object.assign({}, game.defaults, {
  board: new Board(game.board.stageWidth / game.board.tileSize, game.board.stageHeight / game.board.tileSize),
  topScore: localStorage.getItem('topScore') || 0
}));

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <GameWindow />
        </div>
      </Provider>
    );
  }
}

render(<App />, document.getElementById('root'));
