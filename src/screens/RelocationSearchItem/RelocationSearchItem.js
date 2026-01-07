import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  FlatList,
  BackHandler,
  Keyboard
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './styles';
import NewHeader from '../../components/Header/NewHeader';
import {useTranslation} from 'react-i18next';
import useRelocationItems from '../../hooks/useRelocationItems';
import {AppImages} from '../../constants/AppImages';
import {colorTheme} from '../../constants/ColorConstants';
import RelocationSelectedListItem from '../../components/RelocationSelectedListItem/RelocationSelectedListItem';
import RelocationDetailListSkeleton from '../../components/RelocationItemsDetailListComponent/RelocationDetailListSkeleton';
import {GlobalContext} from '../../../context/GlobalState';
import ButtonComponent from '../../components/buttonComp';
import {useIsFocused} from '@react-navigation/native';
import AlertModal from '../../components/Modal/AlertModal';
import useDeliveryItems from '../../hooks/useDeliveryItems';

const {placeholderText} = colorTheme;

const RelocationSearchItem = ({navigation}) => {
  const {t} = useTranslation();
  const isFocused = useIsFocused();

  const [searchText, setSearchText] = useState('');
  const {selectedRelocationItems} = useContext(GlobalContext);
  const [keyboardVisible,setKeyboardVisible] = useState(false);
  const {
    searchRequestHandler,
    itemsList,
    loadingState,
    updateStoreItemsHandler,
    setShouldCallApi,
    shouldCallApi,
    itemsLoader,
    setItemsLoader,
  } = useRelocationItems();
  const [localSelectedItem, setlocalSelectedItems] = useState([]);
  const [localItemList, setLocalItemList] = useState([]);
  const [showAlertModal, setShowAlertModal] = useState(false);
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
        if (shouldCallApi) {
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
  }, [isFocused, navigation, shouldCallApi]);

  useEffect(() => {
    const timer = setTimeout(() => onSearchItemHandler(searchText), 2000);
    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    setlocalSelectedItems(selectedRelocationItems);
  }, [selectedRelocationItems]);

  useEffect(() => {
    setLocalItemList(itemsList);
    localDataOrganizer();
  }, [itemsList, localSelectedItem]);

  const headerNavigationHandler = useCallback(
    key => {
      if (!shouldCallApi) {
        navigation.goBack();
        return true;
      }
      setShowAlertModal(true);
      return true;
    },
    [shouldCallApi],
  );

  const onSearchItemHandler = searchText => {
    // setSearchText(searchText)
    searchRequestHandler(searchText);
  };

  const localDataOrganizer = () => {
    const localData = itemsList.map(item => {
      const currenIndex = localSelectedItem.findIndex(
        relItem =>
          relItem.item_id == item.item_id &&
          relItem.item_cat_id == item.item_cat_id,
      );

      if (currenIndex !== -1) {
        return {
          ...item,
          item_qty: localSelectedItem[currenIndex].item_qty,
        };
      } else {
        return {...item, item_qty: 0,is_packing_required: 0};
      }
    });
    setLocalItemList(localData);
  };

  const increasePressHandler = item => {
    setShouldCallApi(true);
    const localItems = [...localSelectedItem];
    const currentItemIndex = localItems.findIndex(
      curentItem =>
        curentItem.item_id == item.item_id &&
        curentItem.item_cat_id == item.item_cat_id,
    );
    if (currentItemIndex !== -1) {
      localItems[currentItemIndex] = {
        ...localItems[currentItemIndex],
        item_qty: localItems[currentItemIndex].item_qty + 1,
      };
    } else {
      localItems.push({...item, item_qty: 1,is_packing_required: 0});
    }
    setlocalSelectedItems(localItems);
  };
  const onDecreasePressHandler = item => {
    setShouldCallApi(true);

    const localItems = [...localSelectedItem];
    const currentItemIndex = localItems.findIndex(
      curentItem =>
        curentItem.item_id == item.item_id &&
        curentItem.item_cat_id == item.item_cat_id,
    );
    if (currentItemIndex !== -1) {
      if (localItems[currentItemIndex].item_qty == 1) {
        localItems.splice(currentItemIndex, 1);
      } else {
        localItems[currentItemIndex] = {
          ...localItems[currentItemIndex],
          item_qty: localItems[currentItemIndex].item_qty - 1,
        };
      }
    }
    setlocalSelectedItems(localItems);
  };

  const onContinuePressHandler = () => {
    updateStoreItemsHandler(localSelectedItem).then(() => {
      //   navigation.goBack();
    });
  };

  const acceptPressModalHandler = () => {
    if (exitEvent?.current) {
      navigation.dispatch(exitEvent?.current?.data?.action);
    } else {
      navigation.goBack();
    }
    setShowAlertModal(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <NewHeader
        customNavigator={headerNavigationHandler}
        title={'Search Results'}
        navigation={navigation}
      />
      {showAlertModal && (
        <AlertModal
          // titleColor={primaryText}
          loadingState={loadingState}
          visible={showAlertModal}
          loader={loadingState}
          onClose={() => setShowAlertModal(false)}
          rejectPress={() => setShowAlertModal(false)}
          acceptPress={() => acceptPressModalHandler()}
          title={t('Are you sure?')}
          description={t(
            'Going back will result in the loss of all your changes. Do you still want to continue?',
          )}
        />
      )}
      <View style={styles.innerContainer}>
        <View style={styles.searchContainer}>
          <Image source={AppImages.searchIcon} style={styles.searchIcon} />
          <TextInput
            value={searchText}
            autoFocus
            onChangeText={text => {
              setItemsLoader(true);
              setSearchText(text);
            }}
            style={styles.input}
            placeholderTextColor={placeholderText}
            placeholder={t('searchItemHere')}
          />
        </View>
        <View style={styles.itemListContainer}>
          {itemsLoader ? (
            <RelocationDetailListSkeleton />
          ) : Array.isArray(localItemList) && localItemList.length >= 1 ? (
            <FlatList
              data={localItemList}
              renderItem={({item, index}) => (
                <RelocationSelectedListItem
                  searchItem
                  title={item?.item_name}
                  count={item?.item_qty}
                  category={item?.item_cat_name}
                  description={item?.item_description}
                  isFragile={item?.is_fragile}
                  onIncreaseCount={() => increasePressHandler(item)}
                  // onDeletePress={() => onDeletePressHandler(item)}
                  onDecreaseCount={() => onDecreasePressHandler(item)}
                  key={index}
                />
              )}
            />
          ) : (
            <View>
              <Text style={styles.noItemText}>No Items Found</Text>
            </View>
          )}
        </View>
        {!keyboardVisible &&  
        <View style={styles.buttonContainer}>
          <ButtonComponent
            pressStatus={loadingState}
            textStyle={styles.btnText}
            disabled={loadingState}
            text={'Continue'}
            onPress={onContinuePressHandler}
          />
        </View>
        }
      </View>
    </SafeAreaView>
  );
};

export default RelocationSearchItem;
