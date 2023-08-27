/* eslint-disable operator-linebreak */
/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import tw from 'twrnc';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import { getUser } from '../../db/user.js';
import Loading from '../Loading/Index.js';
import globalStyles from '../../globalStyles';
import emptyBox from '../../assets/box.png';
import TasteCard from './TasteCard';
import UserHeader from './UserHeader';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'black',
    overflow: 'scroll',
  },
  headerName: {
    fontSize: 20,
    fontFamily: 'PoppinsBold',
    color: 'white',
  },
  bodyContainerSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    // borderWidth: 1,
    // borderColor: 'red',
  },

  textTitle: {
    fontSize: 20,
    fontFamily: 'PoppinsBold',
    color: 'white',
  },
  textDetailBold: {
    fontSize: 15,
    fontFamily: 'PoppinsBold',
  },
  bodyContainerName: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  taste: {
    backgroundColor: '#8DC9D8',
    borderRadius: 5,
    padding: 20,
    margin: 8,
  },

  filterContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 20,
    gap: 10,
    flexWrap: 'wrap',
  },
});

const ExpandedTastes = ({ route }) => {
  const userData = route.params;
  // console.log('userData from tastes: ', userData);
  const [user, setUser] = useState({});
  const [musicTastes, setMusicTastes] = useState([]);
  const [friends, setFriends] = useState([]);
  // const { userId } = useSelector((state) => state.pagerData);
  const [fontLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    Bebas: require('../../assets/fonts/BebasNeue-Regular.ttf'),
  });

  useEffect(() => {
    setUser(userData);
    setMusicTastes(userData.music_tastes);
    setFriends(userData.friends_list);
  }, []);

  if (!fontLoaded) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainerName}>
        <Image
          style={tw`rounded-full`}
          height={80}
          width={80}
          source={{ uri: user.profile_pic }}
        />
        <Text style={styles.headerName}>
          {user.first_name}
          {`  `}
          {user.last_name}
        </Text>
      </View>
      <View style={styles.bodyContainerSection}>
        <Text style={styles.textTitle}>MUSIC TASTES</Text>
      </View>

      <View style={styles.filterContainer}>
        {!!musicTastes &&
          musicTastes.map((taste) => (
            <View style={styles.taste}>
              <Text style={styles.textDetailBold}>{taste.toUpperCase()}</Text>
            </View>
          ))}
      </View>
      {/* <FlatList
          data={musicTastes}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.taste}>
              <Text style={styles.textDetailBold}>{item.toUpperCase()}</Text>
            </View>
          )}
        /> */}
    </View>
  );
};

export default ExpandedTastes;
