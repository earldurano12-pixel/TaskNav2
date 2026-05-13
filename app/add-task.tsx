import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { addTask } from '../lib/database';

export default function AddTask() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState('Pending');
  const router = useRouter();

  const handleSave = () => {
    try {
      if (title.trim().length < 3) throw new Error("Title too short");
      addTask(title, desc, status);
      router.back();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Task</Text>
      <TextInput style={styles.input} placeholder="Enter task title" value={title} onChangeText={setTitle} />
      <TextInput style={[styles.input, styles.textArea]} placeholder="Enter task description" value={desc} onChangeText={setDesc} multiline />
      
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

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Save Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: '#fff' },
  header: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  input: { backgroundColor: '#f2f2f2', padding: 15, borderRadius: 10, marginBottom: 15 },
  textArea: { height: 100, textAlignVertical: 'top' },
  label: { fontSize: 16, marginBottom: 10 },
  statusRow: { flexDirection: 'row', marginBottom: 30 },
  statusBtn: { flex: 1, padding: 12, marginHorizontal: 4, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', alignItems: 'center' },
  statusBtnActive: { backgroundColor: '#2e7d32', borderColor: '#2e7d32' },
  statusBtnText: { color: '#000', fontWeight: 'bold' },
  statusBtnTextActive: { color: '#fff', fontWeight: 'bold' },
  saveBtn: { backgroundColor: '#2e7d32', padding: 18, borderRadius: 10, alignItems: 'center' },
  saveBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});