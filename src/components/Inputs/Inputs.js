import { View, TextInput, Text } from 'react-native';

export function Input({ label, value, onChange, placeholder = null, className = '', ref, returnKeyType = 'done' }) {
  return (
    <View className={`w-full ${className}`}>
      <Text className='text-white font-semibold mb-1 text-lg'>{label}</Text>
      <TextInput
        ref={ref}
        className='w-full bg-white h-9 p-2 font-semibold border-none rounded-sm'
        placeholder={placeholder ?? label}
        value={value}
        onChange={onChange}
        returnKeyType={returnKeyType}
        onSubmitEditing={returnKeyType === 'next' ? () => ref.current.focus() : null}
      />
    </View>
  );
}