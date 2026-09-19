import '@/global.css';

import {PortalHost} from '@rn-primitives/portal';
import {DarkTheme, DefaultTheme, ThemeProvider} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useColorScheme} from 'react-native';

void SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <PortalHost/>
        </ThemeProvider>
    );
}
