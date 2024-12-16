import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text } from 'tamagui';
import { colors } from '../app/styles';

export type BtnProps = {
  color?: string;
  children: React.ReactNode;
  onPress?: () => void;
  textColor?: string;
};

export const CusBtn = ({ color, children, onPress, textColor }: BtnProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, { backgroundColor: color }]}>
      <Text
      fontFamily={'ArialB'}
        color={
          textColor == 'white'
            ? 'white'
            : textColor == 'yellow'
              ? colors.yellow
              : textColor == 'primary'
                ? colors.primary
                : undefined
        }>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});