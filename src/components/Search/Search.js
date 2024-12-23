import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const users = [
  { id: '1', name: 'John Doe', school: 'john.doe@example.com', value: 300, active: false, phone: '47999636379' },
  { id: '2', name: 'Jane Smith', school: 'jane.smith@example.com', value: 150, active: true, phone: '47999636379' },
  { id: '3', name: 'Carlos Gomez', school: 'carlos.gomez@example.com', value: 200, active: true, phone: '47999636379' },
  { id: '4', name: 'Alex Silva', school: 'alex.silva@example.com', value: 180, active: true, phone: '47999636379' },
  { id: '5', name: 'Maria Oliveira', school: 'maria.oliveira@example.com', value: 350, active: false, phone: '47999636379' },
  { id: '6', name: 'Pedro Souza', school: 'pedro.souza@example.com', value: 100, active: true, phone: '47999636379' },
  { id: '7', name: 'Luana Pereira', school: 'luana.pereira@example.com', value: 50, active: true, phone: '47999636379' },
  { id: '8', name: 'Paula Costa', school: 'paula.costa@example.com', value: 80, active: true, phone: '47999636379' },
  { id: '9', name: 'Ana Lima', school: 'ana.lima@example.com', value: 80, active: true, phone: '47999636379' },
  { id: '10', name: 'Lucas Santos', school: 'lucas.santos@example.com', value: 80, active: true, phone: '47999636379' },
  { id: '11', name: 'Carlos Souza', school: 'carlos.souza@example.com', value: 80, active: true, phone: '47999636379' },
  { id: '12', name: 'Pedro Costa', school: 'pedro.costa@example.com', value: 250, active: true, phone: '47999636379' },
  { id: '13', name: 'Maria Santos', school: 'maria.santos@example.com', value: 150, active: true, phone: '47999636379' },
  { id: '14', name: 'Alex Pereira', school: 'alex.pereira@example.com', value: 200, active: false, phone: '47999636379' },
  { id: '15', name: 'Jane Oliveira', school: 'jane.oliveira@example.com', value: 300, active: true, phone: '47999636379' },
  { id: '16', name: 'Luana Lima', school: 'luana.lima@example.com', value: 450, active: false, phone: '47999636379' },
  { id: '17', name: 'Carlos Lima', school: 'carlos.lima@example.com', value: 500, active: true, phone: '47999636379' },
  { id: '18', name: 'Paula Santos', school: 'paula.santos@example.com', value: 350, active: false, phone: '47999636379' },
  { id: '19', name: 'Ana Costa', school: 'ana.costa@example.com', value: 150, active: true, phone: '47999636379' },
  { id: '20', name: 'Lucas Oliveira', school: 'lucas.oliveira@example.com', value: 120, active: true, phone: '47999636379' },
];

// Components
import { SecondaryInput } from '../Inputs';
import { ModalSearchUser } from '../ModalSearchUser';
import { ModalEditUser } from '../ModalEditUser';

// Utils
import { formattedValue } from '../../utils/utils';

export function Search() {
  const [search, setSearch] = useState('');
  const [openModalSearch, setOpenModalSearch] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [showValue, setShowValue] = useState(false);
  const [showInactiveUser, setShowInactiveUser] = useState(false);
  const [user, setUser] = useState({});

  const filteredUsers = users.filter(user =>
    user.name 
    && user.name.toLowerCase().includes(search ? search.toLowerCase() : '')
    && (showInactiveUser ? true : user.active)
  ).sort((a, b) => b.active - a.active);

  function openWhatsApp(phoneWhatsApp) {
    const url = `whatsapp://send?phone=${phoneWhatsApp}`;

    Linking.openURL(url)
  }

  // Modal Configuration
  function closeModalConfiguration() {
    setOpenModalSearch(false);
  }

  function openModalConfiguration() {
    setOpenModalSearch(true);
  }

  function handlerSaveConfiguration(showValue, showInactiveUser) {
    if (showValue !== null) setShowValue(showValue);
    if (showInactiveUser !== null) setShowInactiveUser(showInactiveUser);
  }

  // Modal Edit User
  function handlerOpenEditUser(user) {
    setUser(user);
    setOpenModalEdit(true);
  }

  function cancelActionEdit() {
    setOpenModalEdit(false);
  }

  function confirmActionEdit() {
    setOpenModalEdit(false);
  }

  function renderUser({ item }) {
    return (
      <TouchableOpacity onPress={() => handlerOpenEditUser(item)} className={`mx-4 ${item.active ? 'bg-white' : 'bg-red-300'} mb-4 rounded-lg shadow-lg shadow-gray-700 flex flex-row`}>
        <View className='w-10/12 p-2'>
          <Text className="text-xl font-bold mb-2">{item.name}</Text>
          <Text>Escola: {item.school}</Text>
          <Text>Valor: {showValue ? formattedValue(item.value) : '******'}</Text>
        </View>
        <TouchableOpacity onPress={() => openWhatsApp(item.phone)} className='w-2/12 flex justify-center items-center bg-green-600 rounded-tr-lg rounded-br-lg'>
          <View className='flex justify-center items-center'>
            <FontAwesome5 name="whatsapp" size={24} color="#FFFFFF"/>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  return (
    <View className="flex-1  bg-white h-full">
      <View className='py-2 flex flex-row justify-center items-center border-b-2 border-gray-100'>
        <SecondaryInput 
          placeholder='Buscar'
          value={search}
          onChange={setSearch}
          className='mb-2 mt-2 w-10/12 pl-4 ml-4'
        />
        <TouchableOpacity onPress={openModalConfiguration} className='w-2/12 flex justify-center items-center mr-4'>
          <Ionicons className- name="settings" size={30} color="#60a5fa" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredUsers}
        renderItem={renderUser}
        keyExtractor={item => item.id}
      />
      <ModalSearchUser isOpen={openModalSearch} cancelAction={closeModalConfiguration} saveConfiguration={handlerSaveConfiguration} />
      {openModalEdit && (
        <ModalEditUser isOpen={openModalEdit} confirmAction={confirmActionEdit} cancelAction={cancelActionEdit} user={user}  /> 
      )}
    </View>
  );
}
