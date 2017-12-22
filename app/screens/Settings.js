import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SettingsComponent from '../components/settings';

export default class Settings extends Component {
  static get propTypes() {
    return {
      navigation: PropTypes.object.isRequired,
    };
  }

  render() {
    return (
      <SettingsComponent navigation={this.props.navigation} />
    );
  }
}
