import 'react-native-gesture-handler';
import './globals';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';

import store from './store';

import {clearItems} from './actions/clearItems';

import Home from './pages/Home';
import AddItem from './pages/AddItem';
import EditItem from './pages/EditItem';

const Stack = createStackNavigator();

const App = () => {

    return (
        <Provider store={store}>
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
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

export default App;

