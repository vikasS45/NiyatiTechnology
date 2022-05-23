import React from 'react';
import {View, Text, Colors, Button, Typography} from 'react-native-ui-lib';
import { StyleSheet } from "react-native";

function Intro(props) {
  const {navigation: {navigate}} = props;
  return (
    <>
    <Text center heading style={[{fontFamily: 'SofiaProRegular',}, styles.header]}>Welcome to PC Apps</Text>
      <View style={styles.button}>
        <Button
          backgroundColor={Colors.baseColor}
          label="Get Started  ➽"
          size="medium"
          color={Colors.white}
          margin-10
          onPress={() => navigate('Home')}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea"
  },
  button: { 
    position: 'absolute', 
    bottom: 0, 
    right: 0
  },
  header: {
    ...Typography.text60,
    marginVertical: 20
  }
});


export default Intro