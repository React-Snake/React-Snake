import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Stage, Group, Rect, Text } from 'react-konva';
import * as actions from '../actions';

import Board from './Board';
import game from '../game.json';

class Node extends Component {
  constructor(props) {
    super(props);
    this.addNode = this.addNode.bind(this);
    this.delete = this.delete.bind(this);
    this.draw = this.draw.bind(this);
    this.update = this.update.bind(this);
    this.eatFood = this.eatFood.bind(this);
  }

  componentWillMount() {
    this.setState({
      previousLocation: this.previousLocation,
      location: this.props.location,
      parent: this.props.parent,
      foodEaten: false
    });
  }

  get board() {
    return this.props.board;
  }

  get child() {
    if (this.refs.child)
      return this.refs.child.getWrappedInstance();
    return undefined;
  }

  get children() {
    const children = [];
    let child = this.child;
    while(child !== undefined) {
      children.push(child);
      child = child.child;
    }
    console.log(children.length);
    return children;
  }

  get direction() {
    return this.props.direction;
  }

  get isHead() {
    return this.parent === undefined;
  }

  get isTail() {
    return this.child === undefined;
  }

  get location() {
    if (this.state === null)
      return this.props.location;
    return this.state.location === undefined ? this.props.location : this.state.location;
  }

  get nextLocation() {
    if (this.isHead) {
      let location = [];
      const [x, y] = this.location;
      switch (this.direction) {
        case 'up':
          location = [x, y - 1];
          break;
        case 'down':
          location = [x, y + 1];
          break;
        case 'left':
          location = [x - 1, y];
          break;
        case 'right':
          location = [x + 1, y];
          break;
        default:
          const error = new Error(`Unknown direction '${this.direction}'`);
          error.name = 'SnakeNodeError';
          throw error;
      }
      return location;
    }
    return this.parent.previousLocation;
  }

  get parent() {
    return this.state.parent || undefined;
  }

  get previousLocation() {
    let location = this.state === null ? undefined : this.state.previousLocation;
    if (location === undefined) {
      const [x, y] = this.location;
      switch (this.props.direction) {
        case 'up':
          location = [x, y + 1];
          break;
        case 'down':
          location = [x, y - 1];
          break;
        case 'left':
          location = [x + 1, y];
          break;
        case 'right':
          location = [x - 1, y];
          break;
        default:
          const error = new Error(`Unknown direction '${this.props.direction}'`);
          error.name = 'SnakeNodeError';
          throw error;
      }
    }
    return location;
  }

  get x() {
    return this.location[0];
  }

  get y() {
    return this.location[1];
  }

  set board(_) {
    return this.props.board;
  }

  set child(_) {
    return;
  }

  set children(_) {
    return;
  }

  set direction(_) {
    return;
  }

  set isHead(_) {
    return;
  }

  set isTail(_) {
    return;
  }

  set location(value) {
    if (!Array.isArray(value)) {
      const error = new Error(`Expected an Array at 'set location'! Received '${value}'`);
      error.name = 'SnakeNodeError';
      throw error;
    }
    if (value.length !== 2) {
      const error = new Error(`Expected an Array length of 2 at 'set location'! Received '${value}'`);
      error.name = 'SnakeNodeError';
      throw error;
    }
    this.setState({
      location: value
    });
  }

  set nextLocation(value) {
    return;
  }

  set parent(value) {
    this.state.parent = value;
  }

  set previousLocation(value) {
    if (!Array.isArray(value)) {
      const error = new Error(`Expected an Array at 'set previousLocation'! Received '${value}'`);
      error.name = 'SnakeNodeError';
      throw error;
    }
    if (value.length !== 2) {
      const error = new Error(`Expected an Array length of 2 at 'set previousLocation'! Received '${value}'`);
      error.name = 'SnakeNodeError';
      throw error;
    }
    this.setState({
      previousLocation: value
    });
  }

  set x(value) {
    if (isNaN(value)) {
      const error = new Error(`Expected a Number at 'set x'. Received: ${value}'`);
      error.name = 'SnakeNodeError';
      throw error;
    }
    value = ~~Number(value);
    this.location[0] = value;;
  }

  set y(value) {
    if (isNaN(value)) {
      const error = new Error(`Expected a Number at 'set y'. Received: ${value}'`);
      error.name = 'SnakeNodeError';
      throw error;
    }
    value = ~~Number(value);
    this.location[1] = value;
  }

  addNode() {
    if (this.isTail)
      this.setState({ foodEaten: true });
    else
      this.child.addNode();
  }

  delete() {
    return;
  }

  draw() {
    if (!this.isTail)
      this.child.draw();
  }

  eatFood() {
    this.addNode();
    this.props.setScore(this.props.score + 1);
    this.props.setFoodNeeded(true);
  }

  update() {
    if (this.isHead) {
      switch (this.board.get(this.nextLocation)) {
        case Board.types.food:
          this.eatFood();
        case Board.types.empty:
          this.board.put(this.nextLocation, Board.types.snake);
          break;
        case Board.types.snake:
        case Board.types.border:
          this.props.gameOver(true);
          break;
        default:
          const error = new Error(`Unknown cell type '${this.board.get(this.nextLocation)}'`);
          error.name = 'SnakeError';
          throw error;
      }
    }
    if (this.isTail) {
      this.board.put(this.location, Board.types.empty);
    }
    this.previousLocation = this.location;
    this.location = this.nextLocation;
    if (!this.isTail)
      this.child.update();
  }

  render() {
    return (
      <Group>
        <Rect
          x={this.x * game.board.tileSize}
          y={this.y * game.board.tileSize}
          width={game.board.tileSize}
          height={game.board.tileSize}
          fill={this.isHead ? game.colors.snakeHead : game.colors.snakeBody}
        />
        {this.state.foodEaten &&
          <ConnectedNode location={this.previousLocation} parent={this} ref="child" />
        }
      </Group>
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

const ConnectedNode = connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Node);

export default ConnectedNode
