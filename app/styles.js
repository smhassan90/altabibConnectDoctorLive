import { StyleSheet } from 'react-native';

const fontFamily = {
  bold: "ArialB",
  regular: "Arial",
};
export { fontFamily };

const fontSizes = {
  XSM: 15,
  SM: 16,
  M: 18, //Doc Name,
  L: 20,
  XL: 24,
};
export { fontSizes };


// SPACINGS
export const spacingS = 5;
export const spacingM = 10;
export const spacingL = 15;
export const spacingXL = 20;

// BORDERS
export const borderWidthS = 1;
export const borderWidthM = 2;

// BORDER RADIUS
export const borderRadiusM = 5;
export const borderRadiusL = 10;

// FONTSWEIGHTS
export const fontBold = 'ArialB';
export const fontRegular = 'Arial';

// ICON SIZES
export const iconSize = 24;

// PADDING/MARGINS
export const paddingS = 5;
export const paddingM = 10;
export const paddingL = 15;

// FONTSIZES
export const fontS = 12;
export const fontM = 16;
export const fontL = 20;
export const fontXL = 24;
export const fontXXL = 28;

export const colors = {
  primary: '#0066a1',
  primaryDark: '#2d3181',
  gradSec: '#23333a',
  black: '#525252',
  white: '#ffffff',
  labelGray: '#8a8a8a',
  linkBlue: '#0066a1',
  yellow: '#ffa600',
  green: '#0ab99c',
  red: '#ff0000',
  lightGray: '#f5f5f5',
  border: '#e6e6e6',
};

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.primary,
    gap: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
  imgStyle: {
    opacity: 0.5,
  },
  backGround: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 10,
  },
  buttonPrimary: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 10,
  },
  input: {
    fontFamily: 'ArialB',
    flex: 1,
    borderBottomColor: colors.yellow,
    padding: 0,
    borderBottomWidth: 2,
  },
  primBtn: {
    //flex:1,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.primary,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secBtn: {
    //flex:1,
    borderRadius: 5,
    backgroundColor: colors.yellow,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
