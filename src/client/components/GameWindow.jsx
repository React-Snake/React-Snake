import React, { Component } from 'react';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Stage, Layer, Rect, Text } from 'react-konva';
import * as actions from '../actions';

import Game from './Game';
import GameOver from './GameOver';
import MainMenu from './MainMenu';

import game from '../game.json';

class GameWindow extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      topText: this.props.topText
    })
  }

  get topText() {
    if (!this.state)
      return this.props.topText;
    else
      return this.state.topText || this.props.topText;
  }

  set topText(_) {
    return;
  }

  get stage() {
    switch (this.props.stage) {
      case 'game':
        return <Game />
      case 'game_over':
        return <Game />
      case 'main_menu':
      default:
        return <MainMenu />
    }
  }

  set stage(_) {
    return;
  }

  render() {
    return (
      <div className="game">
        <Stage width={game.window.width} height={game.window.topHeight}>
          <Layer>
            <Rect
              width={game.window.width}
              height={game.window.topHeight}
              fill={game.colors.topWindow}
            />
            <Text
              text={this.props.topText}
              y={game.window.topHeight / 3}
              width={game.window.width}
              align="center"
              fontSize={16}
              fontFamily="Calibri"
              fill="white"
            />
          </Layer>
        </Stage>
        { this.stage }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    direction: state.direction,
    foodNeeded: state.foodNeeded,
    board: state.board,
    score: state.score,
    isGameOver: state.isGameOver,
    stage: state.stage,
    topText: state.topText
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(GameWindow);
