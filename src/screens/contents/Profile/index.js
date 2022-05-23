/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';
import {
  Colors,
  Button,
  Typography,
  Card,
  ExpandableSection,
} from 'react-native-ui-lib';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {addUser, deleteUser} from '../../../redux/actions';
import {connect} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import LocationEnabler from 'react-native-location-enabler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import {isEmptyOrNull} from '../../../utilis/Validations';

const Profile = ({userList, addUser, navigation}) => {
  const [data, setData] = useState({
    photo: '',
    name: '',
    emailId: '',
    mobile: '',
    birthDate: '',
    latitude: 20.737796,
    longitude: 75.47657,

    photoError: '',
    nameError: '',
    emailIdError: '',
    mobileError: '',
    visible: false,
    locationError: '',
    isExpand: false,
  });
  const [date, setDate] = useState('');
  const [birthDateError, setBirthDateError] = useState('');

  const {
    useLocationSettings,
    PRIORITIES: {HIGH_ACCURACY},
  } = LocationEnabler;

  console.log('data', data);

  const [enabled, requestResolution] = useLocationSettings({
    priority: HIGH_ACCURACY,
    alwaysShow: true,
    needBle: true,
  });

  useEffect(() => {
    requestExternalWritePermission();
    requestCameraPermission();
    requestLocationPermission();
    requestResolution();
    getLocation();
  }, []);

  const isValidated = () => {
    requestResolution();
    setTimeout(() => {
      setData({
        ...data,
        photoError: '',
        nameError: '',
        emailIdError: '',
        mobileError: '',
        visible: false,
        locationError: '',
      });
      setBirthDateError('');
    }, 200);

    let isValid = true;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const mobileReg = /^[0]?[6789]\d{9}$/;
    const nameReg = /^[a-zA-Z\s]*$/;
    if (isEmptyOrNull(data.name)) {
      setTimeout(() => {
        setData({...data, nameError: 'Required Field'});
      }, 200);
      isValid = false;
    }
    if (!isEmptyOrNull(data.name) && nameReg.test(data.name) === false) {
      setTimeout(() => {
        setData({...data, nameError: 'Name only accepts Alphabets.'});
      }, 200);
      isValid = false;
    }
    if (isEmptyOrNull(data.photo)) {
      setTimeout(() => {
        setData({...data, photoError: 'Required Field'});
      }, 200);
      isValid = false;
    }
    if (reg.test(data.emailId) === false) {
      setTimeout(() => {
        setData({...data, emailIdError: 'Invalid Email-Id'});
      }, 200);
      isValid = false;
    }
    if (mobileReg.test(data.mobile) === false) {
      setTimeout(() => {
        setData({...data, mobileError: 'Invalid Mobile Number'});
      }, 200);
      isValid = false;
    }
    if (isEmptyOrNull(data.latitude) || isEmptyOrNull(data.longitude)) {
      setTimeout(() => {
        setData({...data, locationError: 'Required Field'});
      }, 200);
      isValid = false;
    }
    if (isEmptyOrNull(date)) {
      setTimeout(() => {
        setBirthDateError('Required Field');
      }, 200);
      isValid = false;
    }
    return isValid; //true;
  };

  const addData = async () => {
    if (isValidated()) {
      console.log('Valid');
      addUser(
        data.photo,
        data.name,
        data.emailId,
        data.mobile,
        date,
        data.latitude,
        data.longitude,
      );
      ToastAndroid.show(
        'Profile data submitted Successfully',
        ToastAndroid.LONG,
      );
      navigation.navigate('Home');
    } else {
      console.log('Not Valid');
    }
  };

  console.log('UserList999999', userList);

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        console.log('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  function getLocation() {
    const option = Platform.select({
      ios: {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      android: {
        enableHighAccuracy: false,
        timeout: 20000,
        distanceFilter: 250,
        showLocationDialog: true,
      },
    });

    Geolocation.getCurrentPosition(
      position => {
        setTimeout(() => {
          setData({
            ...data,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        }, 200);
      },
      error => {},
      option,
    );
  }

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Please allow location access for better experience',
            message:
              'This App needs location for better and relevant advertisement suggestion',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permission Granted');
          getLocation();
        } else {
          console.log('Permission Denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const chooseFile = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled camera picker');
        return;
      } else if (response.errorCode === 'camera_unavailable') {
        console.log('Camera not available on device');
        return;
      } else if (response.errorCode === 'permission') {
        console.log('Permission not satisfied');
        return;
      } else if (response.errorCode === 'others') {
        console.log(response.errorMessage);
        return;
      }
      setData({
        ...data,
        photo: response.assets[0].uri,
        isExpand: !data.isExpand,
      });
    });
  };

  const captureImage = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled camera picker');
        return;
      } else if (response.errorCode === 'camera_unavailable') {
        console.log('Camera not available on device');
        return;
      } else if (response.errorCode === 'permission') {
        console.log('Permission not satisfied');
        return;
      } else if (response.errorCode === 'others') {
        console.log(response.errorMessage);
        return;
      }

      setData({
        ...data,
        photo: response.assets[0].uri,
        isExpand: !data.isExpand,
      });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.center}>
          <View>
            {data?.photo ? (
              <Image
                source={{
                  uri: data.photo,
                }}
                style={styles.image}
                resizeMode={'contain'}
              />
            ) : (
              <AntDesign name="user" color={Colors.gray} size={100} />
            )}
            {!!data.photoError && (
              <Text style={styles.error}>{data.photoError}</Text>
            )}
          </View>
          <View>
            <TouchableOpacity
              onPress={() => setData({...data, isExpand: !data.isExpand})}
              style={[styles.button, styles.margin]}>
              <Text style={styles.buttonText}>Choose Photo</Text>
            </TouchableOpacity>
            <ExpandableSection top={false} expanded={data.isExpand}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonStyle}
                onPress={() => captureImage()}>
                <Text style={styles.textStyle}>Launch Camera for Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonStyle}
                onPress={() => chooseFile()}>
                <Text style={styles.textStyle}>Choose Image</Text>
              </TouchableOpacity>
            </ExpandableSection>
          </View>
        </View>

        <View style={[styles.textInput, data.nameError && styles.errorBorder]}>
          <TextInput
            placeholder="Enter Your Name "
            placeholderTextColor={Colors.gray}
            value={data.name}
            style={styles.text}
            onChangeText={name => setData({...data, name})}
          />
        </View>
        {!!data.nameError && <Text style={styles.error}>{data.nameError}</Text>}
        <View
          style={[styles.textInput, data.emailIdError && styles.errorBorder]}>
          <TextInput
            placeholder="Enter Your Email-Id "
            value={data.emailId}
            placeholderTextColor={Colors.gray}
            style={styles.text}
            onChangeText={emailId => setData({...data, emailId})}
          />
        </View>
        {!!data.emailIdError && (
          <Text style={styles.error}>{data.emailIdError}</Text>
        )}
        <View
          style={[styles.textInput, data.mobileError && styles.errorBorder]}>
          <TextInput
            placeholder="Enter Your Mobile Number "
            placeholderTextColor={Colors.gray}
            value={data.mobile}
            maxLength={10}
            style={styles.text}
            keyboardType={'numeric'}
            onChangeText={mobile => setData({...data, mobile})}
          />
        </View>
        {!!data.mobileError && (
          <Text style={styles.error}>{data.mobileError}</Text>
        )}
        <Card
          onPress={() => setData({...data, visible: true})}
          style={[styles.textInput, birthDateError && styles.errorBorder]}>
          {date ? (
            <Text style={styles.dateFromCalender}>
              {Moment(date).format('D-MMMM-YYYY')}
            </Text>
          ) : (
            <Text style={styles.date}>Select Date Of Birth</Text>
          )}

          <DateTimePickerModal
            isVisible={data.visible}
            mode="date"
            dateFormat={'D MMM YYYY'}
            defaultValue={date}
            onConfirm={value => {
              let date1 = Moment(value).format('D-MMMM-YYYY');
              setDate(date1);
              let d = Moment().diff(value, 'years', false);
              if (d < 18) {
                setBirthDateError('Your age must be 18+');
                console.log('Less than 18');
              } else {
                console.log('Above 18');
                setBirthDateError('');
              }

              console.log('selected date', Moment(value).format('YYYY-MM-DD'));
              setData({...data, visible: false});
            }}
            onCancel={() => setBirthDateError('')}
          />
        </Card>
        {!!birthDateError && <Text style={styles.error}>{birthDateError}</Text>}

        <Text style={[styles.location, styles.marginVertical]}>
          Location : -
        </Text>

        {!!data.locationError && (
          <Text style={styles.error}>{data.locationError}</Text>
        )}
        {!!data.latitude && !!data.longitude && (
          <View style={styles.locationContainer}>
            <Text style={styles.location}>
              Latitude:{' '}
              <Text style={styles.locationLight}>{data.latitude}</Text>
            </Text>
            <Text style={styles.location}>
              Longitude:{' '}
              <Text style={styles.locationLight}>{data.longitude}</Text>
            </Text>
          </View>
        )}
        <Button
          label="Save"
          style={styles.button}
          labelStyle={styles.buttonText}
          onPress={addData}
        />
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flashMsg: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginVertical: 20,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 20,
  },
  card: {
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 0.5,
    backgroundColor: Colors.eggBlue,
    marginVertical: 20,
  },
  textInput: {
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 10,
    height: 40,
    backgroundColor: Colors.eggBlue,
  },
  errorBorder: {
    borderColor: Colors.red,
  },
  button: {
    padding: 10,
    backgroundColor: Colors.coolBlue,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginVertical: 20,
  },
  buttonText: {
    fontFamily: Typography.primaryFontFamilyMedium,
    fontSize: 16,
    color: Colors.white,
  },
  margin: {
    marginTop: 10,
  },
  marginVertical: {
    marginVertical: 10,
  },
  center: {
    justifyContent: 'space-between',
    marginVertical: 10,
    flexDirection: 'row',
  },
  disable: {
    backgroundColor: Colors.coolGray,
  },
  noData: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
  noDataText: {
    fontFamily: Typography.primaryFontFamilyMedium,
    fontSize: 25,
    color: Colors.coolGray,
  },
  image: {
    height: 100,
    width: 100,
  },
  deleteIcon: {
    fontSize: 25,
    color: Colors.black,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  userIcon: {
    fontSize: 150,
    color: Colors.coolGray,
    opacity: 0.5,
  },
  error: {
    color: 'red',
    marginLeft: 10,
    fontSize: 12,
    fontFamily: Typography.primaryFontFamilyRegular,
  },
  date: {
    fontSize: 14,
    color: Colors.gray,
    backgroundColor: 'transparent',
    marginTop: 8,
    marginLeft: 5,
  },
  text: {
    fontSize: Typography.primarySHeading,
    fontFamily: Typography.primaryFontFamilyMedium,
    color: Colors.darkBlack,
    fontWeight: '400',
  },
  location: {
    fontSize: 16,
    fontFamily: Typography.primaryFontFamilyMedium,
    color: Colors.darkBlack,
    fontWeight: '400',
  },
  locationLight: {
    color: Colors.gray,
  },
  locationContainer: {
    marginLeft: 20,
  },
  dateFromCalender: {
    fontSize: Typography.primarySHeading,
    fontFamily: Typography.primaryFontFamilyMedium,
    color: Colors.darkBlack,
    fontWeight: '400',
    marginLeft: 5,
    marginTop: 8,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: Colors.coolBlue,
    padding: 5,
    marginVertical: 10,
    width: 180,
    borderRadius: 5,
  },
  textStyle: {
    padding: 10,
    fontSize: 10,
    color: Colors.white,
    fontFamily: Typography.primaryFontFamilyMedium,
    textAlign: 'center',
  },
});

const mapStateToProps = state => {
  return {
    userList: state.users.userList,
  };
};

const mapDispatchToProps = {addUser, deleteUser};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
