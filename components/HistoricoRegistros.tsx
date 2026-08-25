import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RegistroCiclo } from '@/data/ciclo/ciclo.types';

interface HistoricoRegistrosProps {
  registros: RegistroCiclo[];
  onDeletar: (id: string) => void;
  carregando: boolean;
}

export function HistoricoRegistros({
  registros,
  onDeletar,
  carregando,
}: HistoricoRegistrosProps) {
  if (registros.length === 0) {
    return (
      <View style={styles.vazio}>
        <MaterialCommunityIcons name="calendar-blank" size={48} color="#CCC" />
        <Text style={styles.textoVazio}>Nenhum registro ainda</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {registros.map((registro) => (
        <Card key={registro.id} style={styles.card}>
          <Card.Content>
            <View style={styles.header}>
              <View style={styles.datas}>
                <Text style={styles.titulo}>
                  {registro.dataInicio.toLocaleDateString('pt-BR')}
                </Text>
                {registro.dataFim && (
                  <Text style={styles.intervalo}>
                    a {registro.dataFim.toLocaleDateString('pt-BR')}
                  </Text>
                )}
              </View>
              <IconButton
                icon="trash-can-outline"
                size={20}
                disabled={carregando}
                onPress={() => onDeletar(registro.id)}
              />
            </View>

            <View style={styles.info}>
              {registro.duracaoEmDias && (
                <Text style={styles.detalhe}>
                  <MaterialCommunityIcons name="calendar-range" size={14} /> Duração: {registro.duracaoEmDias} dias
                </Text>
              )}
              {!registro.dataFim && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Em andamento</Text>
                </View>
              )}
              {registro.notas && (
                <Text style={styles.notas}>{registro.notas}</Text>
              )}
            </View>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  vazio: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    opacity: 0.5,
  },
  textoVazio: {
    marginTop: 12,
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  card: {
    marginBottom: 12,
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  datas: {
    flex: 1,
  },
  titulo: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginBottom: 2,
  },
  intervalo: {
    fontSize: 13,
    color: '#999',
  },
  info: {
    gap: 8,
  },
  detalhe: {
    fontSize: 13,
    color: '#666',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFD54F',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#F57C00',
  },
  notas: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    lineHeight: 16,
  },
});
