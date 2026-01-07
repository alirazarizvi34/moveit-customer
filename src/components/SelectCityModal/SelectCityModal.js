import {
    View,
    Text,
    Modal,
    Image,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';
  import React, {memo} from 'react';
  import {useTranslation} from 'react-i18next';
  import {moderateScale, moderateVerticalScale, scale} from 'react-native-size-matters';
  import {THEME} from '../../shared/theme';
  import {AppImages} from '../../constants/AppImages';
  import BottomModal from '../Modal/BottomModal';
  import { AppConstants } from '../../constants/AppConstants';
  import { colorTheme } from '../../constants/ColorConstants';
  
  const {primaryText,primaryBackground,defaultBackground} = colorTheme;
  const {latoBold} = THEME.fonts;
  
  const SelectCityModal = ({
    children,
    visible,
    onModalClose,
    small,
    draggable,
    onClose,
    onPress,
    mode,
  }) => {
    const {i18n,t} = useTranslation();
  
    const bgColorHandler = () => {
      if (!mode || mode == 'dark') {
        return primaryBackground;
      } else {
        return defaultBackground;
      }
    };
    const styles = getStyles(i18n.language, small, bgColorHandler);
  
    return (
      <BottomModal
        onClose={onClose}
        draggable={true}
        visible={visible}>
        <View style={styles.modalView}>
        <TouchableOpacity activeOpacity={AppConstants.buttonActiveOpacity} style={styles.buttonView} onPress={()=> onPress('same city')}>            
            <View style={styles.buttonTitleView}>
              <Text style={styles.buttonTitle}>{t('same_city')}</Text>
            </View>
            <View style={styles.rightImageView}>
              <Image source={AppImages.rightArrow} style={styles.rightImage} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={AppConstants.buttonActiveOpacity} style={styles.buttonView} onPress={()=> onPress('other city')}>            
            <View style={styles.buttonTitleView}>
              <Text style={styles.buttonTitle}>{t('other_city')}</Text>
            </View>
            <View style={styles.rightImageView}>
              <Image source={AppImages.rightArrow} style={styles.rightImage} />
            </View>
          </TouchableOpacity>
        </View>
      </BottomModal>
    );
  };
  
  export default memo(SelectCityModal);
  
  const getStyles = (language, small, bgColorHandler) =>
    StyleSheet.create({
      modalView: {
        backgroundColor: bgColorHandler(),
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        alignItems:'center',
        paddingBottom:20,
        paddingTop:45
      },
      buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 12,
        height: moderateScale(82),
        maxWidth:moderateScale(300),
        backgroundColor: defaultBackground,
        marginHorizontal: moderateScale(44),
        // marginTop: moderateVerticalScale(45),
        marginBottom: moderateVerticalScale(20),
        paddingHorizontal: moderateScale(14),
        paddingVertical: moderateVerticalScale(15),
      },
      buttonTitleView: {
        flex: 1,
        justifyContent:'center',
        alignItems:'flex-end'
      },
      buttonTitle: {
        fontSize: scale(20),
        fontFamily: latoBold,
        color: primaryText,
      },
     
      rightImageView: {
        flex: 0.5,
        alignItems: 'center',
        ustifyContent:'center',
      },
      rightImage: {
        width: moderateScale(18),
        height: moderateScale(16),
      },
      
      
    
    });
  