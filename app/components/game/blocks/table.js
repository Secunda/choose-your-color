import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Animated, Easing} from 'react-native';
import _ from 'lodash';
import {connect} from 'react-redux';

import {gameAnimated} from './../../../store/actions/game';

import styles from './../styles';

class Table extends Component {
    static get propTypes() {
        return {
            matrix: PropTypes.array.isRequired,
            colors: PropTypes.object.isRequired,
            animate: PropTypes.bool.isRequired,
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

    render() {
        const {matrix, colors} = this.props;

        if (matrix.length && this.props.animate) {
            this.generateAnimation(matrix);
            this.animationStagger();
        }

        // https://medium.com/react-native-training/react-native-animations-using-the-animated-api-ebe8e0669fae
        return (<View style={styles.gameContent}>
          {
            _.map(matrix, (row, i) => {
                const rowStyle = {
                    opacity: this.animatedValue[i],
                };
                const rowContent = (<Animated.View style={[styles.gameRow, rowStyle]} key={i}>
                  {
                      _.map(row, (color, j) => {
                          const currentStyle = {
                              backgroundColor: _.get(colors, color),
                          };
                          return <View style={[styles.gameCell, currentStyle]} key={j} />;
                      })
                  }
                </Animated.View>);

                return rowContent;
            })
          }
        </View>);
    }
}

export default connect()(Table);
