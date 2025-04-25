import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { Card, Separator, Text, XStack, YStack } from 'tamagui';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import axios from 'axios';
import * as Progress from 'react-native-progress';
import { url } from './../../env';
import { useDispatch } from 'react-redux';
import { addUser } from './../../context/actions/userActions';
import { colors, styles } from './../../app/styles';
import * as SecureStore from 'expo-secure-store';
import { LinkText, PrimBold } from '../CusText';

const DeleteCard = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [num, setNum] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(true);

  const validateNum = (num: string) => num.length >= 3;
  const isEmptyString = (str: string) => str.trim() === '';

  const emptyFields = (num: string, password: string) => ![num, password].some(isEmptyString);

  const validateSubmit = (num: string, password: string) =>
    validateNum(num) && emptyFields(num, password);

  const handleNumChange = (text: string) => {
    setNum(text);
  };

  const handlePassChange = (text: string) => {
    setPass(text);
  };

  const handleSubmit = () => {
    if (!validateSubmit(num, pass)) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Please fill all details correctly',
        button: 'Close',
      });
    } else {
      setLoading(true);
      fetchLoginData();
    }
  };

  const getCurrentTimestamp = () => {
    const now = new Date();
    const date = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear().toString();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${date}-${month}-${year}-${hours}-${minutes}-${seconds}`;
  };

  const currentTimeStamp = getCurrentTimestamp();

  //USE YOUR OWN URL!!

  const deleteUrl = `${url}deleteUser`;
  const payload = {
    username: num,
    password: pass,
  };

  const fetchLoginData = () => {
    setLoading(true);
    axios
      .post(deleteUrl, payload)
      .then((response) => {
        //console log token
        //console.log('RESPONSE: ', JSON.stringify(response, null, 2));
        if (response.data.status == 200) {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            textBody: 'Delete Account Successfully',
            button: 'Close',
          });
          setTimeout(() => {
            router.replace('/Login');
          }, 2000);
          setLoading(false);
        } else {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: 'Error Delete User, enter correct details',
            button: 'Close',
          });
          console.log('Error, Status code: ', response.status);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={10}
      style={{ width: '100%' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Card borderRadius={10} width={'100%'} padding={10} backgroundColor={colors.lightGray}>
        <YStack gap={20}>
          <XStack backgroundColor={colors.white} borderRadius={5} padding={10} gap={10}>
            <AntDesign name="phone" size={24} color={colors.primary} />
            <Separator vertical borderColor={'lightgray'} />
            <TextInput
              value={num}
              maxLength={20}
              style={{ padding: 0, flex: 1, fontFamily: 'ArialB' }}
              placeholder="Phone"
              onChangeText={handleNumChange}
              placeholderTextColor="#808080a4"
            />
          </XStack>
          <XStack backgroundColor={colors.white} borderRadius={5} padding={10} gap={10}>
            <AntDesign name="lock" size={24} color={colors.primary} />
            <Separator vertical borderColor={'lightgray'} />
            <TextInput
              value={pass}
              autoCapitalize="none"
              style={{ padding: 0, flex: 1, fontFamily: 'ArialB' }}
              placeholder="Password"
              onChangeText={handlePassChange}
              placeholderTextColor="#808080a4"
              secureTextEntry={showPass ? true : false}
            />
            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
              <AntDesign name={showPass ? 'eye' : 'eyeo'} size={24} color={colors.primary} />
            </TouchableOpacity>
          </XStack>
          <TouchableOpacity onPress={handleSubmit} style={styles.buttonPrimary}>
            {loading ? (
              (Keyboard.dismiss(),
              (<Progress.CircleSnail thickness={2} size={22} color={['white']} />))
            ) : (
              <Text color={colors.white} fontSize={20} fontFamily={'ArialB'}>
                Delete
              </Text>
            )}
          </TouchableOpacity>
          <XStack alignItems="center" justifyContent="center" gap="$2" flexWrap="wrap">
            <PrimBold>Do you have an account?</PrimBold>
            <TouchableOpacity onPress={() => router.push('/Login')}>
              <LinkText>Login</LinkText>
            </TouchableOpacity>
          </XStack>
        </YStack>
      </Card>
    </KeyboardAvoidingView>
  );
};

export default DeleteCard;
