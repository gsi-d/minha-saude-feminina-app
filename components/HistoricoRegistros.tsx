import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import {
  Card,
  Text,
  IconButton,
  Portal,
  Dialog,
  Button,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RegistroCiclo } from '@/data/ciclo/ciclo.types';

interface HistoricoRegistrosProps {
  registros: RegistroCiclo[];
  onDeletar: (id: string) => Promise<void>;
  carregando: boolean;
}

export function HistoricoRegistros({
  registros,
  onDeletar,
  carregando,
}: HistoricoRegistrosProps) {
  const [dialogVisivel, setDialogVisivel] = useState(false);
  const [registroSelecionado, setRegistroSelecionado] =
    useState<string | null>(null);

  const abrirConfirmacao = (id: string) => {
    setRegistroSelecionado(id);
    setDialogVisivel(true);
  };

  const fecharConfirmacao = () => {
    if (carregando) return;

    setDialogVisivel(false);
    setRegistroSelecionado(null);
  };

  const confirmarExclusao = async () => {
    if (!registroSelecionado) return;

    try {
      await onDeletar(registroSelecionado);

      setDialogVisivel(false);
      setRegistroSelecionado(null);
    } catch (error) {
      console.error('Erro ao excluir registro:', error);
    }
  };

  if (registros.length === 0) {
    return (
      <View style={styles.vazio}>
        <MaterialCommunityIcons
          name="calendar-blank"
          size={48}
          color="#CCC"
        />

        <Text style={styles.textoVazio}>
          Nenhum registro ainda
        </Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.container}>
        {registros.map((registro) => (
          <Card
            key={registro.id}
            style={styles.card}
          >
            <Card.Content>
              <View style={styles.header}>
                <View style={styles.datas}>
                  <Text style={styles.titulo}>
                    {registro.dataInicio.toLocaleDateString(
                      'pt-BR'
                    )}
                  </Text>

                  {registro.dataFim && (
                    <Text style={styles.intervalo}>
                      a{' '}
                      {registro.dataFim.toLocaleDateString(
                        'pt-BR'
                      )}
                    </Text>
                  )}
                </View>

                <IconButton
                  icon="trash-can-outline"
                  iconColor="#D946A6"
                  size={20}
                  disabled={carregando}
                  onPress={() =>
                    abrirConfirmacao(registro.id)
                  }
                />
              </View>

              <View style={styles.info}>
                {registro.duracaoEmDias && (
                  <Text style={styles.detalhe}>
                    <MaterialCommunityIcons
                      name="calendar-range"
                      size={14}
                    />{' '}
                    Duração: {registro.duracaoEmDias} dias
                  </Text>
                )}

                {!registro.dataFim && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      Em andamento
                    </Text>
                  </View>
                )}

                {registro.notas && (
                  <Text style={styles.notas}>
                    {registro.notas}
                  </Text>
                )}
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      <Portal>
        <Dialog
          visible={dialogVisivel}
          onDismiss={fecharConfirmacao}
          style={styles.dialog}
        >
          <Dialog.Content style={styles.dialogContent}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={30}
                color="#D946A6"
              />
            </View>

            <Text style={styles.dialogTitulo}>
              Excluir registro?
            </Text>

            <Text style={styles.dialogTexto}>
              Tem certeza que deseja excluir este registro?
            </Text>

            <Text style={styles.dialogAviso}>
              Essa ação não poderá ser desfeita.
            </Text>

            <View style={styles.dialogBotoes}>
              <Button
                mode="outlined"
                onPress={fecharConfirmacao}
                disabled={carregando}
                style={styles.botaoCancelar}
                contentStyle={styles.botaoContent}
                textColor="#666"
              >
                Cancelar
              </Button>

              <Button
                mode="contained"
                onPress={confirmarExclusao}
                loading={carregando}
                disabled={carregando}
                style={styles.botaoExcluir}
                contentStyle={styles.botaoContent}
                buttonColor="#D946A6"
                textColor="#FFF"
              >
                Excluir
              </Button>
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
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

  dialog: {
    borderRadius: 24,
    backgroundColor: '#FFF',
    marginHorizontal: 28,
  },

  dialogContent: {
    paddingTop: 28,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },

  iconContainer: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFE8F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  dialogTitulo: {
    fontSize: 19,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },

  dialogTexto: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 260,
  },

  dialogAviso: {
    fontSize: 12,
    color: '#AAA',
    textAlign: 'center',
    marginTop: 6,
  },

  dialogBotoes: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginTop: 24,
  },

  botaoCancelar: {
    flex: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
  },

  botaoExcluir: {
    flex: 1,
    borderRadius: 12,
  },

  botaoContent: {
    height: 46,
  },
});