import React from 'react';
import {  Text,  Image,  TouchableOpacity, } from 'react-native';
import { Block } from 'galio-framework';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';

export default SubPagesHeader = (props) => {


    return (
        <>
            <Block flexDirection={'row'} space={'around'}
                style={{ backgroundColor: '#4C1F6B', height: 100 }}
            >
                <Block flex={1} justifyContent={'center'}>
                    {
                        props.showDrawer ?
                            <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                                <Block style={{ backgroundColor: 'white', width: 64, height: 48, borderBottomRightRadius: 5, borderTopRightRadius: 5, }} justifyContent={'center'} alignItems={'flex-end'}>
                                    <Image source={require('../../assets/icons/menu.png')} style={{height: 30, width: 30, marginRight: 10}} />
                                </Block>
                            </TouchableOpacity>
                            : null
                    }
                    {
                        props.showGoBack ?
                            <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                                <Block style={{ backgroundColor: 'white', width: 64, height: 48, borderBottomRightRadius: 5, borderTopRightRadius: 5, }} justifyContent={'center'} alignItems={'flex-end'}>
                                    <Icon name="angle-left" size={40} color="#900" style={{ paddingRight: 15 }} />
                                </Block>
                            </TouchableOpacity>
                            : null
                    }


                </Block>
                <Block flex={2} center flexDirection={'column'}>
                    <Block flexDirection={'row'} style={{}}>
                        <Text style={{color: 'orange', alignSelf: 'flex-end', fontWeight: 'bold', fontSize: 20}}>PKR</Text>
                        <Text style={{fontSize: 30, color: 'white', fontWeight: 'bold', marginLeft: 5, alignSelf: 'flex-end'}}>{props.price}</Text>
                    </Block>
                    <Text style={{ color: 'white', fontSize: 15 }}> {props.title} </Text>
                </Block>
                <Block flex={1} justifyContent={'center'} alignItems={'flex-end'}>
                    {props.showPorfilePicture ?
                        <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                            <Block style={{ backgroundColor: 'white', width: 64, height: 48, borderBottomLeftRadius: 5, borderTopLeftRadius: 5, }} justifyContent={'center'} alignItems={'flex-start'}>
                                <Image source={require('../../assets/img/dp.jpg')}
                                    style={{ marginLeft: 5, height: 40, width: 40, borderRadius: 40, borderWidth: 1, borderColor: '#FFA100' }} />
                              
                            </Block>
                        </TouchableOpacity>
                        : null
                    }

                </Block>
            </Block>
        </>
    );
};

const styles = EStyleSheet.create({
    textStyle: {
        color: '#fff',
        fontSize: 20
    }
});
