import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { deleteTask, getTasks, Task } from '../../../lib/database';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  
  useFocusEffect(
    useCallback(() => {
      try {
        setTasks(getTasks());
      } catch (error) {
        Alert.alert("Error", "Could not refresh tasks.");
      }
    }, [])
  );

  const confirmDelete = (id: number) => {
    Alert.alert("Delete Task", "Are you sure?", [
      { text: "Cancel" },
      { text: "Delete", style: "destructive", onPress: () => {
          deleteTask(id);
          setTasks(getTasks()); 
      }}
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.listHeader}>Task List</Text>
      
      <TouchableOpacity 
        style={styles.addBtn} 
        onPress={() => router.push('/(tabs)/task-stack/add-task')}
      >
        <Text style={styles.addBtnText}>Add Task</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>
            <Text style={styles.cardStatus}>{item.status}</Text>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.greenBtn}
                onPress={() => router.push({ pathname: '/(tabs)/task-stack/details', params: { id: item.id } })}
              >
                <Text style={styles.whiteText}>View Details</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.redBtn} onPress={() => confirmDelete(item.id)}>
                <Text style={styles.whiteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  listHeader: { fontSize: 32, fontWeight: 'bold', marginBottom: 15, color: '#000' },
  addBtn: { backgroundColor: '#2e7d32', padding: 12, borderRadius: 8, width: 120, marginBottom: 20 },
  addBtnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  card: { backgroundColor: '#e0e0e0', padding: 20, borderRadius: 20, marginBottom: 15 },
  cardTitle: { fontSize: 22, fontWeight: 'bold', color: '#000' },
  cardDesc: { color: '#666', fontSize: 16, marginVertical: 2 },
  cardStatus: { fontWeight: 'bold', color: '#000', marginBottom: 10 },
  row: { flexDirection: 'row' },
  greenBtn: { backgroundColor: '#2e7d32', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10, marginRight: 10 },
  redBtn: { backgroundColor: '#b3001b', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10 },
  whiteText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});