import React, {  useContext } from "react"
import {Text, View,  } from 'react-native';
import { WebView } from 'react-native-webview';
import { GlobalContext } from "../../context/GlobalState";
import { baseURL } from "../config/config";

export default function BafCheckout() {
    const { auth } = useContext(GlobalContext)
    let webview = null;
    return (
    <>
    <View>
        <Text>fgfgf</Text>
        </View>
        <WebView
            ref={(ref) => (webview = ref)}
            source={{
                uri: baseURL + '/checkout/bankalfalah?ride_id=1',
                headers: {
                    Authorization: 'Bearer ' + auth.token,
                },
            }}
            onMessage={(e) => {}}
        />
        </>
        );
}
