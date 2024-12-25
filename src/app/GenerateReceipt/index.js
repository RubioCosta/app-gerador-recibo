import { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import Toast from 'react-native-toast-message';

// HTML template for the receipt
import { generateTemplateReceipt } from './templateReceipt';

// Comnponents
import { MaskInput, SecondaryInput, ToggleInput } from '../../components/Inputs';
import { Button } from '../../components/Buttons';

// Utils
import { convertDateFromBrazil } from '../../utils/dateFunctions';

export default function GenerateReceipt() {
  const [date, setDate] = useState(convertDateFromBrazil(new Date().toISOString().split('T')[0]));
  const [description, setDescription] = useState('Transporte Particular');
  const [isHalfValue, setIsHalfValue] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  function showToast(type, typeDescription, description) {
    Toast.show({
      type,
      text1: typeDescription,
      text2: description,
      position: 'top',
      text2Style: {
        fontSize: 16
      },
    });
  };

  async function generateReceipt() {

    if (loading) return;

    if (data.length <= 0) return showToast('error', 'Aviso', 'Nenhuma pessoa ativa cadastrada!');

    setLoading(true);

    const [day, month, year] = date.split('/');
    const html = generateTemplateReceipt(day, month, year, description, isHalfValue, data);

    const { uri } = await printToFileAsync({ 
      html, 
      base64: false,
      width: 842,
      height: 595,
    }) ?? {};

    if (!uri) return;

    await shareAsync(uri);
    setLoading(false);
  }

  return (
    <View className='flex-1 px-4 pt-4'>
      <MaskInput
        value={date}
        onChange={(value) => setDate(value)}
        mask='99/99/9999'
        placeholder='Informe a data'
      />
      <SecondaryInput
        value={description}
        onChange={(e) => setDescription(e.nativeEvent.text)}
        className='mt-4'
      />
      <ToggleInput
        value={isHalfValue}
        onChange={(value) => setIsHalfValue(value)}
        placeholder='Valor da mensalidade em 50%'
        className='mt-4 mb-4'
      />
      <Button
        description="Gerar Recibo"
        onPress={generateReceipt}
        colorButton='bg-blue-400'
        colorIcon='#FFFFFF'
        isLoading={loading}
      />
      <Toast />
    </View>
  )

}