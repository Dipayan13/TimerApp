
import { createContext, useContext, useState } from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from "@/utils/themeContext"; // Import ThemeProvider


// Define timer structure
interface Timer {
  id: string;
  name: string;
  duration: number;
  remainingTime: number;
  isRunning: boolean;
  category: string;
}

// Define context structure
interface TimerContextType {
  timers: { [key: string]: Timer };
  startTimer: (id: string, name: string, duration: number, category: string) => void;
  updateTimer: (id: string, remainingTime: number, isRunning: boolean) => void;
}

// Create Context
const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function useTimerContext() {
  const context = useContext(TimerContext);
  if (!context) throw new Error("useTimerContext must be used within TimerProvider");
  return context;
}

export default function RootLayout() {
  const [timers, setTimers] = useState<{ [key: string]: Timer }>({});

  // Start a timer
  const startTimer = (id: string, name: string, duration: number, category: string) => {
    setTimers((prev) => ({
      ...prev,
      [id]: prev[id] 
        ? { ...prev[id], isRunning: true } 
        : { id, name, duration, remainingTime: duration, isRunning: true, category },
    }));
  };
  
  

  // Update timer state
  const updateTimer = (id: string, remainingTime: number, isRunning: boolean) => {
    setTimers((prev) => ({
      ...prev,
      [id]: { ...prev[id], remainingTime, isRunning },
    }));
  };

  return (
    <ThemeProvider>
      <TimerContext.Provider value={{ timers, startTimer, updateTimer }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="addTimer" options={{ title: "Add Timer" }} />
          <Stack.Screen name="timerScreen" options={{ title: "Timer" }} />
        </Stack>
      </TimerContext.Provider>
    </ThemeProvider>
  );
}
