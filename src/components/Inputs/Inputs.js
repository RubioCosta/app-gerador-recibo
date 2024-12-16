import { View, TextInput, Text } from 'react-native';

export function Input({ 
  label, 
  value, 
  onChange, 
  placeholder = null, 
  className = '', 
  refInput = null, 
  returnKeyType = 'done',
  isSecureText = false,
}) {
  return (
    <View className={`w-full ${className}`}>
      <Text className='text-white font-semibold mb-1 text-base'>{label}</Text>
      <TextInput
        ref={refInput}
        className='w-full bg-white h-10 p-2 font-semibold border-none rounded-lg'
        placeholder={placeholder ?? label}
        value={value}
        secureTextEntry={isSecureText}
        onChange={onChange}
        returnKeyType={returnKeyType}
        onSubmitEditing={returnKeyType === 'next' ? () => ref.current.focus() : null}
      />
    </View>
  );
}