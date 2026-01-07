import React, {useState} from 'react';
import {View, Image, Platform, TouchableOpacity, Text} from 'react-native';
import {AppImages} from '../../constants/AppImages';
import InputTextComponent from '../inputTextComp';
import {moderateScale} from 'react-native-size-matters';
import {getStyles} from './AddressListStyle';
import DottedVerticalLine from './DottedVerticalLine';
import {useTranslation} from 'react-i18next';
import DropPinCount from '../DropPinCount/DropPinCount';
import {THEME} from '../../shared/theme';
import ButtonComponent from '../buttonComp/ButtonComponent';
import {colorTheme} from '../../constants/ColorConstants';

const {colorF6F6F6} = THEME.colors;
const {primaryBackground} = colorTheme;

export default AddressList = ({
  index,
  address,
  arrayLength,
  onPress,
  onPressDelete,
  addressHandler,
  multiDropOff,
}) => {
  const {t, i18n} = useTranslation();
  const styles = getStyles(i18n.language);
  const [selection, setSelection] = useState({start: 0, end: 0}); // This hooks only use for text selection

  //This function use for text selection, because Inputtext long string does not start from begning on android
  const onSelectionChange = ({nativeEvent: {selection, text}}) => {
    if (Platform.OS === 'android') {
      setSelection(selection);
    }
  };

  return (
    <>
      <View style={styles.headingContainer}>
        {address?.type == 'p' ? (
          <Text style={styles.pickUp}>{t('pickup_address')}</Text>
        ) : (
          <>{index < 2 && <Text style={styles.pickUp}>{t('droppoff_address')}</Text>}</>
        )}
      </View>
      <View style={styles.container}>
        <View style={styles.listView}>
          <View
            style={{
              width: moderateScale(18),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {index == 0 ? (
              <Image
                source={AppImages.locationPin}
                style={{width: moderateScale(18), height: moderateScale(20)}}
              />
            ) : (
              <>
              {arrayLength > 2 ? (
                <DropPinCount
                textStyle={styles.dropPinCountTxt}
                style={styles.dropPinCountView}
                number={index}
              />
              ) : (
                <Image
                source={AppImages.dropoffpin}
                style={{ width: 12,
                  height: 20,}}
                 />
              )}
              </>
            
              
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.inputView}
            onPress={addressHandler}>
            <InputTextComponent
              bgColor={colorF6F6F6}
              editable={false}
              value={address?.title}
              onSelectionChange={event => onSelectionChange(event)}
              selection={Platform.OS === 'android' ? selection : null}
              pointerEvents="none"
            />
          </TouchableOpacity>
          <View style={{width: moderateScale(20), height: moderateScale(20)}}>
            {address?.type == 'd' && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onPressDelete(index)}>
                <Image
                  source={AppImages.addressDelete}
                  style={styles.deleteImage}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {index > 0 && index < arrayLength - 1 && (
          <DottedVerticalLine dotCount={3} />
        )}

        {multiDropOff ? (
          //This condition depends on small moves flow
          <>
            {arrayLength === index + 1 && (
              <View style={styles.buttonView}>
                <ButtonComponent
                  disabled={false}
                  icon={{
                    name: 'plus',
                    color: primaryBackground,
                    size: 16,
                  }}
                  text={arrayLength == 1 ? t('add_Drop_off') : t('addMultiple')}
                  btnStyle={styles.btnStyle}
                  textStyle={styles.btnTextStyle}
                  onPress={onPress}
                />
              </View>
            )}
          </>
        ) : (
          //This condition depends on moving/relocation flow
          <>
            {arrayLength === 1 && (
              <View style={styles.buttonView}>
                <ButtonComponent
                  disabled={false}
                  icon={{
                    name: 'plus',
                    color: primaryBackground,
                    size: 16,
                  }}
                  text={t('add_Drop_off')}
                  btnStyle={styles.btnStyle}
                  textStyle={styles.btnTextStyle}
                  onPress={onPress}
                />
              </View>
            )}
          </>
        )}
      </View>
    </>
  );
};
