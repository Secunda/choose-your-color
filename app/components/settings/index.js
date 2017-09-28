import React, {Component} from 'react';
import {Container, Header, Title, Text, Button, List, ListItem, Icon, Left, Body, Right, Badge, Picker} from 'native-base';
import {View, AsyncStorage, TouchableOpacity, Modal} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {autobind} from 'core-decorators';
import _ from 'lodash';
import {ColorPicker} from 'react-native-color-picker';

import Layout from '../layout';

import styles from './styles';

import {
  loadSettings,
  resetSettings,
  saveSettingsGameSize,
} from '../../store/actions/app';

@autobind
class Home extends Component {
    static get propTypes() {
        return {
            navigation: PropTypes.object.isRequired,
            dispatch: PropTypes.func.isRequired,
            app: PropTypes.shape({
                settings: PropTypes.object,
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

    constructor(props) {
        super(props);

        this.state = {
            colorPicker: {
                show: false,
                element: null,
                oldColor: null,
                newColor: null,
            },
        };
    }

    async componentWillMount() {
        const settingsFromStorage = await AsyncStorage.getItem('gameSettings');

        if (settingsFromStorage) {
            await this.props.dispatch(loadSettings(settingsFromStorage));
        }
    }

    async saveGameSize(itemValue) {
        await this.props.dispatch(saveSettingsGameSize(itemValue, this.props.app.settings));
    }

    async resetSettings() {
        await this.props.dispatch(resetSettings());
    }

    changeColor(className, color) {
        this.setState({
            colorPicker: {
                show: true,
                element: className,
                oldColor: color,
                newColor: color,
            },
        });
    }

    render() {
        console.log(123, this.props);
        const {settings} = this.props.app;

        console.log(456, this.state);
        const {colorPicker} = this.state;
        /**
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
                        style={styles.gameSize}
                        selectedValue={_.get(settings, 'game.fieldSize.rows', 10)}
                        mode="dialog"
                        onValueChange={this.saveGameSize}
                      >
                        <Picker.Item label="5x5" value={5} />
                        <Picker.Item label="10x10" value={10} />
                        <Picker.Item label="15x15" value={15} />
                        <Picker.Item label="20x20" value={20} />
                        <Picker.Item label="25x25" value={25} />
                      </Picker>
                    </Right>
                  </ListItem>
                  <ListItem style={styles.listItem}>
                    <Body>
                      <Text>Цвета</Text>
                    </Body>
                  </ListItem>
                  <ListItem style={styles.listItem}>
                    <Body style={styles.bodyColorFields}>
                      {
                        _.map(settings.game.colors, (color, className) => {
                            const currentStyle = {backgroundColor: color};
                            return (
                              <TouchableOpacity key={className} onPress={this.changeColor(className, color)}>
                                <Badge style={[currentStyle, styles.colorFields]} />
                              </TouchableOpacity>
                            );
                        })
                      }
                    </Body>
                  </ListItem>
                  <ListItem style={styles.listItem}>
                    <Body>
                      <Button onPress={this.resetSettings}>
                        <Text>Сбросить настройки</Text>
                      </Button>
                    </Body>
                  </ListItem>
                </List>
              </View>

              <Modal
                animationType="slide"
                transparent={false}
                visible={colorPicker.show}
                onRequestClose={() => { console.log('Modal has been closed.'); }}
              >
                <View style={{flex: 1, padding: 15, backgroundColor: '#212021'}}>
                  <Text style={{color: 'white'}}>Выберите цвет</Text>
                  <ColorPicker
                    oldColor={colorPicker.oldColor}
                    color={colorPicker.oldColor}
                    onColorSelected={color => console.log(`Color selected: ${color}`)}
                    style={{flex: 1}}
                  />
                </View>
              </Modal>
            </Container>
          </Layout>
        );
    }
}

export default connect(state => ({
    app: state.app,
}))(Home);
