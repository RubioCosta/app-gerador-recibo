import { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

// Components
import { ToggleInput } from '../Inputs';

export function ModalSearchUser({ isOpen, cancelAction, saveConfiguration, isShowInactiveUser = true }) {
  const [showValue, setShowValue] = useState(false);
  const [showInactiveUser, setShowInactiveUser] = useState(false);

  return (
    <View className="flex-1 justify-center items-cente absolute">
      <Modal
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={cancelAction}
      >
        <View className="flex-1 justify-center items-center pl-5 pr-5" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
          <View className="w-full bg-white rounded-lg">
            <View className='w-full flex items-center justify-between flex-row mb-2 bg-blue-400 p-5 rounded-tl-lg rounded-tr-lg'>
              <Text className="text-md text-white font-semibold">Configuração de exibição:</Text>
              <TouchableOpacity onPress={cancelAction}>
                <AntDesign name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View className={`pl-5 pr-5 ${isShowInactiveUser ? 'pb-5' : 'pb-3'}`}>
              <ToggleInput 
                value={showValue}
                onChange={(e) => {
                  setShowValue(e)
                  saveConfiguration(e,null)
                }}
                placeholder="Mostrar valor"
              />
              {isShowInactiveUser && (
                <ToggleInput 
                  value={showInactiveUser}
                  onChange={(e) => {
                    setShowInactiveUser(e)
                    saveConfiguration(null,e)
                  }}
                  placeholder="Mostrar usuários inativos"
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
