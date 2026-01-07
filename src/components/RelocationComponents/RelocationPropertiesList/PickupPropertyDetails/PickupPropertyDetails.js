import React, {useContext, useState, memo, useRef, useCallback} from 'react';
import {Text, View, ScrollView, TextInput, FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';
import {GlobalContext} from '../../../../../context/GlobalState';
import {getStyles} from './styles';
import RelocationPropertiesList from '../../../../components/RelocationComponents/RelocationPropertiesList/RelocationPropertiesList';
import HousePropertyType from '../../../../components/RelocationComponents/RelocationPropertiesList/PropertyTypes/HousePropertyType';
import ApartmentPropertyType from '../../../../components/RelocationComponents/RelocationPropertiesList/PropertyTypes/ApartmentPropertyType';
import OfficePropertyType from '../../../../components/RelocationComponents/RelocationPropertiesList/PropertyTypes/OfficePropertyType';
import OtherPropertyType from '../../../../components/RelocationComponents/RelocationPropertiesList/PropertyTypes/OtherPropertyType';
import ButtonComponent from '../../../buttonComp/ButtonComponent';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {colorTheme} from '../../../../constants/ColorConstants';
import RelocationPropertiesSkeleton from '../RelocationPropertiesSkeleton';
import PropertyTypeSkeleon from '../PropertyTypes/PropertyTypeSkeleon';
import AlertModal from '../../../Modal/AlertModal';
import {Form, Formik, useFormik} from 'formik';
import * as Yup from 'yup';
import ToolTipComponent from '../../../ToolTipComponent/ToolTipComponent';
import { AppConstants } from '../../../../constants/AppConstants';

const {
  primaryText,
  lightGrayBorder,
  secondaryBorder,
  defaultBackground,
  placeholderText,
  errorText,
  toolTipInfoBackground,
} = colorTheme;

const PickupPropertyDetails = ({
  onPress,
  loader,
  data,
  pickUpTitle,
  setShouldCallApi,
  shouldCallApi,
}) => {
  const {
    bootMeUpData,
    selectedPropertyType,
    setSelectedPropertyType,
    selectedPickupPproTypeindex,
    setPickupPproTypeindex,
    setEnableSegmentTab,
    isEnableSegmentTab,
    relocationRequest,
    setRelocationRequest,
    setShouldCallRelocationRequest,
    toolTip,
    setTooltip,
  } = useContext(GlobalContext);
  const {t, i18n} = useTranslation();
  const excludedNames = ["delivery", "deliveries"];
  const scrollViewRef = useRef(null);
  const flatListRef = useRef(null);
  const otherDiscriptionRef = useRef(null);
  const [isWarning, setWarning] = useState(false);
  const [clickPropertyType, setclickPropertyType] = useState(null);
  const isAddressTooltip = toolTip?.pickupPropertyDetails?.addressToolTip;
  const isPropertyToolTip = toolTip?.pickupPropertyDetails?.propertyToolTip;
  const toolTipStepCount = toolTip?.pickupPropertyDetails?.stepCount;
  const styles = getStyles({language: i18n.language});
  const initialValues = {
    pickUpAddress: pickUpTitle, // Default value
  };

  const validationSchema = Yup.object().shape({
    pickUpAddress: Yup.string()
      .max(200, 'Character limit exceeds 200')
      .label('Pick-up Address')
      .required('Pick-up address is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    //enableReinitialize Control whether Formik should reset the form if initialValues changes
  });

  const {values, touched, errors, handleChange, handleBlur} = formik;

  const scrollToSelectedItem = () => {
    if (flatListRef.current && selectedPickupPproTypeindex !== undefined) {
      flatListRef.current.scrollToIndex({
        index: selectedPickupPproTypeindex,
        animated: true,
      });
    }
  };

  const selectedPropertyTypeHandler = useCallback(
    (item, index) => {
      if (
        relocationRequest?.p_prop_details &&
        Object.keys(relocationRequest?.p_prop_details).length > 1
      ) {
        if (item?.id != selectedPropertyType?.pickUpPropertyType?.id) {
          setWarning(true);
          setclickPropertyType(item);
          setPickupPproTypeindex(index);
        }
      } else {
        setPickupPproTypeindex(index);
        setSelectedPropertyType(pre => ({
          ...pre,
          pickUpPropertyType: {...item},
        }));
        setRelocationRequest(pre => ({
          ...pre,
          p_prop_details: {relocation_category_id: item?.id},
        }));
      }
      // scrollToBottomHandler();
    },

    [
      relocationRequest?.p_prop_details,
      selectedPropertyType?.pickUpPropertyType?.id,
    ],
  );

  const handleHouseType = useCallback(
    type => {
      setRelocationRequest(pre => ({
        ...pre,
        p_prop_details: {
          ...pre.p_prop_details,
          selectedHouseType: type,
        },
      }));
      if (!shouldCallApi) {
        setShouldCallApi(true);
        setShouldCallRelocationRequest(true);
      }
    },
    [relocationRequest?.p_prop_details, !shouldCallApi],
  );

  const increment = useCallback(
    propertyType => {
      if (!shouldCallApi) {
        setShouldCallApi(true);
        setShouldCallRelocationRequest(true);
      }
        setRelocationRequest(pre => ({
          ...pre,
          p_prop_details: {
            ...pre.p_prop_details,
            floor_no: relocationRequest?.p_prop_details?.floor_no
              ? relocationRequest?.p_prop_details?.floor_no <
                bootMeUpData?.max_floors
                ? relocationRequest?.p_prop_details?.floor_no + 1
                : relocationRequest?.p_prop_details?.floor_no
              : 1,
          },
        }));
    },
    [relocationRequest?.p_prop_details, !shouldCallApi],
  );

  const decrement = useCallback(
    propertyType => {
      if (!shouldCallApi) {
        setShouldCallApi(true);
        setShouldCallRelocationRequest(true);
      }
        setRelocationRequest(pre => ({
          ...pre,
          p_prop_details: {
            ...pre.p_prop_details,
            floor_no: relocationRequest?.p_prop_details?.floor_no
              ? relocationRequest?.p_prop_details?.floor_no - 1
              : 0,
          },
        }));
    },
    [relocationRequest?.p_prop_details, !shouldCallApi],
  );

  const cargoLiftButtonsHandler = useCallback(
    value => {
      scrollToBottomHandler();
      setRelocationRequest(pre => ({
        ...pre,
        p_prop_details: {
          ...pre.p_prop_details,
          is_cargo_available: value,
          floor_no: relocationRequest?.p_prop_details?.floor_no
            ? relocationRequest?.p_prop_details?.floor_no
            : 0,
        },
      }));
      if (!shouldCallApi) {
        setShouldCallRelocationRequest(true);
        setShouldCallApi(true);
      }
      // scrollToBottomHandler();
    },
    [relocationRequest?.p_prop_details, !shouldCallApi],
  );

  const handleArea = useCallback(text => {
    if (text == '') {
      setEnableSegmentTab(false);
    }
    setRelocationRequest(pre => ({
      ...pre,
      p_prop_details: {
        ...pre.p_prop_details,
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
      p_prop_details: {
        ...pre.p_prop_details,
        other_discription: text,
      },
    }));
    if (!shouldCallApi) {
      setShouldCallApi(true);
      setShouldCallRelocationRequest(true);
    }
  };

  const continueBtnHandler = () => {
    if (!values?.pickUpAddress) {
      formik.setErrors({pickUpAddress: 'Please enter pick-up address'});
      return;
    }
    relocationRequest.pickup_address = values?.pickUpAddress;
    setRelocationRequest(relocationRequest);
    onPress('Pickup');
  };

  const dropDownHandler = item => {
    if (!shouldCallApi) {
      setShouldCallApi(true);
      setShouldCallRelocationRequest(true);
    }
    if (item?.propertyType == 'House') {
      setRelocationRequest(pre => ({
        ...pre,
        p_prop_details: {...pre.p_prop_details, houseSize: item?.value},
      }));
    } else {
      setRelocationRequest(pre => ({
        ...pre,
        p_prop_details: {...pre.p_prop_details, apartmentSize: item?.value},
      }));
    }
  };

  const removePropertyTypeValueHandler = () => {
    setEnableSegmentTab(false);
    setSelectedPropertyType(pre => ({
      ...pre,
      pickUpPropertyType: {...clickPropertyType},
    }));
    setRelocationRequest(pre => ({
      ...pre,
      p_prop_details: {relocation_category_id: clickPropertyType?.id},
    }));
    setWarning(false);
  };

  const onChangePickUpTextHandler = text => {
    if (text !== values?.pickUpAddress) {
      setShouldCallApi(true);
    }
    handleChange('pickUpAddress')(text);
  };

  const scrollToBottomHandler = () => {
    try {
      if (scrollViewRef?.current) {
        const timeoutId =  setTimeout(() => {
          scrollViewRef?.current.scrollToEnd({
            x: 0,
            y: 0,
            animated: true,
          });
        }, 0);
        return () => {
          clearTimeout(timeoutId);
        };
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
          pickupPropertyDetails: {...pre.pickupPropertyDetails, addressToolTip: false, propertyToolTip : true , stepCount: 2},
        }));
      }else{
        setTooltip(pre => ({
          ...pre,
          pickupPropertyDetails: {...pre.pickupPropertyDetails, propertyToolTip : false , isTrue: false},
        }));
      }
    },
    [toolTip?.pickupPropertyDetails],
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
            isVisible={isAddressTooltip}
            contentHeight={155}
            contentText={AppConstants.pickupPropertyDetailAddressTooltipText}
            hasSteps={true}
            stepCounter={`${toolTipStepCount}/2`}
            onPressForward = {()=> toolTipBtnHandler('address')}
            >
              <View style={[styles.addressListContainer,isAddressTooltip && styles.toolTipAddressListContainer,]}>
            <Text style={styles.address}>Address</Text>
            <View style={styles.inpuTextView}>
              <TextInput
                editable={isAddressTooltip ? false : true}
                placeholder="Please enter pick-up address"
                placeholderTextColor={placeholderText}
                multiline={true}
                defaultValue={pickUpTitle}
                onBlur={handleBlur('pickUpAddress')}
                onChangeText={onChangePickUpTextHandler}
                numberOfLines={10}
                returnKeyType="done"
                style={styles.TextInput}
              />
            </View>
            {errors.pickUpAddress || touched.pickUpAddress ? (
              <Text style={styles.errorText}>{t(errors?.pickUpAddress)}</Text>
            ) : null}
             </View>
            
            </ToolTipComponent>

            <ToolTipComponent
            isVisible={isPropertyToolTip}
            contentHeight={148}
            contentText={AppConstants.pickupPropertyDetailPropertyTypeTooltipText}
            placement='top'
            hasSteps={true}
            stepCounter={`${toolTipStepCount}/2`}
            btnText={'Got it!'}
            onPressForward = {()=> toolTipBtnHandler('propertyType')}
            >
            <View style={[styles.propertyTypesView,isPropertyToolTip && styles.toolTipAddressListContainer]}>
              <Text style={styles.propertyTypes}>Property Type</Text>
              <Text style={styles.propertyTypesSubTitle}>
              Please select your pickup property
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
                          selectedPropertyType?.pickUpPropertyType?.name
                        }
                        isTouchDisable={isPropertyToolTip}
                        onPress={selectedPropertyTypeHandler}
                      />
                    )}
                    keyExtractor={item => item?.id}
                    onLayout={scrollToSelectedItem}
                    extradata={selectedPropertyType?.pickUpPropertyType?.name}
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
                {selectedPropertyType?.pickUpPropertyType?.name === 'House' && (
                  <HousePropertyType
                    onOpenHandler={scrollToBottomHandler}
                    selectedHouseSize={
                      relocationRequest?.p_prop_details?.houseSize
                    }
                    selectedHouseType={
                      relocationRequest?.p_prop_details?.selectedHouseType
                    }
                    roomsCount={
                      relocationRequest?.p_prop_details?.roomsCount
                        ? relocationRequest?.p_prop_details?.roomsCount
                        : 0
                    }
                    handleHouseType={handleHouseType}
                    onChangeValue={value =>
                      dropDownHandler({propertyType: 'House', value: value})
                    }
                    setEnable={setEnableSegmentTab}
                  />
                )}
                {selectedPropertyType?.pickUpPropertyType?.name ===
                  'Apartment' && (
                  <ApartmentPropertyType
                    onOpenHandler={scrollToBottomHandler}
                    selectedApartmentSize={
                      relocationRequest?.p_prop_details?.apartmentSize
                    }
                    floor_no={
                      relocationRequest?.p_prop_details?.floor_no
                        ? relocationRequest?.p_prop_details?.floor_no
                        : 'G'
                    }
                    cargoAvailable={
                      relocationRequest?.p_prop_details?.is_cargo_available
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
                {selectedPropertyType?.pickUpPropertyType?.name ===
                  'Office' && (
                  <OfficePropertyType
                    floor_no={
                      relocationRequest?.p_prop_details?.floor_no
                        ? relocationRequest?.p_prop_details?.floor_no
                        : 'G'
                    }
                    areaValue={relocationRequest?.p_prop_details?.area}
                    cargoAvailable={
                      relocationRequest?.p_prop_details?.is_cargo_available
                    }
                    decrement={() => decrement('Office')}
                    increment={() => increment('Office')}
                    handleArea={text => handleArea(text)}
                    cargoLiftButtonsHandler={cargoLiftButtonsHandler}
                    setEnable={setEnableSegmentTab}
                  />
                )}
                {selectedPropertyType?.pickUpPropertyType?.name ===
                  'Others' && (
                  <OtherPropertyType
                    value={relocationRequest?.p_prop_details?.other_discription}
                    discriptionRef={otherDiscriptionRef}
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
              btnStyle={{
                backgroundColor: isEnableSegmentTab ? '#4E008A' : '#C9C9C9',
              }}
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

export default memo(PickupPropertyDetails);
