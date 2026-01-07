import React from 'react';
import {TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Block, Text} from 'galio-framework';
import {AppStyle} from '../../styles/AppStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LinearGradient from 'react-native-linear-gradient';

function HeaderBack({navigation, heading}) {
    const {w100, py20, headerTitle, primaryColor} = AppStyle;
    const {headerIcon, spaceAround, whiteBox} = styles;
    return(
        <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#633C7D', '#4D226D',]}
            >
        <Block flexDirection={'row'} space={'between'} style={[w100, py20, spaceAround , {flexDirection: 'row'}]}>
            <Block style={[whiteBox,]} left={true} center>
                <TouchableOpacity onPress={() => {navigation.goBack()}}>
               <Icon name="keyboard-arrow-left" style={[headerIcon, primaryColor]} />
               </TouchableOpacity>
            </Block>
            <Block  center>
                <Text style={headerTitle}>{heading}</Text>
            </Block>
            <Block right={true}>
              
            </Block>
        </Block>
        </LinearGradient>
    );
}

const styles = EStyleSheet.create({
    headerIcon:{
        fontSize: '2rem',
        color: 'white'
    },
    spaceAround:{
        paddingHorizontal: '1rem',
        paddingVertical: '0.5rem'
    },
    whiteBox:{
        backgroundColor: 'white',
        borderRadius: '0.5rem'
    },
});

export default HeaderBack;