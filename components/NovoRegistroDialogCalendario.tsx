import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import {
  Dialog,
  Button,
  Text,
  TextInput,
  Portal,
  Divider,
} from 'react-native-paper';
import { Calendar } from 'react-native-calendars';

interface NovoRegistroDialogCalendarioProps {
  visivel: boolean;
  carregando: boolean;
  onFechar: () => void;
  onSalvar: (dataInicio: Date, notas?: string) => Promise<void>;
}

export function NovoRegistroDialogCalendario({
  visivel,
  carregando,
  onFechar,
  onSalvar,
}: NovoRegistroDialogCalendarioProps) {
  const hoje = new Date();
  const dataStr = hoje.toISOString().split('T')[0];
  
  const [dataInicio, setDataInicio] = useState(dataStr);
  const [notas, setNotas] = useState('');

  const handleSalvar = async () => {
    try {
      const data = new Date(dataInicio);
      await onSalvar(data, notas || undefined);
      setDataInicio(dataStr);
      setNotas('');
      onFechar();
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  const markedDates = {
    [dataInicio]: {
      selected: true,
      selectedColor: '#D946A6',
      selectedTextColor: '#FFF',
    },
  };

  return (
    <Portal>
      <Dialog visible={visivel} onDismiss={onFechar} style={styles.dialog}>
        <Dialog.Title>Iniciar Novo Ciclo</Dialog.Title>
        <Dialog.Content>
          <ScrollView style={styles.content}>
            <Text style={styles.label}>Selecione a data de início</Text>
            <Calendar
              current={dataInicio}
              onDayPress={(day) => setDataInicio(day.dateString)}
              maxDate={dataStr}
              markedDates={markedDates}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#999',
                textSectionTitleDisabledColor: '#d9e1e8',
                selectedDayBackgroundColor: '#D946A6',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#D946A6',
                dayTextColor: '#333',
                textDisabledColor: '#d9e1e8',
                dotColor: '#D946A6',
                selectedDotColor: '#ffffff',
                arrowColor: '#D946A6',
                disabledArrowColor: '#d9e1e8',
                monthTextColor: '#333',
                indicatorColor: '#D946A6',
                textDayFontFamily: 'Roboto',
                textMonthFontFamily: 'Roboto',
                textDayHeaderFontFamily: 'Roboto',
                textDayFontSize: 14,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 12,
              }}
            />

            <Divider style={styles.divider} />

            <Text style={[styles.label, styles.marginTop]}>
              Data selecionada: <Text style={styles.dataDestaque}>
                {new Date(dataInicio).toLocaleDateString('pt-BR')}
              </Text>
            </Text>

            <Text style={[styles.label, styles.marginTop]}>Notas (opcional)</Text>
            <TextInput
              mode="outlined"
              placeholder="Ex: fluxo intenso, cólicas, humor..."
              value={notas}
              onChangeText={setNotas}
              multiline
              numberOfLines={3}
            />
          </ScrollView>
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
            Registrar Ciclo
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialog: {
    maxHeight: '90%',
  },
  content: {
    gap: 16,
    maxHeight: 600,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  marginTop: {
    marginTop: 12,
  },
  dataDestaque: {
    fontSize: 14,
    fontWeight: '700',
    color: '#D946A6',
  },
  divider: {
    marginVertical: 16,
  },
});
