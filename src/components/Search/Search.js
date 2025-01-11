import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const users = []

// Components
import { SecondaryInput } from '../Inputs';
import { ModalSearchUser } from '../ModalSearchUser';
import { ModalEditUser } from '../ModalEditUser';

// Utils
import { formattedValue } from '../../utils/utils';

// Database
import { getAll } from '../../config/database'

// Context
import { useAuthContext } from '../../context/AuthContext'

export function Search() {
  const { user: dataUser } = useAuthContext()

  const [search, setSearch] = useState('');
  const [openModalSearch, setOpenModalSearch] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [showValue, setShowValue] = useState(false);
  const [showInactiveUser, setShowInactiveUser] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

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

  function confirmActionEdit(user) {
    setOpenModalEdit(false);
  }

  async function getAllUsers() {
    try {
      const response = await getAll(`${dataUser?.emailFormatted}/users/`)
      setUsers(response)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllUsers();
  }, [])

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
