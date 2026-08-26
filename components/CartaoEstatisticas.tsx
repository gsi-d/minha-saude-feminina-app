import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RegistroCiclo, CicloPrevisao } from '@/data/ciclo/ciclo.types';

interface CartaoEstatisticasProps {
  registros: RegistroCiclo[];
  previsao: CicloPrevisao | null;
}

export function CartaoEstatisticas({ registros, previsao }: CartaoEstatisticasProps) {
  const diacaoPesada = registros.length > 0 ? registros[0].duracaoEmDias || 0 : 0;
  
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.titulo}>Seus Dados</Text>
        
        <View style={styles.grid}>
          <View style={styles.stat}>
            <MaterialCommunityIcons name="counter" size={24} color="#D946A6" />
            <Text style={styles.numero}>{registros.length}</Text>
            <Text style={styles.label}>Ciclos</Text>
            <Text style={styles.label}>Registrados</Text>
          </View>

          <View style={styles.stat}>
            <MaterialCommunityIcons name="calendar-range" size={24} color="#9333EA" />
            <Text style={styles.numero}>{previsao?.cicloPadrao || '-'}</Text>
            <Text style={styles.label}>Dias</Text>
            <Text style={styles.label}>Ciclo Médio</Text>
          </View>

          <View style={styles.stat}>
            <MaterialCommunityIcons name="timetable" size={24} color="#EC4899" />
            <Text style={styles.numero}>{diacaoPesada}</Text>
            <Text style={styles.label}>Dias</Text>
            <Text style={styles.label}>Último</Text>
          </View>

          <View style={styles.stat}>
            <MaterialCommunityIcons name="calendar-clock" size={24} color="#A855F7" />
            <Text style={styles.numero}>{previsao?.diasParaProximo || '-'}</Text>
            <Text style={styles.label}>Dias</Text>
            <Text style={styles.label}>Até Próx.</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 12,
    backgroundColor: '#FFF9FB',
    borderColor: '#F0D0E0',
    borderWidth: 2,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  stat: {
    width: '48%',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0D0E0',
    alignItems: 'center',
  },
  numero: {
    fontSize: 20,
    fontWeight: '700',
    color: '#D946A6',
    marginTop: 8,
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    color: '#999',
    textAlign: 'center',
    lineHeight: 14,
  },
});
