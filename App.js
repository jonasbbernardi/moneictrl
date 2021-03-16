import 'react-native-gesture-handler';

import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, connect } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';

import './globals';
import store, { loadCurrentItems, clearDeletedItems } from './store';

import Locale from './components/Locale';

import Home from './pages/Home';
import AddItem from './pages/AddItem';
import EditItem from './pages/EditItem';
import ViewItem from './pages/ViewItem';
import Settings from './pages/Settings';
import About from './pages/About';
import { useEffect } from 'react/cjs/react.development';

const Stack = createStackNavigator();

const Root = (props) => {
    SplashScreen.preventAutoHideAsync();

    useEffect(() => {
        if(!!props.currentItems) {
            SplashScreen.hideAsync();
            return;
        }
        if(!!props.monthlyItems && props.locale){
            props.loadCurrentItems();
        }
    }, [props]);

    return (
        <View style={{flex: 1}}>
            <Locale />
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" headerMode='none'>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        listeners={{
                            'blur': e => props.clearDeletedItems(),
                        }}
                    />
                    <Stack.Screen name="AddItem" component={AddItem} />
                    <Stack.Screen name="EditItem" component={EditItem} />
                    <Stack.Screen name="ViewItem" component={ViewItem} />
                    <Stack.Screen name="Settings" component={Settings} />
                    <Stack.Screen name="About" component={About} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}

const mapStateToProps = state => {
    return {
        locale: state.locale.loaded,
        monthlyItems: state.monthlyItems.loaded,
        currentItems: state.currentItems.loaded,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadCurrentItems: () => dispatch(loadCurrentItems()),
        clearDeletedItems: () => dispatch(clearDeletedItems())
    }
}

const ConnectedRoot = connect(mapStateToProps, mapDispatchToProps)(Root);

const App = () => {
    return (
        <Provider store={store}>
            <ConnectedRoot />
        </Provider>
    );
}

export default App;

