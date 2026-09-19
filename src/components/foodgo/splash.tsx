import { Image, Pressable, StyleSheet, Text } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { RED } from './theme';

type SplashProps = {
  onPress?: () => void;
};

export function Splash({ onPress }: SplashProps) {
  return (
    <Pressable accessibilityLabel='Open Foodgo menu' onPress={onPress} style={styles.root}>
      <Svg width='100%' height='100%' style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id='splash' x1='0' y1='0' x2='0.75' y2='1'>
            <Stop offset='0' stopColor='#FF929C' />
            <Stop offset='0.7' stopColor={RED} />
            <Stop offset='1' stopColor='#EF2038' />
          </LinearGradient>
        </Defs>
        <Rect width='100%' height='100%' fill='url(#splash)' />
      </Svg>
      <Text style={styles.logo}>Foodgo</Text>
      <Image
        source={require('../../../assets/images/foodgo/splash-burger.png')}
        style={styles.burger}
        resizeMode='contain'
      />
      <Image
        source={require('../../../assets/images/foodgo/splash-veggie.png')}
        style={styles.veggie}
        resizeMode='contain'
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, overflow: 'hidden' },
  logo: {
    fontFamily: 'Lobster',
    fontSize: 54,
    color: 'white',
    position: 'absolute',
    top: '23.3%',
    alignSelf: 'center'
  },
  burger: { position: 'absolute', width: '74%', height: '36%', left: '-16%', bottom: '3%' },
  veggie: { position: 'absolute', width: '54%', height: '23%', left: '28%', bottom: '-3.5%' }
});

