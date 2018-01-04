import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text } from 'react-konva';
import game from '../game.json';

export default class Food extends Component {
  constructor(props) {
    super(props);
  }


 
  render() {
    return (
        <Rect 
            x={this.props.foodX * 10 - 10}
            y={this.props.foodY * 10 - 10}
            width={game.board.tileSize}
            height={game.board.tileSize}
            fill={game.colors.food}
        />
    );
  }
}