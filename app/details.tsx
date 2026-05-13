import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Details() {
  const params = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {}
      <Text style={styles.header}>Task Details</Text>

      {}
      <Text style={styles.idLabel}>ID: {params.id}</Text>
      
      <Text style={styles.title}>Title: {params.title}</Text>
      
      <Text style={styles.desc}>Description: {params.description}</Text>

      {}
      <Text style={styles.status}>Status: {params.status}</Text>

      {}
      <TouchableOpacity 
        style={styles.editBtn} 
        onPress={() => router.push({ pathname: '/edit-task', params: params })}
      >
        <Text style={styles.editBtnText}>Edit Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 25, 
    backgroundColor: '#fff' 
  },
  header: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    marginBottom: 20,
    color: '#000' 
  },
  idLabel: {
    fontSize: 18,
    color: '#444',
    marginBottom: 5,
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold',
    marginBottom: 5 
  },
  desc: { 
    fontSize: 16, 
    color: '#444', 
    lineHeight: 24, 
    marginBottom: 10 
  },
  
  status: { 
    fontSize: 18, 
    color: '#2e7d32', 
    marginVertical: 10, 
    fontWeight: 'bold' 
  },
  editBtn: { 
    backgroundColor: '#2e7d32', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center',
    marginTop: 20
  },
  editBtnText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  }
});