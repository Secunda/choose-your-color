import React, {Component} from 'react';
import {ImageBackground, View, Image} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const background = require('../../assets/icons/bg_main.png');
const logo = require('../../assets/icons/logo.png');

export default class Layout extends Component {
  static get propTypes() {
    return {
      children: PropTypes.any.isRequired,
      withLogo: PropTypes.bool,
      withBorders: PropTypes.bool,
    };
  }

  static get defaultProps() {
    return {
      withLogo: false,
      withBorders: false,
    };
  }

  borderWrapper() {
    if (!this.props.withBorders) {
      return this.content();
    }

    return (
      <View style={styles.layoutBordersWrapper}>
        <View style={styles.layoutBorders}>
          {this.content()}
        </View>
      </View>
    );
  }

  content() {
    if (!this.props.withLogo) {
      return this.props.children;
    }

    return (
      <View style={styles.layoutWrapper}>
        <View style={styles.layoutLogoWrapper}>
          <Image
            style={styles.layoutLogo}
            source={logo}
          />
        </View>
        {this.props.children}
      </View>
    );
  }

  render() {
    return (
      <ImageBackground style={styles.background} source={background}>
        {this.borderWrapper()}
      </ImageBackground>
    );
  }
}
