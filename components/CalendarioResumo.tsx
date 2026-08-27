import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { Text, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { RegistroCiclo } from '@/data/ciclo/ciclo.types';

interface CalendarioResumoProps {
  registros: RegistroCiclo[];
}

const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function formatarDataKey(data: Date) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
}

function adicionarDias(data: Date, quantidade: number) {
  const novaData = new Date(data);
  novaData.setDate(novaData.getDate() + quantidade);
  return novaData;
}

function inicioDaSemana(data: Date) {
  const novaData = new Date(data);
  novaData.setDate(novaData.getDate() - novaData.getDay());
  novaData.setHours(0, 0, 0, 0);
  return novaData;
}

function mesmoMes(data1: Date, data2: Date) {
  return (
    data1.getMonth() === data2.getMonth() &&
    data1.getFullYear() === data2.getFullYear()
  );
}

export function CalendarioResumo({ registros }: CalendarioResumoProps) {
  const router = useRouter();

  const hoje = new Date();

  const [mesAtual, setMesAtual] = useState(
    new Date(hoje.getFullYear(), hoje.getMonth(), 1)
  );

  /*
   * Monta as marcações dos ciclos.
   * Isso continua usando as datas reais dos registros.
   */
  const markedDates = useMemo(() => {
    const marcacoes: Record<
      string,
      {
        color: string;
        textColor: string;
      }
    > = {};

    registros.forEach((registro) => {
      const inicioOriginal = new Date(registro.dataInicio);

      const dataInicio = new Date(
        inicioOriginal.getFullYear(),
        inicioOriginal.getMonth(),
        inicioOriginal.getDate()
      );

      const dataFim = registro.dataFim
        ? new Date(registro.dataFim)
        : null;

      /*
       * Se ainda não terminou, marca apenas o início,
       * igual ao comportamento que você já tinha.
       */
      if (!dataFim) {
        marcacoes[formatarDataKey(dataInicio)] = {
          color: '#FFE8F2',
          textColor: '#D946A6',
        };

        return;
      }

      const fimNormalizado = new Date(
        dataFim.getFullYear(),
        dataFim.getMonth(),
        dataFim.getDate()
      );

      let dataPercorrida = new Date(dataInicio);

      while (dataPercorrida <= fimNormalizado) {
        const chave = formatarDataKey(dataPercorrida);

        const ehInicio =
          formatarDataKey(dataPercorrida) ===
          formatarDataKey(dataInicio);

        const ehFim =
          formatarDataKey(dataPercorrida) ===
          formatarDataKey(fimNormalizado);

        marcacoes[chave] = {
          color:
            ehInicio || ehFim
              ? '#FFE8F2'
              : '#FFD0E8',
          textColor: '#D946A6',
        };

        dataPercorrida = adicionarDias(dataPercorrida, 1);
      }
    });

    return marcacoes;
  }, [registros]);

  /*
   * Aqui está a principal mudança.
   *
   * Em vez de desenhar 5 ou 6 semanas,
   * mostramos somente 4 semanas = 28 dias.
   */
  const diasVisiveis = useMemo(() => {
    let dataReferencia: Date;

    /*
     * Se estamos vendo o mês atual,
     * usa hoje como referência.
     */
    if (mesmoMes(mesAtual, hoje)) {
      dataReferencia = hoje;
    } else {
      /*
       * Nos outros meses, usa o meio do mês.
       */
      dataReferencia = new Date(
        mesAtual.getFullYear(),
        mesAtual.getMonth(),
        15
      );
    }

    /*
     * Pega o começo da semana da data de referência.
     */
    const semanaReferencia = inicioDaSemana(dataReferencia);

    /*
     * Voltamos 2 semanas.
     *
     * Assim a data de referência geralmente aparece
     * na terceira linha do mini calendário.
     */
    const inicioJanela = adicionarDias(
      semanaReferencia,
      -14
    );

    return Array.from({ length: 28 }, (_, index) =>
      adicionarDias(inicioJanela, index)
    );
  }, [mesAtual]);

  const semanas = useMemo(() => {
    return [
      diasVisiveis.slice(0, 7),
      diasVisiveis.slice(7, 14),
      diasVisiveis.slice(14, 21),
      diasVisiveis.slice(21, 28),
    ];
  }, [diasVisiveis]);

  const mudarMes = (quantidade: number) => {
    setMesAtual((anterior) => {
      return new Date(
        anterior.getFullYear(),
        anterior.getMonth() + quantidade,
        1
      );
    });
  };

  const tituloMes = mesAtual.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });

  const tituloMesFormatado =
    tituloMes.charAt(0).toUpperCase() +
    tituloMes.slice(1);

  const hojeKey = formatarDataKey(hoje);

  return (
    <Card style={styles.card}>
      {/* CABEÇALHO DO CARD */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons
            name="calendar-month"
            size={20}
            color="#D946A6"
          />

          <Text style={styles.titulo}>
            Seus Ciclos
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push('/(tabs)/ciclo')}
          style={styles.verMaisBtn}
        >
          <Text style={styles.verMaisText}>
            Ver mais
          </Text>

          <MaterialCommunityIcons
            name="chevron-right"
            size={18}
            color="#D946A6"
          />
        </TouchableOpacity>
      </View>

      {/* MINI CALENDÁRIO */}
      <View style={styles.calendario}>
        {/* MÊS + SETAS */}
        <View style={styles.monthHeader}>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => mudarMes(-1)}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={20}
              color="#D946A6"
            />
          </TouchableOpacity>

          <Text style={styles.monthText}>
            {tituloMesFormatado}
          </Text>

          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => mudarMes(1)}
          >
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="#D946A6"
            />
          </TouchableOpacity>
        </View>

        {/* NOMES DOS DIAS */}
        <View style={styles.weekHeader}>
          {DIAS_SEMANA.map((dia) => (
            <View
              key={dia}
              style={styles.weekHeaderCell}
            >
              <Text style={styles.weekHeaderText}>
                {dia}
              </Text>
            </View>
          ))}
        </View>

        {/* SOMENTE 4 LINHAS */}
        {semanas.map((semana, indexSemana) => (
          <View
            key={indexSemana}
            style={styles.weekRow}
          >
            {semana.map((data) => {
              const chave = formatarDataKey(data);

              const marcacao = markedDates[chave];

              const ehHoje = chave === hojeKey;

              const pertenceMes =
                data.getMonth() === mesAtual.getMonth() &&
                data.getFullYear() ===
                  mesAtual.getFullYear();

              return (
                <TouchableOpacity
                  key={chave}
                  style={styles.dayCell}
                  onPress={() =>
                    router.push('/(tabs)/ciclo')
                  }
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.dayCircle,

                      ehHoje &&
                        !marcacao &&
                        styles.todayCircle,

                      marcacao && {
                        backgroundColor:
                          marcacao.color,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayText,

                        !pertenceMes &&
                          styles.dayTextOutside,

                        ehHoje && styles.todayText,

                        marcacao && {
                          color:
                            marcacao.textColor,
                          fontWeight: '700',
                        },
                      ]}
                    >
                      {data.getDate()}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>

      {/* RODAPÉ */}
      <View style={styles.rodape}>
        <TouchableOpacity
          style={styles.rodapeBtn}
          onPress={() =>
            router.push('/(tabs)/ciclo')
          }
        >
          <MaterialCommunityIcons
            name="arrow-right"
            size={16}
            color="#FFF"
          />

          <Text style={styles.rodapeBtnText}>
            Ir para Ciclo
          </Text>
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
    paddingVertical: 10,
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

  /*
   * CALENDÁRIO COMPACTO
   */
  calendario: {
    paddingHorizontal: 8,
    paddingTop: 4,
    paddingBottom: 8,
    backgroundColor: '#FFF9FB',
  },

  monthHeader: {
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },

  arrowButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  monthText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },

  weekHeader: {
    flexDirection: 'row',
    height: 26,
    alignItems: 'center',
  },

  weekHeaderCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  weekHeaderText: {
    fontSize: 9,
    color: '#999',
  },

  /*
   * Cada linha tem só 34px.
   * Como temos 4 linhas, o calendário fica bem menor.
   */
  weekRow: {
    flexDirection: 'row',
    height: 36,
    alignItems: 'center',
  },

  dayCell: {
    flex: 1,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dayCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dayText: {
    fontSize: 11,
    color: '#333',
  },

  dayTextOutside: {
    color: '#D9DFE5',
  },

  todayCircle: {
    backgroundColor: '#FFE8F2',
  },

  todayText: {
    color: '#D946A6',
    fontWeight: '700',
  },

  rodape: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0D0E0',
  },

  rodapeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 9,
    backgroundColor: '#D946A6',
    borderRadius: 8,
  },

  rodapeBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFF',
  },
});