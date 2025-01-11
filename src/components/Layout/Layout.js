import { useEffect } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import * as NavigationBar from 'expo-navigation-bar';
import { useRouter, useRootNavigationState } from 'expo-router';

// Context
import { useAuthContext } from '../../context/AuthContext'

export function Layout({ children }) {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const { user } = useAuthContext()

  useEffect(() => {
    if (!user?.email && rootNavigationState?.key) {
      router.push('/');
    }
  }, [ user, rootNavigationState ])

  useEffect(() => {
    async function getVisibilityAsync() {
      await NavigationBar.setBackgroundColorAsync('#60a5fa')
    }

    getVisibilityAsync();
  }, []);

  return (
    <View className='flex-1 bg-blue-400 pt-12'>
      <StatusBar backgroundColor='#3b82f6' style='light' />
      {children}
    </View>
  )
}