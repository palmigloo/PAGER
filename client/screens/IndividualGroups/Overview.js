/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable global-require */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { useFonts } from 'expo-font';
import globalStyles from '../../globalStyles';
import { getAllEvents } from '../../db/event.js';
import { getGroupMembers, getGroupPlans, getGroup } from '../../db/group.js';
import tw from '../../tailwind.js';
import Loading from '../Loading/Index';

const Overview = ({ navigation, groupData }) => {
  // styles
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      padding: 10,
      overflow: 'scroll',
      fontFamily: 'Poppins',
    },
    main: {
      height: 200,
      width: 200,
      borderRadius: 30,
      marginTop: 20,
    },
    name: {
      fontSize: 30,
      fontFamily: 'PoppinsBold',
      color: 'white',
    },
    rowName: {
      flexDirection: 'row',
      width: '100%',
      paddingVertical: 10,
    },
    boldDesc: {
      alignSelf: 'start',
      fontFamily: 'PoppinsBold',
      fontSize: 14,
      color: 'white',
    },
    desc: {
      fontFamily: 'Poppins',
      fontSize: 14,
      color: 'white',
    },
    groupDesc: {
      marginTop: 5,
      alignSelf: 'start',
      fontFamily: 'Poppins',
      fontSize: 14,
      paddingHorizontal: 15,
      color: 'white',
    },
    selected: {
      backgroundColor: '#B5179E',
      padding: 5,
      // borderWidth: 1,
      color: 'white',
    },
    separation: {
      width: '90%',
      padding: 10,
      borderBottomColor: 'black',
      borderBottomWidth: 1,
    },
    schedule: {
      marginTop: 5,
      marginBottom: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderColor: 'green',
      // borderWidth: 1,
      width: '100%',
    },
    schedules: {
      marginTop: 20,
      alignSelf: 'start',
      padding: 5,
      // borderWidth: 2
      paddingHorizontal: 15,
    },
    tabs: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'start',
      // borderWidth: 1,
      width: '100%',
    },
    members: {
      alignItems: 'center',
      width: '30%',
      margin: 5,
    },
    member: {
      height: 75,
      width: 75,
      borderRadius: 50,
    },
    // container: {
    //   flexGrow: 1,
    //   alignItems: 'center',
    //   justifyContent: 'flex-start',
    //   paddingBottom: 10,
    //   overflow: 'scroll',
    //   backgroundColor: 'white',
    // },
    headerImage: {
      width: 200,
      height: 200,
      marginTop: 15,
      borderRadius: 30,
    },
    headerName: {
      fontSize: 30,
      fontFamily: 'PoppinsBold',
    },
    bodyContainerCenter: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      backgroundColor: 'white',
      marginVertical: 5,
      marginHorizontal: 15,
      // borderWidth: 1,
      // borderColor: 'black',
    },
    bodyContainerLeft: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      backgroundColor: 'black',
      paddingVertical: 5,
      paddingHorizontal: 15,
    },
    groupDescription: {
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

    bodyContainerSection: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'black',
      paddingVertical: 5,
      paddingHorizontal: 15,
      marginBottom: 5,
    },
    bodyContainerContentMem: {
      width: '100%',
      justifyContent: 'flex-start',
      paddingHorizontal: 15,
      backgroundColor: 'black',
    },
    bodyContainerSchedule: {
      // width: '100%',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      backgroundColor: 'red',
      marginBottom: 10,
      padding: 5,
      borderRadius: 15,
      // paddingVertical: 0,
      // paddingHorizontal: 15,
      // borderWidth: 1,
      // borderColor: 'black',
    },
    bodyContainerMember: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      // width: '100%',
      backgroundColor: 'black',
      paddingHorizontal: 15,
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
      // textDecorationLine: 'underline',
    },
    textSeeAll: {
      fontSize: 15,
      fontFamily: 'Poppins',
      textDecorationLine: 'underline',
      color: 'white',
    },
    memberImage: {
      width: 75,
      height: 75,
      borderRadius: 50,
      margin: 10,
      // borderColor: 'green',
      // borderWidth: 1,
    },
  });

  // set states
  const [events, setEvents] = useState();
  const [groupMembers, setGroupMembers] = useState();
  const [group, setGroup] = useState();
  const [plans, setPlans] = useState();

  // get data
  useEffect(() => {
    async function fetchData() {
      const resEvents = await getAllEvents();
      setEvents(resEvents);
      const resMembers = await getGroupMembers(groupData.id);
      setGroupMembers(resMembers);
      const resPlans = await getGroupPlans(groupData.id);
      setPlans(resPlans);
      const resGroup = await getGroup(groupData.id);
      setGroup(resGroup);
    }
    fetchData();
  }, []);

  // load font
  const [fontLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    Bebas: require('../../assets/fonts/BebasNeue-Regular.ttf'),
  });

  if (!fontLoaded) {
    return <Loading />;
  }

  // format time
  function spliceSlice(str, index, count, add) {
    if (index < 0) {
      index = str.length + index;
      if (index < 0) {
        index = 0;
      }
    }

    return str.slice(0, index) + (add || '') + str.slice(index + count);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.main} source={{ uri: groupData.group_image }} />
      <Text style={styles.name}>{groupData.group_name}</Text>
      <Text style={styles.groupDesc}>{groupData.group_description}</Text>

      <View style={styles.rowName}>
        <Text style={styles.boldDesc}>ORGANIZER : </Text>
        <Text style={styles.desc}>{groupData.organizer_name}</Text>
      </View>

      <View style={styles.bodyContainerSection}>
        <Text style={styles.textTitle}>SCHEDULE</Text>
        {plans && plans.length > 3 && (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Schedule', group)}
          >
            <Text style={styles.textSeeAll}>SEE ALL</Text>
          </TouchableWithoutFeedback>
        )}
      </View>
      {plans && plans.length === 0 && (
        <View style={tw`flex justify-center`}>
          <Text style={styles.bodyContainerSection}>
            There is no schedule yet
          </Text>
        </View>
      )}

      <View style={styles.bodyContainerLeft}>
        {!!plans && (
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={false}
            data={plans.length > 3 ? plans.slice(0, 3) : plans}
            keyExtractor={(plan) => plan.id.toString()}
            renderItem={({ item }) => {
              return (
                <View style={styles.bodyContainerSchedule}>
                  <Text style={styles.textDetailBold}>
                    {!!plans &&
                      new Date(item.time.seconds * 1000).toLocaleTimeString()}
                  </Text>
                  <Text style={styles.textDetail}>{item.description}</Text>
                </View>
              );
            }}
          />
        )}
      </View>
      <View style={styles.bodyContainerSection}>
        <Text style={styles.textTitle}>MEMBERS</Text>
        {groupMembers && groupMembers.length > 3 && (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Member', group)}
          >
            <Text style={styles.textSeeAll}>SEE ALL</Text>
          </TouchableWithoutFeedback>
        )}
      </View>
      {groupMembers && groupMembers.length === 0 && (
        <View style={tw`flex justify-center`}>
          <Text style={styles.bodyContainerSection}>
            There is no member yet
          </Text>
        </View>
      )}

      <View style={styles.bodyContainerContentMem}>
        {groupMembers && (
          <FlatList
            data={
              groupMembers.length > 3 ? groupMembers.slice(0, 3) : groupMembers
            }
            // keyExtractor={(member) => member.id.toString()}
            numColumns={3}
            renderItem={({ item }) => {
              return (
                <View style={styles.bodyContainerMember}>
                  <Image
                    style={styles.memberImage}
                    source={{ uri: item.profile_pic }}
                  />
                  <Text style={styles.textDetail}>{item.first_name}</Text>
                </View>
              );
            }}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Overview;
