import React, { useEffect, useState } from 'react';
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

/**
 * Data atual no formato YYYY-MM-DD,
 * usando o horário LOCAL.
 */
function formatarDataLocal(data: Date) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
}

/**
 * Para registros já salvos.
 *
 * Usa a parte UTC da data salva para evitar:
 * 26/08 virar 25/08 no Brasil.
 */
function formatarDataRegistro(data: Date) {
  const ano = data.getUTCFullYear();
  const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
  const dia = String(data.getUTCDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
}

/**
 * YYYY-MM-DD -> DD/MM/YYYY
 *
 * Não cria Date, então não existe conversão de fuso.
 */
function formatarDataBR(data: string) {
  const [ano, mes, dia] = data.split('-');

  return `${dia}/${mes}/${ano}`;
}

/**
 * YYYY-MM-DD -> Date local ao meio-dia.
 */
function criarDataLocal(data: string) {
  const [ano, mes, dia] = data.split('-').map(Number);

  return new Date(
    ano,
    mes - 1,
    dia,
    12,
    0,
    0,
    0
  );
}

/**
 * Soma dias em uma string YYYY-MM-DD
 * sem depender do fuso horário do aparelho.
 */
function adicionarDia(data: string) {
  const [ano, mes, dia] = data.split('-').map(Number);

  const temp = new Date(
    Date.UTC(ano, mes - 1, dia)
  );

  temp.setUTCDate(temp.getUTCDate() + 1);

  const novoAno = temp.getUTCFullYear();
  const novoMes = String(
    temp.getUTCMonth() + 1
  ).padStart(2, '0');

  const novoDia = String(
    temp.getUTCDate()
  ).padStart(2, '0');

  return `${novoAno}-${novoMes}-${novoDia}`;
}

/**
 * Calcula a duração usando somente os dias
 * do calendário, sem horário/fuso.
 */
function calcularDuracao(
  inicio: string,
  fim: string
) {
  const [anoInicio, mesInicio, diaInicio] =
    inicio.split('-').map(Number);

  const [anoFim, mesFim, diaFim] =
    fim.split('-').map(Number);

  const inicioUTC = Date.UTC(
    anoInicio,
    mesInicio - 1,
    diaInicio
  );

  const fimUTC = Date.UTC(
    anoFim,
    mesFim - 1,
    diaFim
  );

  return (
    Math.floor(
      (fimUTC - inicioUTC) /
        (1000 * 60 * 60 * 24)
    ) + 1
  );
}

export function EncerrarRegistroDialog({
  visivel,
  registro,
  carregando,
  onFechar,
  onConfirmar,
}: EncerrarRegistroDialogProps) {
  const dataHoje = formatarDataLocal(new Date());

  const inicioStr = registro
    ? formatarDataRegistro(
        new Date(registro.dataInicio)
      )
    : dataHoje;

  const [dataFim, setDataFim] =
    useState<string>(dataHoje);

  /*
   * Sempre que abrir o modal,
   * começa selecionando hoje.
   */
  useEffect(() => {
    if (visivel) {
      setDataFim(dataHoje);
    }
  }, [visivel, dataHoje]);

  if (!registro) {
    return null;
  }

  const duracao = calcularDuracao(
    inicioStr,
    dataFim
  );

  const markedDates: MarkedDatesType = {};

  /*
   * Ciclo de apenas 1 dia.
   */
  if (inicioStr === dataFim) {
    markedDates[inicioStr] = {
      startingDay: true,
      endingDay: true,
      color: '#FFE8F2',
      textColor: '#D946A6',
    };
  } else {
    /*
     * Primeiro dia do ciclo.
     */
    markedDates[inicioStr] = {
      startingDay: true,
      color: '#FFE8F2',
      textColor: '#D946A6',
    };

    /*
     * Dias entre início e término.
     */
    let diaAtual = adicionarDia(inicioStr);

    while (diaAtual < dataFim) {
      markedDates[diaAtual] = {
        color: '#FFD0E8',
        textColor: '#D946A6',
      };

      diaAtual = adicionarDia(diaAtual);
    }

    /*
     * Último dia selecionado.
     */
    markedDates[dataFim] = {
      endingDay: true,
      color: '#FFE8F2',
      textColor: '#D946A6',
    };
  }

  const handleConfirmar = async () => {
    try {
      /*
       * Converte para Date local somente
       * na hora de salvar.
       */
      const data = criarDataLocal(dataFim);

      await onConfirmar(data);

      onFechar();
    } catch (error) {
      console.error(
        'Erro ao encerrar:',
        error
      );
    }
  };

  return (
    <Portal>
      <Dialog
        visible={visivel}
        onDismiss={onFechar}
        style={styles.dialog}
      >
        <Dialog.Title>
          Encerrar Ciclo
        </Dialog.Title>

        <Dialog.Content
          style={styles.dialogContent}
        >
          <ScrollView
            style={styles.content}
            contentContainerStyle={
              styles.contentContainer
            }
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.infoText}>
              Iniciado em:{' '}
              <Text style={styles.bold}>
                {formatarDataBR(inicioStr)}
              </Text>
            </Text>

            <Divider style={styles.divider} />

            <Text style={styles.label}>
              Selecione a data de término
            </Text>

            <Calendar
              current={dataFim}
              minDate={inicioStr}
              maxDate={dataHoje}
              markedDates={markedDates}
              markingType="period"
              onDayPress={(day) => {
                setDataFim(day.dateString);
              }}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',

                textSectionTitleColor: '#999',
                textSectionTitleDisabledColor:
                  '#d9e1e8',

                selectedDayBackgroundColor:
                  '#D946A6',
                selectedDayTextColor: '#ffffff',

                /*
                 * Não cria uma segunda
                 * bolinha rosa só porque é hoje.
                 */
                todayTextColor: '#D946A6',

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

                weekVerticalMargin: 4,
              }}
            />

            <Divider style={styles.divider} />

            <Text style={styles.label}>
              Resumo
            </Text>

            <View style={styles.resumo}>
              <View style={styles.resumoItem}>
                <Text style={styles.resumoLabel}>
                  Data de término
                </Text>

                <Text style={styles.resumoValor}>
                  {formatarDataBR(dataFim)}
                </Text>
              </View>

              <View style={styles.resumoItem}>
                <Text style={styles.resumoLabel}>
                  Duração
                </Text>

                <Text style={styles.resumoValor}>
                  {duracao}{' '}
                  {duracao === 1
                    ? 'dia'
                    : 'dias'}
                </Text>
              </View>
            </View>
          </ScrollView>
        </Dialog.Content>

        <Dialog.Actions style={styles.actions}>
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

  /*
   * Faz o conteúdo diminuir quando necessário,
   * deixando os botões dentro do modal.
   */
  dialogContent: {
    flexShrink: 1,
  },

  content: {
    flexShrink: 1,
  },

  contentContainer: {
    paddingBottom: 8,
  },

  actions: {
    flexGrow: 0,
    paddingBottom: 12,
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