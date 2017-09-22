import Expo, {AppLoading} from 'expo';
import React from 'react';
import _ from 'lodash';

// Assets preloader
import roboto from 'native-base/Fonts/Roboto.ttf';
import robotoMedium from 'native-base/Fonts/Roboto_medium.ttf';
import bgMain from './app/assets/icons/bg_main.png';

import Routes from './app/routes';

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
            themeIsLoaded ?
              <Routes ref={(nav) => { this.navigator = nav; }} /> :
              <AppLoading />
        );
    }
}
