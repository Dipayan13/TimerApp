import { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { saveTimer } from "../utils/storage";

interface Timer {
  id: string;
  name: string;
  duration: number;
  category: string; 
}

export default function AddTimerScreen() {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("Default"); 

  const router = useRouter();

  const handleSave = async () => {
    if (!name) {
      Alert.alert("Error", "Timer Name cannot be left empty.");
      return;
    }
    if (!duration) {
      Alert.alert("Error", "Duration cannot be left empty.");
      return;
    }
    if (!category) {
      Alert.alert("Error", "Category cannot be left empty.");
      return;
    }

    const newTimer: Timer = {
      id: Date.now().toString(),
      name,
      duration: Number(duration),
      category, 
    };

    await saveTimer(newTimer);
    router.push("../timerScreen"); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Timer Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter timer name"
      />

      <Text style={styles.label}>Duration (seconds):</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        placeholder="Enter duration"
      />

      <Text style={styles.label}>Category:</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Enter category"
      />

      <Button title="Save Timer" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
});
