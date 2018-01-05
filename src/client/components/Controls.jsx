import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Group, Layer, Rect, Text, Ellipse } from 'react-konva';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

import game from '../game.json';

class Controls extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <Stage width={200} height={100}>
        <Layer>
          <Rect /* this is the background color of the controls */
            x={0}
            y={0}
            width={200}
            height={100}
            fill={'#777'}
          />
        </Layer>
        <Layer>
            <Rect /* this is the up button */
                x={80}
                y={0}
                width={40}
                height={40}
                fill={'#999'}
                onClick={() => this.props.setDirection('up')}
            />
            <Rect /* this is the down button */
                x={80}
                y={60}
                width={40}
                height={40}
                fill={'#999'}
                onClick={() => this.props.setDirection('down')}
            />
            <Rect /* this is the up button */
                x={40}
                y={30}
                width={40}
                height={40}
                fill={'#999'}
                onClick={() => this.props.setDirection('left')}
            />
            <Rect /* this is the up button */
                x={120}
                y={30}
                width={40}
                height={40}
                fill={'#999'}
                onClick={() => this.props.setDirection('right')}
            />
        </Layer>
      </Stage>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    direction: state.direction
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const connectedControls = connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Controls);
export default connectedControls;