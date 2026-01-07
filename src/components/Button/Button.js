import React from 'react';
import {TouchableOpacity} from 'react-native';
import { Text} from 'galio-framework';
import LinearGradient from 'react-native-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';

export default Button = (props) =>{

    const {btnText} = styles

    return(
        <TouchableOpacity style={{
            width: '100%',
            height: 50,
           
        }}
            activeOpacity={0.9}>
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#FFBE50', '#F18500',]}
                style={[{  fontSize: 24, borderRadius: 15, padding: 12 }]}>
                <Text style={[btnText]} center> {props.buttonName} </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = EStyleSheet.create({

    btnText:{
        color: 'white',
        fontSize: '9.2rem',
        fontWeight: 'bold'
    },
})