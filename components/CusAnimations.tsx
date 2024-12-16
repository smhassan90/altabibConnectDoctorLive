import React from 'react';
import LottieView from 'lottie-react-native';

export const HeartLoader = () => {
  return (
    <LottieView
      speed={2.0}
      autoPlay
      style={{
        width: 100,
        height: 100,
      }}
      colorFilters={[
        {
          keypath: 'Warstwa 4 Outlines',
          color: '#FFFFFF',
        },
        {
          keypath: 'Warstwa 6 Outlines 3',
          color: '#FFFFFF',
        },
        {
          keypath: 'Warstwa 6 Outlines 2',
          color: '#FFFFFF',
        },
        {
          keypath: 'Warstwa 6 Outlines',
          color: '#ffa600',
        },
      ]}
      source={require('./../assets/animations/HeartLoader.json')}
    />
  );
};

export const Spinner = () => {
  return (
    <LottieView
      speed={1.0}
      autoPlay
      style={{
        width: 20,
        height: 18,
      }}
      colorFilters={[
        {
          keypath: 'Layer 4 Outlines',
          color: '#FFFFFF',
        },
        {
          keypath: 'Circle/medical Outlines',
          color: '#0066a1',
        },
      ]}
      source={require('./../assets/animations/PulseDefault.json')}
    />
  );
};

export const Success = () => {
  return (
    <LottieView
      speed={2.0}
      autoPlay
      style={{
        width: 100,
        height: 100,
      }}
      source={require('./../assets/animations/Success.json')}
    />
  );
};
export const Error = () => {
  return (
    <LottieView
      speed={2.0}
      autoPlay
      style={{
        width: 100,
        height: 100,
      }}
      source={require('./../assets/animations/Error.json')}
    />
  );
};
