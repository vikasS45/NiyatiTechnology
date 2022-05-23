import React from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import {Colors} from 'react-native-ui-lib';

export const Layout = WrappedComponent => {
  return function (props) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar
          backgroundColor={Colors.coolBlue}
          barStyle={'light-content'}
        />
        <ScrollView contentContainerStyle={{flexGrow: 1, marginHorizontal: 10}}>
          <WrappedComponent {...props} />
        </ScrollView>
      </SafeAreaView>
    );
  };
};
