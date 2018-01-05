import React, { Component } from 'react';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Board from './Board';
import Food from './Food';
import Snake from './Snake';
import * as actions from '../actions';

import game from '../game.json';

class Game extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.start = this.start.bind(this);
    this.generateFood = this.generateFood.bind(this);
  }

  componentWillMount() {
    this.setState({
      fps: 1000 / 2,
      foodX: 15,
      foodY: 15
    });
  }

  componentWillUnmount() {
    clearTimeout(this.loop);
    window.removeEventListener("keydown", this.handleKeyPress);
  }

  get snake() {
    return this.refs.snake.getWrappedInstance();
  }

  set snake(_) {
    return;
  }

  generateFood() {
    if (this.props.foodNeeded) {
      const foodX = Math.floor((Math.random() * game.board.stageWidth + 10) / 10 );
      const foodY = Math.floor((Math.random() * game.board.stageHeight + 10) / 10 );
      this.setState({
        foodX: foodX,
        foodY: foodY,
      });
      this.props.setFoodNeeded(false);
    }
  }

  handleKeyPress(event) {
    switch (event.key) {
      case 'w':
      case 'ArrowUp':
        this.props.setDirection('up');
        break;
      case 's':
      case 'ArrowDown':
        this.props.setDirection('down');
        break;
      case 'a':
      case 'ArrowLeft':
        this.props.setDirection('left');
        break;
      case 'd':
      case 'ArrowRight':
        this.props.setDirection('right');
        break;
      case 'Enter':
      case 'Space':
        //this.start();
        break;
      default:
        break;
    }
  }

  start() {
    const loop = () => !this.props.isGameOver ? this.loop = setInterval(() => {
        this.snake.update();
        this.snake.draw();
        loop();
      }, this.state.fps) : console.log('Game Over');
    if (!this.loop)
      loop();
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
    // random food color? Konva.Util.getRandomColor()
    this.generateFood();
    this.start();
  }

  render() {
    return (
      <Stage width={game.board.stageWidth} height={game.board.stageHeight}>
        <Layer>
          <Rect /* this is the background color of the mainboard */
            x={0}
            y={0}
            width={game.board.stageWidth}
            height={game.board.stageHeight}
            fill={game.colors.board}
          />
        </Layer>
        <Layer>
          <Food /* this is the food */
            foodX={this.state.foodX}
            foodY={this.state.foodY}
          />
        </Layer>
        <Layer>
          <Snake ref="snake" location={game.board.startLocation} />
        </Layer>
      </Stage>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    direction: state.direction,
    foodNeeded: state.foodNeeded,
    board: state.board,
    score: state.score,
    isGameOver: state.isGameOver
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Game);
