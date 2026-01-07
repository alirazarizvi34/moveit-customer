import React, { useContext, useEffect, useState } from 'react';
import { Alert, ScrollView, SafeAreaView } from 'react-native';
import { Block, Text } from 'galio-framework';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';
import { AppStyle } from '../styles/AppStyle';
import CommonHeader from '../components/CommonHeader';
import { TextInput } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import toastService from '../services/toast-service';
import { GlobalContext } from '../../context/GlobalState';
import Button from '../components/Button';
import Geocoder from 'react-native-geocoding';
import { useTranslation } from 'react-i18next';
import { baseURL } from '../config/config';
import ListModal from '../components/ListModal';

export default BookingConfirmation = ({ navigation, route }) => {
  const param = route.params;
  const { auth, selectedPackage, setActiveRide } = useContext(GlobalContext);
  const { sideMargins, topMargin } = AppStyle;
  const [noOfLabour, setNoOfLabour] = useState(0);
  const [paymentType, setPaymentType] = useState();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [cityData, setCityData] = useState();
  const [city, setCity] = useState('');
  const { t, i18n } = useTranslation();
  const [cityId, setCityId] = useState('');

  const [receiver, setReceiver] = useState({
    name: '',
    contact: '',
  });
  const [btnPress, setBtnPress] = useState(false);

  const getCityData = async () => {
    try {
      let resp = await fetch(baseURL + 'city/fetch', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const contentType = resp.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        return resp.json().then(data => {
          if (data.success) {
            setCityData(data?.data?.cities);
          } else {
          }
        });
      } else {
        return resp.text().then(text => {
        });
      }
    } catch (error) {
    }
  };

  const allCities = [];

  useEffect(() => {
    if (cityData?.length > 0) {
      for (let i = 0; i < cityData?.length; i++) {
        if (city == cityData[i]?.city_name) {
          setCityId(cityData[i]?.id);
        }
      }
    }

  }, [cityData]);

  useEffect(() => {
    getCityData();
  }, []);

  const getCity = () => {
    try {
      Geocoder.from(param.markers[0].latitude, param.markers[0].longitude)
        .then(json => {
          var address = json.results[0].address_components;
          for (let i = 0; i < address.length; i++) {
            if (address[i].types.indexOf('locality') !== -1) {
              setCity(address[i].long_name);
            }
          }
        })
        .catch(error => console.warn(error));
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    getCity();
  }, []);

  const BookMyLoad = async () => {
    if (!city) {
      toastService.shortToast('Service is not available in your city');
    }
    setBtnPress(true);
    const formData = new FormData();
    formData.append('markers', JSON.stringify(param.markers));
    formData.append('item_id', param.item_id);
    formData.append('other_category', param.other_category);
    formData.append('load_image', param.item_picture);
    formData.append('vehicle_id', param.vehicle_id);
    formData.append('vehicle_type', param.vehicle_type);
    formData.append('package_id', param.package_id);
    formData.append('date', param.date);
    formData.append('city', cityId);
    formData.append('scheduled', param?.scheduled ? 0 : 1);
    formData.append('receiver', JSON.stringify(param.receiver));
    formData.append('sender', JSON.stringify(param.sender));
    formData.append('labour_count', param.noOfLabour);
    formData.append('payment_type', param.paymentGetway);
    formData.append('status', param?.scheduled ? 0 : 1);
    try {
      let resp = await fetch(baseURL + 'user/ride/request', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'multipart/form-data;',
          Authorization: 'Bearer ' + auth.token,
        },
        body: formData,
      });

      const contentType = resp.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        return resp.json().then(data => {
          if (data.success) {
            toastService.shortToast(data.message);
            if (param?.scheduled) {
              setActiveRide(data.data.ride);
              navigation.replace('OnGoingRide');
            } else {
              navigation?.replace('SelectLoadScreen');
              Alert.alert(
                'Message',
                'You’ll be updated when a MoveIt Janab has been allocated to you',
              );
            }
            setBtnPress(false);
          } else {
            toastService.shortToast(data.message);
            setBtnPress(false);
          }
        });
      } else {
        return resp.text().then(text => {
          toastService.shortToast('Error');
        });
      }
    } catch (error) {
      toastService.shortToast(error.message);
      setBtnPress(false);
    }
  };

  const rowData = (title, desc) => {
    return (
      <Block flexDirection={'row'} alignItems={'center'}>
        <Block flex={1}>
          <Text style={{ fontSize: 16, color: '#FFA100', fontWeight: 'bold' }}>
            {title}
          </Text>
        </Block>
        <Block flex={2}>
          <Text style={{ fontSize: 16, color: '#4c1f6b', fontWeight: 'bold' }}>
            {desc}
          </Text>
        </Block>
      </Block>
    );
  };

  const rowDataWithTwoTextInput = (type = 'receiver') => {
    return (
      <Block flexDirection={'row'} alignItems={'center'}>
        <Block flex={1}>
          <Text style={{ fontSize: 16, color: '#FFA100', fontWeight: 'bold' }}>
            {type == 'receiver' ? 'RECEIVER' : 'SENDER'}
          </Text>
        </Block>
        <Block flex={2} flexDirection={'row'} alignItems={'center'}>
          <Block flex={1} marginRight={2}>
            <TextInput
              onChangeText={text => {
                setReceiver({ ...receiver, name: text });
              }}
              placeholder={'Name'}
              placeholderTextColor={'darkgray'}
              style={{
                backgroundColor: '#F7F7F7',
                borderRadius: 10,
                color: '#707070',
                height: 40,
              }}
            />
          </Block>

          <Block flex={1} marginLeft={2}>
            <TextInput
              onChangeText={text => {
                setReceiver({ ...receiver, contact: text });
              }}
              placeholder={'Contact'}
              placeholderTextColor={'darkgray'}
              style={{
                backgroundColor: '#F7F7F7',
                borderRadius: 10,
                color: '#707070',
                height: 40,
              }}
              keyboardType={'number-pad'}
            />
          </Block>
        </Block>
      </Block>
    );
  };

  const marginBottom = () => {
    return (
      <Block
        style={{
          borderBottomWidth: 4,
          borderColor: '#EAEAEA',
          marginHorizontal: 25,
          marginVertical: 5,
        }}
      />
    );
  };

  const rowDataWithDropDown = title => {
    return (
      <Block flexDirection={'row'} alignItems={'center'}>
        <Block flex={1}>
          <Text style={{ fontSize: 16, color: '#FFA100', fontWeight: 'bold' }}>
            {title}
          </Text>
        </Block>
        <Block flex={2}>
          <Block
            style={{
              padding: 5,
              backgroundColor: '#F7F7F7',
              borderRadius: 10,
              paddingTop: 0,
              paddingBottom: 0,
              flex: 1,
            }}>
            <Picker
              selectedValue={noOfLabour}
              mode={'dropdown'}
              style={{
                marginTop: -8,
                marginBottom: -8,
                backgroundColor: '#F7F7F7',
                color: '#707070',
              }}
              onValueChange={(itemValue, itemIndex) =>
                setNoOfLabour(itemValue)
              }>
              <Picker.Item label="Select No of Labour" value="" />
              <Picker.Item label="0" value="0" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
            </Picker>
          </Block>
        </Block>
      </Block>
    );
  };

  const rowDataTitleDropDown = () => {
    return (
      <Block flexDirection={'row'} alignItems={'center'}>
        <Block flex={1}>
          <Text style={{ fontSize: 16, color: '#FFA100', fontWeight: 'bold' }}>
            PAYMENT
          </Text>
        </Block>
        <Block flex={2} flexDirection={'row'} alignItems={'center'}>
          <Block
            flex={1}
            style={{}}
            flexDirection={'row'}
            alignItems={'center'}>
            <Block
              style={{
                padding: 5,
                backgroundColor: '#F7F7F7',
                borderRadius: 10,
                paddingTop: 0,
                paddingBottom: 0,
                flex: 1,
              }}>
              <Picker
                selectedValue={paymentType}
                mode={'dropdown'}
                style={{
                  marginTop: -8,
                  marginBottom: -8,
                  backgroundColor: '#F7F7F7',
                  color: '#707070',
                  fontWeight: 'bold',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setPaymentType(itemValue)
                }>
                <Picker.Item label="Change" value="none" />
                <Picker.Item label="Cash" value="1" />
                <Picker.Item label="Debit / Credit Card" value="2" />
                <Picker.Item label="EasyPaisa" value="3" />
                <Picker.Item label="JazzCash" value="4" />
              </Picker>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#4C1F6B' }}>
        <Block flex={1}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#4D226D', '#623A7C']}
            style={{ height: '100%' }}>
            <Block style={[sideMargins, topMargin, {}]}>
              <CommonHeader
                heading={t('Booking Summary')}
                navigation={navigation}
              />
              <Block marginTop={20} />
              <Block style={styles.stepperBox}>
                <Stepper stepperCount={5} navigation={navigation} />
              </Block>
              <ScrollView>
                <Block style={[styles.boxes, { zIndex: -1 }]} padding={20}>
                  <Block flexDirection={'row'} alignItems={'center'}>
                    <Block flex={2}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#595959',
                          fontWeight: 'bold',
                          textAlign: 'center',
                        }}>
                        {t('Fare amount')}
                      </Text>
                    </Block>
                    <Block
                      flex={1}
                      flexDirection={'row'}
                      justifyContent={'flex-end'}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'black',
                          fontWeight: 'bold',
                        }}>
                        PKR{' '}
                        <Text
                          style={{
                            fontSize: 20,
                            color: 'black',
                            fontWeight: 'bold',
                          }}>
                          {selectedPackage?.base_price}
                        </Text>
                      </Text>
                    </Block>
                  </Block>
                  <Block style={{ marginVertical: 2 }} />
                  <Block flexDirection={'row'} alignItems={'center'}>
                    <Block flex={2}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#595959',
                          fontWeight: 'bold',
                          textAlign: 'center',
                        }}>
                        {t('Estimated labour charges')}
                      </Text>
                    </Block>
                    <Block
                      flex={1}
                      flexDirection={'row'}
                      justifyContent={'flex-end'}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'black',
                          fontWeight: 'bold',
                        }}>
                        PKR{' '}
                        <Text
                          style={{
                            fontSize: 20,
                            color: 'black',
                            fontWeight: 'bold',
                          }}>
                          {route?.params?.labourCost}
                        </Text>
                      </Text>
                    </Block>
                  </Block>
                  <Block style={{ marginVertical: 2 }} />
                  {/* <Block flexDirection={'row'} alignItems={'center'}>
                    <Block flex={2}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#595959',
                          fontWeight: 'bold',
                          textAlign: 'center',
                        }}>
                        {t('Discount code')}
                      </Text>
                    </Block>
                    <Block
                      flex={1}
                      flexDirection={'row'}
                      justifyContent={'flex-end'}>
                      <TextInput
                        style={{
                          paddingHorizontal: 16,
                          backgroundColor: '#F7F7F7',
                          borderRadius: 10,
                          color: '#707070',
                          borderColor: '#999',
                          borderWidth: 1,
                          height: 40,
                          width: 140,
                        }}
                      />
                    </Block>
                  </Block> 
                  <Block style={{marginVertical: 2}} />
                  <Block flexDirection={'row'} alignItems={'center'}>
                    <Block flex={2}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#595959',
                          fontWeight: 'bold',
                          textAlign: 'center',
                        }}>
                        {t('Promo discount')}
                      </Text>
                    </Block>
                    <Block
                      flex={1}
                      flexDirection={'row'}
                      justifyContent={'flex-end'}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'black',
                          fontWeight: 'bold',
                        }}>
                        PKR{' '}
                        <Text
                          style={{
                            fontSize: 20,
                            color: 'black',
                            fontWeight: 'bold',
                          }}>
                          -0
                        </Text>
                      </Text>
                    </Block>
                  </Block>*/}
                  <Block
                    style={{
                      borderBottomWidth: 4,
                      borderColor: '#EAEAEA',
                      marginHorizontal: 0,
                      marginVertical: 5,
                    }}
                  />
                  <Block flexDirection={'row'} alignItems={'center'}>
                    <Block flex={1}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#4C1F6B',
                          fontWeight: 'bold',
                        }}>
                        {t('Fare Estimate')}
                      </Text>
                    </Block>
                    <Block
                      flex={1}
                      flexDirection={'row'}
                      justifyContent={'flex-end'}>
                      <Text
                        style={{
                          fontSize: 24,
                          color: '#F18500',
                          fontWeight: 'bold',
                        }}>
                        PKR{' '}
                        {parseInt(selectedPackage?.base_price) +
                          route?.params?.labourCost}
                      </Text>
                    </Block>
                  </Block>
                </Block>

                <Block style={{ marginBottom: 160 }} />
              </ScrollView>
            </Block>
          </LinearGradient>
        </Block>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#4D226D', '#623A7C']}>
          <Block style={[sideMargins, { marginVertical: 10 }]}>
            <Button
              title={t('Book my Load')}
              pressStatus={toggleCheckBox}
              color={'white'}
              pressFunc={BookMyLoad}
              pressStatus={btnPress}
            />
          </Block>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};

const styles = EStyleSheet.create({
  stepperBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  boxes: {
    backgroundColor: '#f3ecfa',
    borderRadius: 10,
    marginBottom: 20,
  },
  textTitle: {
    color: '#714F8B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryView: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  categorySubView: {
    margin: 4,
    borderColor: '#C1C1C1',
    borderWidth: 1,
    borderRadius: 50,
    padding: 5,
    backgroundColor: 'gray',
  },
  CategoryText: {
    fontSize: 11,
    textAlign: 'center',
    color: 'rgba(28,28,28,1)',
  },

  selected: {
    backgroundColor: '#4C1F6B',
    color: 'white',
  },
  unselected: {
    backgroundColor: '#F7F7F7',
    color: '#fff',
  },
  selectedColor: {
    color: 'white',
    padding: 5,
    fontSize: 15,
  },
  unselectedColor: {
    color: '#818181',
    padding: 5,
    fontSize: 15,
  },
});
