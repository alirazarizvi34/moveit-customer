import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, StyleSheet } from 'react-native';
import { Block } from 'galio-framework';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GlobalContext } from '../../context/GlobalState';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import toastService from '../services/toast-service';
import i18n from '../../translate/i18n';
import { baseURL } from '../../src/config/config';
import { THEME } from '../shared/theme';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import ButtonComponent from '../components/buttonComp/ButtonComponent';

// import Modal from "react-native-modal";


const { colorWhite, color4D226D, colorFFBE50 } = THEME.colors;
const { latoBlack, jameelNooriNastaleeq } = THEME.fonts;
export default SelectLanguage = ({ navigation }) => {
  // const {t, i18n} = useTranslation();
  const { setMyLanguage } = useContext(GlobalContext);
  const [selectLang, setSelectLang] = useState('en');
  const { auth, setAuth } = useContext(GlobalContext);
  const [isModalVisible, setIsModalVisible] = useState(true);


  const setEng = () => {
    setSelectLang('en');
    i18n.changeLanguage('en');
    // i18n.changeLanguage('en',()=>console.log('Hello'));
    // updateVersion('0');
  };
  const setUrdu = () => {
    setSelectLang('urdu');
    i18n.changeLanguage('urdu');
    // i18n.changeLanguage('urdu',()=>console.log('Hello'));

    // updateVersion('1');
  };

  const updateVersion = async (vID) => {
    try {
      let resp = await fetch(baseURL + 'user/language', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth?.token,
        },
        body: JSON.stringify({
          user_id: auth?.id,
          version_id: vID,
        }),
      });
      let data = await resp.json();
      if (data?.success) {
        toastService.shortToast(data?.message);
        await AsyncStorage.setItem('lang', selectLang);
        setMyLanguage(selectLang);
        navigation.navigate('SignIn');
      } else {
      }
    } catch (error) {
      // console.log('HEy Catch');
    }
  };
  const goNext = async (lang) => {
    await AsyncStorage.setItem('lang', lang);
    i18n.changeLanguage(lang);
    setMyLanguage(lang);
  };

  return (
    <>
      <View
        flex={1}
        // justifyContent={'center'}
        style={{
          // paddingHorizontal: 30,
          backgroundColor: colorWhite,
        }}
      >
        <View style={{flex:1,marginTop: moderateScale(49)}}>
        <Image
          source={require('../../assets/icons/moveit_logo.jpg')}
          style={{
            // marginTop: moderateScale(49),
            alignSelf: 'center'
          }}
        />
        </View>


       {isModalVisible && 
        <Modal
        transparent={true}
        visible={isModalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            {/* <View style={{ marginTop: moderateScale(32) }}> */}
              <Text
                style={[
                  {
                    fontSize: scale(24),
                    // paddingBottom: 30,
                    // paddingtop: moderateScale(32),
                    color: color4D226D,
                    fontFamily: latoBlack
                  },
                ]}>
                Select Language
              </Text>
            {/* </View> */}

            <View style={{ marginVertical: moderateVerticalScale(27) }}>
              <Text
                style={[
                  {
                    fontSize: scale(29),
                    // paddingBottom: 30,
                    // paddingVertical: moderateVerticalScale(27),
                    color: color4D226D,
                    fontFamily: jameelNooriNastaleeq
                  },
                ]}>
                زبان منتخب کریں
              </Text>
            </View>

            <ButtonComponent
              disabled={false}
              text={"اردو"}
              btnStyle={{ marginBottom: moderateScale(35) }}
              textStyle={{ fontSize: scale(32), fontFamily: jameelNooriNastaleeq, lineHeight: moderateScale(45), }}
              onPress={() => {
                { auth?.id === undefined ? goNext('urdu') : setUrdu() }
              }}
            />

            <ButtonComponent
              disabled={false}
              text={"English"}
              btnStyle={{
                // marginBottom: moderateScale(52),
                backgroundColor: colorFFBE50
              }}
              textStyle={{ fontSize: scale(19) }}
              onPress={() => {
                { auth?.id === undefined ? goNext('en') : setEng() }
              }}
            />
          </View>
        </View>
      </Modal>
       } 

     
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: '#fff',
    fontSize: scale(20),
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    // marginTop: moderateScale(22),
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  modalView: {
    marginTop:moderateScale(49),
    paddingTop:moderateScale(32),
    paddingBottom:moderateScale(50),
    marginHorizontal:moderateScale(16),
    backgroundColor: colorWhite,
    borderRadius: moderateScale(10),
    padding: moderateScale(17),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  btnView: {
    paddingHorizontal: moderateScale(17),
  }

});
