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

import {generateNewGame} from './../../logic';

import {startGame, generateGame, generatedGame} from './../../store/actions/game';

@autobind
class Game extends Component {
    static get propTypes() {
        return {
            navigation: PropTypes.object.isRequired,
            dispatch: PropTypes.func.isRequired,
            app: PropTypes.shape({
                settings: PropTypes.object,
            }),
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

        const fieldSize = settings.game.fieldSize;
        const gameMatrix = generateNewGame(fieldSize.rows, fieldSize.cols, Object.keys(settings.game.colors));

        // Game was generated, lets game start
        await this.props.dispatch(generatedGame(gameMatrix));
    }

    step(className, color) {
        console.log(className, color);
    }

    render() {
        const settings = _.get(this.props, 'app.settings');
        const game = this.props.game;

        console.log(this.props);
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
                  <Score score={0} />
                </Body>
              </Header>
              <View style={styles.flexContainer}>
                <Table matrix={game.matrix} colors={settings.game.colors} />
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
