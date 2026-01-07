import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Block, Text } from 'galio-framework';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default Card = (props) => {

    const { profileImage, clientName, card, sideSpace, profileSection, offLineText, btn, btnText, ratingText } = styles
   

    return (
        
        <Block style={[card]}>
            <Block style={[{ width: '100%' }]} center>
                <Text style={[offLineText]}>You're Offline</Text>
            </Block>
            <Block flexDirection={'row'} space={'between'} style={[sideSpace, profileSection]}>

                <Block flexDirection={'row'}>
                    <Block>
                        <Image
                            source={require("../../assets/img/person.jpg")}
                            style={[profileImage]}
                        />
                    </Block>
                    <Block middle={"center"} flexDirection={'column'} style={{}} space={'around'}>
                        <Text style={[clientName]}>{props.name}</Text>
                        <Block flexDirection={'row'}>
                            <Icon name="star" size={17} color="#4d226e" />
                            <Text style={[ratingText], { marginLeft: 5 }}>{props.rating}</Text>
                        </Block>
                    </Block>
                </Block>

                <Block>
                    <TouchableOpacity style={{
                        width: '100%',
                        height: 50,

                       
                    }}
                        activeOpacity={0.9}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#FFBE50', '#F18500',]}
                            style={[btn]}>
                            <Text style={[btnText]}> Go <Icon name="car" size={27} color="#4d226e" /> </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Block>

            </Block>


        </Block>
    );
}

const styles = EStyleSheet.create({

    offLineText: {
        color: 'red',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        paddingVertical: '1rem'
    },

    card:{
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        height: '100%'
    },

    sideSpace: {
        paddingHorizontal: '1rem'
    },

    horizontalSpace: {
        paddingTop: '1rem',
        paddingBottom: '1rem',
    },

    lineBar: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: "#ededed"
    },

    profileSection: {
        paddingTop: '1rem',
        paddingBottom: '0rem'
    },

    profileImage: {
        borderRadius: 50,
        width: '4rem',
        height: '4rem',
        borderColor: 'orange',
        borderWidth: 3
    },

    clientName: {
        color: 'black',
        fontSize: '1.3rem',
        marginLeft: '0.8rem',
        fontWeight: '800',
    },
    subHeading: {
        color: '#797979',
        fontSize: '0.9rem',
        fontWeight: '600'
    },
    ratingText:{
        color: '#797979',
        fontSize: '1.2rem',
        fontWeight: '600'
    },
    text: {
        fontSize: '1rem',
        color: "black"
    },
    badge: {
        borderColor: '#f18602',
        borderWidth: 1,
        paddingHorizontal: '0.9rem',
        paddingVertical: '0.1rem',
        borderRadius: 8,
    },
    badgeText: {
        fontSize: '0.9rem',
        fontWeight: '700',
    },

    btnText:{
        color: '$primaryColor',
        fontSize: '1.6rem',
        fontWeight: '500',
    },
    btn:{
        borderWidth: 2, 
        borderColor: 'orange', 
        borderRadius: 50, 
        paddingHorizontal: '1.5rem',
        paddingVertical: '0.7rem',
        marginHorizontal: '0.4rem'
    },
});