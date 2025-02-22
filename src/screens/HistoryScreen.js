import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const storedHistory = await AsyncStorage.getItem('history');
    if (storedHistory) setHistory(JSON.parse(storedHistory));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completed Timers</Text>
      <FlatList 
        data={history} 
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => (
            <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.name}</Text>
            <Text>{item.completionTime}</Text>
            </View>
        )}
        />
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, title: { fontSize: 24, fontWeight: 'bold' } });

export default HistoryScreen;
