import React, { Component } from 'react';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Stage, Layer, Rect, Text } from 'react-konva';
import * as actions from '../actions';

import GameWindow from './GameWindow';

import game from '../game.json';

import '../styles/GameConsole.css';

class GameConsole extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.dispatchEvent = this.dispatchEvent.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  }

  dispatchEvent(name, event) {
    const newEvent = new CustomEvent(name, {detail: event});
    window.dispatchEvent(newEvent);
  }

  handleKeyPress(event) {
    switch (event.key) {
      case 'w':
      case 'ArrowUp':
        // this.props.setDirection('up');
        this.dispatchEvent("consoleButtonClicked", event);
        break;
      case 's':
      case 'ArrowDown':
        // this.props.setDirection('down');
        this.dispatchEvent("consoleButtonClicked", event);
        break;
      case 'a':
      case 'ArrowLeft':
        // this.props.setDirection('left');
        this.dispatchEvent("consoleButtonClicked", event);
        break;
      case 'd':
      case 'ArrowRight':
        // this.props.setDirection('right');
        this.dispatchEvent("consoleButtonClicked", event);
        break;
      case 'Start':
      case 'Enter':
      case ' ':
        this.dispatchEvent("startButtonClicked", event);
        this.dispatchEvent("consoleButtonClicked", event);
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="game-console">
        <div className="window">
          <GameWindow />
        </div>
        <div className="button-panel">
          <div className="dpad">
            <div className="dpad-row1">
              <button className="up-button" ref ="up"
                onMouseDown={(event) => {
                  this.handleKeyPress(Object.assign({}, event, {key: 'ArrowUp'}));
                  event.target.blur();
                }}
              >{'⇧'}</button>
            </div>
            <div className="dpad-row2">
              <button className="left-button"
                ref="left"
                onMouseDown={(event) => {
                  this.handleKeyPress(Object.assign({}, event, {key: 'ArrowLeft'}));
                  event.target.blur();
                }}
              >{'⇦'}</button>
              <button className="right-button"
                ref ="right"
                onMouseDown={(event) => {
                  this.handleKeyPress(Object.assign({}, event, {key: 'ArrowRight'}));
                  event.target.blur();
                }}
              >{'⇨'}</button>
            </div>
            <div className="dpad-row3">
              <button className="down-button"
                ref="down"
                onMouseDown={(event) => {
                  this.handleKeyPress(Object.assign({}, event, {key: 'ArrowDown'}));
                  event.target.blur();
                }}
              >{'⇩'}</button>
            </div>
          </div>
          <div className="start">
            <button className="start-button"
              ref="start"
              onMouseDown={(event) => {
                this.handleKeyPress(Object.assign({}, event, {key: 'Start'}));
                event.target.blur();
              }}
            >Start</button>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(GameConsole);
