import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [timers, setTimers] = useState([]);
  const [newTimer, setNewTimer] = useState({ name: '', duration: '', category: '' });

  useEffect(() => {
    loadTimers();
  }, []);

  const loadTimers = async () => {
    const storedTimers = await AsyncStorage.getItem('timers');
    if (storedTimers) setTimers(JSON.parse(storedTimers));
  };

  const saveTimers = async (updatedTimers) => {
    setTimers(updatedTimers);
    await AsyncStorage.setItem('timers', JSON.stringify(updatedTimers));
  };

  const addTimer = () => {
    if (newTimer.name && newTimer.duration && newTimer.category) {
      const updatedTimers = [...timers, { ...newTimer, id: Date.now(), remainingTime: parseInt(newTimer.duration), status: 'Paused' }];
      saveTimers(updatedTimers);
      setNewTimer({ name: '', duration: '', category: '' });
    }
  };

  const startTimer = (id) => {
    setTimers(prevTimers =>
      prevTimers.map(timer =>
        timer.id === id ? { ...timer, status: 'Running' } : timer
      )
    );
  
    const interval = setInterval(() => {
      setTimers(prevTimers =>
        prevTimers.map(timer =>
          timer.id === id && timer.remainingTime > 0
            ? { ...timer, remainingTime: timer.remainingTime - 1 }
            : timer
        )
      );
    }, 1000);
  
    setTimeout(() => {
      clearInterval(interval);
    }, newTimer.duration * 1000);
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Timers</Text>

      <TextInput style={styles.input} placeholder="Name" value={newTimer.name} onChangeText={(text) => setNewTimer({ ...newTimer, name: text })} />
      <TextInput style={styles.input} placeholder="Duration (seconds)" keyboardType="numeric" value={newTimer.duration} onChangeText={(text) => setNewTimer({ ...newTimer, duration: text })} />
      <TextInput style={styles.input} placeholder="Category" value={newTimer.category} onChangeText={(text) => setNewTimer({ ...newTimer, category: text })} />

      <Button title="Add Timer" onPress={addTimer} />

      <FlatList
        data={timers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.timerContainer}>
            <Text>{item.name} ({item.category}) - {item.remainingTime}s</Text>
            <Text>Status: {item.status}</Text>
            <Button title="Start" onPress={() => startTimer(item.id)} />
          </View>
        )}
      />

      <Button title="View History" onPress={() => navigation.navigate('History')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  timerContainer: { marginVertical: 10, padding: 10, borderWidth: 1 },
});

export default HomeScreen;
