import React, {Component} from 'react';
import {Container, Text, Tabs, Tab, ScrollableTab, List, ListItem} from 'native-base';
import {AsyncStorage} from 'react-native';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import {connect} from 'react-redux';
import _ from 'lodash';

import Layout from '../layout';
import styles from './styles';

import generalSettings from './../general';
import generalScore from './../../logic/score';

@autobind
class Results extends Component {
  constructor() {
    super();

    this.state = {
      fullScores: {},
    };
  }

  async componentWillMount() {
    const fullGameScores = await AsyncStorage.getItem('gameScore');
    this.setState({
      fullScores: generalScore.getFullScores(fullGameScores),
    });
  }

  generateListRow(size) {
    const items = [];
    const score = _.get(this.state.fullScores, size, []);
    score.forEach((record) => {
      const row = `Счет: ${record.score}  Шагов: ${record.steps}`;
      items.push(row);
    });

    return items;
  }

  render() {
    const fieldSize = _.get(this.props, 'app.settings.game.fieldSize.rows', 10);

    return (
      <Layout>
        <Container>
          <Tabs
            initialPage={generalSettings.gameSize.indexOf(fieldSize)}
            renderTabBar={() => <ScrollableTab />}
            tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
          >
            {
                _.map(generalSettings.gameSize, size => (
                  <Tab
                    key={size}
                    heading={`${size}X${size}`}
                    tabStyle={styles.tabStyle}
                    textStyle={styles.textStyle}
                    activeTabStyle={styles.activeTabStyle}
                    activeTextStyle={styles.activeTextStyle}
                    style={styles.mainTabStyle}
                  >
                    <Text style={styles.tabTextHeader}>
                      Лучшие результаты на поле {`${size}X${size}`}
                    </Text>
                    {
                      _.has(this.state.fullScores, size)
                        ? (
                          <List
                            dataArray={this.generateListRow(size)}
                            renderRow={item =>
                              (
                                <ListItem style={styles.tabListContent}>
                                  <Text style={styles.tabListContentText}>{item}</Text>
                                </ListItem>
                              )
                            }
                          />
                        )
                        : <Text style={styles.tabListContentText}>Вы еще не играли в этом режиме</Text>
                    }
                  </Tab>
                ))
            }
          </Tabs>
        </Container>
      </Layout>
    );
  }
}

export default connect(state => ({
  app: state.app,
}))(Results);
