/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {MainPage} from './components/MainPage';
import AddItem from './components/AddItem';
import Login from './components/Login'
import {createStackNavigator} from '@react-navigation/stack';
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['componentWillReceiveProps']);
YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('componentWillReceiveProps') <= -1) {
        _console.warn(message);
    }
};

console.disableYellowBox = true;


const Stack = createStackNavigator();


const App: () => React$Node = () => {
    // const [userInfo, setUserInfo] = useState('');
    return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={MainPage} options={{headerShown: false}}/>
          <Stack.Screen name="Details" component={AddItem} />
          </Stack.Navigator>
      </NavigationContainer>
    );
};


export default App;
