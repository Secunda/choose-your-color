import React, {Component} from 'react';
import {Container, Header, Button, Content, ActionSheet, Text} from 'native-base';

const BUTTONS = ['Option 0', 'Option 1', 'Option 2', 'Delete', 'Cancel'];
const DESTRUCTIVE_INDEX = 3;
const CANCEL_INDEX = 4;
export default class Settings extends Component {
    render() {
        return (
          <Container>
            <Header />
            <Content padder>
              <Button
                onPress={() =>
                    ActionSheet.show(
                        {
                            options: BUTTONS,
                            cancelButtonIndex: CANCEL_INDEX,
                            destructiveButtonIndex: DESTRUCTIVE_INDEX,
                            title: 'Testing ActionSheet',
                        },
                    (buttonIndex) => {
                        this.setState({clicked: BUTTONS[buttonIndex]});
                    },
                )}
              >
                <Text>Actionsheet</Text>
              </Button>
            </Content>
          </Container>
        );
    }
}
