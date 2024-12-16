import { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Linking, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';

// Components
import { Input } from '../components/Inputs';
import { Button } from '../components/buttons';

// Assets
import SchoolBus from '../assets/images/image-login.png';
import SchoolBusGif from '../assets/gifs/school-bus.gif';

export default function App() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  const passwordRef = useRef(null);

  function redirectLinkedin() {
    Linking.openURL('https://www.linkedin.com/me?trk=p_mwlite_feed-secondary_nav');
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);

    async function getVisibilityAsync() {
      await NavigationBar.setBackgroundColorAsync('#60a5fa')
    }

    getVisibilityAsync();

  }, []);

  return (
    <View className='flex-1 bg-blue-400 pt-12'>
      <StatusBar backgroundColor='#60a5fa' />
      {loading ? (
        <View className='flex-1 items-center justify-center'>
          <Image
            source={SchoolBusGif}
            style={{ width: 250, height: 250, resizeMode: 'contain', marginLeft: 'auto', marginRight: 'auto' }}
          />
        </View>
      ) : (
        <View className='flex-1 items-center justify-between p-4'>
          <View className='h-4/5 w-full flex flex-col items-center justify-center'>
            <Image 
              source={SchoolBus}
              style={{ width: 170, height: 80, resizeMode: 'contain', marginLeft: 'auto', marginRight: 'auto' }}
            />
            <Input
              className='mb-4 mt-5'
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              refInput={passwordRef}
              returnKeyType='next'
            />
            <Input 
              className='mb-4'
              label="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isSecureText
            />
            <Button
              description='Entrar'
              onPress={() => router.push('/home')}
              className='mb-4'
            />
            <View className='w-full h-1 bg-blue-500 mb-4'/>
            <Button
              description='Entrar com Google'
              onPress={() => router.push('/home')}
              icon='google'
              colorButton={'bg-white'}
              colorIcon={'black'}
              colorDescription={'text-black'}
            />
          </View>
          <View className='h-1/5 flex justify-end items-center'>
            <Text className='text-white text-center underline' onPress={redirectLinkedin}>Criado por Rubio Costa</Text>
          </View>
        </View>
      )}
    </View>
  );
}