import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native"; 
import { getHistory, clearHistory } from "../../utils/storage";

interface HistoryItem {
  id: string;
  name: string;
  completionTime: string;
}

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const loadHistory = async () => {
    console.log("Loading history...");
    const storedHistory: HistoryItem[] = await getHistory();
    setHistory(storedHistory);
  };

  const handleClearHistory = async () => {
    await clearHistory();
    setHistory([]); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completed Timers</Text>

      {history.length === 0 ? (
        <Text style={styles.emptyText}>No completed timers found.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text style={styles.timerName}>{item.name}</Text>
              <Text style={styles.timestamp}>Completed at: {item.completionTime}</Text>
            </View>
          )}
        />
      )}

      <Button title="Clear History" onPress={handleClearHistory} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
  emptyText: { textAlign: "center", marginTop: 20 },
  historyItem: { padding: 10, borderBottomWidth: 1 },
  timerName: { fontSize: 18 },
  timestamp: { color: "gray" },
});
