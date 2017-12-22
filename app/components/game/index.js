import React, {Component} from 'react';
import {Container, Header, Button, Icon, Left, Body} from 'native-base';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {autobind} from 'core-decorators';
import _ from 'lodash';

import Layout from '../layout';

import styles from './styles';
import Score from './blocks/score';
import Table from './blocks/table';
import Chooser from './blocks/chooser';

import {
  generateNewGame,
  GameLogic,
} from './../../logic';

import {
  startGame,
  generateGame,
  generatedGame,
  gameStep,
  gameScore,
} from './../../store/actions/game';

@autobind
class Game extends Component {
  static get propTypes() {
    return {
      navigation: PropTypes.object.isRequired,
      dispatch: PropTypes.func.isRequired,
      game: PropTypes.object.isRequired,
    };
  }

  async componentWillMount() {
    await this.startNewGame();
  }

  async startNewGame() {
    // Start game
    await this.props.dispatch(startGame());

    // Generate new game
    const settings = _.get(this.props, 'app.settings');
    await this.props.dispatch(generateGame(settings));

    const {fieldSize} = settings.game;
    const gameMatrix = generateNewGame(fieldSize.rows, fieldSize.cols, Object.keys(settings.game.colors));

    // Game was generated, lets game start
    await this.props.dispatch(generatedGame(gameMatrix));
  }

  async step(className) {
    const {game} = this.props;

    if (game.animate === false) {
      const logic = new GameLogic(game.matrix);
      const gameMatrix = logic.gameStep(className);
      const affectedCells = logic.gameAffectedCells(className);
      const score = logic.gameScore(affectedCells, game.affectedCells, game.score);

      await this.props.dispatch(gameStep(gameMatrix));
      await this.props.dispatch(gameScore(affectedCells, score));
    }
  }

  render() {
    const settings = _.get(this.props, 'app.settings');
    const {game} = this.props;

    return (
      <Layout>
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => this.props.navigation.navigate('home')}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Score score={game.score} />
            </Body>
          </Header>
          <View style={styles.flexContainer}>
            <Table matrix={game.matrix} colors={settings.game.colors} animate={game.animate} />
            <Chooser colors={settings.game.colors} step={this.step} />
          </View>
        </Container>
      </Layout>
    );
  }
}

export default connect(state => ({
  app: state.app,
  game: state.game,
}))(Game);
