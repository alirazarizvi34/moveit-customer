import React from 'react';
import {StyleSheet, Image, Modal, Text, View, Dimensions, ScrollView,Linking, Platform} from 'react-native';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import ButtonComponent from '../buttonComp/ButtonComponent';
import { useTranslation } from 'react-i18next';
import { AppConstants } from '../constants/AppConstants';
import { AppImages } from '../constants/AppImages';
const deviceHeight = Dimensions.get('window').height;
const {
    priTxtColor,
    color4E008A,
    colorFBF7FF
  } = THEME.colors;
  const {jameelNooriNastaleeq,latoRegular,latoSemiBold} = THEME.fonts;
export default ForceUpdateModal = ({
    props,
    updatedVersion,
    currentVersion
}) => {

  const { t, i18n } = useTranslation();
    const openStore = () => {
        const AppStoreLink = Platform.OS == 'ios' 
        ? AppConstants.appStoreLink
        : AppConstants.playStoreLink;
        Linking.canOpenURL(AppStoreLink).then(
          (supported) => {
            supported && Linking.openURL(AppStoreLink);
          },
          (err) => console.log(err)
        );
      };
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
            style={{
                alignSelf:'center',
                marginBottom:moderateScale(30),
            }}
            resizeMode="cover"
            />
        <ScrollView>
        
        <Image
           source={AppImages.updated}
            style={{
            borderRadius: moderateScale(14),
            width: moderateScale(28),
            height: moderateScale(30),
            alignSelf:'center',
            marginTop:moderateScale(30),
            }}
            resizeMode="cover"
            />
        <View style={{flexDirection:'row',justifyContent:'center',marginVertical:moderateVerticalScale(20)}}>
        <Text style={[styles.modalTitle,{lineHeight: i18n?.language === 'urdu' ? moderateVerticalScale(45) : null,fontFamily: i18n.language === 'urdu' ? jameelNooriNastaleeq : latoSemiBold}]}>{t('update_moveit_heading')}</Text>
        <Text style={[styles.modalTitle,{color:priTxtColor}]}> Moveit</Text>
        </View>
       <Text style={[styles.modalText,{fontSize: i18n?.language === 'urdu' ? scale(15) : scale(13),fontFamily: i18n.language === 'urdu' ? jameelNooriNastaleeq : latoRegular}]}>
         {t('update_moveit_title')}
       </Text>

       <Text style={[styles.modalText,{fontSize: i18n?.language === 'urdu' ? scale(15) : scale(13),fontFamily: i18n.language === 'urdu' ? jameelNooriNastaleeq : latoRegular}]}>
         {`Current Version: ${currentVersion} \n Update to: ${updatedVersion}`}
       </Text>

       <ButtonComponent
              disabled={false}
              pressStatus={false}
              text={t('update_now')}
              btnStyle={{
                width:"40%",
                height:moderateScale(50),
                borderRadius: moderateScale(100),
                marginVertical: moderateVerticalScale(20),
                backgroundColor: color4E008A,
                alignSelf:"center"
              }}
              textStyle={{fontFamily: i18n.language === 'urdu' ? jameelNooriNastaleeq : latoRegular, fontSize: scale(14) }}
              onPress={() => {
                openStore();
              }}
            />
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
      fontSize: scale(13),
      fontFamily:latoRegular,
      color: '#555',
      textAlign: 'center',
      marginBottom: moderateVerticalScale(10),
      marginHorizontal:moderateScale(20),
    },
  });