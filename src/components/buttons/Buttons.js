import { TouchableOpacity, Text, View } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export function Button({ 
  icon = null, 
  description = '', 
  onPress, 
  className = '', 
  colorButton = 'bg-blue-900', 
  colorIcon = 'white',
  colorDescription = 'text-white',
}) {
  return (
    <View className={`w-full ${className}`}>
      <TouchableOpacity 
        onPress={onPress} 
        className={`h-10 flex flex-row justify-center items-center w-full ${colorButton} rounded-lg`}
      >
        {icon && (
          <FontAwesome6 name={icon} size={15} color={colorIcon} className='mr-2' />
        )}
        <Text className={`font-semibold text-base ${colorDescription}`}>{description}</Text>
      </TouchableOpacity>
    </View>
  );
}