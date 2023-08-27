/* eslint-disable operator-linebreak */
/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import tw from 'twrnc';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  CheckBox,
  FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useFonts } from 'expo-font';
import { getUser, deleteFriend } from '../../db/user.js';
import Loading from '../Loading/Index.js';
import globalStyles from '../../globalStyles';
import emptyBox from '../../assets/box.png';
import Card from './Card';
import UserHeader from './UserHeader';
import ExpandedFriendsCard from './ExpandedFriendsCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 10,
    overflow: 'scroll',
    backgroundColor: 'black',
  },
  headerImage: {
    width: 75,
    height: 75,
    marginRight: 15,
  },
  headerName: {
    fontSize: 20,
    fontFamily: 'PoppinsBold',
    color: 'white',
  },
  bodyContainerCenter: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginVertical: 5,
    marginHorizontal: 15,
  },
  bodyContainerLeft: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 15,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  bodyContainerSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginTop: 5,
  },
  bodyContainerSchedule: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  bodyContainerMember: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    marginBottom: 15,
    // paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    fontFamily: 'PoppinsBold',
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: 'PoppinsBold',
    color: 'black',
    fontSize: 12,
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
  textDetail: {
    fontSize: 15,
    fontFamily: 'PoppinsBold',
    color: 'white',
  },
  memberImage: {
    width: 75,
    height: 75,
    marginRight: 15,
    borderRadius: 50,
  },
  bodyContainerName: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  imageName: {
    flexDirection: 'row',
  },
  imageNameContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    margin: 5,
  },
});

const ExpandedFriends = ({ route }) => {
  const userData = route.params;
  const [user, setUser] = useState({});
  const [musicTastes, setMusicTastes] = useState([]);
  const [friends, setFriends] = useState([]);
  const [fontLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
  });
  const { userId } = useSelector((state) => state.pagerData);

  const unfriend = async (friendId) => {
    console.log('userId: ', userId, friendId);
    await deleteFriend(userId, friendId);
    const res = await getUser(userId);
    console.log('new friends list : ', res[0].friends_list);
    setFriends(res[0].friends_list);
    route.params.fetchData(userId);
  };

  useEffect(() => {
    setUser(userData);
    setMusicTastes(userData.user.music_tastes);
    setFriends(userData.user.friends_list);
    console.log('friends list : ', userData.user.friends_list);
  }, []);

  if (!fontLoaded) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainerName}>
        <Image
          style={tw`rounded-full border border- border-white`}
          height={100}
          width={100}
          source={{ uri: user.user.profile_pic }}
        />
        <Text style={styles.headerName}>
          {user.user.first_name}
          {`  `}
          {user.user.last_name}
        </Text>
      </View>
      <View style={styles.bodyContainerSection}>
        <Text style={styles.textTitle}>FRIENDS</Text>
      </View>
      <View style={styles.bodyContainerLeft}>
        {!!friends && (
          <FlatList
            data={friends}
            renderItem={({ item }) => (
              <View style={styles.imageNameContainer} key={Math.random()}>
                <View style={styles.imageName}>
                  <View>
                    <Image
                      style={styles.memberImage}
                      source={{ uri: item.profile_pic }}
                    />
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={styles.textDetail}>
                      {item.first_name} {item.last_name}
                    </Text>
                  </View>
                </View>
                <View>
                  <Pressable
                    style={styles.button}
                    onPress={() => unfriend(item.id)}
                  >
                    <Text style={styles.buttonText}>UNFRIEND</Text>
                  </Pressable>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default ExpandedFriends;
