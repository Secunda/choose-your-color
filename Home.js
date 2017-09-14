import React from 'react';
import {StyleSheet, Text, View, StatusBar, Button} from 'react-native';

export default class Home extends React.Component {
    static navigationOptions = {title: 'Home'};

    render() {
        const {navigate} = this.props.navigation;
        return (
          <View>
            <Text>HOME</Text>
            <Button
              onPress={() => navigate('Home1')}
              title="Home1"
            />
          </View>
        );
    }
}
