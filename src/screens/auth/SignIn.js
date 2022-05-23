/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, createRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { Colors } from 'react-native-ui-lib';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';

import Header from './../../components/Header';
import Footer from './../../components/Footer';
import useLogin from '../../hooks/useLogin';

const width = Dimensions.get('window').width;
const SignIn = ({ navigation }) => {
  let [modal, setModal] = useState(false);
  let [rollNumber, setRollNumber] = useState('');
  let [parentMobile, setParentMobile] = useState('');
  let [requiredError, setError] = useState('');
  let [button, setButton] = useState(true);
  const rollNumberRef = createRef();
  const parentMobileRef = createRef();
  const {loading, user, errors, login} = useLogin();

  const navigateToScreen = () => {
    setModal(false);
    // console.log('=================> checking login');
    // login(
    //   {
    //     rollNumber: '201',
    //     parentMobile: '7588584810',
    //   },
    //   () => {
    //     console.log('-------------------------------> SUCCESS');
    //   },
    // );
    navigation.replace('Home');
  };

  const validation = async () => {
    const reg = /^[0]?[6789]\d{9}$/;
    if (parentMobile.trim() === '' || rollNumber.trim() === '') {
      setError('All Fields are Required.');
    } else if (reg.test(parentMobile) === false) {
      setError('Invalid Mobile Number');
    } else {
      setModal(true);
    }
  };

  const required = async () => {
    if (parentMobile.trim() === '' || rollNumber.trim() === '') {
      setError('All Fields are Required.');
    }
  };

  const isValidate = async () => {
    await required();
    if (requiredError === '') {
      setButton(true);
    } else {
      setButton(false);
    }
  };

  const ModalView = () => {
    return (
      <>
        <Modal
          isVisible={modal}
          animationInTiming={1000}
          onBackButtonPress={() => setModal(false)}
          style={styles.otpView}>
          <View>
            <Text style={styles.verifyText}>PLEASE VERIFY OTP</Text>

            <OTPInputView
              style={styles.otpTextInput}
              pinCount={6}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={code => {
                console.log(`Code is ${code}, you are good to go!`);
              }}
            />
            <View style={styles.textAndResend}>
              <Text style={styles.otpNotReceived}>
                Did not received OTP, on 7588584810
              </Text>
              <TouchableOpacity style={styles.resendButton}>
                <Text style={styles.resendText}>RESEND</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => navigateToScreen()}>
              <Text style={styles.buttonText}>CONTINUE</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Header />

      <LottieView
        source={require('../../assets/lottie/20810-study-line.json')}
        autoPlay
        loop
        style={styles.lottieView}
      />

      <View>
        <Text style={styles.description}>
          Please login Using registered Roll number and parent mobile
        </Text>
        <KeyboardAvoidingView enabled>
        <View style={styles.textInput}>
          <TextInput
            placeholder="ROLL NUMBER"
            keyboardType={'numeric'}
            style={styles.textInputText}
            ref={rollNumberRef}
            onChangeText={rollNumber => {
              setRollNumber(rollNumber);
              isValidate();
            }}
            onSubmitEditing={() =>
              parentMobileRef.current &&
              parentMobileRef.current.focus()
            }
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.textInput}>
          <TextInput
            placeholder="PARENT MOBILE"
            maxLength={10}
            keyboardType={'numeric'}
            ref={parentMobileRef}
            style={styles.textInputText}
            onChangeText={parentMobile => {
              setParentMobile(parentMobile);
              isValidate();
            }}
            onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
          />
        </View>
        </KeyboardAvoidingView>

        {/* VALIDATION */}
        {!!requiredError && <Text style={styles.error}>{requiredError}</Text>}
        {loading && <ActivityIndicator size="large" color="#00ff00" />}
        {errors && <Text> {errors}</Text>}

        <TouchableOpacity
          disabled={button}
          style={button ? styles.disabledButton : styles.button}
          onPress={() => validation()}>
          <Text style={styles.buttonText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>

      <Footer />

      {/* MODAL VIEW */}
      <ModalView />
    </View>
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
  description: {
    fontSize: 17,
    color: Colors.darkGray,
    fontFamily: 'SofiaProRegular',
    textAlign: 'center',
  },
  textInput: {
    marginTop: 20,
    borderWidth: 0.9,
    borderColor: Colors.darkGray,
  },
  textInputText: {
    marginLeft: '5%',
    fontSize: 18,
    color: Colors.darkGray,
    fontFamily: 'SofiaProRegular',
    height: 50,
  },
  error: {
    color: 'red',
    width: 250,
    marginLeft: 20,
    marginTop: 8,
    fontWeight: '400',
    fontSize: 15,
  },
  button: {
    marginTop: '8%',
    padding: 8,
    backgroundColor: Colors.skyBlue,
  },
  modalButton: {
    marginTop: '8%',
    padding: 8,
    marginHorizontal: 6,
    backgroundColor: Colors.skyBlue,
  },
  disabledButton: {
    marginTop: '8%',
    padding: 8,
    backgroundColor: Colors.lightSkyBlue,
  },
  buttonText: {
    fontSize: 25,
    fontFamily: 'SofiaProRegular',
    color: Colors.white,
    alignSelf: 'center',
  },
  otpView: {
    width: width,
    marginLeft: 0,
    height: '45%',
    position: 'absolute',
    bottom: -20,
    backgroundColor: Colors.white,
    borderColor: Colors.gray,
    borderWidth: 3,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  verifyText: {
    color: Colors.darkGray,
    fontSize: 18,
    fontFamily: 'SofiaProRegular',
    textAlign: 'center',
  },
  textAndResend: {
    flexDirection: 'row',
    marginTop: '16%',
  },
  otpNotReceived: {
    color: Colors.darkGray,
    fontSize: 16,
    width: '55%',
    fontFamily: 'SofiaProRegular',
    textAlign: 'center',
  },
  resendButton: {
    width: '36%',
    backgroundColor: Colors.lightSkyBlue,
  },
  resendText: {
    alignSelf: 'center',
    marginTop: 10,
    color: Colors.white,
  },
  otpTextInput: {
    width: '80%',
    height: '3%',
    marginTop: '15%',
    alignSelf: 'center',
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  borderStyleHighLighted: {
    borderColor: 'black',
  },
  underlineStyleBase: {
    width: 40,
    height: 45,
    color: 'black',
    borderWidth: 1,
  },
  underlineStyleHighLighted: {
    borderColor: 'black',
  },
});

export default SignIn;
