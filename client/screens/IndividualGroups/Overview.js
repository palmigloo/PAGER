/* eslint-disable indent */
/* eslint-disable no-lone-blocks */
/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-underscore-dangle */
/* eslint-disable global-require */
/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  Platform,
  FlatList,
  // DatePickerIOS,
} from 'react-native';
import { Input } from 'react-native-elements';
import { useFonts } from 'expo-font';
// import DatePicker from 'react-native-datepicker';
// import DatePicker from 'react-native-date-picker';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux';
import * as firebase from 'firebase/app';
import { Timestamp } from '@firebase/firestore';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createElement } from 'react-native-web';
import globalStyles from '../../globalStyles';
import {
  getGroupPlans,
  addPlan,
  deletePlan,
  getGroup,
} from '../../db/group.js';
import Loading from '../Loading/Index';

const Schedule = ({ navigation, groupData }) => {
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      padding: 10,
      height: '100%',
      overflow: 'scroll',
    },
    group: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    main: { height: 60, width: 60 },
    name: {
      fontSize: 40,
      marginVertical: 'auto',
      alignItems: 'center',
      marginLeft: 20,
      fontFamily: 'PoppinsBold',
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
      width: '100%',
      fontFamily: 'PoppinsBold',
      alignItems: 'center',
    },
    schedules: {
      marginTop: 20,
      alignSelf: 'start',
      padding: 5,
      width: '100%',
      paddingHorizontal: 15,
    },
    boldDesc: {
      alignSelf: 'start',
      fontFamily: 'PoppinsBold',
      fontSize: 14,
    },
    desc: {
      alignSelf: 'start',
      fontFamily: 'Poppins',
      fontSize: 14,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      position: 'absolute',
      width: '100%',
      bottom: 200,
      backgroundColor: 'white',
      padding: 35,
      // alignItems: 'center',r
      shadowColor: '#000',
      height: '45%',
      opacity: 0.99,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.8,
      shadowRadius: 50,
      elevation: 5,
    },
    modalInput: {
      paddingTop: 20,
      color: 'white',
    },
    closeModal: {
      alignSelf: 'end',
    },
    error: {
      marginTop: 10,
      padding: 10,
      color: 'red',
      backgroundColor: 'white',
      borderWidth: 0.5,
      borderColor: 'red',
      borderRadius: 30,
    },
    bodyContainerName: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black',
      margin: 5,
    },
    headerImage: {
      width: 75,
      height: 75,
      marginRight: 15,
      marginVertical: 15,
      borderRadius: 20,
    },
    headerName: {
      fontSize: 25,
      fontFamily: 'PoppinsBold',
      color: 'white',
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
    bodyContainerSection: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'black',
      paddingVertical: 5,
      paddingHorizontal: 15,
      marginTop: 5,
    },
    bodyContainerSchedule: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      backgroundColor: 'red',
      padding: 5,
      marginBottom: 15,
      borderRadius: 10,
      // borderWidth: 1,
      // borderColor: 'black',
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
  });

  // use states
  const [modalVisible, setModalVisible] = useState(false);
  const [plans, setPlans] = useState([]);
  const [group, setGroup] = useState([]);

  const [time, setTime] = useState(new Date(Math.floor(new Date().getTime())));
  const [date, setDate] = useState(new Date(Math.floor(new Date().getDate())));

  const [webTime, setWebTime] = useState(new Date(Date.now()));

  const [value, setValue] = useState({
    time: new Date(),
    description: '',
    error: '',
  });

  const onChange = (event, selectedDate) => {
    const current = selectedDate;
    setTime(current);
    setValue({ ...value, time: current });
  };

  // get userId
  const { userId } = useSelector((state) => state.pagerData);
  // const userId = 'csc9V9HdwJw9SIVPcYMU';

  // get data on load
  useEffect(() => {
    async function fetchData() {
      const resPlans = await getGroupPlans(groupData.id);
      setPlans(resPlans);
      const resGroup = await getGroup(groupData.id);
      setGroup(resGroup);
    }
    fetchData();
  }, []);

  // get data function
  async function fetchData() {
    const resPlans = await getGroupPlans(groupData.id);
    setPlans(resPlans);
    const resGroup = await getGroup(groupData.id);
    setGroup(resGroup);
  }

  // load font
  const [fontLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    Bebas: require('../../assets/fonts/BebasNeue-Regular.ttf'),
  });

  if (!fontLoaded) {
    return <Loading />;
  }

  // splice strings
  function spliceSlice(str, index, count, add) {
    if (index < 0) {
      index = str.length + index;
      if (index < 0) {
        index = 0;
      }
    }

    return str.slice(0, index) + (add || '') + str.slice(index + count);
  }

  // add schedule handler
  async function addSchedule() {
    if (value.time === '' || value.description === '') {
      setValue({ ...value, error: 'Please input both time AND description' });
      return;
    }

    if (Platform.OS === 'web') {
      try {
        // function to add time and description to database
        addPlan(groupData.id, {
          time: Timestamp.fromDate(webTime),
          description: value.description,
        });
        fetchData();
        setValue({ description: '' });
        setModalVisible(!modalVisible);
      } catch (err) {
        setValue({ ...value, error: err.message });
      }
    } else {
      try {
        // function to add time and description to database
        addPlan(groupData.id, {
          time: value.time,
          description: value.description,
        });
        fetchData();
        setValue({ description: '', time: '' });
        setModalVisible(!modalVisible);
      } catch (err) {
        setValue({ ...value, error: err.message });
      }
    }
  }

  // delete plan handler
  async function deleteHandler(groupId, planId) {
    if (groupId && planId) {
      deletePlan(groupId, planId);
      fetchData();
    }
  }

  // check if organizer
  let organizer = false;
  if (userId === group.organizer_id) {
    //console.log('i am the organizer');
    organizer = true;
  }

  // local time ISOString
  const isoDateTime = (currentDate) =>
    new Date(
      currentDate.getTime() - currentDate.getTimezoneOffset() * 60000,
    ).toISOString();

  const WebDatePicker = () => {
    return createElement('input', {
      type: 'time',
      value: isoDateTime(webTime).split('T')[1].slice(0, 5),
      onChange: (e) => {
        const newTime = e.target.value;

        // gets input of for example 12:00
        const inputDate = new Date(`Jan 19 2023 ${newTime}`);

        // Thu Jan 19 2023 12:00:00 GMT-0800 (PST)

        const isoFormat = inputDate.toISOString();
        // gets in 2023-01-19T12:00:00.000Z format

        const isoDate = new Date(isoFormat);
        // date format --> Wed Jan 18 2023 16:00:00 GMT-0800 (PST)

        setWebTime(isoDate);
        // turns webtime into Thu Jan 19 2023 04:00:00 GMT-0800 (PST)
      },
      style: {
        height: 30,
        padding: 5,
        border: '2px solid #677788',
        width: '80%',
      },
    });
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* modal container */}
            <View style={styles.modalText}>
              <TouchableOpacity
                title="CloseModal"
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    fontSize: 20,
                    fontFamily: 'PoppinsBold',

                    marginTop: 0,
                    marginRight: 5,
                  }}
                >
                  X
                </Text>
              </TouchableOpacity>
              {Platform.OS === 'web' ? (
                <WebDatePicker />
              ) : (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={time}
                  mode="time"
                  is24Hour={false}
                  onChange={onChange}
                  style={{ alignSelf: 'start' }}
                />
              )}
              <Input
                placeholder="What is the plan?"
                containerStyle={styles.modalInput}
                onChangeText={(text) =>
                  setValue({ ...value, description: text })
                }
              />
            </View>
            <TouchableOpacity
              title="AddPlan"
              onPress={() => {
                addSchedule();
              }}
            >
              <View
                style={{
                  borderRadius: 30,
                  backgroundColor: 'black',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    paddingVertical: 12,
                    paddingHorizontal: 32,
                    fontFamily: 'PoppinsBold',
                    color: 'white',
                    margin: 3,
                  }}
                >
                  ADD SCHEDULE
                </Text>
              </View>
            </TouchableOpacity>
            {!!value.error && (
              <View style={styles.error}>
                <Text>{value.error}</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
      <View style={styles.bodyContainerName}>
        {!!group && (
          <Image
            style={styles.headerImage}
            source={{ uri: group.group_image }}
          />
        )}
        <Text style={styles.headerName}>{!!group && group.group_name}</Text>
      </View>
      <View style={styles.bodyContainerSection}>
        <Text style={styles.textTitle}>SCHEDULE</Text>
        {organizer === true ? (
          <TouchableOpacity
            title="AddPlan"
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text
              style={{
                fontSize: 30,
                fontFamily: 'PoppinsBold',
                marginTop: 0,
                marginRight: 5,
                color: 'white',
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.bodyContainerLeft}>
        {!!group && (
          <FlatList
            data={group.plans}
            keyExtractor={(plan) => plan.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.bodyContainerSchedule}>
                <Text style={styles.textDetailBold}>
                  {new Date(item.time.seconds * 1000).toLocaleTimeString()}
                </Text>
                <Text style={styles.textDetail}>{item.description}</Text>
              </View>
            )}
          />
        )}
      </View>
      {/* <View style={styles.group}>
        <Image style={styles.main} source={{ uri: groupData.group_image }} />
        <Text style={styles.name}>{groupData.group_name}</Text>
      </View> */}
      {/* <View style={styles.schedule}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'PoppinsBold',
            marginTop: 5,
          }}
        >
          SCHEDULE
        </Text>

        {organizer === true ? (
          <TouchableOpacity
            title="AddPlan"
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text
              style={{
                fontSize: 30,
                fontFamily: 'PoppinsBold',
                marginTop: 0,
                marginRight: 5,
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View
        style={{
          alignSelf: 'start',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        {plans
          .sort((a, b) => a.time.seconds - b.time.seconds)
          .map((plan) => {
            let date = plan.time
              .toDate()
              .toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
            date = date.slice(10, 22);
            date = date.split(':');
            date = `${date[0]}:${date[1]} ${date[2].split(' ')[1]}`;
            return (
              <View style={styles.schedules} key={plan.id}>
                {!!organizer && (
                  <TouchableOpacity
                    onPress={() => deleteHandler(groupData.id, plan.id)}
                  >
                    <MaterialCommunityIcons
                      name="delete-forever"
                      size={25}
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        fontSize: 25,
                        fontFamily: 'PoppinsBold',
                        marginRight: 5,
                      }}
                    />
                  </TouchableOpacity>
                )}

                <Text style={styles.boldDesc}>{date}</Text>
                <Text styles={styles.desc}>{plan.description}</Text>
              </View>
            );
          })}
      </View> */}
    </View>
  );
};

export default Schedule;
