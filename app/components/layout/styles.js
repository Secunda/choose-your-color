import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: null,
    height: null,
  },
  layoutWrapper: {
    flex: 1,
    alignSelf: 'stretch',
  },
  layoutBordersWrapper: {
    padding: 5,
    flex: 1,
    alignSelf: 'stretch',
  },
  layoutBorders: {
    padding: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#7e2a8f',
    flex: 1,
  },
  layoutLogoWrapper: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  layoutLogo: {
    flex: 1,
    aspectRatio: 1.4,
    resizeMode: 'contain',
    marginTop: 50,
  },
});

export default styles;
