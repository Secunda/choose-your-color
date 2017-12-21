import React, {Component} from 'react';
import {ImageBackground} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const background = require('../../assets/icons/bg_main.png');

export default class Layout extends Component {
    static get propTypes() {
        return {
            children: PropTypes.any.isRequired,
        };
    }

    render() {
        return (
          <ImageBackground style={styles.background} source={background}>
            {this.props.children}
          </ImageBackground>
        );
    }
}
