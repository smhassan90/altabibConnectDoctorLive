import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import TitleBar from '~/components/TitleBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, styles } from '~/app/styles';
import { Card, Image, Text, XStack } from 'tamagui';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { url } from '~/env';
import * as SecureStore from 'expo-secure-store';
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from 'react-native-alert-notification';

export default function Page() {
  const [docName, setDocName] = useState('');
  const [userName, setUserName] = useState('');
  const [address, setAddress] = useState('');
  const [qualifications, setQualifications] = useState([]);
  const [age, setAge] = useState('');

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

        setDocName(res.data.data.name);
        setUserName(res.data.data.username);
        setAddress(res.data.data.address);
        setQualifications(res.data.data.qualifications);
        setAge(res.data.data.age);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const changePw = (oldPw: string, newPw: string, newConNewPw:string) => {
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
        } 
        else if(newConNewPw !== newPw){
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error Changing Password',
            textBody: 'New Passwords do not match',
            //button: "Close",
          });
          setTimeout(() => {
            Dialog.hide();
          }, 2000);
        }
        else {
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
      <SafeAreaView style={styles.safeArea}>
        <TitleBar title="Profile" />
        <Card gap={20} unstyled padded backgroundColor={'white'}>
          <Image
            alignSelf="center"
            height={100}
            width={100}
            borderRadius={50}
            source={{
              uri: 'https://lh3.googleusercontent.com/pw/ABLVV87DzwHP62UImU7R1nHuilbogC05sWMFkxIszzTzyME0YlXojhRgXQsDdn6S-ZQLVJhAlabuAEXUhNfJKTk5yYeYEGOmcfj0usKvHCrRv_SwepxHDhKCoVInKg-4nhSkmOMjjWtXDTZu-ut6e-NtC3fnhQ=w607-h607-s-no-gm',
            }}
          />
          <XStack>
            <Text color={colors.yellow} fontFamily={'ArialB'}>
              User Name:{' '}
            </Text>
            <Text color={colors.primary} fontFamily={'ArialB'}>
              {userName}
            </Text>
          </XStack>
          <XStack>
            <Text color={colors.yellow} fontFamily={'ArialB'}>
              Name:{' '}
            </Text>
            <Text color={colors.primary} fontFamily={'ArialB'}>
              {docName}
            </Text>
          </XStack>
          <XStack>
            <Text color={colors.yellow} fontFamily={'ArialB'}>
              Address:{' '}
            </Text>
            <Text color={colors.primary} fontFamily={'ArialB'}>
              {address}
            </Text>
          </XStack>
          <XStack>
            <Text color={colors.yellow} fontFamily={'ArialB'}>
              Qualifications:{' '}
            </Text>
            <Text color={colors.primary} fontFamily={'ArialB'}>
              BDS, MBBS, FCPS
            </Text>
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
                  <Text fontFamily={'ArialB'} color={colors.white}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.primBtn, { flex: 1 }]}
                  onPress={() => {
                    changePw(password, newPw, newConNewPw);
                  }}>
                  <Text fontFamily={'ArialB'} color={colors.white}>
                    Confirm
                  </Text>
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
      </SafeAreaView>
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
