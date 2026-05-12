import { Tabs } from 'expo-router';
import React from 'react';

import { AppTheme } from '@/constants/theme';
import { useTheme } from 'react-native-paper';

export default function TabLayout() {
  const theme = useTheme<AppTheme>();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore'
        }}
      />
    </Tabs>
  );
}
