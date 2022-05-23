import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {Layout} from '../screens/Layout';
import {Colors} from 'react-native-ui-lib';
import Profile from '../screens/contents/Profile';

const ProfileStackNavigator = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.coolBlue,
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export const ProfileStack = () => {
  return (
    <>
      <ProfileStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <ProfileStackNavigator.Screen
          name="Profile"
          component={Layout(Profile)}
        />
      </ProfileStackNavigator.Navigator>
    </>
  );
};
