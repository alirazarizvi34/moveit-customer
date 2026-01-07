import React, { useEffect, useState } from 'react';
import {StyleSheet, Image, Modal, Text, View, Dimensions, ScrollView} from 'react-native';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import moment from 'moment';
import { AppImages } from '../constants/AppImages';
import {colorTheme} from '../../constants/ColorConstants';
import CountDown from 'react-native-countdown-fixed';
import ButtonComponent from '../buttonComp/ButtonComponent';
import {useTranslation} from 'react-i18next';

const deviceHeight = Dimensions.get('window').height;
const {
    colorFBF7FF
  } = THEME.colors;
  const {latoBold,latoRegular,latoSemiBold} = THEME.fonts;
  const {defaultText,primaryBackground} = colorTheme;

export default EmailVerificationLinkModal = ({props,value,reSendEmail,showMessage}) => {

  const {t} = useTranslation();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props?.show}
      style={styles.modalStyle}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
        <Image
           source={AppImages.horizontalLine}
            style={styles.horizontalLine}
            resizeMode="cover"
            />
        <ScrollView>

       <Text style={styles.modalText}>
       We have sent a verification link to <Text style={{fontFamily:latoBold,color: defaultText}}> {value} </Text>
       Please click the link to verify your email address.
       </Text>
       <Text style={{color:'red',textAlign:'center'}}>
        {showMessage}
       </Text>
      


       <ButtonComponent
              disabled={false}
              pressStatus={false}
              text={t('update_now')}
              btnStyle={{
                width:"40%",
                height:moderateScale(40),
                borderRadius: moderateScale(100),
                marginVertical: moderateVerticalScale(10),
                backgroundColor: primaryBackground,
                alignSelf:"center"
              }}
              // textStyle={{fontFamily: i18n.language === 'urdu' ? jameelNooriNastaleeq : latoRegular, fontSize: scale(14) }}
              onPress={() => {
                reSendEmail()
              }}
            />
            

       {/* {emailTimer ?
        <CountDown
        until={emailTimer}
        size={18}
        // onChange={e => setOtpTimer(e)}
        onFinish={() => onChange()}
        digitStyle={null}
        digitTxtStyle={{color: 'red'}}
        separatorStyle={{color: 'red', margin: -10}}
        timeToShow={['M', 'S']}
        timeLabels={{m: null, s: null}}
        showSeparator
      />
      : null } */}
      
       </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
    modalStyle: {
        justifyContent: 'flex-end',
        margin: 0,
      },
      modalContainer: {
        flex: 1,
        backgroundColor: '#000000AA',
        justifyContent: 'flex-end',
      },
    modalTitle: {
      fontSize: scale(32),
      fontFamily: latoSemiBold,
      textAlign:'center',
      alignSelf:"stretch"
    },
    modalView: {
        backgroundColor: colorFBF7FF,
        width: '100%',
        maxHeight: deviceHeight * 0.5,
        borderTopRightRadius: moderateScale(28),
        borderTopLeftRadius: moderateScale(28),
        padding:10
      },
    modalText: {
      fontSize: scale(16),
      fontFamily:latoRegular,
      color: defaultText,
      textAlign: 'center',
      marginBottom: moderateVerticalScale(80),
      marginTop:moderateVerticalScale(66),
      marginHorizontal:moderateScale(35),
    },
    horizontalLine: {
        alignSelf:'center',
        marginBottom:moderateScale(10),
        width:32,
        height:4
    }
  });