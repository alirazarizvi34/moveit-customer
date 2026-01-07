import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Block, Text } from 'galio-framework';
import EStyleSheet from 'react-native-extended-stylesheet';
import { AppStyle } from '../../styles/AppStyle';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/FontAwesome';

export default Card = (props) => {

    const { profileImage, clientName, card, sideSpace, profileSection, horizontalSpace, subHeading, lineBar, badge, badgeText, text } = styles;
    const { primaryColor, btnText, px6, btn } = AppStyle;

    return (
        <Block style={[card]}>
            <Block flexDirection={'row'} space={'between'} style={[sideSpace, profileSection]}>
                <Block flexDirection={'row'}>
                    <Block>
                        <Image
                            source={require("../../../assets/img/person.jpg")}
                            style={[profileImage]}
                        />
                    </Block>
                    <Block middle={"center"}>
                        <Text style={[clientName]}>{props.name}</Text>
                    </Block>
                </Block>
                <Block flexDirection={'row'}>
                <Icon name="star" size={17} color="#4d226e" />
                    <Text style={[subHeading],{marginLeft: 5}}>{props.rating}</Text>
                </Block>
            </Block>

            <Block style={[lineBar]}>

            </Block>

            <Block flexDirection={'row'} space={'between'} style={[sideSpace, horizontalSpace]}>
                <Block>
                    <Text style={[subHeading]}>Load Type</Text>
                </Block>
                <Block style={[badge]}>
                    <Text style={[primaryColor, badgeText]}>{props.loadType}</Text>
                </Block>
            </Block>

            <Block style={[lineBar]}>

            </Block>

            <Block flexDirection={'column'} style={[sideSpace, horizontalSpace]}>
                <Text style={[subHeading]}>Pick Up</Text>
                <Text style={[text]}>{props.pickupAddress}</Text>
            </Block>

            <Block style={[lineBar]}>

            </Block>

            <Block flexDirection={'column'} style={[sideSpace, horizontalSpace]}>
                <Text style={[subHeading]}>Drop Off</Text>
                <Text style={[text]}>{props.dropOffAddress}</Text>
            </Block>

            <Block flexDirection={'row'} style={[px6,{ width: '100%', justifyContent: 'flex-end' }]}>
                <Block >
                <TouchableOpacity style={{
                        width: '100%',
                        height: 50,

                       
                    }}
                        activeOpacity={0.9}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#ffffff', '#ffffff',]}
                            style={[btn]}>
                            <Text style={[btnText]}> <Icon1 name="close" size={20} color="#4d226e" /> Ignore </Text>
                        </LinearGradient>
                    </TouchableOpacity>
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
                            <Text style={[btnText]}> <Icon name="check" size={20} color="#4d226e" /> Accept </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Block>
            </Block>
        </Block>
    );
}

const styles = EStyleSheet.create({

    card: {
        backgroundColor: 'white',
        width: '90%',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
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
        paddingBottom: '2rem'
    },

    profileImage: {
        borderRadius: 50,
        width: '3rem',
        height: '3rem',
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
});