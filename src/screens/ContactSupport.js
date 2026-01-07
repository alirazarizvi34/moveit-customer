import React from 'react';
import { ScrollView,  Text, TouchableOpacity,  Linking } from 'react-native';
import { Block } from 'galio-framework';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import SubPagesHeader from '../components/SubPagesHeader';
import LinearGradient from 'react-native-linear-gradient';




export default ContactSupport = ({ navigation, route }) => {
   
    return (
        <>
            <SubPagesHeader navigation={navigation} title={'Contact Support'} showGoBack={true} />
            <ScrollView>
                <Block style={{ marginTop: 30 }}></Block>

                <Block style={{ marginHorizontal: 30, marginTop: 30 }} >
                    <Block center>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'gray' }}>If you are facing any problem, </Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'gray' }}>Please contact our support.</Text>
                    </Block>
                </Block>
                <Block style={{ marginTop: 50 }}></Block>
                <Block style={{ marginHorizontal: 30, marginBottom: 10 }}  >
                    <TouchableOpacity onPress={() => { Linking.openURL('tel: 0900 78601')  }} activeOpacity={0.8} >
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#FFBE50', '#F18500',]}
                            style={[{ borderWidth: 2, borderColor: 'orange', fontSize: 24, borderRadius: 50, padding: 12 }]}
                        >
                            <Block style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name="phone" size={24} color='#4C1F6B' style={{ paddingTop: 5 }} />
                                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#4C1F6B' }}>  Call Now</Text>
                            </Block>
                        </LinearGradient>
                    </TouchableOpacity>

                </Block>
            </ScrollView>


        </>
    );
};

const styles = EStyleSheet.create({
    textStyle: {
        color: '#fff',
        fontSize: 20
    }
});
