import {
  HeartIcon,
  HouseIcon,
  PlusIcon,
  ShoppingBagIcon,
  UserRoundIcon
} from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { INK, RED } from './theme';
import type { Tab } from './types';

type BottomNavigationProps = {
  activeTab: Tab;
  cartCount: number;
  insetBottom: number;
  phoneWidth: number;
  scale: number;
  onNavigate: (tab: Tab) => void;
};

const items = ['home', 'profile', 'add', 'cart', 'favourites'] as const;

export function BottomNavigation({
  activeTab,
  cartCount,
  insetBottom,
  scale,
  onNavigate
}: BottomNavigationProps) {
  return (
    <View>
      <Svg
        viewBox={`0 0 375 ${76 + insetBottom / scale}`}
        preserveAspectRatio='none'
        pointerEvents='none'
        style={StyleSheet.absoluteFill}
      >
        <Path
          fill={RED}
          d={`M0 9 H137 C154 9 154 47 187.5 47 C221 47 221 9 238 9 H375 V${76 + insetBottom / scale} H0 Z`}
        />
      </Svg>
      <View style={[styles.items, { height: 67 * scale, marginTop: 9 * scale }]}>
        {items.map((item) => {
          if (item === 'add') {
            return (
              <View key={item} style={styles.item}>
                <Pressable
                  accessibilityRole='button'
                  accessibilityLabel='Open order bag'
                  onPress={() => onNavigate('cart')}
                  style={({ pressed }) => [
                    styles.addButton,
                    {
                      width: 64 * scale,
                      height: 64 * scale,
                      borderRadius: 32 * scale,
                      top: -41 * scale
                    },
                    pressed && styles.pressed
                  ]}
                >
                  <PlusIcon size={27 * scale} color='white' strokeWidth={3.5} />
                  {cartCount > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{cartCount}</Text>
                    </View>
                  )}
                </Pressable>
              </View>
            );
          }

          const Icon =
            item === 'home'
              ? HouseIcon
              : item === 'profile'
                ? UserRoundIcon
                : item === 'cart'
                  ? ShoppingBagIcon
                  : HeartIcon;

          const label =
            item === 'cart'
              ? 'Shopping bag'
              : item === 'favourites'
                ? 'Favourites'
                : item === 'home'
                  ? 'Home'
                  : 'Profile';

          return (
            <Pressable
              key={item}
              accessibilityRole='button'
              accessibilityLabel={label}
              accessibilityState={{ selected: activeTab === item }}
              onPress={() => onNavigate(item)}
              style={styles.item}
            >
              <Icon
                color='white'
                size={23 * scale}
                strokeWidth={2.6}
                fill={item === 'favourites' ? 'white' : 'transparent'}
              />
              <View style={[styles.activeDot, { opacity: activeTab === item ? 1 : 0 }]} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { position: 'relative' },
  items: { flexDirection: 'row', alignItems: 'center' },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingBottom: 7
  },
  activeDot: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'white',
    bottom: 12
  },
  addButton: {
    position: 'absolute',
    backgroundColor: RED,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 6px 12px rgba(0,0,0,0.18)'
  },
  badge: {
    position: 'absolute',
    right: -2,
    top: 0,
    borderRadius: 12,
    backgroundColor: INK,
    minWidth: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white'
  },
  badgeText: { fontFamily: 'Poppins-SemiBold', fontSize: 10, color: 'white' },
  pressed: { opacity: 0.7, transform: [{ scale: 0.98 }] }
});
