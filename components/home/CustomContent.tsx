import { Alert, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { router, useNavigation } from 'expo-router';
import { Button, ButtonText, Text, View, Image, YStack } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tokenCache } from './../../app/getToken';
import * as SecureStore from 'expo-secure-store';
import { url } from './../../env';
import axios from 'axios';
import constants from 'expo-constants';
import { colors, iconSize } from './../../app/styles';
import { FontAwesome, FontAwesome6, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';

type userData = {
  name: string;
  address: string;
  username: string;
  gender: string;
  qualifications: [
    {
      id: number;
      name: string;
    },
  ];
};

export let userData: userData = {
  name: '',
  username: '',
  address: '',
  gender: '',
  qualifications: [
    {
      id: 0,
      name: '',
    },
  ],
};


export const handleLogout = () => {
  Alert.alert(
    'Logout',
    'Are you sure you want to logout?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          tokenCache.deleteToken();
          router.replace('/Login');
        },
      },
    ],
    { cancelable: false }
  );
};

export const CustomContent = (props: any) => {
  const navigation = useNavigation();
  const topSpace = constants.statusBarHeight;

  useEffect(() => {
    const token = SecureStore.getItem('token');
    axios
      .get(`${url}getProfile?token=${token}`)
      .then((res) => {
        userData.name = res.data.data.doctors[0].name;
        userData.username = res.data.data.doctors[0].username;
        userData.address = res.data.data.doctors[0].address;
        userData.gender = res.data.data.doctors[0].gender;
        userData.qualifications = res.data.data.doctors[0].qualifications;
        console.log('PROFILE DATA: ', JSON.stringify(res.data.data, null, 2));
      })
      .catch((err) => {
        console.log('ERROR GETTING PROFILE: ', err);
      });
  }, []);

  const { top, bottom } = useSafeAreaInsets();



  return (
    <View flex={1}>
      <DrawerContentScrollView {...props}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push('/(auth)/(tabs)/(profile)')}
          style={{
            marginTop: -topSpace - 10,
            width: '100%',
            paddingHorizontal: 20,
            paddingTop: 50,
            paddingBottom: 20,
            backgroundColor: colors.yellow,
            marginBottom: 10,
            gap: 10,
          }}>
          <Image height={100} width={100} borderRadius={50} source={require('./../../assets/man.png')} />
          <YStack gap={3}>
            <Text color={colors.white} fontSize={16} fontFamily={'ArialB'}>
              {userData.name}
            </Text>
            <Text color={colors.white} fontSize={16} fontFamily={'Arial'}>
              {userData.username}
            </Text>
          </YStack>
        </TouchableOpacity>
        <DrawerItemList {...props} />
        <DrawerItem
          style={{ marginLeft: 20 }}
          labelStyle={{ fontFamily: 'ArialB', color: colors.white }}
          activeBackgroundColor={colors.primary}
          icon={({ size, color }) => (
            <MaterialIcons name="home" size={iconSize} color={colors.yellow} />
          )}
          label={'My Clinics'}
          onPress={() => {
            router.navigate('/(auth)/(tabs)/(clinics)/');
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        />
        <DrawerItem
          style={{ marginLeft: 20 }}
          labelStyle={{ fontFamily: 'ArialB', color: colors.white }}
          icon={({ size, color }) => (
            <SimpleLineIcons name="graph" size={iconSize} color={colors.yellow} />
          )}
          label={'Summary'}
          onPress={() => {
            router.push('/(auth)/(tabs)/(summary)');
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        />
                {/* <DrawerItem
          style={{ marginLeft: 20 }}
          labelStyle={{ fontFamily: 'ArialB', color: colors.white }}
          icon={({ size, color }) => (
            <MaterialIcons name="house" size={iconSize} color={colors.yellow} />
          )}
          label={'Add patient'}
          onPress={() => {
            router.push('/(auth)/(tabs)/(patients)');
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        /> */}
        <DrawerItem
          style={{ marginLeft: 20 }}
          labelStyle={{ fontFamily: 'ArialB', color: colors.white }}
          icon={({ size, color }) => (
            <FontAwesome name="user-md" size={iconSize} color={colors.yellow} />
          )}
          label={'Profile'}
          onPress={() => {
            router.push('/(auth)/(tabs)/(profile)');
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        />
      </DrawerContentScrollView>

      <View paddingBottom={bottom + 20}>
        <Button backgroundColor={'red'} marginHorizontal={10} onPress={handleLogout}>
          <ButtonText fontFamily={'ArialB'}>Logout</ButtonText>
        </Button>
      </View>
    </View>
  );
};


