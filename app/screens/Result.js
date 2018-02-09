import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ResultsComponent from '../components/results';

export default class Result extends Component {
  static get propTypes() {
    return {
      navigation: PropTypes.object.isRequired,
    };
  }

  render() {
    return (
      <ResultsComponent navigation={this.props.navigation} />
    );
  }
}
