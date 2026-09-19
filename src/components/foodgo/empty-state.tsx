import { HeartIcon, SearchIcon, ShoppingBagIcon } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Action } from './action';
import { INK, RED } from './theme';

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: 'bag' | 'heart' | 'search';
  onPress: () => void;
};

export function EmptyState({ title, description, icon = 'bag', onPress }: EmptyStateProps) {
  const Icon = icon === 'heart' ? HeartIcon : icon === 'search' ? SearchIcon : ShoppingBagIcon;

  return (
    <View style={styles.root}>
      <View style={styles.icon}>
        <Icon size={34} color={RED} strokeWidth={1.5} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Action label='Explore the menu' onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { alignItems: 'center', paddingTop: 48, gap: 12 },
  icon: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#FFF1F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  title: { fontFamily: 'Poppins-SemiBold', color: INK, fontSize: 21 },
  description: {
    fontFamily: 'Poppins',
    fontSize: 13,
    color: '#918987',
    lineHeight: 22,
    textAlign: 'center'
  }
});
