import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#81c04d',
        paddingTop: 30,
        paddingBottom: 10,
        flexDirection: 'row',
    },
    toolbarButton: {
        width: 50,
        color: '#fff',
        textAlign: 'center',
    },
    toolbarTitle: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1,
    },
    mainContainer: {
        flex: 1,
    },
    content: {
        backgroundColor: '#ebeef0',
        flex: 1,
    },
});

export default class Home1 extends React.Component {
    render() {
        return (
          <View style={styles.mainContainer}>
            <StatusBar
              backgroundColor="blue"
              translucent={false}
              animated
              barStyle={'light-content'}
            />
            <View style={styles.toolbar}>
              <Text style={styles.toolbarButton}>Add</Text>
              <Text style={styles.toolbarTitle}>This is the title</Text>
              <Text style={styles.toolbarButton}>Like</Text>
            </View>
            <View style={styles.content}>
              <Text>This is the content</Text>
            </View>
          </View>
        );
    }
}
