import React from 'react';
import {Image} from 'react-native';
import {Block, Text} from 'galio-framework';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';

export default CargoPoolStepper = (props) => {
  const {t, i18n} = useTranslation();
  const iconAngleDown = <Icon name={'angle-down'} size={16} />;
  const iconAngleDownWhite = (
    <Icon name={'angle-down'} size={16} color={'white'} />
  );

  return (
    <Block
      flexDirection={'row'}
      space={'between'}
      style={{position: 'relative'}}>
      <Block
        style={{
          position: 'absolute',
          zIndex: -2,
          width: '90%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Block
          style={{
            borderBottomWidth: 2,
            borderBottomColor: 'gray',
            width: '90%',
            flex: 1,
            marginTop: 30,
            marginLeft: 10,
          }}></Block>
      </Block>
      <Block center style={{width: '20%'}}>
        {props.stepperCount == 1 ? iconAngleDown : iconAngleDownWhite}
        <Block style={styles.aboveCircle}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('CargoPoolMaps');
            }}>
            <Block
              style={
                props.stepperCount > 1 ? styles.filledCircle : styles.circle
              }>
              {props.stepperCount == 1 ? (
                <Text
                  style={
                    props.stepperCount == 1
                      ? styles.colorPurple
                      : styles.colorWhite
                  }>
                  {' '}
                  1{' '}
                </Text>
              ) : props.stepperCount > 1 ? (
                <Text>
                  <Icon name={'check'} size={14} color={'white'} />
                </Text>
              ) : (
                <Text style={styles.colorPurple}> 1 </Text>
              )}
            </Block>
          </TouchableOpacity>
        </Block>
        <Text style={{color: 'orange', fontSize: 11}}>{t('Delivery To')}</Text>
      </Block>
      <Block center style={{width: '20%'}}>
        {props.stepperCount == 2 ? iconAngleDown : iconAngleDownWhite}
        <Block style={styles.aboveCircle}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ItemType');
            }}>
            <Block
              style={
                props.stepperCount > 2 ? styles.filledCircle : styles.circle
              }>
              {props.stepperCount == 2 ? (
                <Text
                  style={
                    props.stepperCount == 2
                      ? styles.colorPurple
                      : styles.colorWhite
                  }>
                  {' '}
                  2{' '}
                </Text>
              ) : props.stepperCount > 2 ? (
                <Text>
                  <Icon name={'check'} size={14} color={'white'} />
                </Text>
              ) : (
                <Text style={styles.colorPurple}> 2 </Text>
              )}
            </Block>
          </TouchableOpacity>
        </Block>
        <Text style={{color: 'orange', fontSize: 11}}>{t('Item Type')}</Text>
      </Block>
      <Block center style={{width: '20%'}}>
        {props.stepperCount == 3 ? iconAngleDown : iconAngleDownWhite}
        <Block style={styles.aboveCircle}>
          <TouchableOpacity
            onPress={() => {
              if (props.stepperCount >= 4) {
                props.navigation.navigate('ScheduleATrip');
              }
            }}>
            <Block
              style={
                props.stepperCount > 3 ? styles.filledCircle : styles.circle
              }>
              {props.stepperCount == 3 ? (
                <Text
                  style={
                    props.stepperCount == 3
                      ? styles.colorPurple
                      : styles.colorWhite
                  }>
                  {' '}
                  3{' '}
                </Text>
              ) : props.stepperCount > 3 ? (
                <Text>
                  <Icon name={'check'} size={14} color={'white'} />
                </Text>
              ) : (
                <Text style={styles.colorPurple}> 3 </Text>
              )}
            </Block>
          </TouchableOpacity>
        </Block>
        <Text style={{color: 'orange', fontSize: 11}}>{t('Gross Weight')}</Text>
      </Block>
      
    </Block>
  );
};

const styles = EStyleSheet.create({
  aboveCircle: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  circle: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'purple',
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  filledCircle: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#4C1F6B',
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4C1F6B',
  },
  colorWhite: {
    color: 'white',
  },
  colorPurple: {
    color: '#4C1F6B',
  },
});
