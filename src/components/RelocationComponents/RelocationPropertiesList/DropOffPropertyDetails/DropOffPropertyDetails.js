import React, {useContext, useState, memo, useRef, useCallback, useEffect} from 'react';
import {Text, View, ScrollView, TextInput, FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';
import {GlobalContext} from '../../../../../context/GlobalState';
import {getStyles} from './styles';
import RelocationPropertiesList from '../../../../components/RelocationComponents/RelocationPropertiesList/RelocationPropertiesList';
import ApartmentPropertyType from '../../../../components/RelocationComponents/RelocationPropertiesList/PropertyTypes/ApartmentPropertyType';
import OfficePropertyType from '../../../../components/RelocationComponents/RelocationPropertiesList/PropertyTypes/OfficePropertyType';
import OtherPropertyType from '../../../../components/RelocationComponents/RelocationPropertiesList/PropertyTypes/OtherPropertyType';
import ButtonComponent from '../../../buttonComp/ButtonComponent';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {colorTheme} from '../../../../constants/ColorConstants';
import RelocationPropertiesSkeleton from '../RelocationPropertiesSkeleton';
import PropertyTypeSkeleon from '../PropertyTypes/PropertyTypeSkeleon';
import AlertModal from '../../../Modal/AlertModal';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import ToolTipComponent from '../../../ToolTipComponent/ToolTipComponent';
import { AppConstants } from '../../../../constants/AppConstants';

const {placeholderText, errorText} = colorTheme;
const DropOffPropertyDetails = ({
  onPress,
  loader,
  data,
  dropOffTitle,
  setShouldCallApi,
  shouldCallApi,
}) => {
  const {
    bootMeUpData,
    selectedPropertyType,
    setSelectedPropertyType,
    selectedDropoffPproTypeindex,
    setDropoffPproTypeindex,
    setShouldCallRelocationRequest,
    relocationRequest,
    setRelocationRequest,
    isEnableSegmentTab,
    setEnableSegmentTab,
    toolTip,
    setTooltip,
  } = useContext(GlobalContext);
  const {t, i18n} = useTranslation();
  const excludedNames = ["delivery", "deliveries"];
  const flatListRef = useRef(null);
  const scrollViewRef = useRef(null);
  const otherPickupDisRef = useRef(null);
  const [isWarning, setWarning] = useState(false);
  const [clickPropertyType, setclickPropertyType] = useState(null);
  const isPropertyToolTip = toolTip?.dropOffPropertyDetails?.propertyToolTip;
  const toolTipStepCount = toolTip?.dropOffPropertyDetails?.stepCount;
  const styles = getStyles({language: i18n.language});

  const scrollToSelectedItem = () => {
    if (flatListRef.current && selectedDropoffPproTypeindex !== undefined) {
      flatListRef.current.scrollToIndex({
        index: selectedDropoffPproTypeindex,
        animated: true,
      });
    }
  };

  const selectedPropertyTypeHandler = useCallback(
    (item, index) => {
      const isDifferentPropertyType =
        item?.id !== selectedPropertyType?.dropOffPropertyType?.id;
      const isRelocationDetailsMoreThanOne =
        relocationRequest?.d_prop_details &&
        Object.keys(relocationRequest?.d_prop_details).length > 1;
  
      if (isRelocationDetailsMoreThanOne && isDifferentPropertyType) {
        // if (item?.name === 'House') setShouldCallApi(true);
        setWarning(true);
        setclickPropertyType(item);
        setDropoffPproTypeindex(index);
      } else {
        setEnableSegmentTab(item?.name === 'House');
        setDropoffPproTypeindex(index);
        setSelectedPropertyType(prev => ({
          ...prev,
          dropOffPropertyType: { ...item },
        }));
        setRelocationRequest(prev => ({
          ...prev,
          d_prop_details: { relocation_category_id: item?.id },
        }));
      }
    },
    [relocationRequest?.d_prop_details, selectedPropertyType?.dropOffPropertyType?.id],
  );

  const increment = useCallback(
    propertyType => {
      if (!shouldCallApi) {
        setShouldCallApi(true);
        setShouldCallRelocationRequest(true);
      }
        setRelocationRequest(pre => ({
          ...pre,
          d_prop_details: {
            ...pre.d_prop_details,
            floor_no: relocationRequest?.d_prop_details?.floor_no
              ? relocationRequest?.d_prop_details?.floor_no <
                bootMeUpData?.max_floors
                ? relocationRequest?.d_prop_details?.floor_no + 1
                : relocationRequest?.d_prop_details?.floor_no
              : 1,
          },
        }));
    },
    [relocationRequest?.d_prop_details, !shouldCallApi],
  );

  const decrement = useCallback(
    propertyType => {
      if (!shouldCallApi) {
        setShouldCallApi(true);
        setShouldCallRelocationRequest(true);
      }
        setRelocationRequest(pre => ({
          ...pre,
          d_prop_details: {
            ...pre.d_prop_details,
            floor_no: relocationRequest?.d_prop_details?.floor_no
              ? relocationRequest?.d_prop_details?.floor_no - 1
              : 0,
          },
        }));
    },
    [relocationRequest?.d_prop_details, !shouldCallApi],
  );

  const cargoLiftButtonsHandler = useCallback(
    value => {
      setRelocationRequest(pre => ({
        ...pre,
        d_prop_details: {
          ...pre.d_prop_details,
          is_cargo_available: value,
          floor_no: relocationRequest?.d_prop_details?.floor_no
            ? relocationRequest?.d_prop_details?.floor_no
            : 0,
        },
      }));
      if (!shouldCallApi) {
        setShouldCallRelocationRequest(true);
        setShouldCallApi(true);
      }
    },
    [relocationRequest?.d_prop_details, !shouldCallApi],
  );

  const handleArea = useCallback(text => {
    if (text == '') {
      setEnableSegmentTab(false);
    }
    setRelocationRequest(pre => ({
      ...pre,
      d_prop_details: {
        ...pre.d_prop_details,
        area: text,
      },
    }));
  }, []);

  const handleOtherDiscription = text => {
    if (text == '') {
      setEnableSegmentTab(false);
    }
    setRelocationRequest(pre => ({
      ...pre,
      d_prop_details: {
        ...pre.d_prop_details,
        other_discription: text,
      },
    }));
    if (!shouldCallApi) {
      setShouldCallApi(true);
      setShouldCallRelocationRequest(true);
    }
  };

  const continueBtnHandler = () => {
    onPress('Dropoff');
  };

  const dropDownHandler = item => {
    if (!shouldCallApi) {
      setShouldCallApi(true);
      setShouldCallRelocationRequest(true);
    }
      setRelocationRequest(pre => ({
        ...pre,
        d_prop_details: {...pre.d_prop_details, apartmentSize: item?.value},
      }));
  };

  const removePropertyTypeValueHandler = () => { 
    setEnableSegmentTab(clickPropertyType?.name == 'House' ? true : false);
    setShouldCallApi(clickPropertyType?.name === 'House');
    setSelectedPropertyType(pre => ({
      ...pre,
      dropOffPropertyType: {...clickPropertyType},
    }));
    setRelocationRequest(pre => ({
      ...pre,
      d_prop_details: {relocation_category_id: clickPropertyType?.id},
    }));
    setWarning(false);
  };

  const scrollToBottomHandler = () => {
    try {
      if (scrollViewRef?.current) {
        scrollViewRef?.current.scrollToEnd({
          animated: true,
        });
      }
    } catch (err) {
      console.log('this is error on scroll handler========', err);
    }
  };
  

  const toolTipBtnHandler = useCallback(
    (stepName) => {
      if(stepName == 'address'){
        setTooltip(pre => ({
          ...pre,
          dropOffPropertyDetails: {...pre.dropOffPropertyDetails, addressToolTip: false, propertyToolTip : true , stepCount: 2},
        }));
      }else{
        setTooltip(pre => ({
          ...pre,
          dropOffPropertyDetails: {...pre.dropOffPropertyDetails, propertyToolTip : false , isTrue: false},
        }));
      }
    },
    [toolTip?.dropOffPropertyDetails],
  );

  return (
    <React.Fragment>
      <View style={styles.containerView}>
        <ScrollView
          ref={scrollViewRef}
          scrollEnabled={true}
          nestedScrollEnabled={true}
          contentContainerStyle={{paddingVertical: moderateVerticalScale(10)}}
          >
          <View style={styles.view}>
            <ToolTipComponent
            isVisible={isPropertyToolTip}
            contentHeight={148}
            contentText={AppConstants.dropOffPropertyDetailPropertyTypeTooltipText}
            placement='top'
            hasSteps={true}
            stepCounter={`${toolTipStepCount}/2`}
            btnText={'Got it!'}
            onPressForward = {()=> toolTipBtnHandler('propertyType')}
            >
            <View style={[styles.propertyTypesView,isPropertyToolTip && styles.toolTipAddressListContainer]}>
              <Text style={styles.propertyTypes}>Property Type</Text>
              <Text style={styles.propertyTypesSubTitle}>
              Please select your drop-off property
              </Text>
              <View style={styles.flatListContainer}>
                {data ? (
                  <FlatList
                    ref={flatListRef}
                    horizontal
                    data={data.filter(item => !excludedNames.includes(item.name.toLowerCase()))}
                    nestedScrollEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => (
                      <View style={{width: moderateScale(8)}} />
                    )}
                    renderItem={({item, index}) => (
                      <RelocationPropertiesList
                        key={index}
                        index={index}
                        item={item}
                        selectedId={
                          selectedPropertyType?.dropOffPropertyType?.name
                        }
                        isTouchDisable={isPropertyToolTip}
                        onPress={selectedPropertyTypeHandler}
                      />
                    )}
                    keyExtractor={item => item?.id}
                    onLayout={scrollToSelectedItem}
                    extradata={selectedPropertyType?.dropOffPropertyType?.name}
                    onScrollToIndexFailed={({index}) => {
                      flatListRef.current?.scrollToOffset({
                        offset: index * 1000,
                        animated: true,
                      });
                      const wait = new Promise(resolve =>
                        setTimeout(resolve, 500),
                      );
                      wait.then(() => {
                        flatListRef.current?.scrollToIndex({
                          index,
                          animated: true,
                        });
                      });
                    }}
                  />
                ) : (
                  <RelocationPropertiesSkeleton />
                )}
              </View>
            </View>
            </ToolTipComponent>
          </View>
          <View style={styles.horizontalLineView}>
            <View style={styles.horizontalLine} />
          </View>
          <View style={styles.propertyTypeView}>
            {data ? (
              <>
                {selectedPropertyType?.dropOffPropertyType?.name ===
                  'Apartment' && (
                  <ApartmentPropertyType
                    apartmentSize={false}
                    onOpenHandler={scrollToBottomHandler}
                    selectedApartmentSize={
                      relocationRequest?.d_prop_details?.apartmentSize
                    }
                    floor_no={
                      relocationRequest?.d_prop_details?.floor_no
                        ? relocationRequest?.d_prop_details?.floor_no
                        : 'G'
                    }
                    cargoAvailable={
                      relocationRequest?.d_prop_details?.is_cargo_available
                    }
                    decrement={() => decrement()}
                    increment={() => increment()}
                    cargoLiftButtonsHandler={cargoLiftButtonsHandler}
                    onChangeValue={value =>
                      dropDownHandler({propertyType: 'apartment', value: value})
                    }
                    setEnable={setEnableSegmentTab}
                  />
                )}
                {selectedPropertyType?.dropOffPropertyType?.name ===
                  'Office' && (
                  <OfficePropertyType
                    floor_no={
                      relocationRequest?.d_prop_details?.floor_no
                        ? relocationRequest?.d_prop_details?.floor_no
                        : 'G'
                    }
                    areaValue={relocationRequest?.d_prop_details?.area}
                    cargoAvailable={
                      relocationRequest?.d_prop_details?.is_cargo_available
                    }
                    decrement={() => decrement('Office')}
                    increment={() => increment('Office')}
                    handleArea={text => handleArea(text)}
                    cargoLiftButtonsHandler={cargoLiftButtonsHandler}
                    setEnable={setEnableSegmentTab}
                  />
                )}
                {selectedPropertyType?.dropOffPropertyType?.name ===
                  'Others' && (
                  <OtherPropertyType
                    value={relocationRequest?.d_prop_details?.other_discription}
                    discriptionRef={otherPickupDisRef}
                    handleOtherDiscription={text =>
                      handleOtherDiscription(text)
                    }
                    setEnable={setEnableSegmentTab}
                  />
                )}
              </>
            ) : (
              <PropertyTypeSkeleon />
            )}
          </View>
         
        </ScrollView>
        <View style={styles.butonContainer}>
            <ButtonComponent
              disabled={isEnableSegmentTab ? false : true}
              pressStatus={loader}
              text={'Continue'}
              btnStyle={{backgroundColor: isEnableSegmentTab ? '#4E008A' : '#C9C9C9'}}
              textStyle={styles.btnTextStyle}
              onPress={continueBtnHandler}
            />
          </View>
      </View>
      <AlertModal
        title={t('Warning')}
        titleColor={errorText}
        description={t(
          'Changing the property type will clear your selections. Are you sure you want to proceed?',
        )}
        onClose={() => setWarning(false)}
        visible={isWarning}
        acceptPress={removePropertyTypeValueHandler}
        rejectPress={() => setWarning(false)}
      />
    </React.Fragment>
  );
};

export default memo(DropOffPropertyDetails);
