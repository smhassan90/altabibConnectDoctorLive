import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Button, ButtonText, Text } from 'tamagui';
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

export const PrimaryBtn = ({
  onPress,
  children,
  isBold = false,
}: {
  onPress: () => void;
  children: React.ReactNode;
}) => {
  console.log("Button children:", children);
  return (
    <Button
      onPress={onPress}
      backgroundColor={colors.primary}
      flex={1}
      style={{ height:35 }}
      pressStyle={{
        backgroundColor: colors.primaryLight,
        borderWidth: 0,
        color: "black",
      }}
    >
      <ButtonText style={{ fontWeight: isBold ? "bold" : "normal" }}>{children}</ButtonText>
    </Button>
  );
};

export const SecondaryBtn = ({
  onPress,
  children,
  isBold
}: {
  onPress: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Button
      onPress={onPress}
      backgroundColor={colors.yellow}
      flex={1}
      style={{ height:35 }}
      pressStyle={{
        backgroundColor: colors.yellowLight,
        borderWidth: 0,
        color: "black",
      }}
    >
      <ButtonText style={{ fontWeight: isBold ? "bold" : "normal" }}>{children}</ButtonText>
    </Button>
  );
};

export const RedBtn = ({
  onPress,
  children,
  isBold
}: {
  onPress: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Button
      marginHorizontal={10}
      marginTop={10}
      onPress={onPress}
      backgroundColor={colors.red}
      flex={1}
      style={{ height:40 }}
      pressStyle={{
        backgroundColor: colors.redLight,
        borderWidth: 0,
        color: "white",
      }}
    >
      <ButtonText style={{ fontWeight: isBold ? "bold" : "normal" }}>{children}</ButtonText>
    </Button>
  );
};
