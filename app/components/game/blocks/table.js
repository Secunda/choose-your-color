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

    static customElementsStyle(i, j, rows, cols) {
        let customElementsStyle = {};
        if (i === 0) {
            if (j === 0) {
                customElementsStyle = styles.gameCellTopLeft;
            }
            if (j === rows - 1) {
                customElementsStyle = styles.gameCellTopRight;
            }
        }

        if (i === cols - 1) {
            if (j === 0) {
                customElementsStyle = styles.gameCellBottomLeft;
            }
            if (j === rows - 1) {
                customElementsStyle = styles.gameCellBottomRight;
            }
        }

        return customElementsStyle;
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
                            return <View style={[styles.gameCell, currentStyle, Table.customElementsStyle(i, j, row.length, matrix.length)]} key={j} />;
                        })
                    }
                  </View>);

                  return rowContent;
              })
          }
        </View>);
    }
}
