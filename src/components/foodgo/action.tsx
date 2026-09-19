import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { RED } from './theme';

type ActionProps = {
  label: string;
  onPress: () => void;
  children?: ReactNode;
  light?: boolean;
};

export function Action({ label, onPress, children, light = false }: ActionProps) {
  return (
    <Pressable
      accessibilityRole='button'
      onPress={onPress}
      style={({ pressed }) => [
        styles.root,
        light && styles.light,
        pressed && styles.pressed
      ]}
    >
      {children}
      <Text style={[styles.label, light && styles.lightLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    minHeight: 52,
    borderRadius: 16,
    backgroundColor: RED,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    paddingHorizontal: 22
  },
  light: { backgroundColor: '#FFF1F3' },
  label: { fontFamily: 'Poppins-SemiBold', fontSize: 14, color: '#FFF' },
  lightLabel: { color: RED },
  pressed: { opacity: 0.7, transform: [{ scale: 0.98 }] }
});

