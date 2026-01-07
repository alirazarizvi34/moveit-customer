import React, { useContext, useState } from 'react';
import {
  ScrollView,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
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
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ListModal from '../components/ListModal';

export default BookingSummary = ({ navigation, route }) => {
  const param = route.params;
  const { t, i18n } = useTranslation();
  const {
    auth,
    noOfLabour,
    setNoOfLabour,
    receiver,
    setReceiver,
    sender,
    setSender,
  } = useContext(GlobalContext);
  const { sideMargins, topMargin } = AppStyle;
  const [labourCost, setLabourCost] = useState(0);
  const [paymentGetway, setPaymentGetway] = useState('none');

  const [btnPress, setBtnPress] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setKeyboardStatus(true);
  };
  const _keyboardDidHide = () => {
    setKeyboardStatus(false);
  };

  useEffect(() => {
    let temp = noOfLabour * 1000;
    setLabourCost(temp);
  }, [noOfLabour]);

  const BookMyLoad = async () => {
    setBtnPress(true);
    if (receiver.name == '') {
      toastService.shortToast('Please enter receiver name');
      setBtnPress(false);
      return;
    }
    if (receiver.contact == '') {
      toastService.shortToast('Please enter receiver contact');
      setBtnPress(false);
      return;
    }
    if (!/03[0-9]{9}/.test(receiver.contact)) {
      toastService.shortToast('Please enter Valid Mobile Number of Reciever');
      setBtnPress(false);
      return;
    }
    if (sender.name == '') {
      toastService.shortToast('Please enter sender name');
      setBtnPress(false);
      return;
    }
    if (sender.contact == '') {
      toastService.shortToast('Please enter sender contact');
      setBtnPress(false);
      return;
    }

    if (!/03[0-9]{9}/.test(sender.contact)) {
      toastService.shortToast('Please enter Valid Mobile Number of Sender');
      setBtnPress(false);
      return;
    }

    if (paymentGetway === 'none') {
      toastService.shortToast('Please Enter Payment Method');
      setBtnPress(false);
      return;
    }

    setBtnPress(false);
    navigation.navigate('BookingConfirmation', {
      ...param,
      receiver: receiver,
      sender: sender,
      noOfLabour: noOfLabour,
      labourCost: labourCost,
      paymentGetway:
        paymentGetway === 'Debit/Credit Card'
          ? 'baf'
          : paymentGetway.toLowerCase(),
    });
    return;
  };

  const rowData = (title, desc) => {
    return (
      <Block flexDirection={'row'} alignItems={'center'}>
        <Block flex={1} marginRight={15}>
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
        <Block flex={1} marginRight={15}>
          <Text style={{ fontSize: 16, color: '#FFA100', fontWeight: 'bold' }}>
            {type == 'receiver' ? t('RECEIVER') : t('SENDER')}
          </Text>
        </Block>
        <Block flex={2} flexDirection={'row'} alignItems={'center'}>
          <Block flex={1} marginRight={2}>
            <TextInput
              onChangeText={text => {
                if (type == 'receiver') {
                  setReceiver({ ...receiver, name: text });
                } else {
                  setSender({ ...sender, name: text });
                }
              }}
              placeholder={t('Name')}
              placeholderTextColor={'darkgray'}
              style={[
                {
                  backgroundColor: '#F7F7F7',
                  borderRadius: 10,
                  color: '#707070',
                  height: 40,
                },
                i18n.language === 'urdu' && { textAlign: 'right' },
              ]}
              value={type == 'receiver' ? receiver.name : sender.name}
            />
          </Block>

          <Block flex={1} marginLeft={2}>
            <TextInput
              onChangeText={text => {
                if (type == 'receiver') {
                  setReceiver({ ...receiver, contact: text });
                } else {
                  setSender({ ...sender, contact: text });
                }
              }}
              placeholder={t('Contact')}
              placeholderTextColor={'darkgray'}
              style={[
                {
                  backgroundColor: '#F7F7F7',
                  borderRadius: 10,
                  color: '#707070',
                  height: 40,
                },
                i18n.language === 'urdu' && { textAlign: 'right' },
              ]}
              value={type == 'receiver' ? receiver.contact : sender.contact}
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

  const [press, setPress] = useState(false);

  const rowDataWithDropDown = title => {
    return (
      <Block flexDirection={'row'} alignItems={'center'}>
        <Block flex={1} marginRight={15}>
          <Text style={{ fontSize: 16, color: '#FFA100', fontWeight: 'bold' }}>
            {title}
          </Text>
        </Block>
        <Block flex={2}>
          <Block
            style={{
              flex: 1,
              overflow: 'hidden',
              backgroundColor: '#F7F7F7',
              borderRadius: 10,
              paddingVertical: 5,
              paddingLeft: 5,
            }}>
            <TouchableOpacity onPress={() => setPress(true)}>
              <Text
                style={{ fontSize: 16, color: '#4c1f6b', fontWeight: 'bold' }}>
                {' '}
                {noOfLabour}
              </Text>
            </TouchableOpacity>

            <ListModal
              modalVisible={press}
              onClose={() => {
                setPress(!press), setNoOfLabour(0);
              }}
              data={[
                { name: 1 },
                { name: 2 },
                { name: 3 },
                { name: 4 },
                { name: 5 },
                { name: 6 },
                { name: 7 },
                { name: 8 },
              ]}
              onPress={item => {
                setNoOfLabour(item.name);
                setPress(!press);
              }}
            />
            {/* {press ? (
              <Picker
                selectedValue={noOfLabour}
                mode={'dropdown'}
                style={{
                  backgroundColor: '#F7F7F7',
                  color: '#707070',
                  marginTop: -5,
                  marginBottom: -5,
                }}
                onValueChange={(itemValue, itemIndex) => {
                  setNoOfLabour(itemValue);
                  setPress(false);
                }}>
                <Picker.Item label="0" value={0} />
                <Picker.Item label="1" value={1} />
                <Picker.Item label="2" value={2} />
                <Picker.Item label="3" value={3} />
                <Picker.Item label="4" value={4} />
              </Picker>
            ) : null} */}
          </Block>
        </Block>
      </Block>
    );
  };

  const [payPress, setPayPress] = useState(false);

  const rowDataTitleDropDown = title => {
    return (
      <Block flexDirection={'row'} alignItems={'center'}>
        <Block flex={1} marginRight={15}>
          <Text style={{ fontSize: 16, color: '#FFA100', fontWeight: 'bold' }}>
            {title}
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
                padding: 10,
                backgroundColor: '#F7F7F7',
                borderRadius: 10,
                flex: 1,
                marginVertical: 2,
              }}>
              <TouchableOpacity onPress={() => setPayPress(true)}>
                <Text
                  style={{ fontSize: 16, color: '#4c1f6b', fontWeight: 'bold' }}>
                  {paymentGetway}
                </Text>
              </TouchableOpacity>

              <ListModal
                modalVisible={payPress}
                onClose={() => {
                  setPayPress(!payPress), setPaymentGetway('none');
                }}
                data={[
                  { name: 'Cash' },
                  { name: 'Wallet' },
                  // { name: 'Debit/Credit Card' },
                ]}
                onPress={item => {
                  setPaymentGetway(item.name);
                  setPayPress(false);
                }}
              />
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
                <Block style={[styles.boxes]}>
                  <Block />
                  <Block paddingHorizontal={20} paddingVertical={20}>
                    {rowData(t('From'), param?.markers[0].title)}
                    {marginBottom()}
                    {rowDataWithTwoTextInput()}
                    {marginBottom()}
                    {rowData(
                      t('Where'),
                      param?.markers[param?.markers?.length - 1].title,
                    )}
                    {marginBottom()}
                    {rowDataWithTwoTextInput('sender')}
                    {marginBottom()}
                    {rowData(
                      t('When'),
                      param?.scheduled ? t('Immediate') : param?.date ?? '',
                    )}
                    {marginBottom()}
                    {rowDataWithDropDown(t('Labour'))}
                    {marginBottom()}
                    {rowDataTitleDropDown(t('Payment'))}
                    <Block
                      style={{ borderColor: '#EAEAEA', marginHorizontal: 25 }}
                    />
                  </Block>
                </Block>
                <Block marginTop={5} />
                {false && (
                  <Block style={[styles.boxes, { zIndex: -1 }]} padding={20}>
                    <Block flexDirection={'row'} alignItems={'center'}>
                      <Block flex={2}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#595959',
                            fontWeight: 'bold',
                          }}>
                          Fare amount
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
                            500
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
                          }}>
                          Estimated mover charges
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
                            {labourCost}
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
                          }}>
                          Promo discount
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
                    </Block>

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
                          Fare Estimate
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
                          PKR 1,000
                        </Text>
                      </Block>
                    </Block>
                  </Block>
                )}
                <Block style={{ marginBottom: 160 }} />
              </ScrollView>
            </Block>
          </LinearGradient>
        </Block>
        {!keyboardStatus && (
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#4D226D', '#623A7C']}>
            <Block style={[sideMargins, { marginVertical: 10 }]}>
              <Button
                title={t('Continue')}
                color={'white'}
                pressFunc={BookMyLoad}
                pressStatus={btnPress}
              />
            </Block>
          </LinearGradient>
        )}
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
