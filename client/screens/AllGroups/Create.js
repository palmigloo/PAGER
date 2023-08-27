/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/style-prop-object */
import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Form,
  FormItem,
  Picker,
  Modal,
  Label,
} from 'react-native-form-component';
import { useFonts } from 'expo-font';
import { useSelector } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker';
import Loading from '../Loading/Index.js';
import { createGroup } from '../../db/group';
import { getAllEvents } from '../../db/event';
import { getUser } from '../../db/user';
import tw from '../../tailwind.js';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'scroll',
  },
  textHeader: {
    fontSize: 24,
    paddingTop: 15,
    fontFamily: 'PoppinsBold',
  },
  separation: {
    width: '90%',
    padding: 8,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  featureHeader: {
    fontSize: 20,
    paddingVertical: 15,

    fontFamily: 'PoppinsBold',
  },
  formStyle: {
    marginVertical: -35,
  },
  formInput: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins',
    borderBottomWidth: 0.5,
    borderColor: 'grey',
    // fontSize: 18,
  },
  // top: {
  //   backgroundColor: 'grey',
  //   fontSize: 16,
  //   fontFamily: 'Poppins',
  // },
  btnStyleUpload: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    fontFamily: 'PoppinsBold',
    color: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'grey',
  },
  btnTextStyleSubmit: {
    fontFamily: 'PoppinsBold',
    color: 'white',
  },
  btnStyleSubmit: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    fontFamily: 'PoppinsBold',
    color: 'white',
    borderRadius: 20,
    cursor: 'pointer',
  },
  btnTextStyleUpload: {
    fontFamily: 'PoppinsBold',
    color: 'black',
    fontSize: 14,
  },
});

const Create = ({ navigation }) => {
  const [userData, setUserData] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupImg, setGroupImg] = useState('');
  const [size, setSize] = useState('');
  const [vibe, setVibe] = useState('');
  const [event, setEvent] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [allEvents, setAllEvents] = useState([]);
  const { userId } = useSelector((state) => state.pagerData);
  const [modalVisible, setModalVisible] = useState(false);

  const groupNameInput = useRef();
  const groupDescriptionInput = useRef();
  const groupImgInput = useRef();

  useEffect(() => {
    async function fetchData() {
      const response = await getAllEvents();
      const userData = await getUser(userId);
      const reformatEvents = await response.reduce((acc, eventObj) => {
        const newEvent = {
          label: eventObj.event_name,
          value: eventObj,
        };
        acc.push(newEvent);
        return acc;
      }, []);
      setAllEvents(reformatEvents);
      setUserData(userData);
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

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    setGroupImg(result);
  };

  // -- 1/19 fix group image upload, opens docs on ios
  const submitFormData = async () => {
    const newGroupFormData = {
      event_date: event.event_date,
      event_id: event.id,
      group_description: groupDescription,
      group_image: groupImg,
      group_name: groupName,
      member_list: [userId],
      organizer_id: userId,
      organizer_name: userData[0].first_name,
      size,
      vibe,
    };
    setModalVisible(!modalVisible);
    await createGroup(newGroupFormData, userId);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.textHeader}>GROUPS</Text>
      <Modal
        animationType="slide"
        visible={!modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <Text>yes</Text>
      </Modal>
      <View
        style={{
          alignSelf: 'flex-start',
          width: '90%',
          paddingLeft: 18,
        }}
      >
        <Text style={styles.featureHeader}>CREATE GROUP</Text>
      </View>
      <View style={tw`w-4/5`}>
        <Form
          onButtonPress={() => {
            submitFormData();
            navigation.navigate('Upcoming');
          }}
          buttonText="CREATE GROUP"
          buttonStyle={styles.btnStyleSubmit}
          buttonTextStyle={styles.btnTextStyleSubmit}
          // style={styles.formStyle}
        >
          <FormItem
            textInputStyle={styles.formInput}
            id="group-name"
            placeholder="GROUP NAME"
            isRequired
            value={groupName}
            onChangeText={(groupName) => setGroupName(groupName)}
            ref={groupNameInput}
          />
          <FormItem
            textInputStyle={styles.formInput}
            id="group-description"
            placeholder="GROUP DESCRIPTION"
            isRequired
            value={groupDescription}
            onChangeText={(groupDescription) =>
              setGroupDescription(groupDescription)
            }
            ref={groupDescriptionInput}
          />
          <Picker
            itemLabelStyle={styles.top}
            id="select-size"
            placeholder="SELECT SIZE"
            items={[
              { label: 'Small (0-5)', value: 'small' },
              { label: 'Medium (6-10)', value: 'medium' },
              { label: 'Large (11-20)', value: 'large' },
            ]}
            selectedValue={size}
            onSelection={(item) => setSize(item.value)}
          />
          <Picker
            style={styles.formInput}
            id="select-vibe"
            placeholder="SELECT VIBE"
            items={[
              { label: 'Low', value: 'low' },
              { label: 'Medium', value: 'medium' },
              { label: 'High', value: 'high' },
            ]}
            selectedValue={vibe}
            onSelection={(item) => setVibe(item.value)}
          />
          <Picker
            style={styles.formInput}
            id="select-event"
            placeholder="SELECT EVENT"
            items={allEvents}
            selectedValue={event}
            onSelection={(item) => setEvent(item.value)}
          />

          <Form
            onButtonPress={() => {
              pickDocument();
            }}
            buttonText="UPLOAD IMAGE"
            buttonStyle={styles.btnStyleUpload}
            buttonTextStyle={styles.btnTextStyleUpload}
            style={styles.formStyle}
          />
        </Form>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
};

export default Create;
