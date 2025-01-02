import { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Linking, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import Toast from 'react-native-toast-message';

// Components
import { Input } from '../components/Inputs';
import { Button } from '../components/Buttons';

// Assets
import SchoolBus from '../assets/images/image-login.png';
import SchoolBusGif from '../assets/gifs/school-bus.gif';

// Context
import { useAuthContext } from '../context/AuthContext';

export default function App() {
  const { loginGoogle,  } = useAuthContext();

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  const passwordRef = useRef(null);

  function redirectLinkedin() {
    Linking.openURL('https://www.linkedin.com/me?trk=p_mwlite_feed-secondary_nav');
  }

  function showToast(type, typeDescription, description) {
    Toast.show({
      type,
      text1: typeDescription,
      text2: description,
      position: 'top',
      text2Style: {
        fontSize: 16
      },
    });
  };

  async function handlerLoginGoogle() {
    try {
      await loginGoogle();
      router.push('/home')
    } catch(error) {
      showToast('error', 'Aviso', 'Não foi possível efetuar o login!');
    }
  }

  async function handlerLogin() {
    try {
      if (!email) return showToast('error', 'Aviso', 'Informe o e-mail!');
      if (!password) return showToast('error', 'Aviso', 'Informe a senha!');

      await login(email, password);
      router.push('/home')
    } catch(error) {
      showToast('error', 'Aviso', 'Não foi possível efetuar o login!');
    }
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
      <StatusBar backgroundColor='#60a5fa' style='light' />
      {loading ? (
        <View className='flex-1 items-center justify-center'>
          <Image
            source={SchoolBusGif}
            resizeMode='contain'
            style={{ width: 250, height: 250, marginLeft: 'auto', marginRight: 'auto' }}
          />
        </View>
      ) : (
        <View className='flex-1 items-center justify-between p-4'>
          <View className='h-4/5 w-full flex flex-col items-center justify-center'>
            <Image 
              source={SchoolBus}
              resizeMode='contain'
              style={{ width: 170, height: 80, marginLeft: 'auto', marginRight: 'auto' }}
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
              onPress={handlerLogin}
              className='mb-4'
            />
            <View className='w-full h-1 bg-blue-500 mb-4'/>
            <Button
              description='Entrar com Google'
              onPress={handlerLoginGoogle}
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
      <Toast />
    </View>
  );
}