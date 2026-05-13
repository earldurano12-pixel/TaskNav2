import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mini Task Tracker</Text>
      <Text style={styles.subtitle}>Organize your day efficiently.</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Open Tasks"
          color="#2e7d32"
          onPress={() => router.push('/tasks')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2e7d32' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 30 },
  buttonContainer: { width: '60%', borderRadius: 10, overflow: 'hidden' }
});