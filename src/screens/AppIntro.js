import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {THEME} from '../shared/theme';
import { moderateScale, scale } from 'react-native-size-matters';

const slides = [
  {
    key: 1,
   
    title: 'Get Started',
    description:
      'Start your sign up process by inputing relevant details as either a Individual Customer or a Business and begin booking your first move with us.',
    image: require('../../assets/img/splashscreen1.png'),
    backgroundColor: '#fff',
  },
  {
    key: 2,
   
    title: 'Enter Move Details',
    description:
      'Select from a variety of vehicles available, add load details and any other specifications. As a business client you can choose from a variety of customized options.',
    image: require('../../assets/img/splashscreen2.png'),
    backgroundColor: '#fff',
  },
  {
    key: 3,
   
    title: 'Track Your Load',
    description:
      'Sit back and track the progress of your move on our app. As a business client you will have analytics to monitor multiple vehicle progress at once.',
    image: require('../../assets/img/splashscreen3.png'),
    backgroundColor: '#fff',
  },
  
];

const {
  colorBlack
} = THEME.colors;
const {latoMedium,latoHeavy} = THEME.fonts;
export default class AppIntro extends Component {
  _renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <Image source={item?.image} style={styles.image} />
        <View style={styles.detailText}>
          <Text style={styles.h1}>{item?.title}</Text>
          <Text style={{fontSize:scale(12),fontFamily:latoMedium,color:colorBlack}}>{item?.description}</Text>
        </View>
      </View>
    );
  };
  _onDone = async () => {
    try {
      await AsyncStorage.setItem('tutorialscreen', '0');
      this.props.navigation.navigate('SignIn');
    } catch (err) {
    }
  };

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="arrow-right" color="#290c59" size={20} />
      </View>
    );
  };

  _renderDoneButton = () => {
    return <Text style={styles.doneBtn}>Start</Text>;
  };

  _renderSkipButton = () => {
    return <Text style={styles.skipBtn}>Skip</Text>;
  };

  render() {
    return (
      <AppIntroSlider
        renderItem={this._renderItem}
        data={slides}
        onDone={this._onDone}
        renderNextButton={this._renderNextButton}
        renderDoneButton={this._renderDoneButton}
        renderSkipButton={this._renderSkipButton}
        showSkipButton
        activeDotStyle={{
          backgroundColor: '#290c59',
        }}
      />
    );
  }
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width : "80%",
     height : '40%',
     margin : 20,
     marginBottom : 20,
   },
  detailText: {
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    marginVertical: 20,
    width: '80%',
  },

  h1: {
    fontSize: 22,
    fontFamily: latoHeavy,
    // fontWeight: 'bold',
    color: '#000000',
  },
  doneBtn: {
    color: '#290c59',
    backgroundColor: '#ffd000',
    borderRadius: 10,
    overflow: 'hidden',
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: '400',
    marginRight: 40,
  },

  buttonCircle: {
    width: 60,
    height: 50,
    backgroundColor: '#ffd000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40,
  },
  skipBtn: {
    color: 'grey',
    marginLeft: 40,
    marginTop: 8,
    fontSize: 20,
  },
});
