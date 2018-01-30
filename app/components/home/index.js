import React, {Component} from 'react';
import {Container, Text, Button} from 'native-base';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';

import Layout from '../layout';
import styles from './styles';
import {navigate} from './../common/components/navigate';

@autobind
export default class Home extends Component {
  static get propTypes() {
    return {
      navigation: PropTypes.object.isRequired,
    };
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
          </View>
        </Container>
      </Layout>
    );
  }
}
