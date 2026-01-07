import React from 'react';
import { Block, Text } from 'galio-framework';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';

export default Stepper = (props) => {
  const iconAngleDown = <Icon name={'angle-down'} size={16} />;
  const iconAngleDownWhite = (
    <Icon name={'angle-down'} size={16} color={'white'} />
  );
  const {t, i18n} = useTranslation();

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
              props.navigation.navigate('MapScreen');
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
        <Text style={{color: 'orange', fontSize: 11}}>{t('Delivery To')} </Text>
      </Block>
      <Block center style={{width: '20%'}}>
        {props.stepperCount == 2 ? iconAngleDown : iconAngleDownWhite}
        <Block style={styles.aboveCircle}>
          <TouchableOpacity>
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
        <Text style={{color: 'orange', fontSize: 11}}>{t('Item Detail')}</Text>
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
        <Text style={{color: 'orange', fontSize: 11}}>{t('Schedule')} </Text>
      </Block>
      <Block center style={{width: '20%'}}>
        {props.stepperCount == 4 ? iconAngleDown : iconAngleDownWhite}

        <Block style={styles.aboveCircle}>
          <TouchableOpacity
            onPress={() => {
              if (props.stepperCount >= 4) {
                props.navigation.navigate('VehicleSelection');
              }
            }}>
            <Block
              style={
                props.stepperCount > 4 ? styles.filledCircle : styles.circle
              }>
              {props.stepperCount == 4 ? (
                <Text
                  style={
                    props.stepperCount == 4
                      ? styles.colorPurple
                      : styles.colorWhite
                  }>
                  {' '}
                  4{' '}
                </Text>
              ) : props.stepperCount > 4 ? (
                <Text>
                  <Icon name={'check'} size={14} color={'white'} />
                </Text>
              ) : (
                <Text style={styles.colorPurple}> 4 </Text>
              )}
            </Block>
          </TouchableOpacity>
        </Block>

        <Text style={{color: 'orange', fontSize: 11}}>{t('Vehicle')} </Text>
      </Block>
      <Block center style={{width: '20%'}}>
        {props.stepperCount == 5 ? iconAngleDown : iconAngleDownWhite}
        <Block style={styles.aboveCircle}>
          <TouchableOpacity
            onPress={() => {
              if (props.stepperCount >= 5) {
                props.navigation.navigate('BookingConfirmation');
              }
            }}>
            <Block
              style={
                props.stepperCount > 5 ? styles.filledCircle : styles.circle
              }>
              {props.stepperCount == 5 ? (
                <Text
                  style={
                    props.stepperCount == 5
                      ? styles.colorPurple
                      : styles.colorWhite
                  }>
                  {' '}
                  5{' '}
                </Text>
              ) : props.stepperCount > 5 ? (
                <Text>
                  <Icon name={'check'} size={14} color={'white'} />
                </Text>
              ) : (
                <Text style={styles.colorPurple}> 5 </Text>
              )}
            </Block>
          </TouchableOpacity>
        </Block>
        <Text style={{color: 'orange', fontSize: 10}}>
          {t('Confirmation')}{' '}
        </Text>
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
