import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Foundation from '@expo/vector-icons/Foundation';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { Platform } from 'react-native';

// Pages
import CheckPayment from '../CheckPayment';
import Dashboard from '../Dashboard';
import GenerateReceipt from '../GenerateReceipt';
import UserConfiguration from '../UserConfiguration';

// Components
import { Layout } from '../../components/Layout';

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <Layout>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#60a5fa',
          tabBarActiveBackgroundColor: '#ffffff',
          tabBarInactiveTintColor: '#ffffff',
          tabBarStyle: {
            backgroundColor: '#60a5fa',
            height: 62,
            borderTopWidth: 0,
            borderBottomWidth: 0,
            shadowOpacity: 0,
            elevation: 0,
            shadowColor: 'transparent',
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '700',
            marginTop: 5,
          }
        }}
      >
        <Tab.Screen 
          name="GenerateReceipt" 
          component={GenerateReceipt}
          options={{ 
            title: 'Recibos',
            tabBarIcon: ({ focused }) => (
              <FontAwesome6 name="file-arrow-down" size={22} color={focused ? '#60a5fa' : '#ffffff'} />
            ),
            tabBarLabel: 'Recibos'
          }}
        />
        <Tab.Screen 
          name="CheckPayment" 
          component={CheckPayment}
          options={{ 
            title: 'Pagamento',
            tabBarIcon: ({ focused }) => (
              <MaterialIcons name="payments" size={23} color={focused ? '#60a5fa' : '#ffffff'} />
            ),
            tabBarLabel: 'Pagamento',
          }}
        />
        <Tab.Screen 
          name="UserConfiguration" 
          component={UserConfiguration}
          options={{ 
            title: 'Configuração',
            tabBarIcon: ({ focused }) => (
              <FontAwesome6 name="gears" size={22} color={focused ? '#60a5fa' : '#ffffff'} />
            ),
            tabBarLabel: 'Configuração'
          }}
        />
        <Tab.Screen 
          name="Dashboard" 
          component={Dashboard} 
          options={{ 
            title: 'Dados',
            tabBarIcon: ({ focused }) => (
              <Foundation name="graph-pie" size={25} color={focused ? '#60a5fa' : '#ffffff'}/>
            ),
            tabBarLabel: 'Dados'
          }}
        />
      </Tab.Navigator>
    </Layout>
  )
}