import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text } from 'react-konva';
import game from '../game.json';
import Food from './Food.js';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
        fps: 100,
        foodX: 150,
        foodY: 150
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.start = this.start.bind(this);
    this.generateFood = this.generateFood.bind(this);
  }

  generateFood() {
    const foodX = Math.floor(Math.random() * game.board.stageWidth );
    const foodY = Math.floor(Math.random() * game.board.stageHeight );
    this.setState({
        foodX: foodX,
        foodY: foodY,
    })
    /* this.props.toggleFood() */
  }

  handleKeyPress(event) {
    switch(event.key) {
        case 'ArrowUp':
            /* placeholder for direction change */
            break;
        case 'ArrowDown':
            /* placeholder for direction change */
            break;
        case 'ArrowLeft':
            /* placeholder for direction change */
            break;
        case 'ArrowRight':
            this.generateFood();
            break;
        case 'Space':
            this.start();
            break;
        default:
            break;
    }
  }

  start() {
    const loop = () => setInterval(() => {
        this.refs.snake.update();
        this.refs.snake.draw();
      }, this.state.fps)
    loop();
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }
  render() {
    /* 
        this.props.isThereFood && this.generateFood()
    */
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
      </Stage>
    );
  }
}