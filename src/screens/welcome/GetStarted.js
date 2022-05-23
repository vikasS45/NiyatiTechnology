/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {UserContext} from '../../contexts/user';
import {StyleSheet, Dimensions} from 'react-native';
import {
  View,
  Text,
  Colors,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native-ui-lib';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const GetStartedView = props => {
  const {
    navigation: {navigate},
    route,
  } = props;
  let [button, setButton] = useState(true);
  const [loginType, setLoginType] = useState('');
  const {userDispatch} = useContext(UserContext);

  const navigateToScreen = () => {
    userDispatch({type: 'LOGIN_TYPE', payload: loginType});
    if (loginType === 'DEMO USER') {
      navigate('authentication', {screen: 'DemoSignIn'});
    } else {
      navigate('authentication', {params: loginType});
    }
  };
  const data = [
    {
      title: 'STUDENT',
      text: 'S',
      description: 'Registered Student of the class',
      borderColor: '#3087d9',
    },
    {
      title: 'PARENT',
      text: 'P',
      description: 'Parent of Registered Student of the class',
      borderColor: '#3087d9',
    },
    {
      title: 'DEMO USER',
      text: 'D',
      description: 'Demo users who want to experience & purchase courses',
      borderColor: '#3087d9',
    },
  ];

  const CardDisplay = data.map((item, key) => {
    return (
      <View>
        <TouchableOpacity
          key={key}
          onPress={() => {
            setButton(false);
            setLoginType(item.title);
          }}>
          <View
            style={
              item.title === loginType
                ? {
                    flex: 1,
                    flexDirection: 'row',
                    borderWidth: 1,
                    marginTop: 25,
                    borderTopWidth: 6,
                    borderTopColor: Colors.baseColor,
                    borderLeftWidth: 6,
                    borderLeftColor: Colors.baseColor,
                  }
                : {
                    flex: 1,
                    flexDirection: 'row',
                    borderWidth: 1,
                    marginTop: 25,
                    borderBottomWidth: 6,
                    borderBottomColor: item.borderColor,
                    borderRightWidth: 6,
                    borderRightColor: item.borderColor,
                  }
            }>
            {item.image ? (
              <View>
                <Image source={item.image} style={styles.image} />
              </View>
            ) : (
              <View>
                <Text style={styles.capitalText}>{item.text}</Text>
              </View>
            )}

            <View style={styles.cardTextContainer}>
              <Text style={styles.userTitle}>{item.title}</Text>
              <Text style={styles.userDescription}>{item.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <View>
        <Header />
      </View>
      <View>
        <Text style={styles.iAmA}> I Am A </Text>
        {CardDisplay}

        <TouchableOpacity
          disabled={button}
          style={button ? styles.disabledButton : styles.button}
          onPress={() => {
            navigateToScreen();
          }}>
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  iAmA: {
    alignSelf: 'center',
    color: Colors.darkGray,
    fontSize: 16,
    fontFamily: 'SofiaProRegular',
  },
  image: {
    height: 78,
    width: 78,
    marginTop: 6,
    marginLeft: 3,
    marginBottom: 7,
  },
  capitalText: {
    height: 75,
    width: 75,
    fontSize: 48,
    color: Colors.darkGray,
    textAlign: 'center',
    marginBottom: 7,
  },
  cardTextContainer: {
    flex: 1,
    marginLeft: 12,
    alignSelf: 'center',
  },
  userTitle: {
    color: Colors.darkGray,
    fontSize: 22,
    fontFamily: 'SofiaProRegular',
  },
  userDescription: {
    color: Colors.darkGray,
    fontSize: 13,
    marginTop: 8,
    fontFamily: 'SofiaProRegular',
  },
  button: {
    marginTop: 30,
    padding: 8,
    backgroundColor: Colors.skyBlue,
  },
  disabledButton: {
    marginTop: 30,
    padding: 8,
    backgroundColor: Colors.lightSkyBlue,
  },
  buttonText: {
    fontSize: 25,
    fontFamily: 'SofiaProRegular',
    color: Colors.white,
    alignSelf: 'center',
  },
});

export default GetStartedView;
