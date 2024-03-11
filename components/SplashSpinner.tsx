import React from 'react';
import * as Progress from 'react-native-progress';

const SplashSpinner = () => {
  return (
    <Progress.Bar
      height={10}
      borderWidth={1.2}
      borderRadius={5}
      color="white"
      useNativeDriver
      indeterminate
      width={300}
    />
  );
};

export default SplashSpinner;
