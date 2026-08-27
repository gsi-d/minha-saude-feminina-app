import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import {
  Dialog,
  Button,
  Text,
  TextInput,
  Portal,
  Divider,
} from 'react-native-paper';
import { Calendar } from 'react-native-calendars';

interface NovoRegistroDialogCalendarioProps {
  visivel: boolean;
  carregando: boolean;
  onFechar: () => void;
  onSalvar: (dataInicio: Date, notas?: string) => Promise<void>;
}

/**
 * Converte Date -> YYYY-MM-DD usando horário LOCAL.
 * Não usa toISOString(), porque ele pode alterar o dia
 * dependendo do fuso horário.
 */
function formatarDataLocal(data: Date) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
}

/**
 * Converte YYYY-MM-DD -> DD/MM/YYYY
 * sem criar um objeto Date.
 *
 * Assim não existe risco de 26 virar 25.
 */
function formatarDataBR(data: string) {
  const [ano, mes, dia] = data.split('-');

  return `${dia}/${mes}/${ano}`;
}

/**
 * Converte YYYY-MM-DD para Date LOCAL.
 *
 * Colocamos 12:00 para evitar qualquer problema
 * relacionado a fuso horário / mudança de horário.
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

export function NovoRegistroDialogCalendario({
  visivel,
  carregando,
  onFechar,
  onSalvar,
}: NovoRegistroDialogCalendarioProps) {
  const hoje = new Date();

  // NÃO usar:
  // new Date().toISOString().split('T')[0]
  const dataHoje = formatarDataLocal(hoje);

  const [dataInicio, setDataInicio] = useState(dataHoje);
  const [notas, setNotas] = useState('');

  const handleSalvar = async () => {
    try {
      // Cria a data no horário LOCAL.
      const data = criarDataLocal(dataInicio);

      await onSalvar(
        data,
        notas.trim() || undefined
      );

      setDataInicio(dataHoje);
      setNotas('');

      onFechar();
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  const markedDates = {
    [dataInicio]: {
      selected: true,
      selectedColor: '#D946A6',
      selectedTextColor: '#FFF',
    },
  };

  return (
    <Portal>
      <Dialog
        visible={visivel}
        onDismiss={onFechar}
        style={styles.dialog}
      >
        <Dialog.Title>
          Iniciar Novo Ciclo
        </Dialog.Title>

        <Dialog.Content style={styles.dialogContent}>
          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.label}>
              Selecione a data de início
            </Text>

            <Calendar
              current={dataInicio}
              maxDate={dataHoje}
              markedDates={markedDates}
              onDayPress={(day) => {
                /*
                 * day.dateString já vem exatamente assim:
                 *
                 * 2026-08-26
                 *
                 * Não transformamos em Date aqui.
                 */
                setDataInicio(day.dateString);
              }}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',

                textSectionTitleColor: '#999',
                textSectionTitleDisabledColor: '#d9e1e8',

                selectedDayBackgroundColor: '#D946A6',
                selectedDayTextColor: '#ffffff',

                /*
                 * IMPORTANTE:
                 * Não pinta o dia atual de rosa.
                 *
                 * Agora apenas a data que você clicar
                 * ficará rosa.
                 */
                todayTextColor: '#333',

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

            <Divider style={styles.divider} />

            <Text style={[styles.label, styles.marginTop]}>
              Data selecionada:{' '}

              <Text style={styles.dataDestaque}>
                {formatarDataBR(dataInicio)}
              </Text>
            </Text>

            <Text style={[styles.label, styles.marginTop]}>
              Notas (opcional)
            </Text>

            <TextInput
              mode="outlined"
              placeholder="Ex: fluxo intenso, cólicas, humor..."
              value={notas}
              onChangeText={setNotas}
              multiline
              numberOfLines={3}
            />
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
            onPress={handleSalvar}
            loading={carregando}
            disabled={carregando}
          >
            Registrar Ciclo
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
  },

  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },

  marginTop: {
    marginTop: 12,
  },

  dataDestaque: {
    fontSize: 14,
    fontWeight: '700',
    color: '#D946A6',
  },

  divider: {
    marginVertical: 16,
  },
});