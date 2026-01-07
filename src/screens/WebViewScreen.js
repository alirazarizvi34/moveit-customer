import React, {useContext, useState} from 'react';
import {View,StyleSheet,ActivityIndicator, SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../../context/GlobalState';

export default function WebviewScreen({route}) {
  const {auth,relocationRequest} = useContext(GlobalContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const requestType = route?.params?.request;

 const handleNavigationStateChange = (navState) => {
  if (navState.url === 'https://stage.techmoveit.com/payment/success') {
    navigation.navigate(requestType == 'delivery' ? 'DeliveryBookingConfirmation' : 'RelocationBookingConfirmation', { response: 'success' });
  }
  if(navState.url === 'https://stage.techmoveit.com/payment/failed'){
    navigation.navigate(requestType == 'delivery' ? 'DeliveryBookingConfirmation' : 'RelocationBookingConfirmation',{response:'failed'});
  }
};

  return (
    <SafeAreaView style={styles.container}>
       {/* {loading && (
        <ActivityIndicator
          color="#009688"
          size="large"
          style={styles.loading}
        />
      )} */}
       <WebView
      source={{ uri: route?.params?.pwa }}
      style={{ flex: 1 }}
      // onLoadStart={() => setLoading(true)}
      // onLoadEnd={() => setLoading(false)}
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        // console.warn('WebView error: ', nativeEvent);
      }}
      onMessage={(event) => {
        // console.log('Message from webview: ', event.nativeEvent.data);
      }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      mediaPlaybackRequiresUserAction={false}
      originWhitelist={['https://*']}
      userAgent="Mozilla/5.0 (YourCustomUserAgent)"
      onNavigationStateChange={handleNavigationStateChange}
    />
     </SafeAreaView>
  );
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    webview: {
      flex: 1,
    },
    loading: {
      flex:1,
    }
  });

