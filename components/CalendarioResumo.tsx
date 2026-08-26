import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { RegistroCiclo } from '@/data/ciclo/ciclo.types';

interface CalendarioResumoProps {
  registros: RegistroCiclo[];
}

export function CalendarioResumo({ registros }: CalendarioResumoProps) {
  const router = useRouter();
  const markedDates: Record<string, any> = {};

  registros.forEach((registro) => {
    const dataInicio = new Date(registro.dataInicio);
    const dataFim = registro.dataFim ? new Date(registro.dataFim) : null;

    const inicioStr = dataInicio.toISOString().split('T')[0];
    markedDates[inicioStr] = {
      startingDay: true,
      color: '#FFE8F2',
      textColor: '#D946A6',
    };

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

      const fimStr = dataFim.toISOString().split('T')[0];
      markedDates[fimStr] = {
        endingDay: true,
        color: '#FFE8F2',
        textColor: '#D946A6',
      };
    }
  });

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="calendar-month" size={20} color="#D946A6" />
          <Text style={styles.titulo}>Seus Ciclos</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/ciclo')}
          style={styles.verMaisBtn}
        >
          <Text style={styles.verMaisText}>Ver mais</Text>
          <MaterialCommunityIcons name="chevron-right" size={18} color="#D946A6" />
        </TouchableOpacity>
      </View>

      <Calendar
        current={new Date().toISOString().split('T')[0]}
        markedDates={markedDates}
        markingType={'period'}
        hideArrows={false}
        onDayPress={() => router.push('/(tabs)/ciclo')}
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
          textDayFontSize: 13,
          textMonthFontSize: 15,
          textDayHeaderFontSize: 11,
        }}
      />

      <View style={styles.rodape}>
        <TouchableOpacity
          style={styles.rodapeBtn}
          onPress={() => router.push('/(tabs)/ciclo')}
        >
          <MaterialCommunityIcons name="arrow-right" size={16} color="#FFF" />
          <Text style={styles.rodapeBtnText}>Ir para Ciclo</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 16,
    backgroundColor: '#FFF9FB',
    borderColor: '#F0D0E0',
    borderWidth: 2,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0D0E0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titulo: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
  },
  verMaisBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#FFE8F2',
  },
  verMaisText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#D946A6',
  },
  rodape: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0D0E0',
  },
  rodapeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    backgroundColor: '#D946A6',
    borderRadius: 8,
  },
  rodapeBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFF',
  },
});
