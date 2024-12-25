import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const users = [
  { id: '1', name: 'John Doe', school: 'john.doe@example.com', value: 300, paid: 200 },
  { id: '2', name: 'Jane Smith', school: 'jane.smith@example.com', value: 150, paid: 150 },
  { id: '3', name: 'Carlos Gomez', school: 'carlos.gomez@example.com', value: 200, paid: 0 },
  { id: '4', name: 'Alex Silva', school: 'alex.silva@example.com', value: 180, paid: 180 },
  { id: '5', name: 'Maria Oliveira', school: 'maria.oliveira@example.com', value: 350, paid: 150 },
  { id: '6', name: 'Pedro Souza', school: 'pedro.souza@example.com', value: 100, paid: 100 },
  { id: '7', name: 'Luana Pereira', school: 'luana.pereira@example.com', value: 50, paid: 0 },
  { id: '8', name: 'Paula Costa', school: 'paula.costa@example.com', value: 80, paid: 50 },
  { id: '9', name: 'Ana Lima', school: 'ana.lima@example.com', value: 80, paid: 80 },
  { id: '10', name: 'Lucas Santos', school: 'lucas.santos@example.com', value: 80, paid: 40 },
  { id: '11', name: 'Carlos Souza', school: 'carlos.souza@example.com', value: 80, paid: 20 },
  { id: '12', name: 'Pedro Costa', school: 'pedro.costa@example.com', value: 250, paid: 200 },
  { id: '13', name: 'Maria Santos', school: 'maria.santos@example.com', value: 150, paid: 100 },
  { id: '14', name: 'Alex Pereira', school: 'alex.pereira@example.com', value: 200, paid: 200 },
  { id: '15', name: 'Jane Oliveira', school: 'jane.oliveira@example.com', value: 300, paid: 300 },
  { id: '16', name: 'Luana Lima', school: 'luana.lima@example.com', value: 450, paid: 300 },
  { id: '17', name: 'Carlos Lima', school: 'carlos.lima@example.com', value: 500, paid: 400 },
  { id: '18', name: 'Paula Santos', school: 'paula.santos@example.com', value: 350, paid: 350 },
  { id: '19', name: 'Ana Costa', school: 'ana.costa@example.com', value: 150, paid: 120 },
  { id: '20', name: 'Lucas Oliveira', school: 'lucas.oliveira@example.com', value: 120, paid: 80 },
];

// Utils
import { formattedValue } from '../../utils/utils';

// Components
import { ModalSearchUser } from '../../components/ModalSearchUser';
import { SecondaryInput } from '../../components/Inputs';
import { ModalMonetaryValue } from '../../components/ModalMonetaryValue';

export default function CheckPayment() {
  const [search, setSearch] = useState('');
  const [showValue, setShowValue] = useState(false);

  const [user, setUser] = useState({});

  const [openModalConfig, setOpenModalConfig] = useState(false);
  const [openModalValue, setOpenModalValue] = useState(false);

  const filteredUsers = users.filter(user =>
    user.name 
    && user.name.toLowerCase().includes(search ? String(search).toLowerCase() : '')
  ).sort((a, b) => {
    const aIsPaid = a.paid >= a.value;
    const bIsPaid = b.paid >= b.value;

    if (!aIsPaid && bIsPaid) {
      return -1;
    }
    if (aIsPaid && !bIsPaid) {
      return 1;
    }

    return b.value - a.value;
  });

  // Configuration
  function saveConfiguration(showValue) {
    if (showValue !== null) {
      setShowValue(showValue);
    }
  }

  function openModalConfiguration() {
    setOpenModalConfig(true);
  }

  function closeModalConfiguration() {
    setOpenModalConfig(false);
  }

  // Monetary Value
  function openModalMonetaryValue(user) {
    setUser(user);
    setOpenModalValue(true);
  }

  function closeModalMonetaryValue() {
    setOpenModalValue(false);
  }

  function updateDataUser(id, valuePaid) {
    filteredUsers.forEach(user => {
      if (user.id === id) {
        console.log(parseFloat(valuePaid) + user.paid)
        user.paid = parseFloat(valuePaid) + user.paid;
      }
    });
  }

  function isPaid(value, paid) {
    return value === paid;
  }

  function valuePending(value, paid) {
    return isPaid(value, paid) ? formattedValue(value) : formattedValue(value - paid);
  }

  function renderUser({ item }) {
    return (
      <TouchableOpacity onPress={() => openModalMonetaryValue(item)} className={`mx-4 ${isPaid(item.value, item.paid) ? 'bg-green-300' : 'bg-red-300'} mb-4 rounded-lg shadow-lg shadow-gray-700 flex flex-row`}>
        <View className='w-10/12 p-2 '>
          <Text className="text-xl font-bold mb-2">{item.name}</Text>
          <Text>Escola: {item.school}</Text>
          <Text>Valor {isPaid(item.value, item.paid) ? 'Pago' : 'Pendente'}: {showValue ? valuePending(item.value, item.paid) : '******'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-white h-full">
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
      <ModalSearchUser 
        isOpen={openModalConfig} 
        cancelAction={closeModalConfiguration} 
        saveConfiguration={saveConfiguration}
        isShowInactiveUser={false}
      />
      {openModalValue && (
        <ModalMonetaryValue 
          isOpen={openModalValue} 
          cancelAction={closeModalMonetaryValue}
          updateDataUser={updateDataUser}
          user={user}
        />
      )}
    </View>
  );
}
