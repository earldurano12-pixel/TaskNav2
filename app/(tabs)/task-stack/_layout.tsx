import { Stack } from 'expo-router';

export default function TaskStackLayout() {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: '#2e7d32' }, headerTintColor: '#fff' }}>
      <Stack.Screen name="tasks" options={{ title: 'Task List' }} />
      <Stack.Screen name="add-task" options={{ title: 'Add Task' }} />
      <Stack.Screen name="details" options={{ title: 'Task Details' }} />
      <Stack.Screen name="edit-task" options={{ title: 'Edit Task' }} />
    </Stack>
  );
}