import Expo, {AppLoading} from 'expo';
import React from 'react';
import {Provider} from 'react-redux';
import _ from 'lodash';
import {StyleProvider} from 'native-base';

// Assets preloader
import roboto from 'native-base/Fonts/Roboto.ttf';
import robotoMedium from 'native-base/Fonts/Roboto_medium.ttf';
import bgMain from './app/assets/icons/bg_main.png';

import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

import Routes from './app/routes';
import store from './app/store';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            themeIsLoaded: false,
        };
    }

    async componentWillMount() {
        await this.loadAssetsAsync();
    }

    async loadAssetsAsync() {
        const fonts = {
            Roboto: roboto,
            Roboto_medium: robotoMedium,
        };
        await Expo.Font.loadAsync(fonts);

        const images = [
            bgMain,
        ];
        await _.map(images, image => Expo.Asset.fromModule(image).downloadAsync());

        this.setState({themeIsLoaded: true});
    }

    render() {
        const {themeIsLoaded} = this.state;

        return (
          <StyleProvider style={getTheme(material)}>
            <Provider store={store}>
              {
                themeIsLoaded ?
                  <Routes ref={(nav) => { this.navigator = nav; }} /> :
                  <AppLoading />
            }
            </Provider>
          </StyleProvider>
        );
    }
}
