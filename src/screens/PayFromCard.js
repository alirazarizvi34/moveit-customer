import React from 'react';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import toastService from '../services/toast-service';
import { baseURL } from '../config/config';

export default function PayFromCard(props) {
  const navigation = useNavigation();
  let webview = null;
  return (
    <>
      <WebView
        ref={(ref) => (webview = ref)}
        source={{
          uri: `${baseURL}checkout/bankalfalah?ride_id=${props?.route?.params?.id}`,
        }}
        onMessage={(e) => {
            let data = JSON?.parse(e?.nativeEvent?.data)
            if(data.success) {
              navigation.goBack();
              toastService.shortToast('Payment Paid successfuly')
            }else {
              toastService.shortToast('Payment unsuccessful (Try again)')
            }
        }}
      />
    </>
  );
}