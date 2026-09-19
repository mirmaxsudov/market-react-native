import FoodgoApp from '@/components/foodgo/foodgo-app';
import { NavigationBar } from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';

export default function DefaultPage() {
  return (
    <>
      <FoodgoApp />
      <StatusBar hidden />
      <NavigationBar hidden />
    </>
  );
}
