import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


function AppButton({title, onPress, style}) {
    return (
     <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
         <Text style={[styles.btnText, style]}>{title}</Text>
     </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button : {
        backgroundColor : 'orange',
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 10,
        paddingHorizontal : 20,
        paddingVertical : 10,
    },
    btnText : {
        color : '#fff',
        fontSize : 14,
        fontWeight : 'bold',
    },
});

export default AppButton;