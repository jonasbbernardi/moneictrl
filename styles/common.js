import colors from './colors';

const buttonStyle = {
    flex: 1,
    width: 150,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: colors.white,
}
const roundBtnStyle = {
    flex: 1,
    width: 60,
    height: 60,
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#eee'
}

const common = {
    buttonStyle, roundBtnStyle
}

export default common;