import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  list: {
    margin: 0,
    padding: 0,
    backgroundColor: '#FFFFFF',
  },
  listItem: {
    margin: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
  gameSize: {
    width: 110,
  },
  chooseColorButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyColor: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#212021',
  },
  bodyColorFields: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: '#212021',
  },
  colorFields: {
    width: 40,
    height: 40,
    margin: 7,
  },
  colorFieldSliders: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  colorFieldPreview: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  sliderRow: {
    alignSelf: 'stretch',
    marginLeft: 5,
    marginTop: 5,
  },
  componentText: {
    marginTop: 3,
    color: 'white',
    fontSize: 16,
    lineHeight: 21,
    fontFamily: 'sans-serif-medium',
  },
  colorFieldButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default styles;
