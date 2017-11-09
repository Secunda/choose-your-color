import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Title, Text} from 'native-base';

import styles from './../styles';

export default class Score extends Component {
    static get propTypes() {
        return {
            score: PropTypes.number.isRequired,
        };
    }

    static get defaultProps() {
        return {
            score: 0,
        };
    }

    render() {
        const {score} = this.props;
        return (<Title>
            Счет: <Text style={styles.score}>{score}</Text>
        </Title>);
    }
}
