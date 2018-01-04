import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text } from 'react-konva';

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
        stageHeight: 300,
        stageWidth: 400,
        fps: 100,
        boardColor: '#fff',
        foodX: 150,
        foodY: 150,
        foodColor: '#000'
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.start = this.start.bind(this);
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
            /* placeholder for direction change */
            break;
        case 'Space':
            this.start();
            break;
        default:
            break;
    }
  }

  start() {
    const loop = () => this.loop = setInterval(() => {
        this.refs.snake.update();
        this.refs.snake.draw();
        loop();
      }, this.state.fps)
    loop();
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }
  render() {
    return (
      <Stage width={this.state.stageWidth} height={this.state.stageHeight}>
        <Layer>
            <Rect /* this is the background color of the mainboard */
                x={0}
                y={0}
                width={this.state.stageWidth}
                height={this.state.stageHeight}
                fill={this.state.boardColor}
            />
        </Layer>
        <Layer>
          <Snake />
        </Layer>
        <Layer> 
            <Rect /* this is the food */
                x={this.state.foodX}
                y={this.state.foodY}
                width={this.state.foodSize}
                height={this.state.foodSize}
                fill={this.state.foodColor}
            />
        </Layer>
      </Stage>
    );
  }
}