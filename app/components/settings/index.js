import React, {Component} from 'react';
import {Container, Header, Title, Text, Button, List, ListItem, Icon, Left, Body, Right, Switch} from 'native-base';
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

    render() {
        /**
         * https://www.packtpub.com/mapt/book/application_development/9781786464750/1/ch01lvl1sec19/asyncstorage
         * https://www.thepolyglotdeveloper.com/2015/09/saving-data-in-your-react-native-mobile-application/
         * https://facebook.github.io/react-native/docs/asyncstorage.html
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
                  <ListItem icon>
                    <Left>
                      <Icon name="plane" />
                    </Left>
                    <Body>
                      <Text>Airplane Mode</Text>
                    </Body>
                    <Right>
                      <Switch value={false} />
                    </Right>
                  </ListItem>
                  <ListItem icon>
                    <Left>
                      <Icon name="wifi" />
                    </Left>
                    <Body>
                      <Text>Wi-Fi</Text>
                    </Body>
                    <Right>
                      <Text>GeekyAnts</Text>
                      <Icon name="arrow-forward" />
                    </Right>
                  </ListItem>
                  <ListItem icon>
                    <Left>
                      <Icon name="bluetooth" />
                    </Left>
                    <Body>
                      <Text>Bluetooth</Text>
                    </Body>
                    <Right>
                      <Text>On</Text>
                      <Icon name="arrow-forward" />
                    </Right>
                  </ListItem>
                </List>
              </View>
            </Container>
          </Layout>
        );
    }
}
