import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Group, Layer, Rect, Text, Ellipse } from 'react-konva';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

import game from '../game.json';

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.changeStage = this.changeStage.bind(this);
  }

  componentDidMount() {
    this.props.setTopText('Press Play to start the game!');
    window.addEventListener("startButtonClicked", () => this.changeStage('game'));
  }

  componentWillUnmount() {
    window.removeEventListener("startButtonClicked", () => this.changeStage('game'));
  }

  changeStage(stage) {
    this.props.setStage(stage);
  }

  render() {
    return (
      <Stage width={game.mainMenu.width} height={game.mainMenu.height}>
        <Layer>
          <Rect /* this is the background color of the mainboard */
            x={0}
            y={0}
            width={game.mainMenu.width}
            height={game.mainMenu.height}
            fill={game.colors.mainMenu}
          />
        </Layer>
        <Layer>
          <Text
            text={game.text.mainMenu.title}
            fontSize={game.mainMenu.titleSize}
            align="center"
            fontFamily="Calibri"
            width={game.mainMenu.width}
            padding={10}
            fill={game.colors.mainMenuText}
            />
        </Layer>
        <Layer>
          <Text
            text={game.text.mainMenu.topScore + ' ' + this.props.topScore}
            fontSize={game.mainMenu.topScoreSize}
            align="center"
            fontFamily="Calibri"
            width={game.mainMenu.width}
            padding={10}
            y={game.mainMenu.titleSize * 1.5}
            fill={game.colors.mainMenuText}
           />
        </Layer>
        <Layer>
          <Group>
            <Ellipse
              radius={{x: 75, y: 40}}
              fill={game.colors.playButton}
              x={~~(game.mainMenu.width / 2)}
              y={~~(game.mainMenu.height * 0.6)}
            />
            <Text
              text={game.text.mainMenu.playButton}
              fontSize={game.mainMenu.playSize}
              align="center"
              fontFamily="Calibri"
              width={game.mainMenu.width}
              padding={10}
              y={~~(game.mainMenu.height * 0.5)}
              fill={game.colors.mainMenuText}
              onClick={() => this.changeStage('game')}
            />
          </Group>
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
    isGameOver: state.isGameOver,
    stage: state.stage,
    topText: state.topText,
    topScore: state.topScore
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(MainMenu);
