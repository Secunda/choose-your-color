import React, {Component} from 'react';
import {Container, Header, Title, Text, Button, List, ListItem, Icon, Left, Body, Right, Switch, Picker} from 'native-base';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import Layout from '../layout';

import styles from './styles';

export default class Home extends Component {
    static get propTypes() {
        return {
            navigation: PropTypes.object.isRequired,
        };
    }

    constructor(props) {
        super(props);
    }

    render() {
        /**
         * https://www.packtpub.com/mapt/book/application_development/9781786464750/1/ch01lvl1sec19/asyncstorage
         * https://www.thepolyglotdeveloper.com/2015/09/saving-data-in-your-react-native-mobile-application/
         * https://facebook.github.io/react-native/docs/asyncstorage.html
         *
         * https://casesandberg.github.io/react-color/#examples
         */
        return (
          <Layout>
            <Container>
              <Header>
                <Left>
                  <Button transparent onPress={() => this.props.navigation.navigate('home')}>
                    <Icon name="arrow-back" />
                  </Button>
                </Left>
                <Body>
                  <Title>Настройки</Title>
                </Body>
              </Header>
              <View>
                <List style={styles.list}>
                  <ListItem style={styles.listItem}>
                    <Body>
                      <Text>Игровое поле</Text>
                    </Body>
                    <Right>
                      <Picker
                        selectedValue="5"
                        mode="dialog"
                        onValueChange={() => {}}
                      >
                        <Picker.Item label="5x5" value="5" />
                        <Picker.Item label="10x10" value="10" />
                        <Picker.Item label="15x15" value="15" />
                        <Picker.Item label="20x20" value="20" />
                        <Picker.Item label="25x25" value="25" />
                      </Picker>
                    </Right>
                  </ListItem>
                  <ListItem style={styles.listItem}>
                    <Body>
                      <Text>Цвета</Text>
                    </Body>
                    <Right />
                  </ListItem>
                  <ListItem style={styles.listItem}>
                    <Body>
                      <Text>Сбросить настройки</Text>
                    </Body>
                  </ListItem>
                </List>
              </View>
            </Container>
          </Layout>
        );
    }
}
