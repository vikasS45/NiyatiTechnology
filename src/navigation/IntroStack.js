import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {BottomTabs} from './BottomStack';
const IntroStackNavigator = createStackNavigator();

const defaultNavOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerTitleAlign: {
    fontFamily: 'SofiaProRegular',
  },
};

export const IntroNavigator = () => {
  return (
    <IntroStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <IntroStackNavigator.Screen
        name="Home"
        options={{title: 'Choose Login Type', headerShown: false}}
        component={BottomTabs}
      />
    </IntroStackNavigator.Navigator>
  );
};
