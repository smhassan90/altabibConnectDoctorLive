import React, { useEffect, useState } from 'react';
import TitleBar from './../../../../components/TitleBar';
import { colors, paddingM, styles } from './../../../../app/styles';
import { Card, Image, Text, View, XStack, YStack } from 'tamagui';
import { StyleSheet, TextInput, TouchableOpacity,Button } from 'react-native';
import axios from 'axios';
import { url } from './../../../../env';
import * as SecureStore from 'expo-secure-store';
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from 'react-native-alert-notification';
import Header from './../../../../components/Header';
import { userData } from './../../../..//components/home/CustomContent';
import { CusText } from './../../../../components/CusText';
import { handleLogout } from './../../../..//components/home/CustomContent';

export default function Page() {
  const [password, setPassword] = useState('');
  const [newPw, setNewPw] = useState('');
  const [newConNewPw, setConNewPw] = useState('');

  const handleOldPassChange = (text: string) => setPassword(text);
  const handleNewPassChange = (text: string) => setNewPw(text);
  const handleConNewPassChange = (text: string) => setConNewPw(text);

  const [changePassState, setChangePassState] = useState(false);

  useEffect(() => {
    const token = SecureStore.getItem('token');

    // Axios GET request to fetch user data

    axios
      .get(`${url}getClinics?token=${token}`)
      .then((res) => {
        console.log('Response Clinic Data:', JSON.stringify(res.data.data, null, 2));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    axios
      .get(`${url}getClinics?token=${token}`)
      .then((res) => {
        console.log('Response Clinic Data:', JSON.stringify(res.data.data, null, 2));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const changePw = (oldPw: string, newPw: string, newConNewPw: string) => {
    const token = SecureStore.getItem('token');
    axios
      .get(`${url}changePassword?token=${token}&oldPassword=${oldPw}&newPassword=${newPw}`)
      .then((res) => {
        console.log(JSON.stringify(res.data, null, 2));
        if (res.data.status == 200) {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Password Changed',
            textBody: 'Password has been changed successfully',
            //button: "Close",
          });
          setTimeout(() => {
            Dialog.hide();
            setChangePassState(false);
          }, 2000);
        } else if (newConNewPw !== newPw) {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error Changing Password',
            textBody: 'New Passwords do not match',
            //button: "Close",
          });
          setTimeout(() => {
            Dialog.hide();
          }, 2000);
        } else {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error Changing Password',
            textBody: 'Something went wrong',
            //button: "Close",
          });
          setTimeout(() => {
            Dialog.hide();
          }, 2000);
        }
      })
      .catch((err: any) => {
        console.log('ERROR CHANGING PW: ', err);
      });
  };

  return (
    <AlertNotificationRoot>
      <View flex={1} backgroundColor={colors.primary}>
        <Header>
          <TitleBar title="Summary" />
        </Header>
        <YStack padding={paddingM}>
          <Card gap={20} unstyled padded backgroundColor={'white'}>
            <Image
              alignSelf="center"
              height={100}
              width={100}
              borderRadius={50}
              source={
                userData.gender === 'male'
                  ? require('../../../../assets/docMale.png')
                  : require('../../../../assets/docFemale.png')
              }
            />
            <XStack>
              <CusText bold size="md" color="yellow">
                User Name:{' '}
              </CusText>
              <CusText bold size="md" color="primary">
                {userData.username}
              </CusText>
            </XStack>
            <XStack>
              <CusText bold size="md" color="yellow">
                Name:{' '}
              </CusText>
              <CusText bold size="md" color="primary">
                {userData.name}
              </CusText>
            </XStack>
            <XStack>
              <CusText bold size="md" color="yellow">
                Address:{' '}
              </CusText>
              <CusText bold size="md" color="primary">
                {userData.address}
              </CusText>
            </XStack>
            <XStack>
              <CusText bold size="md" color="yellow">
                Qualifications:{' '}
              </CusText>
              <CusText bold size="md" color="primary">
                {userData.qualifications.map((qual) => qual.name + ', ')}
              </CusText>
            </XStack>

            {changePassState ? (
              <>
                <TextInput
                  autoCapitalize="none"
                  onChangeText={handleOldPassChange}
                  placeholderTextColor={colors.labelGray}
                  style={inp.input}
                  //secureTextEntry
                  placeholder="Enter old password"
                />
                <TextInput
                  autoCapitalize="none"
                  onChangeText={handleNewPassChange}
                  placeholderTextColor={colors.labelGray}
                  style={inp.input}
                  placeholder="Enter new password"
                />
                <TextInput
                  autoCapitalize="none"
                  onChangeText={handleConNewPassChange}
                  placeholderTextColor={colors.labelGray}
                  style={inp.input}
                  placeholder="Confirm new password"
                />
                <XStack gap={5}>
                  <TouchableOpacity
                    style={[styles.secBtn, { flex: 1 }]}
                    onPress={() => {
                      setChangePassState(!changePassState);
                    }}>
                    <CusText bold size="md" color="white">
                      Cancel
                    </CusText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.primBtn, { flex: 1 }]}
                    onPress={() => {
                      changePw(password, newPw, newConNewPw);
                    }}>
                    <CusText bold size="md" color="white">
                      Confirm
                    </CusText>
                  </TouchableOpacity>
                </XStack>
              </>
            ) : (
              <TouchableOpacity
                style={styles.primBtn}
                onPress={() => {
                  setChangePassState(!changePassState);
                }}>
                <Text color={colors.white} fontFamily={'ArialB'}>
                  Change Password
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.secBtn} onPress={() => {}}>
              <Text fontFamily={'ArialB'} color={colors.white}>
                Logout
              </Text>
            </TouchableOpacity>
          </Card>
        </YStack>
      </View>
    </AlertNotificationRoot>
  );
}

const inp = StyleSheet.create({
  input: {
    borderColor: colors.lightGray,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: colors.white,
  },
});
