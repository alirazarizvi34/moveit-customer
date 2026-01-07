import React from 'react';
import { Image } from 'react-native';
import { Block, Text } from 'galio-framework';
import { AppStyle } from '../styles/AppStyle'

export default MiniCard = (props) => {

    const {pb10, whiteColor, pt5, pt10, cardTitle, cardText, cardPrice, px4 } = AppStyle
    return (
        <Block style={[pt10, px4, { width: '40%', backgroundColor: '#4d226e', borderRadius: 20, height: 140 }]} center shadow={true} shadowColor={"#4d226e"} >
            <Text center style={[pb10, cardTitle, { color: 'white', fontWeight: 'bold' }]}>{props.title}</Text>
            <Image source={props.imageUri} style={{ color: 'white' }} />
            <Block flexDirection={"row"} style={[pt5,]} >
                <Text style={[whiteColor, cardText, { alignSelf: 'flex-end' }]}>{props.currency}</Text>
                <Text style={[whiteColor, cardPrice, { alignSelf: 'flex-end' }]}>{props.price}</Text>
            </Block>
        </Block>
    );
}