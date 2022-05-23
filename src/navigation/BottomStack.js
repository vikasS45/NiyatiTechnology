import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeNavigator} from './HomeStack';
import {ProfileStack} from './ProfileStack';
import {Colors, Typography} from 'react-native-ui-lib';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'List') {
            iconName = 'contacts';
          }
          return focused ? (
            <>
              <View style={footerTabstyles.indicator} />
              <AntDesign name={iconName} size={20} color={color} />
            </>
          ) : (
            <AntDesign name={iconName} size={20} color={color} />
          );
        },
      })}
      tabBarOptions={{
        labelStyle: footerTabstyles.footerHref,
        activeTintColor: Colors.coolBlue,
        tabStyle: {paddingVertical: 10},
        style: {height: 60},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="List"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};
const footerTabstyles = StyleSheet.create({
  footerHref: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Typography.primaryFontFamilyMedium,
    textTransform: 'uppercase',
  },
  footerIconImg: {
    marginVertical: 0,
    marginHorizontal: 'auto',
    marginBottom: 3,
    position: 'relative',
    height: 23,
  },
  footerCount: {
    width: 18,
    height: 18,
    color: '#FFF',
    borderRadius: 50,
    top: -5,
    right: -10,
    fontSize: 9,
  },
  indicator: {
    borderWidth: 1,
    width: '80%',
    top: -10,
    borderColor: Colors.coolBlue,
  },
});
