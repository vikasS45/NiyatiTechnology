/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {Colors} from 'react-native-ui-lib';
import {IntroNavigator} from './src/navigation/IntroStack';
import './src/constants/colors';
import './src/assets/images';
import './src/constants/typography';
import store from './src/redux/store';
import {Provider} from 'react-redux';

const App = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.baseColor,
    },
  };

  return (
    <Provider store={store}>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />
      <NavigationContainer theme={MyTheme}>
        <IntroNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
