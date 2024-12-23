import { useState, useRef, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

// Components
import { SecondaryInput } from '../Inputs';
import { Button as ButtonEdit } from '../Buttons';

export function ModalEditUser({ isOpen, confirmAction, cancelAction, user = {} }) {
  const [name, setName] = useState('')
  const [school, setSchool] = useState('')
  const [phone, setPhone] = useState('')
  const [monetaryValue, setMonetaryValue] = useState('')

  useEffect(() => {
    setName(user.name);
    setSchool(user.school);
    setPhone(user.phone);
    setMonetaryValue(String(user.value));
  }, []);

  const schoolRef = useRef(null)
  const phoneRef = useRef(null)
  const valueRef = useRef(null)

  return (
    <View className="flex-1 justify-center items-cente absolute">
      <Modal
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={cancelAction}
      >
        <View className="flex-1 justify-center items-center pl-5 pr-5" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
          <View className="w-full bg-white rounded-lg items-center justify-center">
            <View className='w-full flex items-center justify-between flex-row mb-2 bg-blue-400 p-5 rounded-tl-lg rounded-tr-lg'>
              <Text className="text-md text-white font-semibold">Editar Dados:</Text>
              <TouchableOpacity onPress={cancelAction}>
                <AntDesign name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View className='p-2 w-full pb-5 pl-5 pr-5'>
              <SecondaryInput 
                placeholder='Nome'
                value={name}
                onChange={(e) => setName(e.nativeEvent.text)}
                returnKeyType='next'
                refNext={schoolRef}
                className='mb-4'
              />
              <SecondaryInput 
                placeholder='Escola'
                value={school}
                onChange={(e) => setSchool(e.nativeEvent.text)}
                returnKeyType='next'
                refInput={schoolRef}
                refNext={phoneRef}
                className='mb-4'
              />
              <SecondaryInput 
                placeholder='Telefone'
                value={phone}
                onChange={(e) => setPhone(e.nativeEvent.text)}
                type='phone-pad'
                returnKeyType='next'
                refInput={phoneRef}
                refNext={valueRef}
                className='mb-4'
              />
              <SecondaryInput 
                placeholder='Valor'
                value={monetaryValue}
                type='decimal-pad'
                refInput={valueRef}
                onChange={(e) => setMonetaryValue(e.nativeEvent.text)}
                className='mb-4'
              />
              <ButtonEdit 
                description='Salvar Alteração'
                colorButton='bg-blue-400'
                colorDescription='text-white'
                onPress={confirmAction}
                className='mb-2'
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
