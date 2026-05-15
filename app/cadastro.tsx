import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, View, ScrollView } from 'react-native';
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";
import { getCadastroValidationError } from "../utils/cadastroValidation";

export default function CadastroScreen() {
  const { iniciarCadastro } = useAuth();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const router = useRouter();
  const validationError = getCadastroValidationError({
    nome,
    email,
    senha,
    telefone,
    dataNascimento,
  });

  const handleRegister = () => {
    if (validationError) {
      Alert.alert('Erro', validationError);
      return;
    }

    setLoading(true);

    iniciarCadastro({
      nome,
      email,
      senha,
      telefone,
      dataNascimento,
    });

    setLoading(false);
    router.push('/cadastroGestante');
  };

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
            Crie sua conta e comece sua jornada.
          </Text>

          <TextInput
            label="Nome"
            mode="outlined"
            autoCapitalize="words"
            value={nome}
            onChangeText={setNome}
            left={<TextInput.Icon icon="account-outline" />}
            style={styles.input}
          />

          <TextInput
            label="E-mail"
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            left={<TextInput.Icon icon="email-outline" />}
            style={styles.input}
          />

          <TextInput
            label="Senha"
            mode="outlined"
            secureTextEntry={!showPassword}
            value={senha}
            onChangeText={setSenha}
            error={senha.length > 0 && senha.trim().length < 6}
            left={<TextInput.Icon icon="lock-outline" />}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off-outline" : "eye-outline"}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            style={styles.input}
          />
          {senha.length > 0 && senha.trim().length < 6 ? (
            <Text style={styles.helperText}>
              A senha deve ter pelo menos 6 caracteres.
            </Text>
          ) : null}

          <TextInput
            label="Telefone"
            mode="outlined"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
            left={<TextInput.Icon icon="phone-outline" />}
            placeholder="(00) 00000-0000"
            style={styles.input}
          />

          <TextInput
            label="Data de Nascimento"
            mode="outlined"
            value={dataNascimento}
            onChangeText={setDataNascimento}
            left={<TextInput.Icon icon="calendar-outline" />}
            placeholder="DD/MM/YYYY"
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleRegister}
            loading={loading}
            disabled={loading || validationError !== null}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Avançar
          </Button>

          <Button
            mode="text"
            onPress={() => router.back()}
            style={styles.backButton}
          >
            Já tenho conta
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
    marginBottom: 32,
    opacity: 0.7,
  },
  input: {
    marginBottom: 16,
    borderRadius: 20,
  },
  helperText: {
    marginTop: -8,
    marginBottom: 12,
    color: "#B3261E",
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
  },
  registerButton: {
    marginTop: 16,
    borderRadius: 8,
  },
  backButton: {
    marginTop: 16,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  forgotPassword: {
    marginTop: 8,
  },
});
