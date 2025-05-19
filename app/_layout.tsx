import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Slot, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { TamaguiProvider } from 'tamagui';
import { useFonts } from 'expo-font';
import config from '../tamagui.config';
import { Provider } from 'react-redux';
import store from '../context/store';
import { tokenCache } from './getToken';
import { PermissionsAndroid, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import {toastConfig} from './toastConfig';

export default function RootLayout() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const router = useRouter();

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    Arial: require('./../assets/fonts/Arial-Light.ttf'),
    ArialB: require('./../assets/fonts/Arial-Bold.ttf'),
    ArialL: require('./../assets/fonts/Arial-Light.ttf'),
  });

  const InitialLayout = () => {
    const requestNotificationPermission = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission denied');
        } else {
          console.log('Notification permission granted');
        }
      }
    };
    useEffect(() => {
      requestNotificationPermission()
      tokenCache.getToken().then((val) => {
        if (val) {
          setToken(val);
          setLoggedIn(true);
          console.log('EXPO Token: ', val);
        } else {
          console.log('TOKEN DOESNT EXIST');
          setLoggedIn(false);
        }
      });

      if (loggedIn) {
        console.log('Local Token: ', token);
        console.log('Authenticated! Going to Home Page');
        router.replace('/(auth)/(tabs)/(clinics)');
      } else {
        console.log('Going to Login');
        router.replace('/Login');
      }
    }, [token]);

    return <Slot />;
  };

  if (!loaded) return null;
  else {
    return (
      <Provider store={store}>
        <TamaguiProvider config={config}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <InitialLayout />
          </GestureHandlerRootView>
        </TamaguiProvider>
        <Toast config={toastConfig}/>
      </Provider>
    );
  }
}
