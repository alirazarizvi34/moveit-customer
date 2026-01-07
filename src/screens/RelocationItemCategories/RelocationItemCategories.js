import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {useTranslation} from 'react-i18next';
import getStyles from './styles';
import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';
import BigCard from '../../components/RelocationItemCategoryCard/BigCard';
import SmallCard from '../../components/RelocationItemCategoryCard/SmallCard';
import ButtonComponent from '../../components/buttonComp/ButtonComponent';
import NewHeader from '../../components/Header/NewHeader';
import RelocationProgressBar from '../../components/RelocationProgressBar/RelocationProgressBar';
import {GlobalContext} from '../../../context/GlobalState';
import useRelocationItems from '../../hooks/useRelocationItems';
import useCancelRelocation from '../../hooks/useCancelRelocation';
import LoaderModal from '../../components/Modal/LoaderModal';
import useQuoteUpdate from '../../hooks/useQuoteUpdate';
import NegotiateAmountModal from '../../components/NegotiateAmountModal/NegotiateAmountModal';
import CancelReasonModal from '../../components/RelocationComponents/RelocationCancelReasonModal/CancelReasonModal';
import {AppImages} from '../../constants/AppImages';
import {AppConstants} from '../../constants/AppConstants';
import {moderateScale} from 'react-native-size-matters';
import ToolTipComponent from '../../components/ToolTipComponent/ToolTipComponent';
import {moderateVerticalScale} from 'react-native-size-matters';
import {Shadow} from 'react-native-shadow-2';
import {useIsFocused} from '@react-navigation/native';

