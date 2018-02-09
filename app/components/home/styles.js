import {StyleSheet} from 'react-native';
// http://buttonoptimizer.com/#
const styles = StyleSheet.create({
  content: {
    padding: 0,
  },
  menu: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startGame: {
    backgroundColor: '#08c825',
    marginBottom: 15,
  },
  settingsButton: {
    backgroundColor: '#c3263e',
    marginBottom: 15,
  },
  resultsButton: {
    backgroundColor: '#2076ff',
  },
});

export default styles;
