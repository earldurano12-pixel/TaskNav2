import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { updateTask } from '../lib/database';

export default function EditTask() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [title, setTitle] = useState(params.title as string);
  const [desc, setDesc] = useState(params.description as string);
  const [status, setStatus] = useState(params.status as string);

  const handleUpdate = () => {
    try {
      if (title.trim().length < 1) throw new Error("Title is required");
      updateTask(Number(params.id), title, desc, status);
      router.dismissAll(); 
      router.push('/tasks');
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Task</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Task Title" />
      <TextInput style={[styles.input, styles.textArea]} value={desc} onChangeText={setDesc} multiline placeholder="Task Description" />
      
      <Text style={styles.label}>Select Status</Text>
      <View style={styles.statusRow}>
        {['Pending', 'Ongoing', 'Finished'].map((s) => (
          <TouchableOpacity
            key={s}
            style={[styles.statusBtn, status === s && styles.statusBtnActive]}
            onPress={() => setStatus(s)}
          >
            <Text style={[styles.statusBtnText, status === s && styles.statusBtnTextActive]}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
        <Text style={styles.updateBtnText}>Update Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: '#fff' },
  header: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  input: { backgroundColor: '#f2f2f2', padding: 15, borderRadius: 10, marginBottom: 15, fontSize: 16 },
  textArea: { height: 120, textAlignVertical: 'top' },
  label: { fontSize: 16, marginBottom: 15, fontWeight: '500' },
  statusRow: { flexDirection: 'row', marginBottom: 30 },
  statusBtn: { flex: 1, padding: 12, marginHorizontal: 4, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', alignItems: 'center' },
  statusBtnActive: { backgroundColor: '#2e7d32', borderColor: '#2e7d32' },
  statusBtnText: { color: '#000', fontWeight: 'bold' },
  statusBtnTextActive: { color: '#fff' },
  updateBtn: { backgroundColor: '#2e7d32', padding: 18, borderRadius: 10, alignItems: 'center' },
  updateBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});