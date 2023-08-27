import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Form } from 'react-native';
import CheckBox from 'expo-checkbox';
import { Input, Button } from 'react-native-elements';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import * as DocumentPicker from 'expo-document-picker';
import { ScrollView } from 'react-native-gesture-handler';
import { addUser, setUserInfo } from '../../db/user.js';
// -- redux import statements
import { useSelector, useDispatch } from 'react-redux';
import { updateUserId } from '../../reducers/index.js';
import gif from '../../assets/raveWelcome.gif';
import { Link } from '@react-navigation/native';
import tw from '../../tailwind.js';

const auth = getAuth();

const musicTastes = [
  'Techno',
  'Trance',
  'Bass',
  'Garage',
  'Disco',
  'House',
  'Dubstep',
  'Grime',
  'Trap',
  'Other',
];

const SignUpScreen = ({ navigation }) => {
  // -- redux import statements
  // const { userId } = useSelector((state) => state.pagerData);
  const dispatch = useDispatch();
  const [isOverEighteen, setIsOverEighteen] = useState(false);

  const [likesTechno, setLikesTechno] = useState(false);
  const [likesHouse, setLikesHouse] = useState(false);
  const [likesTrance, setLikesTrance] = useState(false);
  const [likesDubstep, setLikesDubstep] = useState(false);
  const [likesBass, setLikesBass] = useState(false);
  const [likesGrime, setLikesGrime] = useState(false);
  const [likesGarage, setLikesGarage] = useState(false);
  const [likesTrap, setLikesTrap] = useState(false);
  const [likesDisco, setLikesDisco] = useState(false);
  const [likesOther, setLikesOther] = useState(false);
  const musicMap = {
    Techno: [likesTechno, setLikesTechno],
    Trance: [likesTrance, setLikesTrance],
    Bass: [likesBass, setLikesBass],
    Garage: [likesGarage, setLikesGarage],
    Disco: [likesDisco, setLikesDisco],
    House: [likesHouse, setLikesHouse],
    Dubstep: [likesDubstep, setLikesDubstep],
    Grime: [likesGrime, setLikesGrime],
    Trap: [likesTrap, setLikesTrap],
    Other: [likesOther, setLikesOther],
  };

  const [userImg, setUserImg] = useState({});
  const [isUploaded, setIsUploaded] = useState(false);
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    description: '',
    music_tastes: [],
    error: '',
  });

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    // console.log(result);
    setUserImg(result);
    setIsUploaded(true);
    // alert(result.uri);
    // console.log(userImg);
  };

  function addMusicTaste() {
    if (likesTechno) value.music_tastes.push('techno');
    if (likesHouse) value.music_tastes.push('house');
    if (likesTrance) value.music_tastes.push('trance');
    if (likesDubstep) value.music_tastes.push('dubstep');
    if (likesBass) value.music_tastes.push('bass');
    if (likesGrime) value.music_tastes.push('grime');
    if (likesGarage) value.music_tastes.push('garage');
    if (likesTrap) value.music_tastes.push('trap');
    if (likesDisco) value.music_tastes.push('disco');
    if (likesOther) value.music_tastes.push('other');
  }

  async function signUp() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.',
      });
      return;
    }

    if (!isOverEighteen) {
      setValue({
        ...value,
        error: 'You must be 18+ to make an account.',
      });
      return;
    }

    try {
      addMusicTaste();
      console.log(value, 'value is', value.music_tastes, 'value.music tastes');
      const id = await addUser({
        email: value.email,
        password: value.password,
        first_name: value.firstName,
        last_name: value.lastName,
        birthday: '',
        music_tastes: value.music_tastes,
        group_list: [],
        friends_list: [],
        description: value.description,
      });
      try {
        console.log('the add user id is : ', id);
        await dispatch(updateUserId(id));
      } catch (err) {
        console.log(err);
      }
      try {
        await setUserInfo(id, userImg, {
          email: value.email,
          password: value.password,
          first_name: value.firstName,
          last_name: value.lastName,
          birthday: '',
          music_tastes: value.music_tastes,
          group_list: [],
          friends_list: [],
          description: value.description,
        });
        console.log('i am done with set user image');
      } catch (err) {
        console.log(err);
      }
    } catch (error) {
      console.log(error);
    }
    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate('Sign In');
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      // paddingTop: 20,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-around',
      overflow: 'scroll',
    },

    controls: {
      alignSelf: 'center',
      width: '80%',
    },

    btnStyleSubmit: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black',
      fontFamily: 'PoppinsBold',
      color: 'white',
      borderRadius: 20,
      cursor: 'pointer',
      padding: 15,
    },

    label: {
      alignSelf: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: 20,
    },

    allCheckboxContainer: {
      paddingVertical: 15,
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5,
    },

    checkboxContainer: {
      flexBasis: '28%',
      padding: 5,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      // borderColor: 'red',
      // borderWidth: 1,
    },
    btnStyleUpload: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      fontFamily: 'PoppinsBold',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'grey',
      padding: 13,
    },

    checkbox: {
      marginRight: 7,
    },

    control: {
      marginRight: 10,
    },

    image: {
      flex: 1,
      justifyContent: 'center',
    },

    error: {
      marginTop: 10,
      padding: 10,
      color: '#fff',
      backgroundColor: '#D54826FF',
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {value.error && (
        <View style={styles.error}>
          <Text>{value.error}</Text>
        </View>
      )}

      <View style={tw`w-4/5`}>
        <Input
          placeholder="Email"
          containerStyle={styles.control}
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
          // leftIcon={<Icon name="envelope" size={16} />}
        />
        <Input
          placeholder="Password"
          containerStyle={styles.control}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry
        />
        <Input
          placeholder="First Name"
          containerStyle={styles.control}
          value={value.firstName}
          onChangeText={(text) => setValue({ ...value, firstName: text })}
        />
        <Input
          placeholder="Last Name"
          containerStyle={styles.control}
          value={value.lastName}
          onChangeText={(text) => setValue({ ...value, lastName: text })}
        />
        <Input
          placeholder="Description: ex (I <3 Flow Toys)"
          containerStyle={styles.control}
          value={value.description}
          onChangeText={(text) => setValue({ ...value, description: text })}
          // leftIcon={<Icon name="newspaper-o" size={16} />}
        />
        <View>
          <Button
            buttonStyle={styles.btnStyleUpload}
            titleStyle={{ color: 'black', fontFamily: 'PoppinsBold' }}
            title="UPLOAD IMAGE"
            onPress={pickDocument}
          />

          {isUploaded && (
            <Text style={{ alignSelf: 'center', color: 'red', paddingTop: 10 }}>
              Profile Image Uploaded!
            </Text>
          )}
        </View>
        <View
          style={{
            marginTop: 15,
            marginBottom: 30,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
          }}
        >
          <CheckBox value={isOverEighteen} onValueChange={setIsOverEighteen} />
          <Text style={{ paddingLeft: 10, fontFamily: 'PoppinsBold' }}>
            I confirm that I'm 18+
          </Text>
        </View>
        <Text style={styles.label}>FAVORITE GENRES</Text>
        <View style={styles.allCheckboxContainer}>
          {musicTastes.map((taste) => (
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={musicMap[taste][0]}
                onValueChange={musicMap[taste][1]}
                style={styles.checkbox}
              />
              <Text>{taste}</Text>
            </View>
          ))}
        </View>
        <Button
          title="SIGN UP"
          buttonStyle={styles.btnStyleSubmit}
          titleStyle={{ color: 'white', fontFamily: 'PoppinsBold' }}
          onPress={signUp}
        />
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;
