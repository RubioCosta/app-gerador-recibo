import { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
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
    <View style={styles.container} className='flex-1 bg-blue-400 pt-12'>
      <StatusBar backgroundColor='#3b82f6' style='light' />
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      height: Dimensions.get('window').height * 0.95
  }
})