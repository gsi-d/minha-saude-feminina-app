import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function Index() {
  const theme = useTheme();
  
  // No futuro, isso virá do seu banco de dados ou AsyncStorage (ex: Firebase Auth, JWT)
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulando a checagem de um token de login salvo no celular
    setTimeout(() => {
      setIsAuthenticated(false); // Mude para true para testar a ida direta para as abas
      setIsReady(true);
    }, 500); 
  }, []);

  // Enquanto checa se a usuária está logada, mostra um loading usando a cor da sua marca
  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  // Se não estiver logada, joga para a tela de Login
  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  // Se já estiver logada, joga direto para o miolo do app (Tabs)
  return <Redirect href="/(tabs)" />;
}