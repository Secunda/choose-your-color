import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Home from './Home';
import Home1 from './Home1';

export default StackNavigator({
    Home: {screen: Home},
    Home1: {screen: Home1},
});
