import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default Testing = ({ navigation }) => {


    return (
        <>
            <GooglePlacesAutocomplete
                placeholder='Search'
          placeholderTextColor={'darkgray'}
                onPress={(data, details = null) => {
                   
                }}
                query={{
                    key: 'AIzaSyCEdwZcHigbRFSXQWhyltHm8f672YGzsJQ',
                    language: 'en',
                }}
            />
            <View style={{ flex: 1 }}>


                <GooglePlacesAutocomplete
                    style={{ flex: 1 }}
                    placeholder='Enter Location'
          placeholderTextColor={'darkgray'}
                    minLength={2}
                    autoFocus={false}
                    returnKeyType={'default'}
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                       
                    }}
                    query={{
                        key: 'AIzaSyCEdwZcHigbRFSXQWhyltHm8f672YGzsJQ',
                        language: 'en',
                    }}
                    styles={{
                        textInputContainer: {
                            backgroundColor: 'grey',
                        },
                        textInput: {
                            height: 38,
                            color: '#5d5d5d',
                            fontSize: 16,
                        },
                        predefinedPlacesDescription: {
                            color: '#1faadb',
                        },
                    }}
                />
            </View>
        </>
    );
};

const styles = EStyleSheet.create({
    textStyle: {
        color: '#fff',
        fontSize: 20

    },
    whiteColor: {
        color: 'white'
    },
    textBoxes: {
        flex: 1,
        paddingRight: 50,
        backgroundColor: 'white',
        borderRadius: 25,
        paddingHorizontal: 20,
    }
});
