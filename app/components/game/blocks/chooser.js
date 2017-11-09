import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Footer, FooterTab, Button} from 'native-base';
import {View} from 'react-native';
import _ from 'lodash';

import styles from './../styles';

export default class Chooser extends Component {
    static get propTypes() {
        return {
            colors: PropTypes.object.isRequired,
            step: PropTypes.func.isRequired,
        };
    }

    render() {
        return (<View style={styles.chooserContent}>
          <Footer style={styles.bodyColorFields}>
            <FooterTab>
              {
                _.map(this.props.colors, (color, className) => {
                    const currentStyle = {backgroundColor: color};
                    return (
                      <Button
                        key={className}
                        onPress={() => this.props.step(className, color)}
                        style={[currentStyle, styles.colorField]}
                      />
                    );
                })
              }
            </FooterTab>
          </Footer>
        </View>);
    }
}
