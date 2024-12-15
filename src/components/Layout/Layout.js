import { useEffect } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import * as NavigationBar from 'expo-navigation-bar';

export function Layout({ children }) {

  useEffect(() => {
    async function getVisibilityAsync() {
      await NavigationBar.setVisibilityAsync('hidden');
      await NavigationBar.setBackgroundColorAsync('transparent')
    }

    getVisibilityAsync();
  }, []);

  return (
    <View className='h-full w-full bg-blue-400 pt-12'>
      <StatusBar style='transparent' translucent />
      {children}
    </View>
  )
}