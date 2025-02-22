
//TimeCard.tsx
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Button } from "react-native";
import { useRouter } from "expo-router";
import { useTimerContext } from "@/app/_layout";
import { useState, useEffect } from "react";
import { completeTimer } from "../utils/storage";

interface Timer {
  id: string;
  name: string;
  duration: number;
  category: string;
  remainingTime?: number;
  isRunning?: boolean;
}

export default function TimerCard({ timer }: { timer: Timer }) {
  const router = useRouter();
  const { timers, startTimer, updateTimer } = useTimerContext();
  const activeTimer = timers[timer.id] ? { ...timer, ...timers[timer.id] } : timer;
  const isRunning = activeTimer.isRunning ?? false;

  console.log("Timer Prop:", timer);
  console.log("Timers from Context:", timers);
  console.log("Active Timer:", activeTimer);

  const [remainingTime, setRemainingTime] = useState(
    activeTimer.remainingTime ?? activeTimer.duration
  );
  const [progress, setProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log("Remaining Time State:", remainingTime);
    console.log("Progress State:", progress);
  }, [remainingTime, progress]);

  const getStatus = () => {
    if (remainingTime === 0) return "✅ Completed";
    return activeTimer.isRunning ? "✅ Running" : "⏸ Paused";
  };

useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
  
    if (activeTimer.isRunning && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prev) => {
          const newTime = prev - 1;
          updateTimer(timer.id, newTime, true);  
          return newTime;
        });
      }, 1000);
    }
  
    if (remainingTime === 0) {
      clearInterval(interval!);
      completeTimer(timer.id);
      setModalVisible(true);
    }
  
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeTimer.isRunning, remainingTime]);
  

  useEffect(() => {
    if (activeTimer.duration) {
      const progressValue = (remainingTime / activeTimer.duration) * 100;
      setProgress(progressValue);
    } else {
      setProgress(0);
    }
  }, [remainingTime, activeTimer.duration]);

  return (
    <>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => {
          //updateTimer(timer.id, remainingTime, activeTimer.isRunning);
          updateTimer(timer.id, remainingTime, isRunning);

          router.push(`/timerScreen?id=${timer.id}`);
        }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>{activeTimer.name || "Unknown Timer"}</Text>
          <Text style={styles.timerText}>⏳ Remaining: {remainingTime} sec</Text>
          <Text style={styles.statusText}>Status: {getStatus()}</Text>
        </View>

        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              if (activeTimer.isRunning) {
                updateTimer(timer.id, remainingTime, false);
              } else {
                startTimer(timer.id, timer.name, timer.duration, timer.category);
                updateTimer(timer.id, remainingTime, true);
              }
            }}
          >
            <Image
              source={activeTimer.isRunning ? require('@/assets/images/pause.webp') : require('@/assets/images/play.webp')}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              setRemainingTime(timer.duration);
              updateTimer(timer.id, timer.duration, false);
            }}
          >
            <Image source={require('@/assets/images/undo.webp')} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Timer Completed!</Text>
            <Text style={styles.modalText}>The timer for {activeTimer.name} has completed successfully.</Text>
            <Button title="OK" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center",
    position: "relative", 
  },
  textContainer: {
    flex: 1, 
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  timerText: {
    fontSize: 16,
    color: "#555",
  },
  statusText: {
    fontSize: 14,
    color: "#888",
    fontStyle: "italic",
  },
  iconContainer: {
    flexDirection: "row", 
    justifyContent: "flex-end", 
    alignItems: "center",
  },
  icon: {
    width: 30, 
    height: 30, 
    marginLeft: 10,
    borderRadius: 15, 
    borderWidth: 1, 
    borderColor: "#D3D3D3", 
    backgroundColor: "#f0f0f0", 
  },
  progressContainer: {
    width: "100%", 
    height: 4, 
    backgroundColor: "#e0e0e0", 
    borderRadius: 2, 
    position: "absolute",
    bottom: 0, 
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#27FF27", // Green color for the progress
    borderRadius: 2,
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: 250,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});
