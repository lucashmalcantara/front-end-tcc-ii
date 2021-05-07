import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const metrics = {
  smallMargin: 8,
  baseMargin: 16,
  doubleBaseMargin: 32,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  tabBarHeight: 54,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  statusBarHeight: (Platform.OS === 'ios') ? 20 : 0,
  baseRadius: 3,
};

export default metrics;