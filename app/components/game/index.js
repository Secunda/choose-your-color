import React, {Component} from 'react';
import {Container, Button, Icon, Text} from 'native-base';
import {View, AsyncStorage} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {autobind} from 'core-decorators';
import _ from 'lodash';
import Modal from 'react-native-modal';

import Layout from '../layout';

import styles from './styles';
import modalStyles from './../../components/common/styles/modal.styles';

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
  gameFinished,
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

  constructor() {
    super();

    this.state = {
      finishedModal: false,
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

    if (game.animate === false && game.finished !== true) {
      const logic = new GameLogic(game.matrix);
      const gameMatrix = logic.gameStep(className);
      const affectedCells = logic.gameAffectedCells(className);
      const score = logic.gameScore(affectedCells, game.affectedCells, game.score);

      await this.props.dispatch(gameStep(gameMatrix));
      await this.props.dispatch(gameScore(affectedCells, score));

      if (logic.isGameFinished()) {
        await this.props.dispatch(gameFinished());

        this.setState({
          finishedModal: true,
        });

        // Save game results
        const settingsFromStorage = await AsyncStorage.getItem('gameSettings');
      }
    }
  }

  closeModal() {
    this.setState({
      finishedModal: false,
    });
  }

  render() {
    const settings = _.get(this.props, 'app.settings');
    const {game} = this.props;

    return (
      <Layout>
        <Container>
          <View style={styles.flexContainer}>
            <View style={styles.headerContentWrapper}>
              <Score score={game.score} step={game.step} />
              <View style={styles.headerButtonNewGameWrapper}>
                <Button transparent style={styles.headerButtonNewGame} onPress={() => this.startNewGame()}>
                  <Icon name="md-refresh" style={styles.headerButtonNewGameIcon} />
                </Button>
              </View>
            </View>
            <Table matrix={game.matrix} colors={settings.game.colors} animate={game.animate} />
            <Chooser colors={settings.game.colors} step={this.step} />
          </View>
          <View>
            <View style={modalStyles.container}>
              <Modal
                isVisible={this.state.finishedModal}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={1000}
                animationOutTiming={300}
                onModalHide={() => this.props.navigation.navigate('home')}
                onBackButtonPress={() => this.closeModal()}
                onBackdropPress={() => this.closeModal()}
              >
                <View style={modalStyles.modalContainer}>
                  <View style={modalStyles.innerContainer}>
                    <View style={modalStyles.modalContent}>
                      <Text>Игра закончена!</Text>
                      <Text>Ваш счет {game.score.toString()}</Text>
                    </View>
                    <Button iconLeft info onPress={() => this.closeModal()} style={modalStyles.okButton}>
                      <Icon name="md-checkmark" />
                      <Text>OK</Text>
                    </Button>
                  </View>
                </View>
              </Modal>
            </View>
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
