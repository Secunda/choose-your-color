import React, {Component} from 'react';
import {Container, Text, Button} from 'native-base';
import {View, AsyncStorage} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {autobind} from 'core-decorators';

import Layout from '../layout';
import styles from './styles';
import {navigate} from './../common/components/navigate';

import {
  loadSettings,
} from '../../store/actions/app';

@autobind
class Home extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
    };
  }

  async componentWillMount() {
    const settingsFromStorage = await AsyncStorage.getItem('gameSettings');
    if (settingsFromStorage) {
      await this.props.dispatch(loadSettings(JSON.parse(settingsFromStorage)));
    }
  }

  render() {
    return (
      <Layout withLogo>
        <Container style={styles.content}>
          <View style={styles.menu}>
            <Button
              block
              borderRadius={10}
              style={styles.startGame}
              onPress={() => navigate(this.props, 'game')}
            >
              <Text>Играть</Text>
            </Button>
            <Button
              block
              borderRadius={10}
              style={styles.settingsButton}
              onPress={() => navigate(this.props, 'settings')}
            >
              <Text>Настройки</Text>
            </Button>
            <Button
              block
              borderRadius={10}
              style={styles.resultsButton}
              onPress={() => navigate(this.props, 'result')}
            >
              <Text>Результаты</Text>
            </Button>
          </View>
        </Container>
      </Layout>
    );
  }
}

export default connect(state => ({
  app: state.app,
}))(Home);
