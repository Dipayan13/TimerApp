//Timer
import { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Animated } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTimerContext } from "@/app/_layout";

export default function TimerScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { timers, updateTimer } = useTimerContext();

  const timer = timers[id as string]; // Get the current timer from context

  const initialTime = timer?.remainingTime ?? timer?.duration ?? 0;
  const [seconds, setSeconds] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(timer?.isRunning ?? false);

  // Animation for progress bar
  const progress = new Animated.Value(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    if (seconds === 0 && isRunning) {
      setIsRunning(false);
      alert("Timer completed!");
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, seconds]);

  useEffect(() => {
    if (timer) {
      updateTimer(id as string, seconds, isRunning);
    }

    // Update progress bar animation
    const newProgress = (timer?.duration ?? 1) - seconds;
    Animated.timing(progress, {
      toValue: newProgress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [seconds, isRunning]);

  return (
    <View style={styles.container}>
      <Text style={styles.timerName}>{timer?.name ?? "Unknown Timer"}</Text>

      <View style={styles.radialContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              transform: [
                {
                  rotate: "90deg",
                },
              ],
              width: progress.interpolate({
                inputRange: [0, timer?.duration ?? 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
        <Text style={styles.timeLeftText}>{seconds} sec</Text>
        <Text style={styles.timeLabel}>Time Left</Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.leftButtonContainer}>
          <Button title="Back" onPress={() => router.back()} color="#27FF27" />
        </View>
        <View style={styles.rightButtonContainer}>
          <Button
            title="Reset"
            onPress={() => {
              const resetTime = timer?.duration ?? 0;
              setSeconds(resetTime); 
              setIsRunning(false); 
              updateTimer(id as string, resetTime, false); 
            }}
            color="red"
          />
        </View>
      </View>

      <Button title={isRunning ? "Pause" : "Start"} onPress={() => setIsRunning(!isRunning)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  timerName: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  radialContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  progressBar: {
    position: "absolute",
    borderRadius: 50,
    height: 200,
    borderWidth: 10,
    borderColor: "#27FF27",
    backgroundColor: "transparent",
  },
  timeLeftText: {
    fontSize: 30,
    color: "#27FF27",
    fontWeight: "bold",
  },
  timeLabel: {
    fontSize: 16,
    color: "#27FF27",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  leftButtonContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  rightButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
});