const RelocationItemCategories = ({navigation, route}) => {
  let exitEvent = useRef();
  const {i18n, t} = useTranslation();
  const isFocused = useIsFocused();
  const {cancelRelocationRequest, loadingState} = useCancelRelocation();
  const {} = useQuoteUpdate();
  const {
    selectedRelocationItems,
    selectedPropertyType,
    relocationRequest,
    toolTip,
    setTooltip,
  } = useContext(GlobalContext);
  const {getRelocationSelectedItemsHandler} = useRelocationItems();
  const [relocationCategories, setRelocationCategories] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const isCategoryToolTip = toolTip?.relocationItemCategory?.categoryToolTip;
  const previousScreen = route?.params?.previousScreen;
  const styles = getStyles(i18n.language);

  useEffect(() => {
    let beforeRemoveSubscription;
    if (isFocused) {
      beforeRemoveSubscription = navigation.addListener('beforeRemove', e => {
        if (relocationRequest?.moving_type == 'move_a_few_items') {
          if (
            e?.data?.action === 'GO_BACK' ||
            e?.data?.action?.type === 'POP'
          ) {
            e.preventDefault();
            exitEvent.current = e;
            navigation.navigate('RelocationPropertyDetails');
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
  }, [isFocused, navigation, relocationRequest?.moving_type]);

  useEffect(() => {
    userRelocationHandler();
  }, []);

  useEffect(() => {
    relocationCategoriesCountHandler();
  }, [selectedRelocationItems]);

  const relocationCategoriesCountHandler = useCallback(() => {
    if (!relocationCategories.length) return;

    const arr = relocationCategories;
    arr.forEach((value, index) => {
      // resetting count to prevent duplication
      value.count = 0;
      for (let i = 0; i < selectedRelocationItems.length; i++) {
        const element = selectedRelocationItems[i];
        if (value.id === element.item_cat_id) {
          value.count += element.item_qty;
        }
        arr[index] = value;
      }
    });
    setRelocationCategories([...arr]);
    // clearing memory
    arr.length = 0;
  }, [selectedRelocationItems]);

  const userRelocationHandler = () => {
    let localArray =
      selectedPropertyType?.pickUpPropertyType?.item_categories.map(item => {
        return {...item, moving_type: JSON.parse(item.moving_type)};
      });

    if (previousScreen === 'RelocationSpaces') {
      // Filter categories that include 'move_everything' in moving_type
      localArray = localArray.filter(
        item =>
          Array.isArray(item?.moving_type) &&
          item?.moving_type.includes('move_everything'),
      );
    } else {
      // Filter categories that include 'move_a_few_items' in moving_type
      localArray = localArray.filter(
        item =>
          Array.isArray(item?.moving_type) &&
          item?.moving_type.includes('move_a_few_items'),
      );
    }
    for (let i = 0; i < localArray.length; i++) {
      const value = i % 4 < 2 ? 'big' : 'small';
      localArray[i].value = value;
    }
    setRelocationCategories(localArray);
    getRelocationSelectedItemsHandler(relocationRequest?.id);
  };

  const onCardPressHandler = category => {
    navigation.navigate('RelocationItemDetails', {category: category});
  };
  const renderItemHandler = ({item, index}) => {
    if (item?.value == 'big') {
      return (
        <BigCard
          isTouchDisable={isCategoryToolTip}
          onPress={() => onCardPressHandler(item)}
          categoryData={item}
          key={index}
        />
      );
    } else {
      return (
        <SmallCard
          onPress={() => onCardPressHandler(item)}
          categoryData={item}
          key={index}
        />
      );
    }
  };

  const totalItemsSelectedCountHandler = useCallback(() => {
    let count = 0;
    if (Array.isArray(selectedRelocationItems)) {
      for (let index = 0; index < selectedRelocationItems.length; index++) {
        const element = selectedRelocationItems[index];
        count = count + element.item_qty;
      }
    }
    return count;
  }, [selectedRelocationItems]);

  const headerNavigationHandler = useCallback(
    key => {
      if (key == 'cancel') {
        setShowAlertModal(true);
        return;
      } else {
        if (relocationRequest?.moving_type == 'move_a_few_items') {
          navigation.navigate('RelocationPropertyDetails');
          return true;
        } else {
          navigation.goBack();
          return true;
        }
      }
    },
    [relocationRequest?.moving_type],
  );

  const onModalClosePressHandler = () => {
    setShowAlertModal(false);
    setShowReasonModal(true);
  };

  const toolTipBtnHandler = useCallback(() => {
    setTooltip(pre => ({
      ...pre,
      relocationItemCategory: {
        ...pre.relocationItemCategory,
        categoryToolTip: false,
        isTrue: false,
      },
    }));
  }, [toolTip?.relocationItemCategory]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        {/* {loader && <LoaderModal load={loader}/>} */}
        {(loader || loadingState) && (
          <LoaderModal load={loader || loadingState} textShow={false} />
        )}

        {showAlertModal && (
          <NegotiateAmountModal
            data={relocationRequest}
            onClosePress={onModalClosePressHandler}
            visible={showAlertModal}
            onModalClose={() => setShowAlertModal(false)}
          />
        )}
        {showReasonModal && (
          <CancelReasonModal
            loadingState={loadingState}
            visible={showReasonModal}
            onSubmitPress={reasonIndex =>
              cancelRelocationRequest(relocationRequest?.id, reasonIndex)
            }
            onClose={() => setShowReasonModal(false)}
          />
        )}
        <NewHeader
          title={
            previousScreen === 'RelocationSpaces'
              ? t('addMoreItems')
              : t('chooseYourItems')
          }
          navigation={navigation}
          screenName={'Property Details'}
          cancelButton={true}
          customNavigator={headerNavigationHandler}
        />
        <View style={styles.shadowWrapper}>
          <View style={styles.progressBarContainer}>
            <RelocationProgressBar progressCount={4} />
          </View>
        </View>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>
            {previousScreen === 'RelocationSpaces' ? (`Choose any additional items you'd like to include in your move`) : (`Choose any item you'd like to include in your move`)}
            
          </Text>
        </View>

        <View style={{flex: 1, marginHorizontal: moderateScale(10)}}>
          <ToolTipComponent
            isVisible={isCategoryToolTip}
            contentHeight={170}
            btnText={'Got it!'}
            contentText={AppConstants.relocationItemCategoryTooltipText}
            onPressForward={toolTipBtnHandler}>
            <View
              style={
                isCategoryToolTip
                  ? styles.toolTipView
                  : styles.searchBarMainContainer
              }>
              <View style={styles.searchBarContainer}>
                <TouchableOpacity
                  disabled={isCategoryToolTip}
                  onPress={() => navigation.navigate('RelocationSearchItem')}
                  activeOpacity={AppConstants.buttonActiveOpacity}
                  style={styles.searchBar}>
                  <Image
                    source={AppImages.searchIcon}
                    style={styles.searchIcon}
                  />
                  <Text style={styles.searchText}>{t('searchItemHere')}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={isCategoryToolTip ? styles.categoryToolTipView : null}>
              {isCategoryToolTip && relocationCategories && (
                <FlatList
                  data={relocationCategories.slice(0, 2)}
                  showsVerticalScrollIndicator={false}
                  columnWrapperStyle={styles.listColumns}
                  numColumns={2}
                  renderItem={renderItemHandler}
                />
              )}
            </View>
          </ToolTipComponent>

          <TouchableOpacity
            style={styles.shoppingCardView}
            activeOpacity={0.98}
            onPress={() => navigation.navigate('RelocationSelectedItem',{previousScreen: previousScreen})}>
            <Text
              style={[
                styles.totalItem,
                {
                  left:
                    totalItemsSelectedCountHandler() < 99 &&
                    totalItemsSelectedCountHandler() > 9
                      ? moderateScale(23)
                      : totalItemsSelectedCountHandler() > 99
                      ? moderateScale(20)
                      : moderateScale(25),
                },
              ]}>
              {totalItemsSelectedCountHandler()}
            </Text>
            <Image
              source={AppImages.shoppingCard}
              style={styles.shoppingCardIcon}
            />
          </TouchableOpacity>

          <View style={{paddingHorizontal: moderateScale(13), flex: 1}}>
            {relocationCategories && (
              <FlatList
                data={relocationCategories.slice(isCategoryToolTip ? 2 : 0)}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.listColumns}
                numColumns={2}
                renderItem={renderItemHandler}
                contentContainerStyle={{
                  gap: 12,
                  paddingTop: moderateVerticalScale(15),
                  paddingBottom: moderateVerticalScale(25),
                }}
              />
            )}
          </View>
        </View>

        <Shadow
          distance={10}
          offset={[0, 0]}
          sides={{start: true, bottom: false}}
          style={styles.shadowStyle}>
          <View style={styles.buttonContainer}>
            <ButtonComponent
              textStyle={
                previousScreen === 'RelocationSpaces' &&
                totalItemsSelectedCountHandler() == 0
                  ? styles.spaceBtnText
                  : styles.btnText
              }
              btnStyle={
                previousScreen === 'RelocationSpaces' &&
                totalItemsSelectedCountHandler() == 0 &&
                styles.btnStyle
              }
              disabled={
                totalItemsSelectedCountHandler() > 0 ||
                previousScreen === 'RelocationSpaces'
                  ? false
                  : true
              }
              onPress={() =>
                navigation.navigate('RelocationAdditionalServices', {
                  previousScreen: previousScreen,
                })
              }
              text={
                (previousScreen === 'RelocationSpaces' &&
                totalItemsSelectedCountHandler() == 0)
                  ? 'Skip'
                  : 'Continue'
              }
            />
          </View>
        </Shadow>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default RelocationItemCategories;
