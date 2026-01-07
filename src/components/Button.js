import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';


export default Button = (props) => {

    return (
        <>
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#FFBE50', '#F18500',]}
                style={[{ fontSize: 24, borderRadius: 50, padding: 12 }, props.style]}
            >
                {
                    props.pressStatus ?
                        <TouchableOpacity
                            onPress={() => { props.pressFunc() }}
                            activeOpacity={0.8}
                            disabled={props.pressStatus} >
                            {
                                props.pressStatus ?
                                    <ActivityIndicator size="small" color="#0000ff" style={{ padding: 3 }} />
                                    :
                                    <Text style={{
                                        textAlign: 'center',
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color: props.color ? props.color : '#4C1F6B'
                                    }}>
                                        {props.title}
                                    </Text>
                            }
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={() => { props.pressFunc() }}
                            activeOpacity={0.8}
                        >
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: props.color ? props.color : '#4C1F6B'
                            }}>
                                {props.title}
                            </Text>
                        </TouchableOpacity>

                }

            </LinearGradient>
        </>
    );
};

const styles = EStyleSheet.create({
    textStyle: {
        color: '#fff',
        fontSize: 20
    }
});
