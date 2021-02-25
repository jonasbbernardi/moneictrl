import colors from './colors';

const buttonStyle = {
    flex: 1,
    minWidth: 150,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: colors.white,
    marginHorizontal: 10,
};
const buttonLabel = {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
};
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
};

const common = {
    buttonStyle, buttonLabel, roundBtnStyle
}

export default common;