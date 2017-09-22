import {StackNavigator} from 'react-navigation';
import Home from './screens/Home';
import Settings from './screens/Settings';
import Result from './screens/Result';
import Game from './screens/Game';

export default StackNavigator({
    home: {screen: Home},
    settings: {screen: Settings},
    // result: {screen: Result},
    // game: {screen: Game},
}, {
    initialRouteName: 'home',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    },
});
