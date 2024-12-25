import { TextInput, Text, Switch, KeyboardAvoidingView, Platform } from 'react-native';
import { MaskedTextInput } from "react-native-mask-text";

export function Input({ 
  label, 
  value, 
  onChange, 
  placeholder = null, 
  className = '', 
  refInput = null, 
  returnKeyType = 'done',
  type = 'default',
  isSecureText = false,
  refNext = null
}) {
  return (
    <KeyboardAvoidingView className={`w-full ${className}`} behavior={`${Platform.OS === 'ios' ? 'padding' : 'height' }`}>
      {label && (
        <Text className='text-white font-semibold mb-1 text-base'>{label}</Text>
      )}
      <TextInput
        ref={refInput}
        className={`w-full bg-white h-10 p-2 font-semibold border-none rounded-lg`}
        placeholder={placeholder ?? label}
        value={value}
        secureTextEntry={isSecureText}
        onChange={onChange}
        keyboardType={type}
        returnKeyType={returnKeyType}
        onSubmitEditing={returnKeyType === 'next' ? () => refNext.current.focus() : null}
      />
    </KeyboardAvoidingView>
  );
}

export function SecondaryInput({ 
  value, 
  onChange, 
  placeholder = null, 
  className = '', 
  refInput = null, 
  returnKeyType = 'done',
  isSecureText = false,
  type = 'default',
  refNext = null
}) {
  return (
    <KeyboardAvoidingView className={`${className}`} behavior={`${Platform.OS === 'ios' ? 'padding' : 'height' }`}>
      <TextInput
        ref={refInput}
        className='w-full bg-white h-12 p-2 font-semibold border rounded-lg border-blue-500'
        placeholder={placeholder}
        value={value}
        secureTextEntry={isSecureText}
        onChange={onChange}
        keyboardType={type}
        returnKeyType={returnKeyType}
        onSubmitEditing={returnKeyType === 'next' ? () => refNext.current.focus() : null}
      />
    </KeyboardAvoidingView>
  );
}

export function ToggleInput({ 
  value, 
  onChange, 
  placeholder = null, 
  className = '', 
}) {
  return (
    <KeyboardAvoidingView className={`${className} flex flex-row w-full items-center align-middle`} behavior={`${Platform.OS === 'ios' ? 'padding' : 'height' }`}>
      <Switch 
        value={value} 
        onValueChange={onChange} 
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={value ? "#22c55e" : "#d1d5db"}
        className='mr-2'
      />
      <Text className='text-black font-semibold'>{placeholder}</Text>
    </KeyboardAvoidingView>
  );
}

export function MaskInput({ 
  value, 
  onChange, 
  className = '',
  mask = '',
  placeholder = ''
}) {
  return (
    <KeyboardAvoidingView 
      className={`${className} flex flex-row items-center align-middle w-full bg-white h-12 pl-2 font-semibold border rounded-lg border-blue-500`} 
      behavior={`${Platform.OS === 'ios' ? 'padding' : 'height' }`
    }>
      <MaskedTextInput
        mask={mask}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        style={{
          border: 'none',
          outline: 'none',
          width: '100%'
        }}
      />
    </KeyboardAvoidingView>
  );
}