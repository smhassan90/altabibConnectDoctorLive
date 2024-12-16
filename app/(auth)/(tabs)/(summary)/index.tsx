import { Platform, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import * as SecureStore from 'expo-secure-store';
import { url } from './../../../../env';
import axios from 'axios';
import { View, YStack } from 'tamagui';
import Header from './../../../../components/Header';
import TitleBar from './../../../../components/TitleBar';
import { borderRadiusM, colors, paddingM, paddingS, spacingM } from './../../../../app/styles';

const index = () => {
  const TOKEN = SecureStore.getItem('token');
  const [webViewString, setWebViewString] = useState('');
  useEffect(() => {
    axios
      .get(`${url}getSummary?token=${TOKEN}`)
      .then((res) => {
        setWebViewString(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {});
  }, []);
  return (
    <View flex={1} backgroundColor={colors.primary}>
      <Header>
        <TitleBar title="Summary" />
      </Header>
      <YStack
        margin={paddingM}
        padding={paddingS}
        flex={1}
        backgroundColor={colors.white}
        borderRadius={borderRadiusM}>
        <WebView
          originWhitelist={['*']}
          source={{ html: webViewString }}
          style={styles.webView} // Adjust margin top for iOS status bar
        />
      </YStack>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  webView: {
    marginTop: Platform.OS === 'ios' ? 20 : spacingM,
  },
});
