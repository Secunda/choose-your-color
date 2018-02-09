import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  tabBarUnderlineStyle: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  tabStyle: {
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
    borderWidth: 1,
  },
  textStyle: {
    color: '#FFFFFF',
  },
  activeTabStyle: {
    backgroundColor: '#08c825',
  },
  activeTextStyle: {
    color: '#FFFFFF',
    fontWeight: 'normal',
  },
  mainTabStyle: {
    backgroundColor: 'transparent',
  },
  tabTextHeader: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    paddingTop: 3,
    paddingBottom: 6,
    borderColor: '#FFFFFF',
    borderBottomWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  tabListContent: {
    backgroundColor: 'transparent',
  },
  tabListContentText: {
    color: '#FFFFFF',
  },
});

export default styles;
