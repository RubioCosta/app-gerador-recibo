import { View } from 'react-native'
import { useRouter } from 'expo-router';

// Components
import { Button } from '../../components/Buttons';

// Context
import { useAuthContext } from '../../context/AuthContext';

export default function Dashboard() {
  const router = useRouter()
  const { logout } = useAuthContext();

  async function handlerLogout() {
    try {
      await logout();
      router.replace('/');
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <View className='bg-white flex-1'>
      <Button 
        description='Sair'
        colorButton='bg-red-400'
        colorDescription='text-white'
        onPress={handlerLogout}
      />
    </View>
  )
}