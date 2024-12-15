import { useEffect } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';  // Importando expo-image

// Assets
import SchoolBus from '../assets/gifts/school-bus.gif';

// Components
import { Layout } from '../components/Layout';

export default function App() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/login');
    }, 3000);
  }, []);

  return (
    <Layout>
      <View className="flex-1 bg-blue-400 justify-center items-center">
        <Image 
          source={SchoolBus} 
          style={{ width: 200, height: 200 }}
          contentFit="contain"
        />
      </View>
    </Layout>
  );
}
