import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Animated, Easing} from 'react-native';
import _ from 'lodash';
import {connect} from 'react-redux';

import {gameAnimated} from './../../../store/actions/game';

import styles from './../styles';
import Cell from './cell';

class Table extends Component {
  static get propTypes() {
    return {
      matrix: PropTypes.array.isRequired,
      colors: PropTypes.object.isRequired,
      animate: PropTypes.bool,
      dispatch: PropTypes.func.isRequired,
    };
  }

  static get defaultProps() {
    return {
      animate: true,
    };
  }

  constructor(props) {
    super(props);
    this.animatedValue = [];
  }

  generateAnimation(matrix) {
    this.animatedValue = [...Array(matrix.length)].map(() => new Animated.Value(0));
  }

  animationStagger() {
    const animations = this.animatedValue.map((item, key) => Animated.timing(
      this.animatedValue[key],
      {
        toValue: 1,
        duration: 100,
        easing: Easing.inOut(Easing.circle),
      },
    ));
    Animated.sequence(animations).start(() => {
      this.props.dispatch(gameAnimated());
    });
  }

  renderAnimatedView(i, row) {
    const {colors} = this.props;

    const rowStyle = {
      opacity: this.animatedValue[i],
    };
    const rowContent = (
      <Animated.View style={[styles.gameRow, rowStyle]} key={i}>
        {
          _.map(row, (color, j) => <Cell color={_.get(colors, color)} key={j} />)
        }
      </Animated.View>);

    return rowContent;
  }

  renderView(i, row) {
    const {colors} = this.props;

    const rowStyle = {
      opacity: 1,
    };
    const rowContent = (
      <View style={[styles.gameRow, rowStyle]} key={i}>
        {
          _.map(row, (color, j) => <Cell color={_.get(colors, color)} key={j} />)
        }
      </View>);

    return rowContent;
  }

  render() {
    const {matrix} = this.props;

    if (matrix.length && this.props.animate) {
      this.generateAnimation(matrix);
      this.animationStagger();
    }

    // https://medium.com/react-native-training/react-native-animations-using-the-animated-api-ebe8e0669fae
    return (
      <View style={styles.gameContent}>
        {
          _.map(matrix, (row, i) => (this.props.animate ? this.renderAnimatedView(i, row) : this.renderView(i, row)))
        }
      </View>);
  }
}

export default connect()(Table);
