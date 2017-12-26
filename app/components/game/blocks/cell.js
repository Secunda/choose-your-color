import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';

import styles from './../styles';

export default class Cell extends Component {
  static get propTypes() {
    return {
      color: PropTypes.string.isRequired,
    };
  }

  shouldComponentUpdate(nextProps) {
    return this.props.color !== nextProps.color;
  }

  render() {
    const currentStyle = {
      backgroundColor: this.props.color,
    };
    return <View style={[styles.gameCell, currentStyle]} />;
  }
}
