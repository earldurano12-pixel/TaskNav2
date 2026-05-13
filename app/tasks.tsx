import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { deleteTask, getTasks, Task } from '../lib/database';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  const loadData = useCallback(() => {
    try {
      setTasks(getTasks());
    } catch (error) {
      Alert.alert("Database Error", "Could not load tasks.");
    }
  }, []);

  useFocusEffect(loadData);

  const confirmDelete = (id: number) => {
    Alert.alert("Delete Task", "Are you sure?", [
      { text: "Cancel" },
      { text: "Delete", style: "destructive", onPress: () => {
          try {
            deleteTask(id);
            loadData();
          } catch (e) {
            Alert.alert("Error", "Delete failed.");
          }
      }}
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Task List</Text>
      <TouchableOpacity style={styles.addBtn} onPress={() => router.push('/add-task')}>
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
                onPress={() => router.push({ pathname: '/details', params: { ...item } })}
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
  container: { flex: 1, padding: 20, backgroundColor: '#f2f2f2' },
  headerTitle: { fontSize: 30, fontWeight: 'bold', marginBottom: 15 },
  addBtn: { backgroundColor: '#2e7d32', padding: 12, borderRadius: 8, width: 100, marginBottom: 20 },
  addBtnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  card: { backgroundColor: '#dcdcdc', padding: 20, borderRadius: 15, borderWidth: 1, borderColor: '#bbb', marginBottom: 15 },
  cardTitle: { fontSize: 20, fontWeight: 'bold' },
  cardDesc: { color: '#555', marginVertical: 2 },
  cardStatus: { fontWeight: '600', marginBottom: 12 },
  row: { flexDirection: 'row' },
  greenBtn: { backgroundColor: '#2e7d32', padding: 10, borderRadius: 8, marginRight: 10 },
  redBtn: { backgroundColor: '#b3001b', padding: 10, borderRadius: 8 },
  whiteText: { color: '#fff', fontWeight: 'bold' }
});