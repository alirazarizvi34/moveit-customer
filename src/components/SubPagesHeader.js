import React from 'react';
import { Text, Image, TouchableOpacity, } from 'react-native';
import { Block } from 'galio-framework';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import { THEME } from '../shared/theme';
import { useTranslation } from 'react-i18next';

const { latoBlack ,jameelNooriNastaleeq} = THEME.fonts;
const { colorWhite, color4E008A, colorBlack, colorFFBE50 } = THEME.colors;
export default SubPagesHeader = (props) => {

    const { t, i18n } = useTranslation();
    const { auth, setAuth } = useContext(GlobalContext);
    const clearAuth = async () => {
        await AsyncStorage.removeItem('auth');
        setAuth('');
        props.navigation.goBack();
    }

    return (
        <>
            <Block flexDirection={'row'} space={'around'} 
                style={{ flexDirection:'row',paddingHorizontal:moderateScale(12),backgroundColor: '#FFF', height: moderateScale(78),shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOpacity: 1,
                shadowRadius: 3.84,
                elevation: 15,
            }}
            >
                <Block flex={0.4} justifyContent={'center'}>

                    {
                        props.showDrawer ?
                            <TouchableOpacity onPress={() => { }}>
                                <Block style={{ backgroundColor: 'white', width: 64, height: 48, borderBottomRightRadius: 5, borderTopRightRadius: 5, }} justifyContent={'center'} alignItems={'flex-end'}>
                                    <Image source={require('../../assets/icons/menu.png')} style={{ height: 30, width: 30, marginRight: 10 }} />
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
                    {
                        props.clearAuthOnGoBack ?
                            <TouchableOpacity onPress={() => { clearAuth() }}>
                                <Block style={{ backgroundColor:colorFFBE50, 
                                             width: "100%",
                                              height: scale(50),
                                              borderRadius:moderateScale(10),
                                              shadowColor: "rgba(0, 0, 0, 0.1)",
                                              shadowOffset: {
                                                  width: 0,
                                                  height: 2,
                                              },
                                              shadowOpacity: 1.25,
                                              shadowRadius: 3.84,
                                              
                                              elevation: 5,
                                              
                                            }} 
                                              justifyContent={'center'} 
                                              alignItems={'center'}>
                                    <Icon name="angle-left" size={40} color={color4E008A} />
                                </Block>
                            </TouchableOpacity>
                            : null
                    }


                </Block>
                <Block flex={1.3} alignItems={'center'} justifyContent={'center'}>
                    <Text style={{color: 'white', fontSize:i18n.language === 'urdu' ? scale(24) : scale(20)  ,fontFamily:i18n.language === 'urdu' ? jameelNooriNastaleeq : latoBlack,color:colorBlack,}}> {t(props.title)} </Text>
                </Block>
                <Block flex={0.4} justifyContent={'center'} alignItems={'flex-end'}>
                    {props.showPorfilePicture ?
                        <TouchableOpacity onPress={() => { }}>
                            <Block style={{ backgroundColor: 'white', width: 64, height: 48, borderBottomLeftRadius: 5, borderTopLeftRadius: 5, }} justifyContent={'center'} alignItems={'flex-start'}>
                                {auth && auth.basic_info && auth.basic_info.avatar ?
                                    <Image source={{ uri: auth.basic_info.avatar }}
                                        style={{ marginLeft: 5, height: 40, width: 40, borderRadius: 40, borderWidth: 1, borderColor: '#FFA100' }} />

                                    :
                                    <Image source={require('../../assets/img/dp.jpg')}
                                        style={{ marginLeft: 5, height: 40, width: 40, borderRadius: 40, borderWidth: 1, borderColor: '#FFA100' }} />

                                }
                            </Block>
                        </TouchableOpacity>
                        : null
                    }
                    {

                        props.showLogout ?
                            <TouchableOpacity onPress={() => {  clearAuth() }}>
                                <Block style={{ backgroundColor: 'white', width: 64, height: 48, borderBottomLeftRadius: 5, borderTopLeftRadius: 5, }} justifyContent={'center'} alignItems={'flex-start'}>
                                    <Icon name="sign-out" size={30} color="#900" style={{ paddingLeft: 15 }} />

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
