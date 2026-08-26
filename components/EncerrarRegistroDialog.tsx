import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
  Dialog,
  Button,
  Text,
  Portal,
  Divider,
} from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { RegistroCiclo } from '@/data/ciclo/ciclo.types';

interface EncerrarRegistroDialogProps {
  visivel: boolean;
  registro: RegistroCiclo | null;
  carregando: boolean;
  onFechar: () => void;
  onConfirmar: (dataFim: Date) => Promise<void>;
}

interface MarcacaoData {
  startingDay?: boolean;
  endingDay?: boolean;
  color?: string;
  textColor?: string;
}

type MarkedDatesType = Record<string, MarcacaoData>;

export function EncerrarRegistroDialog({
  visivel,
  registro,
  carregando,
  onFechar,
  onConfirmar,
}: EncerrarRegistroDialogProps) {
  const hoje = new Date().toISOString().split('T')[0];
  const [dataFim, setDataFim] = useState<string>(hoje);

  const handleConfirmar = async () => {
    if (!registro) {
      return;
    }

    try {
      await onConfirmar(new Date(dataFim));
      onFechar();
    } catch (error) {
      console.error('Erro ao encerrar:', error);
    }
  };

  if (!registro) {
    return null;
  }

  const inicioStr = new Date(registro.dataInicio)
    .toISOString()
    .split('T')[0];

  const duracao =
    Math.floor(
      (new Date(dataFim).getTime() -
        new Date(inicioStr).getTime()) /
        (1000 * 60 * 60 * 24)
    ) + 1;

  const markedDates: MarkedDatesType = {};

  if (inicioStr === dataFim) {
    markedDates[inicioStr] = {
      startingDay: true,
      endingDay: true,
      color: '#FFE8F2',
      textColor: '#D946A6',
    };
  } else {
    markedDates[inicioStr] = {
      startingDay: true,
      color: '#FFE8F2',
      textColor: '#D946A6',
    };

    let currentDate = new Date(inicioStr);
    const finalDate = new Date(dataFim);

    while (currentDate < finalDate) {
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);

      const dateStr = currentDate
        .toISOString()
        .split('T')[0];

      if (dateStr !== dataFim) {
        markedDates[dateStr] = {
          color: '#FFD0E8',
          textColor: '#D946A6',
        };
      }
    }

    markedDates[dataFim] = {
      endingDay: true,
      color: '#FFE8F2',
      textColor: '#D946A6',
    };
  }

  return (
    <Portal>
      <Dialog
        visible={visivel}
        onDismiss={onFechar}
        style={styles.dialog}
      >
        <Dialog.Title>Encerrar Ciclo</Dialog.Title>

        <Dialog.Content>
          <ScrollView style={styles.content}>
            <Text style={styles.infoText}>
              Iniciado em:{' '}
              <Text style={styles.bold}>
                {new Date(
                  registro.dataInicio
                ).toLocaleDateString('pt-BR')}
              </Text>
            </Text>

            <Divider style={styles.divider} />

            <Text style={styles.label}>
              Selecione a data de término
            </Text>

            <Calendar
              current={dataFim}
              onDayPress={(day) => {
                setDataFim(day.dateString);
              }}
              minDate={inicioStr}
              maxDate={hoje}
              markedDates={markedDates}
              markingType="period"
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#999',
                textSectionTitleDisabledColor: '#d9e1e8',
                selectedDayBackgroundColor: '#D946A6',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#D946A6',
                todayBackgroundColor: '#FFE8F2',
                dayTextColor: '#333',
                textDisabledColor: '#d9e1e8',
                dotColor: '#D946A6',
                selectedDotColor: '#ffffff',
                arrowColor: '#D946A6',
                disabledArrowColor: '#d9e1e8',
                monthTextColor: '#333',
                indicatorColor: '#D946A6',
                textDayFontSize: 14,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 12,
              }}
            />

            <Divider style={styles.divider} />

            <Text style={styles.label}>Resumo</Text>

            <View style={styles.resumo}>
              <View style={styles.resumoItem}>
                <Text style={styles.resumoLabel}>
                  Data de término
                </Text>

                <Text style={styles.resumoValor}>
                  {new Date(
                    `${dataFim}T12:00:00`
                  ).toLocaleDateString('pt-BR')}
                </Text>
              </View>

              <View style={styles.resumoItem}>
                <Text style={styles.resumoLabel}>
                  Duração
                </Text>

                <Text style={styles.resumoValor}>
                  {duracao} {duracao === 1 ? 'dia' : 'dias'}
                </Text>
              </View>
            </View>
          </ScrollView>
        </Dialog.Content>

        <Dialog.Actions>
          <Button
            onPress={onFechar}
            disabled={carregando}
          >
            Cancelar
          </Button>

          <Button
            mode="contained"
            onPress={handleConfirmar}
            loading={carregando}
            disabled={carregando}
          >
            Encerrar Ciclo
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
    gap: 12,
    maxHeight: 600,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    marginTop: 4,
  },
  divider: {
    marginVertical: 12,
  },
  resumo: {
    gap: 8,
  },
  resumoItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFF9FB',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#D946A6',
  },
  resumoLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#999',
    marginBottom: 2,
  },
  resumoValor: {
    fontSize: 14,
    fontWeight: '700',
    color: '#D946A6',
  },
});