import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Dialog,
  Button,
  Text,
  Portal,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RegistroCiclo } from '@/data/ciclo/ciclo.types';

interface EncerrarRegistroDialogProps {
  visivel: boolean;
  registro: RegistroCiclo | null;
  carregando: boolean;
  onFechar: () => void;
  onConfirmar: (dataFim: Date) => Promise<void>;
}

export function EncerrarRegistroDialog({
  visivel,
  registro,
  carregando,
  onFechar,
  onConfirmar,
}: EncerrarRegistroDialogProps) {
  const [dataFim, setDataFim] = useState(new Date());
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);

  const handleDataMudada = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDataFim(selectedDate);
    }
    setMostrarDatePicker(false);
  };

  const handleConfirmar = async () => {
    if (registro) {
      try {
        await onConfirmar(dataFim);
        onFechar();
      } catch (error) {
        console.error('Erro ao encerrar:', error);
      }
    }
  };

  if (!registro) return null;

  const duracao = Math.floor(
    (dataFim.getTime() - registro.dataInicio.getTime()) / (1000 * 60 * 60 * 24)
  ) + 1;

  return (
    <Portal>
      <Dialog visible={visivel} onDismiss={onFechar}>
        <Dialog.Title>Encerrar Ciclo</Dialog.Title>
        <Dialog.Content>
          <View style={styles.content}>
            <Text style={styles.infoText}>
              Iniciado em: <Text style={styles.bold}>{registro.dataInicio.toLocaleDateString('pt-BR')}</Text>
            </Text>

            <Text style={[styles.label, styles.marginTop]}>Data de término</Text>
            <Button
              mode="outlined"
              onPress={() => setMostrarDatePicker(true)}
              style={styles.button}
            >
              {dataFim.toLocaleDateString('pt-BR')}
            </Button>

            {mostrarDatePicker && (
              <DateTimePicker
                value={dataFim}
                mode="date"
                display="default"
                onChange={handleDataMudada}
                minimumDate={registro.dataInicio}
                maximumDate={new Date()}
              />
            )}

            <Text style={[styles.label, styles.marginTop]}>Duração estimada</Text>
            <Text style={styles.duracao}>{duracao} dias</Text>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onFechar} disabled={carregando}>
            Cancelar
          </Button>
          <Button
            mode="contained"
            onPress={handleConfirmar}
            loading={carregando}
            disabled={carregando}
          >
            Confirmar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  marginTop: {
    marginTop: 12,
  },
  button: {
    marginTop: 8,
  },
  duracao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D946A6',
    marginTop: 4,
  },
});
