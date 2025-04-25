import React from 'react';
import { Text } from 'tamagui';
import { colors,fontFamily,fontSizes } from '../app/styles';

export type TextProps = {
  color?: string;
  children: React.ReactNode;
  bold?: boolean;
  size?: string;
};

export const CusText = ({ color, children, bold, size }: TextProps) => {
  return (
    <Text
      fontFamily={bold ? 'ArialB' : 'Arial'}
      fontSize={
        size == 'sm' ? 12 : size == 'md' ? 16 : size == 'lg' ? 20 : size == 'xl' ? 28 : undefined
      }
      color={
        color === 'white'
          ? 'white'
          : color === 'primary'
            ? colors.primary
            : color === 'yellow'
              ? colors.yellow
              : undefined
      }>
      {children}
    </Text>
  );
};

export const PrimBold = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text
      fontFamily={fontFamily.bold}
      fontSize={fontSizes.SM}
      color={colors.primary}
    >
      {children}
    </Text>
  );
};

export const LinkText = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text
      fontFamily={fontFamily.bold}
      fontSize={fontSizes.SM}
      color={colors.linkBlue}
    >
      {children}
    </Text>
  );
};