import { StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#0005'
    },
    container: {
        margin: 20,
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    title: {
        marginBottom: 15,
        textAlign: "center"
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        flex: 1,
        padding: 10,
        elevation: 2,
        marginTop: 10,
        marginHorizontal: 5,
    },
    btn_save: {
        backgroundColor: colors.green
    },
    btn_save_all:{
        flex: 2,
        backgroundColor: colors.green
    },
    btn_cancel: {
        backgroundColor: colors.gray
    },
    textStyle: {
        color: colors.trueWhite,
        fontWeight: "bold",
        textAlign: "center"
    },
});

export default styles;