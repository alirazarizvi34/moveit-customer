import {View, Text, FlatList, SafeAreaView, BackHandler} from 'react-native';
import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from 'react';
import styles from './styles';
import NewHeader from '../../components/Header/NewHeader';
import {useTranslation} from 'react-i18next';
import RelocationSelectedListItem from '../../components/RelocationSelectedListItem/RelocationSelectedListItem';
import ButtonComponent from '../../components/buttonComp/ButtonComponent';
import {GlobalContext} from '../../../context/GlobalState';
import useRelocationItems from '../../hooks/useRelocationItems';
import LoaderModal from '../../components/Modal/LoaderModal';
import useQuoteUpdate from '../../hooks/useQuoteUpdate';
import {useIsFocused} from '@react-navigation/native';
import AlertModal from '../../components/Modal/AlertModal';
import {colorTheme} from '../../constants/ColorConstants';
import RelocationProgressBar from '../../components/RelocationProgressBar/RelocationProgressBar';
import DeliveryProgressBar from '../DeliveriesFlow/DeliveryProgressBar/DeliveryProgressBar';
import useDeliveryItems from '../../hooks/useDeliveryItems';

const {placeholderText, primaryText} = colorTheme;
const RelocationSelectedItem = ({navigation,route}) => {
  let exitEvent = useRef();
  const {t} = useTranslation();
  // const {} = useQuoteUpdate();
  const isFocused = useIsFocused();
  const {selectedRelocationItems, selectedPropertyType} =
    useContext(GlobalContext);
  const [relocationData, setRelocationData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isItemSelect, setItemSelect] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const previousScreen = route?.params?.previousScreen;
  const {updateStoreItemsHandler, loadingState, setShouldCallApi} = previousScreen == 'delivery' ? useDeliveryItems() : useRelocationItems();

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
  }, [isFocused, navigation, totalItems]);

  useEffect(() => {
    relocationDataHandler();
  }, []);

  useEffect(() => {
    totalItemsCountHandler();
  }, [relocationData]);

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

  const totalItemsCountHandler = () => {
    let count = 0;
    for (let index = 0; index < relocationData.length; index++) {
      const element = relocationData[index];
      count = count + element.item_qty;
    }

    setTotalItems(count);
  };

  const continueButtonDisabledHandler = () => {
    if (isItemSelect) {
      return false;
    } else {
      return true;
    }
  };

  // const re
  const relocationDataHandler = () => {
    const localData = [];

    for (let index = 0; index < selectedRelocationItems.length; index++) {
      const element = selectedRelocationItems[index];

      if (element.item_qty > 0) {
        localData.push(element);
      }
    }
    setRelocationData(localData);
  };

  const increasePressHandler = useCallback(
    currentItem => {
      setItemSelect(true);
      setShouldCallApi(true);
      const localData = [...relocationData];
      const currentItemIndex = localData.findIndex(
        val =>
          val.item_id == currentItem.item_id &&
          val.item_cat_id == currentItem.item_cat_id,
      );
      if (currentItemIndex !== -1) {
        localData[currentItemIndex] = {
          ...localData[currentItemIndex],
          item_qty: localData[currentItemIndex].item_qty + 1,
        };
      }
      setRelocationData(localData);
    },
    [relocationData],
  );

  const onDecreasePressHandler = useCallback(
    currentItem => {
      setItemSelect(true);
      setShouldCallApi(true);
      const localData = [...relocationData];
      const currentItemIndex = localData.findIndex(
        val =>
          val.item_id == currentItem.item_id &&
          val.item_cat_id == currentItem.item_cat_id,
      );
      if (currentItemIndex !== -1) {
        localData[currentItemIndex] = {
          ...localData[currentItemIndex],
          item_qty: localData[currentItemIndex].item_qty - 1,
        };
        if (localData[currentItemIndex].item_qty == 0) {
          localData.splice(currentItemIndex, 1);
        }
      }
      setRelocationData(localData);
    },
    [relocationData],
  );

  const onDeletePressHandler = useCallback(
    currentItem => {
      setItemSelect(true);
      setShouldCallApi(true);
      const localData = [...relocationData];
      const currentItemIndex = localData.findIndex(
        val =>
          val.item_id == currentItem.item_id &&
          val.item_cat_id == currentItem.item_cat_id,
      );
      if (currentItemIndex !== -1) {
        localData.splice(currentItemIndex, 1);
        setRelocationData(localData);
      }
    },
    [relocationData],
  );
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
      {loadingState && <LoaderModal load={loadingState} textShow={false} />}
      {showAlertModal && (
        <AlertModal
          titleColor={primaryText}
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
      <NewHeader
        navigation={navigation}
        title={previousScreen == 'RelocationSpaces' ? t('Added Items') : t('selectedItems')}
        customNavigator={headerNavigationHandler}
      />
         <View style={styles.shadowWrapper}>
          <View style={styles.progressBarContainer}>
            {previousScreen == 'delivery' ? (
           <DeliveryProgressBar progressCount={3} />
            ) : (
            <RelocationProgressBar progressCount={4} />
            )}
 
          </View>
        </View>
      <View style={styles.innerContainer}>
        <View style={styles.topContainer}>
          <View style={styles.topBarContainer}>
            <Text style={styles.totalText}>{t('totalItems')}: </Text>
            <Text style={styles.totalValue}>{totalItems}</Text>
          </View>
        </View>
        <View style={styles.itemListContainer}>
          <FlatList
            data={relocationData}
            renderItem={({item, index}) => (
              <RelocationSelectedListItem
                title={item?.item_name}
                count={item?.item_qty}
                category={item?.item_cat_name}
                isFragile={item?.is_fragile}
                onIncreaseCount={() => increasePressHandler(item)}
                onDeletePress={() => onDeletePressHandler(item)}
                onDecreaseCount={() => onDecreasePressHandler(item)}
                key={index}
              />
            )}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ButtonComponent
            pressStatus={loadingState}
            onPress={() => updateStoreItemsHandler(relocationData)}
            disabled={continueButtonDisabledHandler()}
            text={t('updateList')}
            textStyle={
              continueButtonDisabledHandler()
                ? styles.disabledBtnText
                : styles.btnText
            }
            btnStyle={
              continueButtonDisabledHandler() ? styles.disabledBtn : styles.btn
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RelocationSelectedItem;
