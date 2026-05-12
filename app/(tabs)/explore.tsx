import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';

export default function ExploreScreen() {
  // Puxamos o nosso tema unificado
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card elevation={2}>
        <Card.Title title="Explorar" subtitle="Limpeza do template concluída" />
        <Card.Content>
          <Text variant="bodyMedium">
            Agora esta tela também está usando os componentes oficiais do React Native Paper e respeitando o seu theme.ts.
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});