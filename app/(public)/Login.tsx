import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { colors } from './../styles';
import React from 'react';
import LoginCard from './../../components/loginRegister/LoginCard';
import { Text, View } from 'tamagui';
import { CusText } from './../../components/CusText';

const LoginScreen = () => {
  return (
    <AlertNotificationRoot>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            contentContainerStyle={{
              gap: 15,
              padding: 15,
              alignContent: 'center',
              justifyContent: 'center',
              flex: 1,
              backgroundColor: colors.primary,
              flexGrow: 1,
            }}
            keyboardShouldPersistTaps="handled">
            <View ai={'center'}>
              <CusText bold color="white" size="xl">
                Login
              </CusText>
              <CusText bold color="white" size="md">
                Doctors, Appointments & Medical History
              </CusText>
            </View>
            <LoginCard />
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </AlertNotificationRoot>
  );
};

export default LoginScreen;
