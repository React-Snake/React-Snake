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
            x={this.props.foodX}
            y={this.props.foodY}
            width={game.board.tileSize}
            height={game.board.tileSize}
            fill={game.colors.food}
        />
    );
  }
}