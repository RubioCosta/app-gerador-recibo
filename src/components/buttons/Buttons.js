import { TouchableOpacity, Text, View } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export function Button({ 
  icon = '', 
  description = '', 
  onPress, 
  className = '', 
  colorButton = 'bg-blue-900', 
  colorIcon = 'white',
  colorDescription = 'text-white',
}) {
  return (
    <View className={className}>
      <TouchableOpacity 
        onPress={onPress} 
        className={`h-9 flex flex-row justify-center items-center w-full ${colorButton} rounded-sm`}
      >
        {icon && (
          <FontAwesome6 name={icon} size={15} color={colorIcon} className='mr-2' />
        )}
        <Text className={`font-semibold text-xl ${colorDescription}`}>{description}</Text>
      </TouchableOpacity>
    </View>
  );
}