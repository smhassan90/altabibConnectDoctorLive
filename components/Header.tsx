import React from 'react';
import { View } from 'tamagui';
import constants from 'expo-constants';
import { borderRadiusL, colors } from '~/app/styles';

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <View
      borderBottomLeftRadius={borderRadiusL}
      borderBottomRightRadius={borderRadiusL}
      backgroundColor={colors.yellow}
      paddingTop={constants.statusBarHeight}
      paddingHorizontal={10}>
      {children}
    </View>
  );
};

export default Header;
