import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { initDatabase } from '../lib/database';

export default function Layout() {
  useEffect(() => {
    try {
      initDatabase();
    } catch (e) {
      console.error("Failed to start app database", e);
    }
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#2e7d32' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="index" options={{ title: 'home' }} />
      <Stack.Screen name="tasks" options={{ title: 'tasks' }} />
      <Stack.Screen name="add-task" options={{ title: 'add-task' }} />
      <Stack.Screen name="details" options={{ title: 'details' }} />
      <Stack.Screen name="edit-task" options={{ title: 'edit-task' }} />
    </Stack>
  );
}