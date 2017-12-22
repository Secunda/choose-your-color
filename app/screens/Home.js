import React, {Component} from 'react';
import PropTypes from 'prop-types';
import HomeComponent from '../components/home';

export default class Home extends Component {
  static get propTypes() {
    return {
      navigation: PropTypes.object.isRequired,
    };
  }

  render() {
    return (
      <HomeComponent navigation={this.props.navigation} />
    );
  }
}
