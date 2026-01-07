import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  SafeAreaView,
  BackHandler,
  Keyboard,
} from 'react-native';
import React, {useCallback, useEffect, useState, useRef, useContext} from 'react';
import styles from './styles';
import Header from '../../components/Header/NewHeader';
import {AppImages} from '../../constants/AppImages';
import {useTranslation} from 'react-i18next';

import RelocationItemsDetailListComponent from '../../components/RelocationItemsDetailListComponent/RelocationItemsDetailListComponent';
import ButtonComponent from '../../components/buttonComp/ButtonComponent';
import {colorTheme} from '../../constants/ColorConstants';
import useRelocationItems from '../../hooks/useRelocationItems';
import RelocationDetailListSkeleton from '../../components/RelocationItemsDetailListComponent/RelocationDetailListSkeleton';
import LoaderModal from '../../components/Modal/LoaderModal';
import RelocationProgressBar from '../../components/RelocationProgressBar/RelocationProgressBar';
import useQuoteUpdate from '../../hooks/useQuoteUpdate';
import AlertModal from '../../components/Modal/AlertModal';
import {useIsFocused} from '@react-navigation/native';
import {Shadow} from 'react-native-shadow-2';
import { GlobalContext } from '../../../context/GlobalState';

const {placeholderText, primaryText, defaultText} = colorTheme;
const RelocationItemDetails = ({navigation, route}) => {
  const currentCategoryId = route?.params?.category?.id;
  const currentName = route?.params?.category?.name;
  const currentIcon = route?.params?.category?.icon;
  const isFocused = useIsFocused();
  const {t} = useTranslation();
  const {
    itemFilteredList,
    itemsList,
    itemsLoader,
    loadingState,
    isItemSelect,
    getRelocationCategoriesItemsHandler,
    onItemCountDecreaseHandler,
    onItemCountIncreaseHandler,
    onItemSearchHandler,
    selectedItemsDataOrganizer,
    shouldCallApi,
  } = useRelocationItems();

  const {
    relocationRequest,
    setUpdateItemsApiCall,
  } = useContext(GlobalContext);

  const {} = useQuoteUpdate();
  const [searchText, setSearchText] = useState('');
  const [totalItem, setTotalItem] = useState(0);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  let exitEvent = useRef();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    let beforeRemoveSubscription;
    if (isFocused) {
      beforeRemoveSubscription = navigation.addListener('beforeRemove', e => {
        if (isItemSelect) {
          if (
            e?.data?.action === 'GO_BACK' ||
            e?.data?.action?.type === 'POP'
          ) {
            e.preventDefault();
            exitEvent.current = e;
            setShowAlertModal(true);
          }
        }
      });
      BackHandler.addEventListener(
        'hardwareBackPress',
        headerNavigationHandler,
      );
    } else {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        headerNavigationHandler,
      );
    }
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        headerNavigationHandler,
      );
      beforeRemoveSubscription;
    };
  }, [isFocused, navigation, totalItem]);

  useEffect(() => {
    if (currentCategoryId) {
      getRelocationCategoriesItemsHandler(currentCategoryId);
    }
  }, [currentCategoryId]);

  useEffect(() => {
    totalItemSelectedHandler();
  }, [itemsList]);

  const searchItemHandler = searchValue => {
    setSearchText(searchValue);
    onItemSearchHandler(searchValue);
  };

  const totalItemSelectedHandler = useCallback(() => {
    let count = 0;
    for (let index = 0; index < itemsList.length; index++) {
      const element = itemsList[index];

      if (element.count !== 0) {
        count = count + element.count;
      }
    }
    setTotalItem(count);
  }, [itemsList]);

  const headerNavigationHandler = useCallback(
    key => {
      if (!isItemSelect) {
        navigation.goBack();
        return true;
      }
      setShowAlertModal(true);
      return true;
    },
    [isItemSelect],
  );

  const acceptPressModalHandler = () => {
    if (exitEvent?.current) {
      navigation.dispatch(exitEvent?.current?.data?.action);
    } else {
      navigation.goBack();
    }
    setUpdateItemsApiCall(false);
    setShowAlertModal(false);
  };
  const buttonDisabledHandler = () => {
    if (shouldCallApi) {
      return false;
    }
    if (totalItem > 0) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        title={relocationRequest?.moving_type == 'move_everything' ? t('addMoreItems') : t('chooseYourItems')}
        customNavigator={headerNavigationHandler}
      />
      {loadingState && <LoaderModal load={loadingState} textShow={false} />}
      {showAlertModal && (
        <AlertModal
          titleColor={primaryText}
          loadingState={loadingState}
          visible={showAlertModal}
          loader={loadingState}
          onClose={() => {setShowAlertModal(false)}}
          rejectPress={() => setShowAlertModal(false)}
          acceptPress={() => acceptPressModalHandler()}
          title={t('Are you sure?')}
          description={t(
            'Going back will result in the loss of all your changes. Do you still want to continue?',
          )}
        />
      )}
      <View style={styles.shadowWrapper}>
        <View style={styles.progressContainer}>
          <RelocationProgressBar progressCount={4} />
        </View>
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.topContainer}>
          <View style={styles.iconContainer}>
            <Image
              resizeMode="contain"
              source={{uri: currentIcon}}
              style={styles.icon}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{currentName}</Text>
            <Text style={styles.selectedItem}>{totalItem} items added</Text>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <Image source={AppImages.searchIcon} style={styles.searchIcon} />
          <TextInput
            value={searchText}
            onChangeText={searchItemHandler}
            style={styles.input}
            placeholderTextColor={defaultText}
            placeholder={t('searchItemHere')}
          />
        </View>
        <View style={styles.itemListContainer}>
          {itemsLoader ? (
            <RelocationDetailListSkeleton />
          ) : itemFilteredList.length > 0 ? (
            <FlatList
              data={itemFilteredList}
              renderItem={({item, index}) => (
                <RelocationItemsDetailListComponent
                  onIncreaseCount={() => onItemCountIncreaseHandler(item)}
                  onDecreaseCount={() => onItemCountDecreaseHandler(item)}
                  itemDetail={item}
                  key={index}
                />
              )}
            />
          ) : (
            <Text style={styles.noItemsText}>No Items Found</Text>
          )}
        </View>
      </View>
        {/* {!keyboardVisible && ( */}
          <Shadow
          distance={10}
          offset={[0, 0]}
          sides={{start: true, bottom: false}}
          style={styles.shadowStyle}>
          <View style={styles.buttonContainer}>
            <ButtonComponent
              pressStatus={loadingState}
              onPress={() =>
                selectedItemsDataOrganizer(currentCategoryId, currentName)
              }
              disabled={buttonDisabledHandler()}
              textStyle={styles.btnText}
              text={'Continue'}
            />
          </View>
          </Shadow>
        {/* )} */}
    </SafeAreaView>
  );
};

export default RelocationItemDetails;
