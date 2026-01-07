import React, {useState, useContext} from 'react';
import {
  ScrollView,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {useTranslation} from 'react-i18next';

import {GlobalContext} from '../../context/GlobalState';
import {getStyles} from './ProfileStyles';
import {AppConstants} from '../constants/AppConstants';
import {AppImages} from '../constants/AppImages';
import {version} from '../../package.json'

import toastService from '../services/toast-service';
import useProfile from '../hooks/useProfile';

import LoaderModal from '../components/Modal/LoaderModal';
import NewHeader from '../components/Header/NewHeader';
import AvatarCard from '../components/AvatarCard/AvatarCard';
import SmallButton from '../components/Button/SmallButton';
import ListIconNavigationCard from '../components/ListIconNavigationCard/ListIconNavigationCard';

export default Profile = ({navigation}) => {
  const {t, i18n} = useTranslation();

  const styles = getStyles(i18n.language);

  const {auth} = useContext(GlobalContext);
  const [getLoader, setLoader] = useState(false);

  const {userLogout, changeUserLanguage} = useProfile();

  const onLanguageChangeHandler = value => {
    if (value !== i18n.language) {
      const version = value == 'urdu' ? '1' : '0';
      i18n.changeLanguage(value);
      changeUserLanguage(version);
    }
  };

  const onUpdateProfileClickHandler = () => {
    navigation.navigate('UpdateProfile');
  };

  const onProfileDeleteClickHandler = () => {
    setLoader(true),
      setTimeout(() => {
        setLoader(false);
      }, 1500);
    setTimeout(() => {
      toastService.shortToast(AppConstants.toastMessages.accountDeleteMessage);
    }, 1800);
  };

  const onTermsAndConditionClickHandler = () => {
    Linking.openURL(AppConstants.links.termsAndConditionUrl);
  };

  return (
    <SafeAreaView style={styles.container}>
      {getLoader && <LoaderModal load={getLoader} />}
      <NewHeader
        title={t('settings')}
        notificationBell
        navigation={navigation}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.userInfoContainer}>
          <View style={styles.imageContainer}>
            <AvatarCard
              camera={false}
              onPress={onUpdateProfileClickHandler}
              url={auth?.avatar}
              icon={AppImages.BiddingPlus}
              image={AppImages.Avatar}
              type={auth?.avatar ? 'url' : ''}
            />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoName}> {auth && auth?.name}</Text>
            <Text style={styles.infoNumber}> {auth && auth?.phone}</Text>
          </View>
          <View style={styles.btnContainer}>
            <SmallButton
              onPress={onUpdateProfileClickHandler}
              title={t('update_profile')}
              grey
            />
          </View>
        </View>
        <View style={styles.settingsContainer}>
          <ListIconNavigationCard 
            label={t('book_truck_now')}
            onPress={() =>
              navigation.navigate('MyTrips', {
                params: {activeTab: 'CompleteTrips'},
              })
            }
            icon={AppImages.MapIcon}
          />
          <ListIconNavigationCard
            label={t('relocations')}
            onPress={() =>
              navigation.navigate('MyTrips', {
                params: {activeTab: 'relocation'},
              })
            }
            icon={AppImages.ClockIcon}
          />
          <ListIconNavigationCard
            type={'switch'}
            switchValue={i18n.language}
            setSwitchValue={onLanguageChangeHandler}
            label={t('language')}
            icon={AppImages.Twitch}
          />
          <ListIconNavigationCard
            label={t('terms_and_conditions')}
            icon={AppImages.FileText}
            onPress={onTermsAndConditionClickHandler}
          />
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.logoutButtonContainer}>
            <SmallButton onPress={userLogout} title={t('sign_out')} />
          </View>
          <View style={styles.accountDeleteContainer}>
            <TouchableOpacity
              activeOpacity={AppConstants.buttonActiveOpacity}
              onPress={onProfileDeleteClickHandler}>
              <Text style={styles.accountDeleteText}>
                {t('request_account_delete')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.appVersionContainer}>
            <Text style={styles.appversionText}>
              App Version {version}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};