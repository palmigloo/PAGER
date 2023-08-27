import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  StyleSheet,
  Item,
  TextInput,
  Text,
  View,
  Image,
  Pressable,
} from 'react-native';
import CheckBox from 'expo-checkbox';
import { editUserData } from '../../db/user';
import UserHeader from './UserHeader';
import TasteCard from './TasteCard';
import tw from '../../tailwind';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 10,
    overflow: 'scroll',
    // overflow-x: 'hidden',
    backgroundColor: 'black',
    // borderWidth: 3,
    // borderColor: 'red',
  },
  input: {
    borderBottomWidth: 0.5,
    borderColor: 'white',
    padding: 8,
    margin: 10,
    width: '100%',
    fontSize: 18,
    color: 'white',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 32,
    backgroundColor: 'white',
    fontFamily: 'PoppinsBold',
    color: 'black',
    margin: 25,
    borderRadius: 15,
    width: '80%',
  },
  allCheckboxContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },

  checkboxContainer: {
    flexBasis: '50%',
    padding: 15,
    flexDirection: 'row',
  },

  checkbox: {
    marginRight: 10,
  },
  buttonText: {
    fontFamily: 'PoppinsBold',
    color: 'black',
  },
  bodyContainerName: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    margin: 10,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  headerImage: {
    width: 75,
    height: 75,
    marginRight: 15,
    marginBottom: 15,
    borderRadius: 50,
  },
  headerName: {
    fontSize: 20,
    fontFamily: 'PoppinsBold',
    color: 'white',
  },
  textDetailBold: {
    fontSize: 15,
    fontFamily: 'PoppinsBold',
    color: 'white',
  },
});

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

const EditProfile = ({ route }) => {
  const userData = route.params.user;
  const { userId } = useSelector((state) => state.pagerData);
  const [description, setDescription] = useState('');
  const [user, setUser] = useState([]);

  useEffect(() => {
    setUser(userData);
    setDescription(route.params.user.description);
    console.log('description is : ', route.params.user);
  }, []);

  const tastes = route.params.user.music_tastes;

  const [likesTechno, setLikesTechno] = useState(tastes.includes('techno'));
  const [likesHouse, setLikesHouse] = useState(tastes.includes('house'));
  const [likesTrance, setLikesTrance] = useState(tastes.includes('trance'));
  const [likesDubstep, setLikesDubstep] = useState(tastes.includes('dubstep'));
  const [likesBass, setLikesBass] = useState(tastes.includes('bass'));
  const [likesGrime, setLikesGrime] = useState(tastes.includes('grime'));
  const [likesGarage, setLikesGarage] = useState(tastes.includes('garage'));
  const [likesTrap, setLikesTrap] = useState(tastes.includes('trap'));
  const [likesDisco, setLikesDisco] = useState(tastes.includes('disco'));
  const [likesOther, setLikesOther] = useState(tastes.includes('other'));

  const musicMap = {
    Techno: [likesTechno, setLikesTechno],
    Trance: [likesTrance, setLikesTrance],
    Bass: [likesBass, setLikesBass],
    Garage: [likesGarage, setLikesGarage],
    Grime: [likesGrime, setLikesGrime],
    Trap: [likesTrap, setLikesTrap],
    Disco: [likesDisco, setLikesDisco],
    Dubstep: [likesDubstep, setLikesDubstep],
    House: [likesHouse, setLikesHouse],
    Other: [likesOther, setLikesOther],
  };
  const [value, setValue] = React.useState({
    music_tastes: [],
  });

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

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainerName}>
        <Image style={styles.headerImage} source={{ uri: user.profile_pic }} />
        <Text style={styles.headerName}>
          {user.first_name} {user.last_name}
        </Text>
      </View>
      <View style={tw`flex-col justify-center items-start w-8/10 pb-5`}>
        <Text style={styles.textDetailBold}>NEW DESCRIPTION:</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Update description here."
        />
      </View>
      <View style={tw`flex-col justify-center items-start w-8/10`}>
        <Text style={styles.textDetailBold}>FAVORITE GENRES:</Text>

        <View style={styles.allCheckboxContainer}>
          {musicTastes.map((taste) => (
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={musicMap[taste][0]}
                onValueChange={musicMap[taste][1]}
                style={styles.checkbox}
              />
              <Text style={styles.textDetailBold}>{taste}</Text>
            </View>
          ))}
        </View>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => {
          // setDescription('');
          addMusicTaste();
          editUserData(userId, description, value.music_tastes);
          route.params.fetchData(userId);
        }}
      >
        <Text style={styles.buttonText}>Update</Text>
      </Pressable>
    </View>
  );
};

export default EditProfile;
