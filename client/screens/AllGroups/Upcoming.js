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
  RefreshControl,
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { useFonts } from 'expo-font';
import Loading from '../Loading/Index.js';
import {
  getGroupsPerUser,
  getGroupsAttendedPerUser,
  getGroupsUpcommingPerUser,
  createGroup,
} from '../../db/group';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'scroll',
  },
  textHeader: {
    fontSize: 24,
    paddingTop: 15,
    fontFamily: 'PoppinsBold',
    color: 'white',
  },
  separation: {
    width: '90%',
    padding: 8,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  featureHeader: {
    fontSize: 20,
    paddingTop: 15,
    fontFamily: 'PoppinsBold',
    color: 'white',
  },
  groupName: {
    fontSize: 20,
    fontFamily: 'PoppinsBold',
    color: 'white',
  },
  groupImg: {
    height: 100,
    width: 100,
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: '1.5',
  },
  renderGroupContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: 10,
    // borderWidth: 10,
    // borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    // border: '2px solid grey',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const Upcoming = ({ navigation }) => {
  const [upcomingUserGroups, setUpcomingUserGroups] = useState([]);
  const { userId } = useSelector((state) => state.pagerData);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    console.log('refreshing');
    let groups = await getGroupsUpcommingPerUser(userId);
    setUpcomingUserGroups(groups);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await getGroupsUpcommingPerUser(userId);
      setUpcomingUserGroups(response);
    }
    fetchData();
  }, []);

  const [fontLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    Bebas: require('../../assets/fonts/BebasNeue-Regular.ttf'),
  });

  if (!fontLoaded) {
    return <Loading />;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.textHeader}>GROUPS</Text>
      {/* <View style={styles.separation} /> */}
      <View style={{ alignSelf: 'flex-start', width: '90%', paddingLeft: 18 }}>
        <Text style={styles.featureHeader}>UPCOMING</Text>
      </View>
      <View style={styles.renderGroupContainer}>
        <FlatList
          data={upcomingUserGroups}
          keyExtractor={(groups) => groups.id.toString()}
          contentContainerStyle={{
            width: 350,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center' /* , border: '2px solid blue' */,
          }}
          // numColumns={2}
          renderItem={({ item }) => (
            // console.log('group ID :', item.id)
            <View key={Math.random()} style={{ width: 350 }}>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate('IndividualGroupsIndex', item)
                }
              >
                <View style={styles.groupContainer}>
                  <Image
                    style={styles.groupImg}
                    source={{ uri: item.group_image }}
                  />
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={styles.groupName}>{item.group_name}</Text>
                    {/* <Text style={styles.groupName}>{item.event_name}</Text> */}
                  </View>
                  <Icon name="chevron-right" size={30} color="white" />
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}
        />
      </View>
      {/* <StatusBar style="auto" /> */}
    </ScrollView>
  );
};

export default Upcoming;
