import React, {useState, useCallback, useEffect, useContext} from 'react';
import {GiftedChat, Bubble, InputToolbar, Send} from 'react-native-gifted-chat';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Block} from 'galio-framework';
import firestore from '@react-native-firebase/firestore';
import {GlobalContext} from '../../context/GlobalState';

function Chat(props) {
  let firebaseMessages = firestore().collection('messages');
  const {auth} = useContext(GlobalContext);

  const [messages, setMessages] = useState([]);
  const [myText, setMyText] = useState('');

  useEffect(() => {
    
    firestore()
      .collection('messages')
      .onSnapshot((doc) => {
        let dbmessages = [];
        doc.docs.forEach((item) => {
          if (
            item.data().driverId === props.route.params.data.id &&
            item.data().customerId === auth.id
          ) {
            const data = {
              _id: item.data()._id,
              text: item.data().text,
              createdAt: new Date(item.data().createdAt.toDate()),
              user: {
                _id: item.data().user._id,
              },
            };
            dbmessages.push(data);
          }
        });
        dbmessages = dbmessages.sort((a, b) => {
          return b.createdAt.getTime() - a.createdAt.getTime();
        });
        setMessages(dbmessages);
      });
  }, []);

  useEffect(() => {}, [messages]);

  

  const addMessageToDb = (msg) => {
    firebaseMessages
      .add({
        ...msg[0],
        user: {
          ...msg[0].user,
        },
        customerId: auth.id,
        driverId: props.route.params.data.id,
      })
      .then((docRef) => {
      });
  };

  const onSend = useCallback((messages = []) => {
    addMessageToDb(messages);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const InputBox = (props) => {
    return (
      <View
        style={{
          borderTopColor: '#000',
          borderWidth: 0.5,
          flex: 1,
          flexDirection: 'row',
          flexGrow: 1,
        }}>
        <TouchableOpacity style={{padding: 5, paddingLeft: 20}}>
          <Ionicons name="camera-outline" size={30} color={'#acacac'} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}}>
          <Ionicons name="attach" size={30} color={'#acacac'} />
        </TouchableOpacity>
        <View style={{width: '60%'}}>
          <TextInput
            style={{width: '100%'}}
            placeholder={'Type Message'}
          placeholderTextColor={'darkgray'}
            value={myText}
            onChangeText={(text) => setMyText(text)}
          />
        </View>
        <View style={{padding: 8}}>
          <TouchableOpacity
            onPress={props.action}
            style={{
              position: 'absolute',
              right: -10,
              top: 5,
              padding: 5,
              backgroundColor: 'red',
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons
              name={
                myText.length === 0 ? 'mic-outline' : 'ios-paper-plane-outline'
              }
              size={20}
              color={'#fff'}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  return (
    <>
      <Block
        flexDirection={'row'}
        space={'between'}
        style={{padding: 10, backgroundColor: '#4D286E'}}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Block style={{backgroundColor: 'white', borderRadius: 8}}>
            <Icon name="keyboard-arrow-left" size={35} color={'000'} />
          </Block>
        </TouchableOpacity>

        <Block center>
          <Text
            style={{
              color: '#ffff',
              marginLeft: -30,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            {props?.route?.params?.data?.basic_info?.name}
          </Text>
        </Block>
        <Block style={{backgroundColor: 'white', borderRadius: 8}}>
          {props.rightSide ? (
            <Icon name="keyboard-arrow-left" size={35} color={'000'} />
          ) : null}
        </Block>
      </Block>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: auth.id,
          name: auth.basic_info?.name ?? "",
        }}
        renderSend={(props) => {
          return (
            <Send {...props}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Ionicons
                  color={'#4D286E'}
                  style={{marginRight: 15, marginBottom: 5}}
                  size={30}
                  name="ios-paper-plane-outline"
                />
              </View>
            </Send>
          );
        }}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: '#fff',
                },
                left: {
                  color: '#000',
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: '#fff',
                  elevation: 3,
                },
                right: {
                  backgroundColor: '#4D286E',
                  elevation: 3,
                },
              }}
            />
          );
        }}
        renderInputToolbar={(props) => {
          return (
            <>
              <InputToolbar {...props} />
            </>
          );
        }}
      />
    </>
  );
}

export default Chat;
