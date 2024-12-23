import { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

// Components
import { SecondaryInput } from '../Inputs';
import { Button as ButtonEdit } from '../Buttons';

export function ModalMonetaryValue({ isOpen, cancelAction, updateDataUser, user = {} }) {
  const [monetaryValue, setMonetaryValue] = useState('')
  const [totalValue, setTotalValue] = useState(0);
  const [name, setName] = useState('');

  useEffect(() => {
    setName(user.name);
    setTotalValue(String(user.value - user.paid) );
  }, []);

  function isPaid(value, paid) {
    return value === paid;
  }

  async function handlerSaveMonetaryValue() {

    if ((monetaryValue <= 0 || monetaryValue > totalValue) && !isPaid(user.value, user.paid)) return

    updateDataUser(user.id, isPaid(user.value, user.paid) ? (-1 * monetaryValue) : monetaryValue)
    cancelAction();
  }

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
              <Text className="text-md text-white font-semibold">Confirmar Valor Pago:</Text>
              <TouchableOpacity onPress={cancelAction}>
                <AntDesign name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View className='p-2 w-full pb-5 pl-5 pr-5'>
              <Text className='mb-2'><Text className='font-semibold'>Nome: </Text>{name}</Text>
              <Text className='mb-4'><Text className='font-semibold'>Valor Pendente: </Text>{totalValue}</Text>
              <SecondaryInput 
                placeholder='Valor Pago'
                value={monetaryValue}
                type='decimal-pad'
                onChange={(e) => setMonetaryValue(parseFloat(e.nativeEvent.text))}
                className='mb-4'
              />
              <ButtonEdit 
                description='Confirmar Pagamento'
                colorButton='bg-blue-400'
                colorDescription='text-white'
                onPress={handlerSaveMonetaryValue}
                className='mb-2'
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
