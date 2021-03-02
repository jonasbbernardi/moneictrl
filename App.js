import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';

import './globals';
import store from './store';

import {clearItems} from './actions/clearItems';

import Locale from './components/Locale';

import Home from './pages/Home';
import AddItem from './pages/AddItem';
import EditItem from './pages/EditItem';
import ViewItem from './pages/ViewItem';
import Settings from './pages/Settings';
import About from './pages/About';

const Stack = createStackNavigator();

const App = () => {
    return (
        <Provider store={store}>
            <Locale />
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" headerMode='none'>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        listeners={{
                            'blur': e => store.dispatch(clearItems()),
                        }}
                    />
                    <Stack.Screen name="AddItem" component={AddItem} />
                    <Stack.Screen name="EditItem" component={EditItem} />
                    <Stack.Screen name="ViewItem" component={ViewItem} />
                    <Stack.Screen name="Settings" component={Settings} />
                    <Stack.Screen name="About" component={About} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

export default App;

