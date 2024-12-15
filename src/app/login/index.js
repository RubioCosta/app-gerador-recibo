import { useState, useRef } from 'react';
import { View, Image, Text, Linking } from 'react-native';

// Components
import { Layout } from '../../components/Layout';
import { Input } from '../../components/Inputs';
import { Button } from '../../components/buttons';

// Assets
import SchoolBus from '../../assets/images/image-login.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  function redirectLinkedin() {
    Linking.openURL('https://www.linkedin.com/me?trk=p_mwlite_feed-secondary_nav');
  }

  return (
    <Layout>
      <View className='flex-1 items-center justify-between p-4'>
        <View className='w-full h-2/3'>
          <Image 
            source={SchoolBus}
            contentFit='contain'
            className='mb-4 w-auto h-32 m-auto'
          />
          <Input
            className='mb-4'
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={passwordRef}
            returnKeyType='next'
          />
          <Input 
            className='mb-4'
            label="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            description='Entrar'
            onPress={() => alert('Logar')}
            className='mb-4'
          />
          <View className='w-full h-1 bg-blue-500 mb-4'/>
          <Button
            description='Entrar'
            onPress={() => alert('Logar')}
            icon='google'
            colorButton={'bg-white'}
            colorIcon={'black'}
            colorDescription={'text-black'}
          />
        </View>
        <View>
          <Text className='text-white text-center'>Versão 1.0.0.0</Text>
          <Text className='text-white text-center underline' onPress={redirectLinkedin}>Criado por Rubio Costa</Text>
        </View>
      </View>
    </Layout>
  );
}