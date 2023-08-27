/* eslint-disable operator-linebreak */
/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import { useFonts } from 'expo-font';
import { getAuth } from 'firebase/auth';
import tw from '../../tailwind';
import { getUser } from '../../db/user.js';
import Loading from '../Loading/Index.js';
import Card from './Card';

const auth = getAuth();

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'black',
    // overflowX: 'hidden',
    overflow: 'scroll',
  },
  headerName: {
    fontSize: 25,
    fontFamily: 'PoppinsBold',
    color: 'white',
  },
  bodyContainerCenter: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'black',
    marginVertical: 5,
    marginHorizontal: 15,
  },
  bodyContainerLeft: {
    margin: 5,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    // borderWidth: 0.5,
    borderColor: 'grey',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  bodyContainerRight: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    textDecorationLine: 'underline',
  },
  bodyContainerSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginBottom: 5,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  taste: {
    backgroundColor: '#8DC9D8',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // width: '40%',
    padding: 15,
    flexWrap: 'wrap',
    marginVertical: 5,
    margin: 10,
    borderRadius: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'space-around',
    fontFamily: 'PoppinsBold',
    color: 'white',
    marginBottom: 5,
  },
  buttonText: {
    fontFamily: 'PoppinsBold',
    color: 'white',
  },
  textTitle: {
    fontSize: 20,
    fontFamily: 'PoppinsBold',
    color: 'white',
  },
  textDetailBold: {
    fontSize: 15,
    fontFamily: 'PoppinsBold',
    color: 'white',
  },
  textDetail: {
    fontSize: 15,
    fontFamily: 'Poppins',
    color: 'white',
  },
  textDetailUnderline: {
    fontSize: 15,
    fontFamily: 'Poppins',
    textDecorationLine: 'underline',
    color: 'white',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    gap: 15,
    // borderWidth: 1,
    // borderColor: 'red',
  },
});

const Profile = ({ navigation, route }) => {
  const { userId } = useSelector((state) => state.pagerData);
  const [user, setUser] = useState({});
  const [musicTastes, setMusicTastes] = useState([]);
  const [friends, setFriends] = useState([]);
  const [description, setDescription] = useState('');
  const [profile_pic, setProfile_pic] = useState();

  async function fetchData(userId) {
    const res = await getUser(userId);
    console.log('the user id is : ', res[0]);
    setUser(res[0]);
    setMusicTastes(res[0].music_tastes);
    setFriends(res[0].friends_list);
    setDescription(res[0].description);
  }

  useEffect(() => {
    fetchData(userId);
  }, []);

  // const onEdit = (data) => {
  //   setDescription(data);

  // };

  const [fontLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    Bebas: require('../../assets/fonts/BebasNeue-Regular.ttf'),
  });

  if (!fontLoaded) {
    return <Loading />;
  }
  return (
    // onPress={() => auth.signOut()
    <ScrollView contentContainerStyle={styles.container}>
      {user.profile_pic && (
        <>
          <View style={styles.bodyContainerRight}>
            <Pressable
              style={styles.button}
              onPress={() =>
                navigation.navigate('EditProfile', { user, fetchData })
              }
            >
              <Text style={styles.textDetailBold}>EDIT PROFILE</Text>
            </Pressable>
            <Pressable onPress={() => auth.signOut()}>
              <Text style={styles.textDetailBold}>SIGN OUT</Text>
            </Pressable>
          </View>
          <Image
            style={tw`rounded-full`}
            height={200}
            width={200}
            source={{ uri: user.profile_pic }}
          />
          <View style={styles.bodyContainerCenter}>
            <Text style={styles.headerName}>
              {`${user.first_name && user.first_name} ${
                user.last_name && user.last_name
              }`}
            </Text>
          </View>

          <View style={styles.bodyContainerLeft}>
            <Text style={styles.textDetail}>{description}</Text>
          </View>
          <View style={styles.bodyContainerSection}>
            <Text style={styles.textTitle}>MUSIC TASTES</Text>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('ExpandedTastes', user)}
            >
              <Text style={styles.textDetailUnderline}>SEE ALL</Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.filterContainer}>
            {!!musicTastes &&
              musicTastes.slice(0, 3).map((taste) => (
                <View style={styles.taste}>
                  <Text style={styles.textDetailBold}>
                    {taste.toUpperCase()}
                  </Text>
                </View>
              ))}
          </View>
          <View style={styles.bodyContainerSection}>
            <Text style={styles.textTitle}>FRIENDS</Text>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('ExpandedFriends', { user, fetchData })
              }
            >
              <Text style={styles.textDetailUnderline}>SEE ALL</Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.bodyContainerSection}>
            {friends[0] !== '' &&
              friends
                .slice(0, 3)
                .map((friend) => (
                  <Card
                    prop={friend}
                    key={friend.last_name}
                    friends={friends}
                    setFriends={setFriends}
                  />
                ))}
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default Profile;
