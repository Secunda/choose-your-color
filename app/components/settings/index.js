import React, {Component} from 'react';
import {
  Container,
  Text,
  Button,
  List,
  ListItem,
  Icon,
  Left,
  Body,
  Right,
  Badge,
} from 'native-base';
import {
  View,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {autobind} from 'core-decorators';
import _ from 'lodash';
import Modal from 'react-native-modal';

import {
  HueSlider,
  SaturationSlider,
  LightnessSlider,
} from 'react-native-color';
import tinycolor from 'tinycolor2';

import Layout from '../layout';
import styles from './styles';
import modalStyles from './../../components/common/styles/modal.styles';

import {
  loadSettings,
  resetSettings,
  saveSettingsGameSize,
  saveSettingsColorSection,
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

    this.newColor = null;

    this.state = {
      colorPicker: {
        modal: false,
        show: false,
        element: null,
        oldColor: null,
        newColor: this.newColor,
      },
      gameSize: {
        modal: false,
      },
    };
  }

  async componentWillMount() {
    const settingsFromStorage = await AsyncStorage.getItem('gameSettings');
    if (settingsFromStorage) {
      await this.props.dispatch(loadSettings(JSON.parse(settingsFromStorage)));
    }
  }

  async saveSettingsToStorage() {
    const settings = _.get(this.props, 'app.settings');
    if (settings) {
      await AsyncStorage.setItem('gameSettings', JSON.stringify(settings));
    }
  }

  async saveGameSize(itemValue) {
    await this.props.dispatch(saveSettingsGameSize(itemValue, this.props.app.settings));
    await this.saveSettingsToStorage();
    this.closeGameSizeModal();
  }

  async resetSettings() {
    await this.props.dispatch(resetSettings());
    await this.saveSettingsToStorage();
  }

  showGameSizeModal() {
    this.setState({
      gameSize: {
        modal: true,
      },
    });
  }

  closeGameSizeModal() {
    this.setState({
      gameSize: {
        modal: false,
      },
    });
  }

  /**
   * Show color picker modal
   */
  showChangeColorModal() {
    this.setState({
      colorPicker: {
        modal: true,
      },
    });
  }

  /**
   * Show sliders
   * @param {string} className
   * @param {string} color
   */
  showColorPicker(className, color) {
    const newState = _.cloneDeep(this.state);
    newState.colorPicker.show = true;
    newState.colorPicker.element = className;
    newState.colorPicker.oldColor = color;
    newState.colorPicker.newColor = color;

    this.setState(newState);
  }

  /**
   * Hide sliders
   */
  hideColorPicker() {
    const newState = _.cloneDeep(this.state);
    newState.colorPicker.show = false;

    this.setState(newState);
  }

  /**
   * Close color picker modal
   */
  closeChangeColorModal() {
    const newState = _.cloneDeep(this.state);
    newState.colorPicker.modal = false;
    newState.colorPicker.show = false;

    this.setState(newState);
  }

  updateHue(h) {
    const newState = _.cloneDeep(this.state);
    const colorPicker = _.get(newState, 'colorPicker');
    const color = tinycolor(colorPicker.oldColor).toHsl();

    color.h = h;

    this.changeColor(tinycolor(color).toHexString());
  }

  updateSaturation(s) {
    const newState = _.cloneDeep(this.state);
    const colorPicker = _.get(newState, 'colorPicker');
    const color = tinycolor(colorPicker.oldColor).toHsl();

    color.s = s;

    this.changeColor(tinycolor(color).toHexString());
  }

  updateLightness(l) {
    const newState = _.cloneDeep(this.state);
    const colorPicker = _.get(newState, 'colorPicker');
    const color = tinycolor(colorPicker.oldColor).toHsl();

    color.l = l;

    this.changeColor(tinycolor(color).toHexString());
  }

  changeColor(color) {
    const newState = _.cloneDeep(this.state);
    newState.colorPicker.newColor = color;

    this.setState(newState);
  }

  async chooseColor() {
    const colorPicker = _.get(this.state, 'colorPicker');
    const color = colorPicker.newColor;

    await this.props.dispatch(saveSettingsColorSection(color, colorPicker.element));
    await this.saveSettingsToStorage();

    this.hideColorPicker();
  }

  renderColorPicker() {
    const colorPicker = _.get(this.state, 'colorPicker');
    const showColorPicker = colorPicker.show;
    const color = tinycolor(colorPicker.oldColor).toHsl();
    const newColor = tinycolor(colorPicker.newColor).toHexString();

    if (showColorPicker) {
      return (
        <View style={styles.colorFieldSliders}>
          <View style={[styles.colorFieldPreview, {backgroundColor: newColor}]} />
          <Text style={styles.componentText}>Цвет</Text>
          <HueSlider
            style={styles.sliderRow}
            gradientSteps={40}
            value={color.h}
            onValueChange={this.updateHue}
          />
          <Text style={styles.componentText}>Насыщенность</Text>
          <SaturationSlider
            style={styles.sliderRow}
            gradientSteps={20}
            value={color.s}
            color={color}
            onValueChange={this.updateSaturation}
          />
          <Text style={styles.componentText}>Яркость</Text>
          <LightnessSlider
            style={styles.sliderRow}
            gradientSteps={20}
            value={color.l}
            color={color}
            onValueChange={this.updateLightness}
          />
        </View>);
    }

    return null;
  }

  render() {
    const settings = _.get(this.props, 'app.settings');
    const colorPicker = _.get(this.state, 'colorPicker');
    const fieldSize = _.get(settings, 'game.fieldSize.rows', 10);

    return (
      <Layout withLogo>
        <Container>
          <View>
            <List style={styles.list}>
              <ListItem style={styles.listItem} icon>
                <Left style={styles.listItemContent}>
                  <Button style={styles.gameSizeIcon}>
                    <Icon name="md-grid" />
                  </Button>
                </Left>
                <Body style={styles.listItemContent}>
                  <Text style={styles.componentText}>Игровое поле</Text>
                </Body>
                <Right style={styles.listItemContent}>
                  <TouchableOpacity style={styles.settingsTouchableTextWrapper} onPress={() => this.showGameSizeModal()}>
                    <Text style={styles.settingsTouchableText}>{`${fieldSize}X${fieldSize}`}</Text>
                  </TouchableOpacity>
                </Right>
              </ListItem>
              <ListItem style={styles.listItem} icon>
                <Left style={styles.listItemContent}>
                  <Button style={styles.chooseColorIcon}>
                    <Icon name="md-color-palette" />
                  </Button>
                </Left>
                <Body style={styles.listItemContent}>
                  <Text style={styles.componentText}>Цвета</Text>
                </Body>
                <Right style={styles.listItemContent}>
                  <TouchableOpacity style={styles.settingsTouchableTextWrapper} onPress={() => this.showChangeColorModal()}>
                    <View style={styles.chooseColorButton}>
                      {
                        _.map(settings.game.colors, (color, className) => {
                            const currentStyle = {
                              backgroundColor: color,
                              padding: 10,
                            };
                            return (
                              <View key={className} style={currentStyle} />
                            );
                        })
                      }
                    </View>
                  </TouchableOpacity>
                </Right>
              </ListItem>
              <ListItem style={styles.listItem}>
                <Body>
                  <Button
                    iconLeft
                    borderRadius={10}
                    style={styles.resetSettingsButton}
                    onPress={this.resetSettings}
                  >
                    <Icon name="md-close-circle" />
                    <Text>Сбросить настройки</Text>
                  </Button>
                </Body>
              </ListItem>
            </List>
          </View>

          <Modal
            isVisible={this.state.gameSize.modal}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={1000}
            animationOutTiming={300}
            onBackButtonPress={() => this.closeGameSizeModal()}
            onBackdropPress={() => this.closeGameSizeModal()}
          >
            <View style={modalStyles.modalContainer}>
              <View style={modalStyles.innerContainer}>
                {
                  _.map([2, 5, 10, 15, 20], size => (
                    <TouchableOpacity style={styles.gameSizeChooser} key={size} onPress={() => this.saveGameSize(size)}>
                      <Text>{`${size}X${size}`}</Text>
                    </TouchableOpacity>
                  ))
                }
              </View>
            </View>
          </Modal>

          <Modal
            isVisible={colorPicker.modal}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={1000}
            animationOutTiming={300}
            onBackButtonPress={() => this.closeChangeColorModal()}
            onBackdropPress={() => this.closeChangeColorModal()}
          >
            <View style={styles.bodyColor}>
              <View style={styles.bodyColorFields}>
                {
                  _.map(settings.game.colors, (color, className) => {
                      const currentStyle = {backgroundColor: color};
                      return (
                        <TouchableOpacity key={className} onPress={() => this.showColorPicker(className, color)}>
                          <Badge style={[currentStyle, styles.colorFields]} />
                        </TouchableOpacity>
                      );
                  })
                }
              </View>
              {
                this.renderColorPicker()
              }
              <View style={styles.colorFieldButtons}>
                {
                  colorPicker.show &&
                    <Button
                      iconLeft
                      bordered
                      success
                      onPress={() => this.hideColorPicker()}
                    >
                      <Icon active name="md-close-circle" />
                      <Text>Отмена</Text>
                    </Button>
                }
                {
                  !colorPicker.show &&
                    <Button
                      iconLeft
                      bordered
                      success
                      onPress={() => this.closeChangeColorModal()}
                    >
                      <Icon active name="md-close-circle" />
                      <Text>Назад</Text>
                    </Button>
                }
                <Button
                  iconLeft
                  style={!colorPicker.show ? styles.modalSaveDisabled : styles.modalSave}
                  onPress={() => this.chooseColor()}
                  disabled={!colorPicker.show}
                >
                  <Icon active name="md-done-all" />
                  <Text>Сохранить</Text>
                </Button>
              </View>
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
