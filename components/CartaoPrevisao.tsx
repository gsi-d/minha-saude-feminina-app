import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CicloPrevisao } from '@/data/ciclo/ciclo.types';

interface CartaoPrevisaoProps {
  previsao: CicloPrevisao;
}

export function CartaoPrevisao({ previsao }: CartaoPrevisaoProps) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <MaterialCommunityIcons name="crystal-ball" size={28} color="#9333EA" />
          <Text style={styles.titulo}>Próximo Ciclo Previsto</Text>
        </View>

        <View style={styles.conteudo}>
          {previsao.proximoInicio ? (
            <>
              <View style={styles.item}>
                <Text style={styles.label}>Previsão de Início</Text>
                <Text style={styles.valor}>
                  {previsao.proximoInicio.toLocaleDateString('pt-BR')}
                </Text>
              </View>

              <View style={styles.item}>
                <Text style={styles.label}>Previsão de Término</Text>
                <Text style={styles.valor}>
                  {previsao.proximaFim?.toLocaleDateString('pt-BR')}
                </Text>
              </View>

              <View style={[styles.item, styles.itemDestaque]}>
                <Text style={styles.labelDestaque}>Dias até o próximo ciclo</Text>
                <Text style={styles.valorDestaque}>{previsao.diasParaProximo}</Text>
              </View>

              <View style={styles.item}>
                <Text style={styles.label}>Ciclo padrão</Text>
                <Text style={styles.valor}>{previsao.cicloPadrao} dias</Text>
              </View>
            </>
          ) : (
            <Text style={styles.mensagem}>
              Registre pelo menos um ciclo completo para receber previsões
            </Text>
          )}
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 12,
    backgroundColor: '#FEF9FF',
    borderColor: '#E9D5FF',
    borderWidth: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  conteudo: {
    gap: 12,
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#E9D5FF',
  },
  itemDestaque: {
    backgroundColor: '#F3E8FF',
    borderLeftColor: '#9333EA',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    marginBottom: 4,
  },
  labelDestaque: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7E22CE',
    marginBottom: 4,
  },
  valor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  valorDestaque: {
    fontSize: 18,
    fontWeight: '700',
    color: '#9333EA',
  },
  mensagem: {
    fontSize: 13,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 12,
  },
});
