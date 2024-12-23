import React from 'react';
import { Modal, View, Text, Button } from 'react-native';

export function ModalCreateUser({ isOpen, confirmAction, cancelAction, user = {} }) {
  return (
    <View className="flex-1 justify-center items-cente absolute">
      <Modal
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={cancelAction}
      >
        <View className="flex-1 justify-center items-center pl-5 pr-5" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
          <View className="w-full p-5 bg-white rounded-lg items-center justify-center">
            <Text className="text-lg mb-2 w-full">Tem certeza que deseja cadastrar?</Text>
            <View className='bg-white w-full p-3 rounded-lg'>
              <Text className='mb-1'>
                <Text className='font-semibold'>Nome: </Text>{user.name}
              </Text>
              <Text className='mb-1'>
                <Text className='font-semibold'>Escola: </Text>{user.school}
              </Text>
              <Text className='mb-1'>
                <Text className='font-semibold'>Telefone: </Text>{user.phone}
              </Text>
              <Text>
                <Text className='font-semibold'>Valor: </Text>{user.value}
              </Text>
            </View>
            <View className="flex-row justify-between w-full mt-5">
              <Button color='#FF0000' title="Cancelar" onPress={cancelAction} />
              <Button color='#008000'  title="Confirmar" onPress={confirmAction} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
