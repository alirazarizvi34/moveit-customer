import React from 'react';
import {Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Block, Text} from 'galio-framework';
import {AppStyle} from '../styles/AppStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default CommonHeader = (props) => {
  const { headerTitle} = AppStyle;

  return (
    <>
      <Block
        flexDirection={'row'}
        space={'between'}
        style={{marginVertical: 10, marginTop: 50, marginHorizontal: 20}}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Block style={{backgroundColor: 'white', borderRadius: 8}}>
            <Icon name="keyboard-arrow-left" size={35} color={'000'} />
          </Block>
        </TouchableOpacity>

        <Block center>
          <Text style={headerTitle}>{props.heading}</Text>
        </Block>
        <Block style={{backgroundColor: 'white', borderRadius: 8}}>
          {props.rightSide ? (
            <Icon name="keyboard-arrow-left" size={35} color={'000'} />
          ) : null}
        </Block>
      </Block>
    </>
  );
};

const styles = EStyleSheet.create({});
