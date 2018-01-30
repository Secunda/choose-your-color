import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  list: {
    margin: 0,
    padding: 0,
  },
  listItem: {
    backgroundColor: 'transparent',
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  listItemContent: {
    paddingBottom: 10,
  },
  gameSize: {
    width: 110,
  },
  gameSizeIcon: {
    backgroundColor: '#08c825',
  },
  gameSizeChooser: {
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#1F1B20',
    width: '50%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  chooseColorButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  chooseColorIcon: {
    backgroundColor: '#c3263e',
  },
  bodyColor: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#1F1B20',
  },
  bodyColorFields: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: '#1F1B20',
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
  settingsTouchableTextWrapper: {
    padding: 10,
  },
  settingsTouchableText: {
    marginTop: 3,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 21,
  },
  componentText: {
    marginTop: 3,
    color: 'white',
    fontSize: 20,
    lineHeight: 21,
  },
  colorFieldButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  resetSettingsButton: {
    backgroundColor: '#ffc815',
  },
  modalSave: {
    backgroundColor: '#08c825',
  },
  modalSaveDisabled: {
    backgroundColor: '#c2c2c2',
  },
});

export default styles;
