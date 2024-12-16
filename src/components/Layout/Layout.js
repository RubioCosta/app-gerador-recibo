import { useEffect } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import * as NavigationBar from 'expo-navigation-bar';

export function Layout({ children }) {
  useEffect(() => {
    async function getVisibilityAsync() {
      await NavigationBar.setBackgroundColorAsync('#60a5fa')
    }

    getVisibilityAsync();
  }, []);

  return (
    <View className='flex-1 bg-blue-400 pt-12'>
      <StatusBar backgroundColor='#ffffff' />
      {children}
    </View>
  )
}