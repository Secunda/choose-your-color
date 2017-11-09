import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import _ from 'lodash';

import styles from './../styles';

export default class Table extends Component {
    static get propTypes() {
        return {
            matrix: PropTypes.array.isRequired,
            colors: PropTypes.object.isRequired,
        };
    }

    static get defaultProps() {
        return {
            // score: 0,
        };
    }

    render() {
        const {matrix, colors} = this.props;

        return (<View style={styles.gameContent}>
          {
              _.map(matrix, (row, i) => {
                  const rowContent = (<View style={styles.gameRow} key={i}>
                    {
                        _.map(row, (color, j) => {
                            const currentStyle = {backgroundColor: _.get(colors, color)};
                            return <View style={[styles.gameCell, currentStyle]} key={j} />;
                        })
                    }
                  </View>);

                  return rowContent;
              })
          }
        </View>);
    }
}
