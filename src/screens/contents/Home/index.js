/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {Colors, Typography, Card} from 'react-native-ui-lib';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {deleteUser} from '../../../redux/actions';
import {connect} from 'react-redux';

const Home = ({userList, deleteUser, navigation}) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    setTimeout(() => {}, 200);
  }, [[isFocused]]);

  const deleteFromData = id => {
    deleteUser(id);
    ToastAndroid.show('Profile Deleted Successfully', ToastAndroid.LONG);
  };

  const InputForm = useCallback(({item}) => {
    return (
      <Card style={styles.card}>
        <View style={styles.content}>
          <View style={styles.center}>
            {item?.photo ? (
              <Image
                source={{
                  uri: item.photo,
                }}
                style={styles.image}
                resizeMode={'contain'}
              />
            ) : (
              <AntDesign name="user" color={Colors.gray} size={100} />
            )}
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.input}>
              <Text style={styles.labelContainer}>Name</Text>
              <Text style={styles.text}>{item?.name}</Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.labelContainer}>Email-Id</Text>
              <Text style={styles.text}>{item?.emailId}</Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.labelContainer}>Mobile</Text>
              <Text style={styles.text}>{item?.mobile}</Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.labelContainer}>Birth Date</Text>
              <Text style={styles.text}>{item?.birthDate}</Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.labelContainer}>Latitude</Text>
              <Text style={styles.text}>{item?.latitude}</Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.labelContainer}>Longitude</Text>
              <Text style={styles.text}>{item?.longitude}</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Edit', {item})}>
            <AntDesign name="edit" style={styles.deleteIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteFromData(item?.id)}>
            <AntDesign name="delete" style={styles.deleteIcon} />
          </TouchableOpacity>
        </View>
      </Card>
    );
  });

  return (
    <View style={styles.container}>
      <View>
        {userList?.length > 0 ? (
          <View>
            <FlatList data={userList} renderItem={InputForm} />
          </View>
        ) : (
          <View style={styles.noData}>
            <AntDesign name="frowno" style={styles.userIcon} />
            <Text style={styles.noDataText}>Plz add some data.</Text>
          </View>
        )}
      </View>
    </View>
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
    marginHorizontal: 20,
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
    marginTop: 50,
  },
  labelContainer: {
    top: -10,
    left: 5,
    paddingHorizontal: 5,
    textAlign: 'center',
    backgroundColor: Colors.eggBlue,
    position: 'absolute',
    fontFamily: Typography.primaryFontFamilyRegular,
    fontSize: 12,
    color: Colors.darkGray,
  },
  input: {
    height: 35,
    borderWidth: 0.5,
    borderRadius: 15,
    marginBottom: 15,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.gray,
  },
  margin: {
    marginTop: 10,
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
  text: {
    fontFamily: Typography.primaryFontFamilyMedium,
    fontSize: 14,
    color: Colors.darkBlack,
  },
  noDataText: {
    fontFamily: Typography.primaryFontFamilyMedium,
    fontSize: 24,
    marginTop: 10,
    color: Colors.coolGray,
  },
  image: {
    height: 100,
    width: 100,
  },
  deleteIcon: {
    fontSize: 25,
    color: Colors.black,
    marginRight: 10,
  },
  userIcon: {
    fontSize: 100,
    color: Colors.coolGray,
    opacity: 0.5,
  },
  buttonRow: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
});

const mapStateToProps = state => {
  return {
    userList: state.users.userList,
  };
};

const mapDispatchToProps = {deleteUser};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
