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
      fps: 1000 / 10,
      foodX: 15,
      foodY: 15,
      loop: null
    });
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
    // random food color? Konva.Util.getRandomColor()
    this.generateFood();
    this.props.setTopText(`Score: ${0}`);
  }

  componentWillUnmount() {
    clearInterval(this.state.loop);
    this.setState({ loop: null });
    window.removeEventListener('keydown', this.handleKeyPress);
    this.props.setBoard(new Board(game.board.stageWidth / game.board.tileSize, game.board.stageHeight / game.board.tileSize));
    this.props.setScore(game.defaults.score);
    this.props.setFoodNeeded(game.defaults.foodNeeded);
    this.props.gameOver(game.defaults.isGameOver);
    this.props.setDirection(game.defaults.direction);
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
      if (this.props.board.get([foodX, foodY]) !== Board.types.empty)
        return this.generateFood();
      this.props.board.put([foodX, foodY], Board.types.food);
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
    case ' ':
      this.start();
      break;
    default:
      break;
    }
  }

  start() {
    const loop = () => {
      if (!this.state.loop) {
        this.setState({ loop: setInterval(() => {
          if (!this.props.isGameOver) {
            this.snake.update();
            this.generateFood();
          } else {
            clearInterval(this.state.loop);
            this.props.setTopScore(this.props.score);
            this.props.setStage('main_menu');
          }
        }, this.state.fps)
        });
      }
    };
    loop();
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
            onClick={() => this.start()}
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
        {!this.state.loop &&
          <Layer>
            <Text
              text="Press Space to start!"
              y={game.board.stageHeight / 2}
              width={game.board.stageWidth}
              align="center"
              fontSize={30}
              fontFamily="Calibri"
              fill="white"
            />
          </Layer>
        }
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
    isGameOver: state.isGameOver,
    topText: state.topText,
    topScore: state.topScore
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Game);
