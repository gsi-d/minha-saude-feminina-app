import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RegistroCiclo } from '@/data/ciclo/ciclo.types';

interface CartaoCicloAtivoProps {
  registro: RegistroCiclo;
  onEncerrar: (id: string) => void;
  carregando: boolean;
}

export function CartaoCicloAtivo({
  registro,
  onEncerrar,
  carregando,
}: CartaoCicloAtivoProps) {
  const hoje = new Date();
  const diasDecorridos = Math.floor(
    (hoje.getTime() - registro.dataInicio.getTime()) / (1000 * 60 * 60 * 24)
  ) + 1;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="calendar-heart" size={32} color="#D946A6" />
          </View>
          <View style={styles.info}>
            <Text style={styles.titulo}>Ciclo em andamento</Text>
            <Text style={styles.subtitulo}>Dia {diasDecorridos}</Text>
          </View>
        </View>

        <View style={styles.detalhes}>
          <View style={styles.detalhe}>
            <Text style={styles.labelDetalhe}>Iniciado em</Text>
            <Text style={styles.valorDetalhe}>
              {registro.dataInicio.toLocaleDateString('pt-BR')}
            </Text>
          </View>
        </View>

        {registro.notas && (
          <View style={styles.notas}>
            <Text style={styles.labelDetalhe}>Notas</Text>
            <Text style={styles.valorNotas}>{registro.notas}</Text>
          </View>
        )}

        <Button
          mode="contained"
          onPress={() => onEncerrar(registro.id)}
          loading={carregando}
          disabled={carregando}
          style={styles.botao}
        >
          Encerrar Ciclo
        </Button>
      </Card.Content>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFE8F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D946A6',
  },
  detalhes: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0D0E0',
  },
  detalhe: {
    marginBottom: 12,
  },
  labelDetalhe: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    marginBottom: 4,
  },
  valorDetalhe: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  notas: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#D946A6',
  },
  valorNotas: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  botao: {
    marginTop: 8,
  },
});
