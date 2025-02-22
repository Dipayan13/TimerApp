


//Dark theme

import { View, Button, FlatList, Text, TouchableOpacity, StyleSheet, Image, Switch } from "react-native";
import { useState, useEffect, useCallback, useLayoutEffect } from "react";
import { useRouter, useNavigation } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { getTimers, Timer } from "../../utils/storage";
import TimerCard from "@/components/TimeCard";
import { useTheme } from "@/utils/themeContext"; // Import theme context

export default function HomeScreen() {
  const { isDarkMode, toggleDarkMode } = useTheme(); // Use dark mode state
  const [timers, setTimers] = useState<Timer[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});
  const [playPauseState, setPlayPauseState] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();
  const navigation = useNavigation(); // Get navigation instance

  useFocusEffect(
    useCallback(() => {
      loadTimers();
    }, [])
  );

  useEffect(() => {
    loadTimers();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Timers",
      headerTitleAlign: "center",
      headerRight: () => (
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      ),
    });
  }, [navigation, isDarkMode]);

  const loadTimers = async () => {
    const storedTimers = await getTimers();
    setTimers(storedTimers || []);
  };

  const groupedTimers = timers.reduce((acc, timer) => {
    if (!acc[timer.category]) acc[timer.category] = [];
    acc[timer.category].push(timer);
    return acc;
  }, {} as { [key: string]: Timer[] });

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const togglePlayPauseAll = async (category: string) => {
    const isPlaying = !playPauseState[category];
    setPlayPauseState((prev) => ({ ...prev, [category]: isPlaying }));
    const updatedTimers = timers.map((timer) =>
      timer.category === category ? { ...timer, isRunning: isPlaying } : timer
    );
    setTimers(updatedTimers);
  };

  const resetAllTimers = async (category: string) => {
    const updatedTimers = timers.map((timer) =>
      timer.category === category ? { ...timer, elapsedTime: 0, isRunning: false } : timer
    );
    setTimers(updatedTimers);
    setPlayPauseState((prev) => ({ ...prev, [category]: false }));
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Button title="Add New Timer" onPress={() => router.push("/(tabs)/addTimer")} />
      {Object.keys(groupedTimers).length === 0 ? (
        <Text>No timers found. Add one!</Text>
      ) : (
        <FlatList
          data={Object.keys(groupedTimers)}
          keyExtractor={(category) => category}
          renderItem={({ item: category }) => (
            <View style={styles.categoryContainer}>
              <View style={styles.categoryHeader}>
                <TouchableOpacity onPress={() => toggleCategory(category)}>
                  <Text style={[styles.categoryText, isDarkMode && styles.darkText]}>
                    {expandedCategories[category] ? "▼" : "▶"} {category}
                  </Text>
                </TouchableOpacity>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.playPauseButton}
                    onPress={() => togglePlayPauseAll(category)}
                  >
                    <Image
                      source={playPauseState[category] ? require('@/assets/images/pause.webp') : require('@/assets/images/play.webp')}
                      style={styles.icon}
                    />
                    <Text style={[styles.buttonText, isDarkMode && styles.darkText]}>
                      {playPauseState[category] ? "Pause All" : "Play All"}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.resetButton}
                    onPress={() => resetAllTimers(category)}
                  >
                    <Image
                      source={require('@/assets/images/undo.webp')}
                      style={styles.icon}
                    />
                    <Text style={[styles.buttonText, isDarkMode && styles.darkText]}>Reset All</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {expandedCategories[category] &&
                groupedTimers[category].map((timer) => (
                  <TimerCard key={timer.id} timer={timer} />
                ))}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  darkContainer: { backgroundColor: "#121212" },
  categoryContainer: {
    marginBottom: 15,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  categoryText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  darkText: {
    color: "#ffffff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  playPauseButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d9d9d9",
    padding: 8,
    borderRadius: 20,
    marginRight: 15,
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d9d9d9",
    padding: 8,
    borderRadius: 20,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  buttonText: {
    fontSize: 16,
  },
});

