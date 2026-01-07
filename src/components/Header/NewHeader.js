import React, {memo, useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Text} from 'galio-framework';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {THEME} from '../../shared/theme';
import {useTranslation} from 'react-i18next';
import CancelRideComponent from '../buttonComp/CancelRideComponent';
import {getStyles} from './HeaderStyles';
import {AppImages} from '../../constants/AppImages';

const {PriButtonBgColor} = THEME.colors;
const NewHeader = ({
  title,
  cancelButton,
  screenName,
  skipButton,
  notificationBell,
  noIcons,
  main,
  skipStyle = {},
  customNavigator,
  navigation,
  onRightIconPress,
  rightIcon,
  ...props
}) => {
  const {t, i18n} = useTranslation();
  const [getLoader, setLoader] = useState(false);
  const goBack = () => {
    const canGoBack = navigation?.canGoBack();
    if (canGoBack) {
      navigation.goBack();
    }
  };
  const styles = getStyles(i18n.language, screenName);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.iconContainer}>
        {navigation && !main && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.navigationView}
            onPress={() => {
              customNavigator ? customNavigator() : goBack();
            }}>
            <Icon
              name="keyboard-arrow-left"
              size={30}
              color={PriButtonBgColor}
            />
          </TouchableOpacity>
        )}
        {navigation && main && !noIcons && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            activeOpacity={0.7}
            style={styles.menuIconView}>
            <Image source={AppImages.Menu} style={styles.menuIcon} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.titleContainer}>
        {title ? (
          <Text style={styles.titleStyle}> {title} </Text>
        ) : (
          <Image source={AppImages.MoveItLogo} style={styles.logo} />
        )}
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {cancelButton && (
          <CancelRideComponent
            customNavigator={() => customNavigator('cancel')}
            disabled={false}
            loader={setLoader}
            text={t('cancel')}
            btnStyle={styles.cancelRideComponentBtn}
            textStyle={styles.cancelRideComponentText}
          />
        )}
        {skipButton && (
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.skipStyle}>{t('skip')}</Text>
          </TouchableOpacity>
        )}
        {rightIcon && onRightIconPress && (
          <TouchableOpacity activeOpacity={0.7} onPress={onRightIconPress}>
            <Image style={styles.rightIcon} source={rightIcon} />
          </TouchableOpacity>
        )}
        {/* {notificationBell &&
                    <TouchableOpacity>
                        <Image source={AppImages.NotificationBell} style={styles.notificationIcon} />
                    </TouchableOpacity>
                } */}
      </View>
    </View>
  );
};
export default memo(NewHeader);
