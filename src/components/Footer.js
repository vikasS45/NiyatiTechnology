/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from 'react-native-ui-lib';
import Separator from './Separator';

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.separator}>
        <Separator />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.footerText}>(©) Renukai Coaching Classes</Text>
        <Text style={styles.footerText}> Privacy policy | Terms of use </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    marginVertical: 5,
    paddingBottom: 10,
    // paddingLeft: 12,
    // marginRight: 5,
  },
  separator: {
    marginTop: 5,
  },
  textContainer: {
    flex: 1,
    height: 40,
    flexDirection: 'column',
    alignItems: 'center',
  },
  footerText: {
    color: Colors.darkGray,
    fontSize: 16,
    fontFamily: 'SofiaProRegular',
  },
});

export default Footer;
