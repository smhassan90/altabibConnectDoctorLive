import { ImageBackground } from 'react-native';
import React from 'react';
import { styles } from './styles';
import SplashSpinner from '../components/SplashSpinner';
import { View } from 'tamagui';

const Splash = () => {
  return (
    <ImageBackground source={require('../assets/SplashImage.png')} style={styles.backGround}>
      <View position='absolute' top={"60%"}>
        <SplashSpinner />
      </View>
    </ImageBackground>
  );
};

export default Splash;
