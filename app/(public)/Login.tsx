import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { colors } from '~/app/styles';
import React from 'react';
import LoginCard from '~/components/loginRegister/LoginCard';
import { Text } from 'tamagui';

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
            <Text color={colors.white} textAlign="center" fontFamily={'ArialB'} fontSize={32}>
              Login
            </Text>
            <Text color={colors.white} textAlign="center" fontFamily={'ArialB'} fontSize={14}>
              Get Doctors, Appointments & Medical History
            </Text>
            <LoginCard />
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </AlertNotificationRoot>
  );
};

export default LoginScreen;
