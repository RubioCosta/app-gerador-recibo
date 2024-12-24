import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

// HTML template for the receipt
import { generateTemplateReceipt } from './templateReceipt';

export default function GenerateReceipt() {
  const [name, setName] = useState('');

  async function generateReceipt() {
    const html = generateTemplateReceipt();
    const { uri } = await printToFileAsync({ 
      html, 
      base64: false,
    }) ?? {};

    if (!uri) return;

    await shareAsync(uri);
  }

  return (
    <View>
      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <Button
        title="Generate Receipt"
        onPress={generateReceipt}
      />
    </View>
  )

}