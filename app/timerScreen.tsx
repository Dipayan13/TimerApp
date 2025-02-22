// //timerScreen
// import { useState, useEffect } from "react";
// import { View, Text, Button, TouchableOpacity, StyleSheet, Modal } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { useTimerContext } from "@/app/_layout";
// import { completeTimer } from "../utils/storage";
// import Svg, { Circle } from "react-native-svg";
// import Slider from "@react-native-community/slider";

// export default function TimerScreen() {
//   const router = useRouter();
//   const { id, name, duration } = useLocalSearchParams();
//   const { timers, updateTimer } = useTimerContext();

//   const parsedDuration = duration ? Number(duration) : 0;
//   const activeTimer = timers[id as string] || {
//     id,
//     name,
//     duration: parsedDuration || 30,
//     remainingTime: parsedDuration || 30,
//     isRunning: false,
//   };

//   if (activeTimer.remainingTime === undefined) {
//     activeTimer.remainingTime = activeTimer.duration;
//   }

//   const [isRunning, setIsRunning] = useState(activeTimer.isRunning);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [milestone, setMilestone] = useState(0);
//   const [milestones, setMilestones] = useState<number[]>([]);
//   const seconds = activeTimer.remainingTime;

//   useEffect(() => {
//     let interval: NodeJS.Timeout | null = null;

//     if (isRunning && seconds > 0) {
//       interval = setInterval(() => {
//         updateTimer(id as string, seconds - 1, true);
//       }, 1000);
//     }

//     if (seconds === 0 && isRunning) {
//       setIsRunning(false);
//       completeTimer(id as string);
//     }

//     if (milestones.includes(seconds)) {
//       alert(`Milestone ${seconds} sec completed!`);
//       setMilestones(milestones.filter((m) => m !== seconds));
//     }

//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [isRunning, seconds]);

//   const toggleTimer = () => {
//     setIsRunning((prev) => !prev);
//     updateTimer(id as string, seconds, !isRunning);
//   };

//   const handleReset = () => {
//     updateTimer(id as string, activeTimer.duration, false);
//     setIsRunning(false);
//   };

//   const handleSetMilestone = () => {
//     if (milestone > seconds) {
//       alert("Milestone cannot be greater than remaining time!");
//       return;
//     }
//     setMilestones([...milestones, milestone]);
//     setModalVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{name}</Text>

//       <View style={styles.progressCircle}>
//         <Svg width="220" height="220" viewBox="0 0 220 220">
//           <Circle cx="110" cy="110" r="100" stroke="#444" strokeWidth="8" fill="none" />
//         </Svg>
//         <Text style={styles.timeText}>{seconds} sec</Text>
//         <Text style={styles.timeLabel}>Time Left</Text>
//       </View>

//       <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
//         <Text style={styles.backButtonText}>←</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
//         <Text style={styles.resetButtonText}>↻</Text>
//       </TouchableOpacity>

//       <Button title={isRunning ? "Pause" : seconds === activeTimer.duration ? "Start" : "Resume"} onPress={toggleTimer} />
      
//       <View style={{ marginVertical: 20 }} />
      
//       <Button title="Milestones" onPress={() => setModalVisible(true)} />
      
//       {milestones.map((m, index) => (
//         <View key={index} style={styles.milestoneItem}>
//           <Text style={styles.milestoneText}>Milestone: {m} sec</Text>
//         </View>
//       ))}

//       <Modal visible={modalVisible} transparent={true} animationType="slide">
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalTitle}>Set Your Milestone</Text>
//           <Slider
//             style={styles.slider}
//             minimumValue={0}
//             maximumValue={120}
//             step={1}
//             onValueChange={setMilestone}
//           />
//           <Button title="Set" onPress={handleSetMilestone} />
//           <Button title="Cancel" onPress={() => setModalVisible(false)} />
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "flex-start",
//     alignItems: "center",
//     padding: 20,
//   },
//   resetButton: {
//     position: "absolute",
//     right: 20,
//     top: 40,
//     width: 50,
//     height: 50,
//     borderRadius: 50,
//     backgroundColor: "red",
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 5,
//   },
//   resetButtonText: {
//     fontSize: 24,
//     color: "white",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   progressCircle: {
//     justifyContent: "center",
//     alignItems: "center",
//     position: "relative",
//   },
//   timeText: {
//     fontSize: 36,
//     fontWeight: "bold",
//     color: "#222",
//     position: "absolute",
//     top: "40%",
//   },
//   timeLabel: {
//     fontSize: 20,
//     fontWeight: "600",
//     color: "#444",
//     position: "absolute",
//     top: "65%",
//   },
//   backButton: {
//     position: "absolute",
//     left: 20,
//     top: 40,
//     width: 50,
//     height: 50,
//     borderRadius: 50,
//     backgroundColor: "blue",
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 5,
//   },
//   backButtonText: {
//     fontSize: 24,
//     color: "white",
//   },
//   milestoneItem: {
//     width: "100%",
//     padding: 10,
//     marginVertical: 5,
//     backgroundColor: "#ddd",
//     borderRadius: 10,
//   },
//   milestoneText: {
//     fontSize: 18,
//     textAlign: "center",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//     padding: 20,
//   },
//   modalTitle: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   slider: {
//     width: 250,
//     height: 40,
//     marginBottom: 10,
//   },
// });

import { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTimerContext } from "@/app/_layout";
import { completeTimer } from "../utils/storage";
import Svg, { Circle } from "react-native-svg";
import Slider from "@react-native-community/slider";

export default function TimerScreen() {
  const router = useRouter();
  const { id, name, duration } = useLocalSearchParams();
  const { timers, updateTimer } = useTimerContext();

  const parsedDuration = duration ? Number(duration) : 0;
  const activeTimer = timers[id as string] || {
    id,
    name,
    duration: parsedDuration || 30,
    remainingTime: parsedDuration || 30,
    isRunning: false,
  };

  if (activeTimer.remainingTime === undefined) {
    activeTimer.remainingTime = activeTimer.duration;
  }

  const [isRunning, setIsRunning] = useState(activeTimer.isRunning);
  const [modalVisible, setModalVisible] = useState(false);
  const [milestone, setMilestone] = useState(0);
  const [milestones, setMilestones] = useState<number[]>([]);
  const seconds = activeTimer.remainingTime;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        updateTimer(id as string, seconds - 1, true);
      }, 1000);
    }

    if (seconds === 0 && isRunning) {
      setIsRunning(false);
      completeTimer(id as string);
    }

    if (milestones.includes(seconds)) {
      alert(`Milestone ${seconds} sec completed!`);
      setMilestones(milestones.filter((m) => m !== seconds));
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, seconds]);

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
    updateTimer(id as string, seconds, !isRunning);
  };

  const handleReset = () => {
    updateTimer(id as string, activeTimer.duration, false);
    setIsRunning(false);
  };

  const handleSetMilestone = () => {
    if (milestone > seconds) {
      alert("Milestone cannot be greater than remaining time!");
      return;
    }
    setMilestones([...milestones, milestone]);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>

      <View style={styles.progressCircle}>
        <Svg width="220" height="220" viewBox="0 0 220 220">
          <Circle cx="110" cy="110" r="100" stroke="#444" strokeWidth="8" fill="none" />
        </Svg>
        <Text style={styles.timeText}>{seconds} sec</Text>
        <Text style={styles.timeLabel}>Time Left</Text>
      </View>

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>↻</Text>
      </TouchableOpacity>

      <Button title={isRunning ? "Pause" : seconds === activeTimer.duration ? "Start" : "Resume"} onPress={toggleTimer} />
      
      <View style={{ marginVertical: 20 }} />
      
      <Button title="Milestones" onPress={() => setModalVisible(true)} />
      
      {milestones.map((m, index) => (
        <View key={index} style={styles.milestoneItem}>
          <Text style={styles.milestoneText}>Milestone: {m} sec</Text>
        </View>
      ))}

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set Your Milestone</Text>
            <Text style={styles.milestoneValue}>{milestone} sec</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={120}
              step={1}
              value={milestone}
              onValueChange={setMilestone}
            />
            <Button title="Set" onPress={handleSetMilestone} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
    title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
    progressCircle: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
    backButton: {
    position: "absolute",
    left: 20,
    top: 40,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  backButtonText: {
    fontSize: 24,
    color: "white",
  },
    resetButton: {
    position: "absolute",
    right: 20,
    top: 40,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  resetButtonText: {
    fontSize: 24,
    color: "white",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  milestoneValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
    timeText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#222",
    position: "absolute",
    top: "40%",
  },
  timeLabel: {
    fontSize: 20,
    fontWeight: "600",
    color: "#444",
    position: "absolute",
    top: "65%",
  },
  slider: {
    width: 250,
    height: 40,
    marginBottom: 10,
  },
    milestoneItem: {
    width: "100%",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#ddd",
    borderRadius: 10,
  },
  milestoneText: {
    fontSize: 18,
    textAlign: "center",
  },
});