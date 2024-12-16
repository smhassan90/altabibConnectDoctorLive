module.exports = function(api) {
  api.cache(true);
  let plugins = [];
  
  
    plugins.push([
      '@tamagui/babel-plugin',
      {
        components: ['tamagui'],
        config: './tamagui.config.ts',
      },
    ]);
  

  
    plugins.push('react-native-reanimated/plugin');

  plugins.push([
    'module-resolver',
    {
      root: ['./'],  // Project root
      alias: {
        '~': './',
        '@animations': './app/assets/animations',  // Your alias for animations folder
      },
    },
  ]);
  

  return {
    
      presets: ['babel-preset-expo'],
    
    plugins,
  };
};
