/* eslint-disable react-native/no-inline-styles */
import React, {useState, createRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {Picker} from '@react-native-picker/picker';
import {Colors} from 'react-native-ui-lib';

import Header from './../../components/Header';
import Footer from './../../components/Footer';

const DemoSignIn = ({navigation}) => {
  const [data, setData] = useState({
    name: '',
    city: '',
    studentMobile: '',
    parentMobile: '',
    std: '',
    nameError: '',
    cityError: '',
    studentError: '',
    parentError: '',
    stdError: '',
    finalError: '',
  });

  const nameRef = createRef(),
    cityRef = createRef(),
    studentRef = createRef(),
    parentRef = createRef();

  const pickerData = [
    {label: '', value: ''},
    {label: '11th', value: '11th'},
    {label: '12th', value: '12th'},
    {label: 'Crash Course', value: 'crash_course'},
    {label: 'Repeater', value: 'repeater'},
    {label: 'Other', value: 'other'},
  ];

  const mobileValidation = number => {
    const reg = /^[0]?[6789]\d{9}$/;
    if (number.trim() === '') {
      return 'Required Field';
    }
    if (number.length < 10) {
      return 'Mobile Number length must be 10.';
    }
    if (reg.test(number) === false) {
      return 'Invalid Mobile Number';
    }
    return '';
  };

  const required = demo => {
    if (demo.trim() === '') {
      return 'Required Field';
    }
    return '';
  };

  const checkValidation = async () => {
    const errorMsg = {
      nameError: required(data.name),
      cityError: required(data.city),
      studentError: mobileValidation(data.studentMobile),
      parentError: mobileValidation(data.parentMobile),
      stdError: required(data.std),
    };
    setData({...data, ...errorMsg});
  };

  const isFormValid = async () => {
    await checkValidation();
    const flag =
      data.nameError === '' &&
      data.cityError === '' &&
      data.studentError === '' &&
      data.parentError === '' &&
      data.stdError === '';

    return flag;
  };

  const navigateToScreen = () => {
    navigation.navigate('Home');
  };

  const apiCallToDemoLogin = async () => {
    const flag = await isFormValid();
    if (!flag) {
      return;
    }
    navigateToScreen();
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header />

      <View>
        <LottieView
          source={require('../../assets/lottie/20810-study-line.json')}
          autoPlay
          loop
          style={styles.lottieView}
        />

        <Text style={styles.label}>FULL NAME</Text>
        <View style={styles.textInput}>
          <TextInput
            style={styles.textInputText}
            ref={nameRef}
            onChangeText={name => setData({...data, name: name})}
            onSubmitEditing={() => cityRef.current && cityRef.current.focus()}
            blurOnSubmit={false}
          />
        </View>
        {/* VALIDATION */}
        {!!data.nameError && <Text style={styles.error}>{data.nameError}</Text>}

        <Text style={styles.label}>CITY</Text>
        <View style={styles.textInput}>
          <TextInput
            style={styles.textInputText}
            ref={cityRef}
            onChangeText={city => setData({...data, city: city})}
            onSubmitEditing={() =>
              studentRef.current && studentRef.current.focus()
            }
            blurOnSubmit={false}
          />
        </View>
        {/* VALIDATION */}
        {!!data.cityError && <Text style={styles.error}>{data.cityError}</Text>}

        <Text style={styles.label}>STUDENT MOBILE NUMBER</Text>
        <View style={styles.textInput}>
          <TextInput
            keyboardType={'numeric'}
            maxLength={10}
            style={styles.textInputText}
            ref={studentRef}
            onChangeText={studentMobile =>
              setData({...data, studentMobile: studentMobile})
            }
            onSubmitEditing={() =>
              parentRef.current && parentRef.current.focus()
            }
            blurOnSubmit={false}
          />
        </View>
        {/* VALIDATION */}
        {!!data.studentError && (
          <Text style={styles.error}>{data.studentError}</Text>
        )}

        <Text style={styles.label}>PARENT MOBILE NUMBER</Text>
        <View style={styles.textInput}>
          <TextInput
            keyboardType={'numeric'}
            maxLength={10}
            style={styles.textInputText}
            ref={parentRef}
            onChangeText={parentMobile =>
              setData({...data, parentMobile: parentMobile})
            }
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
          />
        </View>
        {/* VALIDATION */}
        {!!data.parentError && (
          <Text style={styles.error}>{data.parentError}</Text>
        )}

        <Text style={styles.label}>SELECT STANDARD</Text>
        <View style={styles.textInput}>
          <Picker
            style={styles.picker}
            selectedValue={data.std}
            onValueChange={(itemValue, itemIndex) =>
              setData({...data, std: itemValue})
            }>
            {pickerData.map(item => {
              return (
                <Picker.Item
                  label={item.label}
                  value={item.value}
                  color={Colors.darkBlack}
                  fontFamily="SofiaProRegular"
                />
              );
            })}
          </Picker>
        </View>
        {/* VALIDATION */}
        {!!data.stdError && <Text style={styles.error}>{data.stdError}</Text>}

        <TouchableOpacity style={styles.button} onPress={apiCallToDemoLogin}>
          <Text style={styles.buttonText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  lottieView: {
    width: '88%',
    alignSelf: 'center',
    marginTop: -20,
  },
  label: {
    fontSize: 18,
    marginVertical: 12,
    color: Colors.darkGray,
    fontFamily: 'SofiaProRegular',
  },
  textInput: {
    borderWidth: 0.9,
    borderColor: Colors.darkGray,
  },
  textInputText: {
    marginLeft: '5%',
    fontSize: 18,
    color: Colors.darkBlack,
    fontFamily: 'SofiaProRegular',
  },
  error: {
    color: 'red',
    marginTop: 8,
    fontWeight: '400',
    fontSize: 15,
  },
  picker: {
    width: '100%',
    alignSelf: 'flex-end',
    fontFamily: 'SofiaProRegular',
    color: Colors.darkBlack,
  },
  button: {
    marginTop: '8%',
    padding: 8,
    backgroundColor: Colors.skyBlue,
  },
  buttonText: {
    fontSize: 25,
    fontFamily: 'SofiaProRegular',
    color: Colors.white,
    alignSelf: 'center',
  },
});

export default DemoSignIn;
