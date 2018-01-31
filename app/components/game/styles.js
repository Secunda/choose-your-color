import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignContent: 'stretch',
    alignItems: 'stretch',
  },
  headerContentWrapper: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    color: '#FFFFFF',
  },
  score: {
    margin: 0,
    padding: 0,
    marginRight: 10,
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerButtonNewGameWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerButtonNewGame: {
    marginLeft: 'auto',
  },
  headerButtonNewGameIcon: {
    color: '#08c825',
  },
  gameContent: {
    flex: 7,
    alignContent: 'center',
    alignItems: 'center',
    margin: 1,
  },
  chooserContent: {
    flex: 1,
    alignSelf: 'auto',
    marginTop: 10,
    padding: 3,
    borderTopWidth: 3,
    borderTopColor: '#FFFFFF',
  },
  bodyColorFields: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  colorField: {
    margin: 1,
  },
  gameRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    alignItems: 'stretch',
  },
  gameCell: {
    flex: 1,
    alignSelf: 'auto',
    height: 'auto',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
});

export default styles;
