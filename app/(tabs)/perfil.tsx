import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Divider, List, Text, useTheme } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
export default function PerfilScreen() {
  const theme = useTheme();
  const router = useRouter();
  
  const { usuario, logout } = useAuth();

  const iniciais = usuario?.nome
    ? usuario.nome.substring(0, 2).toUpperCase()
    : 'US';

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Avatar.Text 
          size={80} 
          label={iniciais} 
          style={{ backgroundColor: theme.colors.primary }} 
          color="#FFF"
        />
        <Text variant="headlineSmall" style={styles.nameText}>
          {usuario?.nome || 'Usuária não encontrada'}
        </Text>
        <Text variant="bodyLarge" style={{ color: theme.colors.outline }}>
          {usuario?.email}
        </Text>
        
      </View>

      <Divider style={styles.divider} />

      <List.Section>
        <List.Subheader>Dados Pessoais</List.Subheader>
        
        <List.Item
          title="Telefone"
          description={usuario?.telefone || 'Não informado'}
          left={props => <List.Icon {...props} icon="phone-outline" />}
        />
        
        <List.Item
          title="Data de Nascimento"
          description={usuario?.dataNascimento ? usuario.dataNascimento.split('-').reverse().join('/') : 'Não informada'}
          left={props => <List.Icon {...props} icon="cake-variant-outline" />}
        />
        
      </List.Section>

      <Divider style={styles.divider} />

      <View style={styles.actionsContainer}>
        <Button 
          mode="outlined" 
          icon="logout" 
          textColor={theme.colors.error}
          style={[styles.logoutButton, { borderColor: theme.colors.error }]}
          onPress={handleLogout}
        >
          Sair
        </Button>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  nameText: {
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
  },
  badge: {
    marginTop: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  divider: {
    height: 1,
    opacity: 0.5,
  },
  actionsContainer: {
    padding: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  logoutButton: {
    borderWidth: 1,
  }
});