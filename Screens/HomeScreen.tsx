/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import React, {useRef, useState} from 'react';
import PagerView from 'react-native-pager-view';

const HomeScreen = ({navigation}) => {
  const height = useWindowDimensions().height;
  const width = useWindowDimensions().width;
  const pagerRef = useRef(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [roomcode, setRoomcode] = useState(0);
  const [username, setUsername] = useState('');
  const [joinRoom, joinRoomClicked] = useState(false);
  const [createRoom, createRoomClicked] = useState(false);
  const [isCreater, updateIsCreater] = useState(false);

  const handleNextPage = () => {
    if (pagerRef.current && pageIndex < 11) {
      pagerRef.current.setPage(pageIndex + 1);
      setPageIndex(pageIndex + 1);
    }
  };

  const handlePrevPage = () => {
    if (pagerRef.current && pageIndex > 0) {
      pagerRef.current.setPage(pageIndex - 1);
      setPageIndex(pageIndex - 1);
    }
  };
  const setCancel=()=>{
    if(createRoom){
      createRoomClicked(false)
      updateIsCreater(false);
    }else{
      joinRoomClicked(false)
    }
  };

  const generateRoomCode = () =>{
    updateIsCreater(true);
    const min = 10000000;
    const max = 99999999;
    const roomcode = Math.floor(Math.random() * (max - min + 1)) + min;
    setRoomcode(roomcode);
    return roomcode;
  };

const navigate = (joiningCode : any) => {
  navigation.navigate('GameScreen',{
    username : username,
    roomcode : roomcode,
    isCreater : isCreater,
    joiningCode : joiningCode,
  });
}

  const JoinRoomDialog = () => {
    const [joiningCode, updateJoiningCode] = useState('')
    return (
      <View>
        <TouchableOpacity style={styles.cancel} onPress={()=>setCancel()}>
        <Image style={{height: 30, width: 30}} source={require('../assets/icons/cross.png')}/>
        </TouchableOpacity>
        <View style={[styles.modal,{height: height / 5, margin: 10}]}>
        <TextInput
          style={[styles.nameContainer, {width: width / 2}]}
          keyboardType="numeric"
          maxLength={8}
          autoFocus
          onChangeText={(text)=> updateJoiningCode(text)}
          placeholder="Enter Room Code"
          placeholderTextColor={'grey'}
        />
        <TouchableOpacity onPress={()=> navigate(joiningCode)} style={[styles.button, {width: width / 2}]}>
          <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  };
  const CreateRoomDialog = () => {
    return (
      <View>
        <TouchableOpacity style={styles.cancel} onPress={()=>setCancel()}>
        <Image style={{height: 30, width: 30}} source={require('../assets/icons/cross.png')}/>
        </TouchableOpacity>
        <View style={[styles.modal,{height: height / 5, margin: 10}]}>
        <Text style={{fontFamily: 'Urbanist-ExtraBoldItalic',fontSize: 20}}>Room Code</Text>
        <Text style={[styles.nameContainer, {width: width / 2, paddingVertical: 10, fontFamily: 'Urbanist-Bold', color: 'black', marginTop: 10,}]}>{roomcode}</Text>
        <TouchableOpacity onPress={()=> navigate()} style={[styles.button, {width: width / 2}]}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.avatarView,
          {
            marginTop: height / 4.5,
            width: width/1.1,
            height: width / 1.8,
          },
        ]}>
        <PagerView
          style={[styles.pagerView]}
          orientation={'horizontal'}
          ref={pagerRef}
          scrollEnabled={false}
          initialPage={0}>
          <View style={styles.avatarContainer} key="1">
            <Image
              style={styles.avatar}
              source={require('../assets/avatars/man_1.png')}
            />
          </View>
          <View style={styles.avatarContainer} key="2">
            <Image
              style={styles.avatar}
              source={require('../assets/avatars/man_2.png')}
            />
          </View>
          <View style={styles.avatarContainer} key="3">
            <Image
              style={styles.avatar}
              source={require('../assets/avatars/woman_1.png')}
            />
          </View>
          <View style={styles.avatarContainer} key="4">
            <Image
              style={styles.avatar}
              source={require('../assets/avatars/woman_2.png')}
            />
          </View>
          <View style={styles.avatarContainer} key="5">
            <Image
              style={styles.avatar}
              source={require('../assets/avatars/man_3.png')}
            />
          </View>
          <View style={styles.avatarContainer} key="6">
            <Image
              style={styles.avatar}
              source={require('../assets/avatars/woman_4.png')}
            />
          </View>
          <View style={styles.avatarContainer} key="7">
            <Image
              style={styles.avatar}
              source={require('../assets/avatars/woman_5.png')}
            />
          </View>
          <View style={styles.avatarContainer} key="8">
            <Image
              style={styles.avatar}
              source={require('../assets/avatars/man_4.png')}
            />
          </View>
          <View style={styles.avatarContainer} key="9">
            <Image
              style={styles.avatar}
              source={require('../assets/avatars/woman_6.png')}
            />
          </View>
          <View style={styles.avatarContainer} key="10">
            <Image
              style={styles.avatar}
              source={require('../assets/avatars/man_5.png')}
            />
          </View>
          <View style={styles.avatarContainer} key="11">
            <Image
              style={styles.avatar}
              source={require('../assets/avatars/woman_7.png')}
            />
          </View>
          <View style={styles.avatarContainer} key="12">
            <Image
              style={styles.avatar}
              source={require('../assets/avatars/woman_3.png')}
            />
          </View>
        </PagerView>
         <TouchableOpacity
          onPress={() => handlePrevPage()}
          style={[styles.leftBtn, {marginTop: width / 1.8 / 2.6}]}>
          <Image
            style={styles.icon}
            source={require('../assets/icons/arrow.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNextPage()}
          style={[styles.rightBtn, {marginTop: width / 1.8 / 2.6}]}>
          <Image
            style={styles.icon}
            source={require('../assets/icons/arrow.png')}
          />
        </TouchableOpacity>
      </View>
      <TextInput
        style={[styles.nameContainer, {width: width / 2}]}
        onChangeText={(text)=> {setUsername(text)}}
        maxLength={15}
        placeholder="Enter Name"
        placeholderTextColor={'grey'}
      />
      <TouchableOpacity
        onPress={() => joinRoomClicked(true)}
        style={[styles.button, {width: width / 2}]}>
        <Text style={styles.buttonText}>Join Room</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> {createRoomClicked(true) , generateRoomCode()}} style={[styles.button, {width: width / 2}]}>
        <Text style={styles.buttonText}>Create Room</Text>
      </TouchableOpacity>
      {joinRoom && (
        <TouchableOpacity activeOpacity={1} style={styles.overlay}>
        <JoinRoomDialog />
      </TouchableOpacity>
      )}
      {createRoom && (
        <TouchableOpacity activeOpacity={1} style={styles.overlay}>
          <CreateRoomDialog />
        </TouchableOpacity>
      ) }
    </View>
  );
};
const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    elevation: 10,
    width: '60%',
    zIndex: 4,
    margin: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    flexDirection: 'column',
    borderRadius: 10,
  },
  cancel:{
    width: 30,
    height: 30,
    marginEnd: 0,
    zIndex: 5,
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  avatar: {
    resizeMode: 'contain',
    height: 180,
    width: 180,
    margin: 5,
    elevation: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    backgroundColor: 'white',
    elevation: 10,
    color: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'Urbanist-Medium',
  },
  button: {
    backgroundColor: '#E4080A',
    elevation: 10,
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 17,
    textAlign: 'center',
    paddingVertical: 13,
    color: 'white',
    fontFamily: 'Urbanist-SemiBold',
  },
  avatarView: {
    flexWrap: 'wrap',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagerView: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    height: '100%',
  },
  leftBtn: {
    transform: [{rotate: '180deg'}],
    elevation: 20,
    height: 55,
    width: 55,
    borderWidth: 3,
    borderColor: '#2C9A00',
    alignSelf: 'flex-start',
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rightBtn: {
    elevation: 20,
    height: 55,
    width: 55,
    borderWidth: 3,
    borderColor: '#2C9A00',
    alignSelf: 'flex-end',
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  icon: {
    tintColor: '#2C9A00',
    height: 40,
    marginStart: 8,
    width: 40,
  },
  avatarContainer: {
    position: 'absolute',
    top: '30%',
    backgroundColor: 'white',
    transform: [{ translateY: -50 }],
    alignSelf: 'center',
    justifyContent: 'space-around',
    elevation: 20,
    borderRadius: 100,
  },
});

export default HomeScreen;