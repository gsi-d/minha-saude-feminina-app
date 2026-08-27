import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { RegistroCiclo } from '@/data/ciclo/ciclo.types';

interface CalendarioCiclosProps {
  registros: RegistroCiclo[];
}

// Converte Date para YYYY-MM-DD usando a data LOCAL,
// sem passar por UTC/toISOString.
function formatarDataLocal(data: Date) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
}

function normalizarData(data: Date) {
  return new Date(
    data.getFullYear(),
    data.getMonth(),
    data.getDate(),
    12,
    0,
    0
  );
}

export function CalendarioCiclos({
  registros,
}: CalendarioCiclosProps) {
  const markedDates: Record<string, any> = {};

  registros.forEach((registro) => {
    const dataInicio = normalizarData(
      new Date(registro.dataInicio)
    );

    const dataFim = registro.dataFim
      ? normalizarData(new Date(registro.dataFim))
      : null;

    const inicioStr = formatarDataLocal(dataInicio);

    // Ciclo ainda em andamento:
    // marca somente o dia de início.
    if (!dataFim) {
      markedDates[inicioStr] = {
        startingDay: true,
        endingDay: true,
        color: '#FFE8F2',
        textColor: '#D946A6',
      };

      return;
    }

    const fimStr = formatarDataLocal(dataFim);

    // Início e fim no mesmo dia
    if (inicioStr === fimStr) {
      markedDates[inicioStr] = {
        startingDay: true,
        endingDay: true,
        color: '#FFE8F2',
        textColor: '#D946A6',
      };

      return;
    }

    // Primeiro dia
    markedDates[inicioStr] = {
      startingDay: true,
      color: '#FFE8F2',
      textColor: '#D946A6',
    };

    // Dias intermediários
    let currentDate = new Date(dataInicio);

    currentDate.setDate(currentDate.getDate() + 1);

    while (currentDate < dataFim) {
      const dateStr = formatarDataLocal(currentDate);

      markedDates[dateStr] = {
        color: '#FFD0E8',
        textColor: '#D946A6',
      };

      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Último dia
    markedDates[fimStr] = {
      endingDay: true,
      color: '#FFE8F2',
      textColor: '#D946A6',
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Visualize seus Ciclos
      </Text>

      <Calendar
        current={formatarDataLocal(new Date())}
        markedDates={markedDates}
        markingType="period"
        theme={{
          backgroundColor: '#FFF9FB',
          calendarBackground: '#FFF9FB',

          textSectionTitleColor: '#999',
          textSectionTitleDisabledColor: '#d9e1e8',

          selectedDayBackgroundColor: '#D946A6',
          selectedDayTextColor: '#ffffff',

          // Hoje fica apenas com o NÚMERO rosa.
          // Não cria mais outra bolinha rosa.
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

      <View style={styles.legenda}>
        <View style={styles.legItem}>
          <View
            style={[
              styles.legColor,
              { backgroundColor: '#FFE8F2' },
            ]}
          />

          <Text style={styles.legTexto}>
            Ciclo registrado
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 16,
    paddingBottom: 16,
    backgroundColor: '#FFF9FB',
    borderRadius: 16,
    borderColor: '#F0D0E0',
    borderWidth: 2,
    overflow: 'hidden',
  },

  titulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    padding: 16,
    paddingBottom: 8,
  },

  legenda: {
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0D0E0',
  },

  legItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  legColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },

  legTexto: {
    fontSize: 12,
    color: '#666',
  },
});