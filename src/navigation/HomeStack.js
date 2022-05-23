import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {Text, Colors} from 'react-native-ui-lib';
import Home from '../screens/contents/Home';
import Edit from '../screens/contents/Home/Edit';
import {Layout} from '../screens/Layout';
import {DrawerActions} from '@react-navigation/native';

const HomeStackNavigator = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.coolBlue,
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export const HomeNavigator = ({navigation}) => {
  return (
    <>
      <HomeStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <HomeStackNavigator.Screen name="Home" component={Layout(Home)} />
        <HomeStackNavigator.Screen name="Edit" component={Layout(Edit)} />
      </HomeStackNavigator.Navigator>
    </>
  );
};
