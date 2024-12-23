import React, { useState } from 'react';
import { View, Button, Alert, TextInput } from 'react-native';
import { PDFDocument, rgb } from 'react-native-pdf-lib';
import RNFS from 'react-native-fs'; // Para salvar no sistema de arquivos

export default function generateReceipt() {
  const [name, setName] = useState('');
  const [pdfPath, setPdfPath] = useState('');

  const generatePDF = async () => {
    if (!name) {
      Alert.alert('Erro', 'Por favor, insira um nome');
      return;
    }

    try {
      // Caminho do PDF gerado
      const pdfPath = `${RNFS.DocumentDirectoryPath}/example.pdf`;

      // Criando o PDF
      const page = PDFDocument.create()
        .addPage()
        .setFontSize(20) // Defina o tamanho da fonte
        .setTextColor(0, 0, 0); // Cor preta

      // Definir a largura e a altura da página para dividir em 4 partes
      const pageWidth = 595;  // Largura padrão em pontos (A4)
      const pageHeight = 842; // Altura padrão em pontos (A4)

      // Dimensões de cada "bloco" da página (dividindo a página em 4)
      const blockWidth = pageWidth / 2;
      const blockHeight = pageHeight / 2;

      // Desenhar o nome nos 4 blocos (2x2)
      const positions = [
        { x: 30, y: 780 }, // Bloco superior esquerdo
        { x: blockWidth + 30, y: 780 }, // Bloco superior direito
        { x: 30, y: blockHeight - 30 }, // Bloco inferior esquerdo
        { x: blockWidth + 30, y: blockHeight - 30 }, // Bloco inferior direito
      ];

      positions.forEach(pos => {
        page.drawText(name, {
          x: pos.x,
          y: pos.y,
          width: blockWidth - 60, // Limitar a largura do texto
          height: blockHeight - 60, // Limitar a altura do texto
          color: rgb(0, 0, 0), // Cor do texto
        });
      });

      // Salvando o arquivo PDF
      await page.saveToFile(pdfPath);

      // Atualizando o estado com o caminho do PDF gerado
      setPdfPath(pdfPath);

      // Exibindo um alerta com o caminho do PDF gerado
      Alert.alert('PDF Gerado!', `Arquivo salvo em: ${pdfPath}`);
    } catch (error) {
      console.error('Erro ao gerar o PDF: ', error);
      Alert.alert('Erro', 'Houve um erro ao gerar o PDF');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="Digite o nome"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, width: '80%', padding: 10, marginBottom: 20 }}
      />
      <Button title="Gerar PDF" onPress={generatePDF} />
      {pdfPath ? <Alert alert={pdfPath} /> : null}
    </View>
  );
}