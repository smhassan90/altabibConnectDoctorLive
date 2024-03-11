import { StyleSheet, View } from 'react-native';
import React from 'react';
import { colors } from '~/app/styles';
import * as Progress from 'react-native-progress';
import { Text } from 'tamagui';

const Spinner = ({title}:{title:string}) => {
  return (
    <View
      style={{
        alignSelf: 'center',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
      }}>
      <Text color={colors.primary} fontFamily={'ArialB'}>
        {title}
      </Text>
      <Progress.CircleSnail thickness={7} size={100} color={[colors.primary, colors.yellow]} />
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({});
