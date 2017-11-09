import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GameComponent from '../components/game';

export default class Game extends Component {
    static get propTypes() {
        return {
            navigation: PropTypes.object.isRequired,
        };
    }

    render() {
        return (
          <GameComponent navigation={this.props.navigation} />
        );
    }
}
