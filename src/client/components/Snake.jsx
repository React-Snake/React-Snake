import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import Board from './Board';

class Snake extends Component {
  constructor(props) {
    super(props);
    this.eatFood = this.eatFood.bind(this);
    this.draw = this.draw.bind(this);
    this.update = this.update.bind(this);
  }

  componentWillMount() {
    this.location = this.props.location;
    this.board.put(this.location, Board.types.snake);
  }

  get board() {
    return this.props.board;
  }

  get direction() {
    return this.props.direction;
  }

  get length() {
    let lastChild = this.head;
    let length = 1;
    while (lastChild.child !== undefined) {
      length++;
      lastChild = lastChild.child;
    }
    return length;
  }

  get location() {
    return this.state.location === undefined ? this.props.location : this.state.location;
  }

  get head() {
    return this.refs.head;
  }

  get tail() {
    let child = this.head;
    while(child.child !== undefined)
      child = child.child;
    return child;
  }

  get x() {
    return this.head.x;
  }

  get y() {
    return this.head.y;
  }

  set board(_) {
    return;
  }

  set direction(_) {
    return;
  }

  set head(_) {
    return;
  }

  set length(value) {
    if (isNaN(value)) {
      const error = new Error(`Expected a Number but received NaN at 'set length'! Received '${value}'`);
      error.name = 'SnakeError';
      throw error;
    }
    value = ~~Number(value);
    if (value < 1)
      value = 1;
    let newEnd = this.head;
    let count = 1;
    while (newEnd.child !== undefined) {
      if (count++ >= value)
        break;
      newEnd = newEnd.child;
    }
    let child = newEnd.child;
    while(child !== undefined) {
      child.delete();
      child = child.child;
    }
    newEnd.child === undefined;
  }

  set location(value) {
    if (!Array.isArray(value)) {
      const error = new Error(`Expected an Array at 'set location'! Received '${value}'`);
      error.name = 'SnakeError';
      throw error;
    }
    if (value.length !== 2) {
      const error = new Error(`Expected an Array length of 2 at 'set location'! Received '${value}'`);
      error.name = 'SnakeError';
      throw error;
    }
    this.setState({
      location: value
    });
  }

  set x(value) {
    this.head.x = value;
  }

  set y(value) {
    this.head.y = value;
  }

  eatFood() {
    this.head.addNode();
    this.props.setScore(this.props.score + 1);
    this.props.setFoodNeeded(true);
  }

  draw() {
    this.head.draw();
  }

  update() {
    this.head.update();
  }

  render() {
    return (
      <Node ref="head" location={this.props.location} />
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

const mapDispachToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps)(Snake);
