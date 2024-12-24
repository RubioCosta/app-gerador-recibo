import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

// HTML template for the receipt
import { generateTemplateReceipt } from './templateReceipt';

// Comnponents
import { DateInput } from '../../components/Inputs';

export default function GenerateReceipt() {
  const [date, setDate] = useState('');

  async function generateReceipt() {
    const html = generateTemplateReceipt();

    const { uri } = await printToFileAsync({ 
      html, 
      base64: false,
      width: 842,
      height: 595,
    }) ?? {};

    if (!uri) return;

    await shareAsync(uri);
  }

  console.log("Date: ", date);

  return (
    <View>
      <DateInput
        value={date}
        onChange={(e) => setDate(e.date)}
      />
      <Button
        title="Generate Receipt"
        onPress={generateReceipt}
      />
    </View>
  )

}