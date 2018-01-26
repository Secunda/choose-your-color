import Expo, {AppLoading} from 'expo';
import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {StyleProvider, Spinner} from 'native-base';
import {View} from 'react-native';
import PropTypes from 'prop-types';

// Assets preloader
import roboto from 'native-base/Fonts/Roboto.ttf';
import robotoMedium from 'native-base/Fonts/Roboto_medium.ttf';
import ubuntuCondensed from './assets/fonts/UbuntuCondensed-Regular.ttf';
import pacifico from './assets/fonts/Pacifico-Regular.ttf';
import bgMain from './assets/icons/bg_main.png';

import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

import Routes from './routes';
import {startApplication} from './store/actions/app';

import styles from './components/common/main';

class Application extends React.Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      app: PropTypes.shape({
        isAppStoreReady: PropTypes.bool,
      }),
    };
  }

  static get defaultProps() {
    return {
      app: {
        isAppStoreReady: false,
      },
    };
  }

  async componentWillMount() {
    const {isAppStoreReady} = this.props.app;

    if (!isAppStoreReady) { await this.loadAssetsAsync(); }
  }

  async loadAssetsAsync() {
    const fonts = {
      Roboto: roboto,
      Roboto_medium: robotoMedium,
      UbuntuCondensed: ubuntuCondensed,
      Pacifico: pacifico,
    };
    await Expo.Font.loadAsync(fonts);

    const images = [
      bgMain,
    ];
    await _.map(images, image => Expo.Asset.fromModule(image).downloadAsync());

    await this.props.dispatch(startApplication());
  }

  render() {
    const {isAppStoreReady} = this.props.app;

    return (
      <StyleProvider style={getTheme(material)}>
        {
          isAppStoreReady ?
            <Routes ref={(nav) => { this.navigator = nav; }} /> :
            <View style={styles.spinnerContainer}><Spinner /></View>
        }
      </StyleProvider>
    );
  }
}

export default connect(state => ({
  app: state.app,
}))(Application);
