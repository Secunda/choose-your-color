import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'native-base';

import styles from './../styles';

export default class Score extends Component {
  static get propTypes() {
    return {
      score: PropTypes.number,
      step: PropTypes.number,
    };
  }

  static get defaultProps() {
    return {
      score: 0,
      step: 0,
    };
  }

  render() {
    const {score, step} = this.props;
    return (
      <View style={styles.headerContent}>
        <Text style={styles.scoreText}>Счет: </Text><Text style={styles.score}>{score}</Text>
        <Text style={styles.scoreText}>Шаги: </Text><Text style={styles.score}>{step}</Text>
      </View>);
  }
}
