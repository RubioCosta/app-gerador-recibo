import { useState, useRef } from 'react'
import { View, Text } from 'react-native'
import Toast from 'react-native-toast-message';

// Components
import { Input, SecondaryInput } from '../../components/Inputs'
import { Button } from '../../components/Buttons/Buttons'
import { ModalCreateUser } from '../../components/ModalCreateUser'
import { Search as SearchUser } from '../../components/Search'
import { Toggle } from '../../components/Toggle'

export default function userConfiguration() {
  const [name, setName] = useState('')
  const [school, setSchool] = useState('')
  const [phone, setPhone] = useState('')
  const [value, setValue] = useState('')

  const [user, setUser] = useState({})

  const [confirmModal, setConfirmModal] = useState(false)

  const schoolRef = useRef(null)
  const phoneRef = useRef(null)
  const valueRef = useRef(null)

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

  async function handlerCreateUser() {
    if (!String(name).trim()) return showToast('error', 'Aviso', 'Nome é obrigatório!');
    if (!school) return showToast('error', 'Aviso', 'Escola é obrigatório!');
    if (!phone) return showToast('error', 'Aviso', 'Telefone é obrigatório!');
    if (!value) return showToast('error', 'Aviso', 'Valor é obrigatório!');
    setConfirmModal(true)
  }

  function cancelAction() {
    setConfirmModal(false)
  }


  return (
    <View className='bg-white flex-1'>
      <View className='bg-blue-400'>
        <Toggle title='Cadastro de Pessoa'>
          <View className='p-2'>
            <Input 
              placeholder='Nome'
              value={name}
              onChange={(e) => setName(e.nativeEvent.text)}
              returnKeyType='next'
              refNext={schoolRef}
              className='mb-4'
            />
            <Input 
              placeholder='Escola'
              value={school}
              onChange={(e) => setSchool(e.nativeEvent.text)}
              returnKeyType='next'
              refInput={schoolRef}
              refNext={phoneRef}
              className='mb-4'
            />
            <Input 
              placeholder='Telefone'
              value={phone}
              onChange={(e) => setPhone(e.nativeEvent.text)}
              type='phone-pad'
              returnKeyType='next'
              refInput={phoneRef}
              refNext={valueRef}
              className='mb-4'
            />
            <Input 
              placeholder='Valor'
              value={value}
              type='decimal-pad'
              refInput={valueRef}
              onChange={(e) => setValue(e.nativeEvent.text)}
              className='mb-4'
            />
            <Button 
              description='Cadastrar'
              colorButton='bg-white'
              colorText='text-blue-400'
              colorDescription='text-blue-400'
              onPress={handlerCreateUser}
              className='mb-2'
            />
          </View>
        </Toggle>
      </View>
      <SearchUser />
      <Toast />
      <ModalCreateUser isOpen={confirmModal} cancelAction={cancelAction} user={user} />
    </View>
  )
}