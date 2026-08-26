import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { RegistroCiclo } from '@/data/ciclo/ciclo.types';

interface CalendarioCiclosProps {
  registros: RegistroCiclo[];
}

export function CalendarioCiclos({ registros }: CalendarioCiclosProps) {
  const markedDates: Record<string, any> = {};

  registros.forEach((registro) => {
    const dataInicio = new Date(registro.dataInicio);
    const dataFim = registro.dataFim ? new Date(registro.dataFim) : null;

    // Marca data de início
    const inicioStr = dataInicio.toISOString().split('T')[0];
    markedDates[inicioStr] = {
      startingDay: true,
      color: '#FFE8F2',
      textColor: '#D946A6',
    };

    // Marca datas intermediárias
    if (dataFim) {
      let currentDate = new Date(dataInicio);
      while (currentDate < dataFim) {
        currentDate.setDate(currentDate.getDate() + 1);
        const dateStr = currentDate.toISOString().split('T')[0];
        if (dateStr !== dataFim.toISOString().split('T')[0]) {
          markedDates[dateStr] = {
            color: '#FFD0E8',
            textColor: '#D946A6',
          };
        }
      }

      // Marca data final
      const fimStr = dataFim.toISOString().split('T')[0];
      markedDates[fimStr] = {
        endingDay: true,
        color: '#FFE8F2',
        textColor: '#D946A6',
      };
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Visualize seus Ciclos</Text>
      <Calendar
        current={new Date().toISOString().split('T')[0]}
        markedDates={markedDates}
        markingType={'period'}
        theme={{
          backgroundColor: '#FFF9FB',
          calendarBackground: '#FFF9FB',
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
          <View style={[styles.legColor, { backgroundColor: '#FFE8F2' }]} />
          <Text style={styles.legTexto}>Ciclo registrado</Text>
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
