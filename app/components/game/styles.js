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
    gameContent: {
        flex: 7,
        alignSelf: 'auto',
    },
    chooserContent: {
        flex: 1,
        alignSelf: 'auto',
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
    score: {
        margin: 0,
        padding: 0,
        color: '#FFFFFF',
        fontSize: 30,
    },
    gameRow: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center',
    },
    gameCell: {
        flex: 1,
        alignSelf: 'auto',
        width: 20,
        height: 20,
    },
});

export default styles;
