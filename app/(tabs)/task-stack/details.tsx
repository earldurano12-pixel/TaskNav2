import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getTasks, Task } from '../../../lib/database';

export default function Details() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);


  useFocusEffect(
    useCallback(() => {
      const allTasks = getTasks();
      const currentTask = allTasks.find(t => t.id === Number(params.id));
      if (currentTask) {
        setTask(currentTask);
      }
    }, [params.id])
  );

  if (!task) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task Details</Text>
      <Text style={styles.title}>Title: {task.title}</Text>
      <Text style={styles.desc}>Description: {task.description}</Text>
      <Text style={styles.status}>Status: {task.status}</Text>

      <TouchableOpacity 
        style={styles.editBtn} 
        onPress={() => router.push({ pathname: '/(tabs)/task-stack/edit-task', params: task })}
      >
        <Text style={styles.editBtnText}>Edit Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: '#fff' },
  header: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  desc: { fontSize: 16, color: '#444', marginVertical: 10 },
  status: { fontSize: 18, color: '#2e7d32', fontWeight: 'bold' },
  editBtn: { backgroundColor: '#2e7d32', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  editBtnText: { color: '#fff', fontWeight: 'bold' }
});