import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Dialog,
  Button,
  Text,
  TextInput,
  Portal,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

interface NovoRegistroDialogProps {
  visivel: boolean;
  carregando: boolean;
  onFechar: () => void;
  onSalvar: (dataInicio: Date, notas?: string) => Promise<void>;
}

export function NovoRegistroDialog({
  visivel,
  carregando,
  onFechar,
  onSalvar,
}: NovoRegistroDialogProps) {
  const [dataInicio, setDataInicio] = useState(new Date());
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);
  const [notas, setNotas] = useState('');

  const handleDataMudada = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDataInicio(selectedDate);
    }
    setMostrarDatePicker(false);
  };

  const handleSalvar = async () => {
    try {
      await onSalvar(dataInicio, notas || undefined);
      setDataInicio(new Date());
      setNotas('');
      onFechar();
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  return (
    <Portal>
      <Dialog visible={visivel} onDismiss={onFechar}>
        <Dialog.Title>Iniciar Novo Ciclo</Dialog.Title>
        <Dialog.Content>
          <View style={styles.content}>
            <Text style={styles.label}>Data de início</Text>
            <Button
              mode="outlined"
              onPress={() => setMostrarDatePicker(true)}
              style={styles.button}
            >
              {dataInicio.toLocaleDateString('pt-BR')}
            </Button>

            {mostrarDatePicker && (
              <DateTimePicker
                value={dataInicio}
                mode="date"
                display="default"
                onChange={handleDataMudada}
                maximumDate={new Date()}
              />
            )}

            <Text style={[styles.label, styles.marginTop]}>Notas (opcional)</Text>
            <TextInput
              mode="outlined"
              placeholder="Ex: fluxo intenso, cólicas..."
              value={notas}
              onChangeText={setNotas}
              multiline
              numberOfLines={3}
            />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onFechar} disabled={carregando}>
            Cancelar
          </Button>
          <Button
            mode="contained"
            onPress={handleSalvar}
            loading={carregando}
            disabled={carregando}
          >
            Salvar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  marginTop: {
    marginTop: 8,
  },
  button: {
    marginBottom: 8,
  },
});
