import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, LayoutAnimation, Platform, ScrollView, StyleSheet, UIManager, View } from 'react-native';
import { Button, List, Text, TextInput, useTheme } from "react-native-paper";

type SectionKey =
  | 'gravida'
  | 'tentante'
  | 'menstruando'
  | 'menopausa'
  | 'condicoesMedicas'
  | 'medicamentos';

export default function CadastroGestandeScreen() {
  const [expandedSections, setExpandedSections] = useState<Record<SectionKey, boolean>>({
    gravida: false,
    tentante: false,
    menstruando: false,
    menopausa: false,
    condicoesMedicas: false,
    medicamentos: false,
  });

  // Estado para gravida
  const [semanaGestacao, setSemanaGestacao] = useState("");
  const [dataPrevistaParto, setDataPrevistaParto] = useState("");

  // Estado para tentante
  const [infoTentante, setInfoTentante] = useState("");

  // Estado para menstruando
  const [infoMenustruando, setInfoMenustruando] = useState("");

  // Estado para menopausa
  const [inicioMenupausa, setInicioMenupausa] = useState("");
  const [sintomasMenupausa, setSintomasMenupausa] = useState("");

  // Estados gerais
  const [condicoesMedicas, setCondicoesMedicas] = useState("");
  const [medicamentos, setMedicamentos] = useState("");
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const toggleSection = (section: SectionKey) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSections(prev => {
      const isOpening = !prev[section];
      return Object.fromEntries(
        Object.entries(prev).map(([key, value]) => [key, key === section ? isOpening : false])
      ) as Record<SectionKey, boolean>;
    });
  };

  const handleContinue = async () => {
    setLoading(true);
    
    // TODO: Implementar chamada à API de atualização de dados da gestante
    // const sucesso = await updateGestanteData({
    //   gravida: { semanaGestacao, dataPrevistaParto },
    //   tentante: infoTentante,
    //   menstruando: infoMenustruando,
    //   condicoesMedicas,
    //   medicamentos
    // });

    setLoading(false);

    // if (sucesso) {
    //   Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
    //   router.replace('/(tabs)');
    // } else {
    //   Alert.alert('Erro', 'Erro ao atualizar dados.');
    // }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  const canContinue =
    semanaGestacao.trim().length > 0 ||
    dataPrevistaParto.trim().length > 0 ||
    infoTentante.trim().length > 0 ||
    infoMenustruando.trim().length > 0 ||
    inicioMenupausa.trim().length > 0 ||
    sintomasMenupausa.trim().length > 0 ||
    condicoesMedicas.trim().length > 0 ||
    medicamentos.trim().length > 0;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text
            variant="displaySmall"
            style={[styles.title, { color: theme.colors.primary }]}
          >
            Ciclo+
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Para te oferecer a melhor experiência, queremos conhecer um pouco mais sobre você.
          </Text>

          <List.Section style={styles.listSection}>
            <List.Accordion
              title="Estou grávida"
              left={(props) => <List.Icon {...props} icon="baby-face-outline" color={expandedSections.gravida ? '#fff' : undefined} />}
              right={(props) => <List.Icon {...props} icon={expandedSections.gravida ? "chevron-up" : "chevron-down"} color={expandedSections.gravida ? '#fff' : undefined} />}
              expanded={expandedSections.gravida}
              onPress={() => toggleSection('gravida')}
              style={[styles.accordion, expandedSections.gravida && { backgroundColor: theme.colors.primary }]}
              titleStyle={{ color: expandedSections.gravida ? '#fff' : undefined }}
            >
              <View style={styles.accordionContent}>
                <TextInput
                  label="Semana de Gestação"
                  mode="outlined"
                  keyboardType="numeric"
                  value={semanaGestacao}
                  onChangeText={setSemanaGestacao}
                  placeholder="Ex: 12"
                  style={styles.input}
                />

                <TextInput
                  label="Data Prevista do Parto"
                  mode="outlined"
                  value={dataPrevistaParto}
                  onChangeText={setDataPrevistaParto}
                  placeholder="DD/MM/YYYY"
                  style={styles.input}
                />
              </View>
            </List.Accordion>

            <List.Accordion
              title="Estou tentando engravidar"
              left={(props) => <List.Icon {...props} icon="heart-outline" color={expandedSections.tentante ? '#fff' : undefined} />}
              right={(props) => <List.Icon {...props} icon={expandedSections.tentante ? "chevron-up" : "chevron-down"} color={expandedSections.tentante ? '#fff' : undefined} />}
              expanded={expandedSections.tentante}
              onPress={() => toggleSection('tentante')}
              style={[styles.accordion, expandedSections.tentante && { backgroundColor: theme.colors.primary }]}
              titleStyle={{ color: expandedSections.tentante ? '#fff' : undefined }}
            >
              <View style={styles.accordionContent}>
                <TextInput
                  label="Informações sobre sua tentativa"
                  mode="outlined"
                  multiline
                  numberOfLines={3}
                  value={infoTentante}
                  onChangeText={setInfoTentante}
                  placeholder="Descreva há quanto tempo está tentando, medicações, etc..."
                  style={styles.input}
                />
              </View>
            </List.Accordion>

            <List.Accordion
              title="Quero acompanhar meu ciclo"
              left={(props) => <List.Icon {...props} icon="calendar-month-outline" color={expandedSections.menstruando ? '#fff' : undefined} />}
              right={(props) => <List.Icon {...props} icon={expandedSections.menstruando ? "chevron-up" : "chevron-down"} color={expandedSections.menstruando ? '#fff' : undefined} />}
              expanded={expandedSections.menstruando}
              onPress={() => toggleSection('menstruando')}
              style={[styles.accordion, expandedSections.menstruando && { backgroundColor: theme.colors.primary }]}
              titleStyle={{ color: expandedSections.menstruando ? '#fff' : undefined }}
            >
              <View style={styles.accordionContent}>
                <TextInput
                  label="Informações sobre sua menstruação"
                  mode="outlined"
                  multiline
                  numberOfLines={3}
                  value={infoMenustruando}
                  onChangeText={setInfoMenustruando}
                  placeholder="Descreva regularidade, fluxo, sintomas, etc..."
                  style={styles.input}
                />
              </View>
            </List.Accordion>

            <List.Accordion
              title="Estou na menopausa"
              left={(props) => <List.Icon {...props} icon="thermometer" color={expandedSections.menopausa ? '#fff' : undefined} />}
              right={(props) => <List.Icon {...props} icon={expandedSections.menopausa ? "chevron-up" : "chevron-down"} color={expandedSections.menopausa ? '#fff' : undefined} />}
              expanded={expandedSections.menopausa}
              onPress={() => toggleSection('menopausa')}
              style={[styles.accordion, expandedSections.menopausa && { backgroundColor: theme.colors.primary }]}
              titleStyle={{ color: expandedSections.menopausa ? '#fff' : undefined }}
            >
              <View style={styles.accordionContent}>
                <TextInput
                  label="Data de Início da Menopausa"
                  mode="outlined"
                  value={inicioMenupausa}
                  onChangeText={setInicioMenupausa}
                  placeholder="DD/MM/YYYY"
                  style={styles.input}
                />

                <TextInput
                  label="Sintomas"
                  mode="outlined"
                  multiline
                  numberOfLines={3}
                  value={sintomasMenupausa}
                  onChangeText={setSintomasMenupausa}
                  placeholder="Descreva seus sintomas..."
                  style={styles.input}
                />
              </View>
            </List.Accordion>

            <List.Accordion
              title="Condições Médicas"
              left={(props) => <List.Icon {...props} icon="hospital-box-outline" color={expandedSections.condicoesMedicas ? '#fff' : undefined} />}
              right={(props) => <List.Icon {...props} icon={expandedSections.condicoesMedicas ? "chevron-up" : "chevron-down"} color={expandedSections.condicoesMedicas ? '#fff' : undefined} />}
              expanded={expandedSections.condicoesMedicas}
              onPress={() => toggleSection('condicoesMedicas')}
              style={[styles.accordion, expandedSections.condicoesMedicas && { backgroundColor: theme.colors.primary }]}
              titleStyle={{ color: expandedSections.condicoesMedicas ? '#fff' : undefined }}
            >
              <View style={styles.accordionContent}>
                <TextInput
                  label="Condições Médicas Relevantes"
                  mode="outlined"
                  multiline
                  numberOfLines={3}
                  value={condicoesMedicas}
                  onChangeText={setCondicoesMedicas}
                  placeholder="Ex: Diabetes, Hipertensão, etc..."
                  style={styles.input}
                />
              </View>
            </List.Accordion>

            <List.Accordion
              title="Medicamentos"
              left={(props) => <List.Icon {...props} icon="pill" color={expandedSections.medicamentos ? '#fff' : undefined} />}
              right={(props) => <List.Icon {...props} icon={expandedSections.medicamentos ? "chevron-up" : "chevron-down"} color={expandedSections.medicamentos ? '#fff' : undefined} />}
              expanded={expandedSections.medicamentos}
              onPress={() => toggleSection('medicamentos')}
              style={[styles.accordion, expandedSections.medicamentos && { backgroundColor: theme.colors.primary }]}
              titleStyle={{ color: expandedSections.medicamentos ? '#fff' : undefined }}
            >
              <View style={styles.accordionContent}>
                <TextInput
                  label="Medicamentos que Utiliza"
                  mode="outlined"
                  multiline
                  numberOfLines={3}
                  value={medicamentos}
                  onChangeText={setMedicamentos}
                  placeholder="Ex: Nomes dos medicamentos..."
                  style={styles.input}
                />
              </View>
            </List.Accordion>
          </List.Section>

          <Button
            mode="contained"
            onPress={handleContinue}
            loading={loading}
            disabled={loading || !canContinue}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Criar Conta
          </Button>
          <Button
            mode="text"
            onPress={() => router.back()}
            style={styles.backButton}
          >
            Voltar
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 24,
    opacity: 0.7,
  },
  listSection: {
    marginBottom: 24,
  },
  accordion: {
    marginBottom: 2,
    backgroundColor: "transparent",
    borderRadius: 16,
    overflow: "hidden",
  },
  accordionContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    marginBottom: 16,
    borderRadius: 16,
  },
  button: {
    marginTop: 8,
    borderRadius: 20,
  },
  skipButton: {
    marginTop: 16,
  },
  backButton: {
    marginTop: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
