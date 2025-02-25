import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../db/user';
import {
  collection,
  addDoc,
  orderBy,
  where,
  query,
  onSnapshot,
} from 'firebase/firestore';
import { signOut, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getChatMsgsPerGroup } from '../../db/group';
import { db } from '../../firebase-config.js';
import globalStyles from '../../globalStyles';

const Stack = createStackNavigator();
const authChat = getAuth();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const GChat = () => {
  return <GiftedChat />;
};

const ChatStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chat" component={GChat} />
    </Stack.Navigator>
  );
};

const Chat = ({ navigation, groupData }) => {
  const { userId } = useSelector((state) => state.pagerData); // user_id global state
  console.log('authchat is : ', authChat.currentUser);
  const [messages, setMessages] = useState([]);
  const [groupId, setGroupId] = useState(groupData.id);
  const [pic, setPic] = useState();

  async function fetchData(userId) {
    const res = await getUser(userId);
    console.log('the user id is : ', res[0]);
    setPic(res[0].profile_pic);
  }
  useEffect(() => {
    fetchData(userId);
  }, []);

  useLayoutEffect(() => {
    const collectionRef = collection(db, 'chat');
    const q = query(
      collectionRef,
      where('user.group_id', '==', groupId),
      orderBy('createdAt', 'desc'),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log('snapshot', snapshot);
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        })),
      );
    });
    return unsubscribe;
    // const groupMessages = getChatMsgsPerGroup('IrIfBilvP6HSrCHzty9d').then(
    //   (result) => {
    //     setMessages(result);
    //   },
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );

    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(db, 'chat'), {
      _id,
      createdAt,
      text,
      user,
    });
    console.log(messages);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        id: authChat?.currentUser?.email,
        avatar: pic,
        // 'https://c8.alamy.com/zooms/9/9c30002a90914b58b785a537a39421ba/2c80ydc.jpg',
        group_id: groupId,
        reaction: false,
      }}
    />
  );
};

export default Chat;
