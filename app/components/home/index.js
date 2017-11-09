import React, {Component} from 'react';
import {Container, Text, Button} from 'native-base';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import Layout from '../layout';
import styles from './styles';

export default class Home extends Component {
    static get propTypes() {
        return {
            navigation: PropTypes.object.isRequired,
        };
    }

    render() {
        return (
          <Layout>
            <Container style={styles.content}>
              <View style={styles.menu}>
                <Button
                  block
                  success
                  style={styles.menuButton}
                  onPress={() => this.props.navigation.navigate('game')}
                >
                  <Text>Играть</Text>
                </Button>
                <Button block warning onPress={() => this.props.navigation.navigate('settings')}>
                  <Text>Настройки</Text>
                </Button>
              </View>
            </Container>
          </Layout>
        );
    }
}
