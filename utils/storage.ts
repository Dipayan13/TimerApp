import AsyncStorage from "@react-native-async-storage/async-storage";

const HISTORY_KEY = "history";

export interface Timer {
  id: string;
  name: string;
  duration: number;
  category: string;
}

interface HistoryItem {
  id: string;
  name: string;
  completionTime: string;
}

export const saveTimer = async (timer: Timer) => {
  try {
    const existingTimers = await getTimers();
    const timerExists = existingTimers.some(t => t.id === timer.id);
    
    if (!timerExists) {
      const updatedTimers = [...existingTimers, timer];
      await AsyncStorage.setItem("timers", JSON.stringify(updatedTimers));
    }
  } catch (error) {
    console.error("Error saving timer:", error);
  }
};

export const getTimers = async (): Promise<Timer[]> => {
  try {
    const data = await AsyncStorage.getItem("timers");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error fetching timers:", error);
    return [];
  }
};

export const removeTimer = async (id: string) => {
  try {
    const timers = await getTimers();
    const updatedTimers = timers.filter(timer => timer.id !== id);
    await AsyncStorage.setItem("timers", JSON.stringify(updatedTimers));
  } catch (error) {
    console.error("Error removing timer:", error);
  }
};

export const getHistory = async (): Promise<HistoryItem[]> => {
  try {
    const storedHistory = await AsyncStorage.getItem(HISTORY_KEY);
    return storedHistory ? JSON.parse(storedHistory) : [];
  } catch (error) {
    console.error("Error fetching history:", error);
    return [];
  }
};

export const saveHistory = async (newItem: HistoryItem): Promise<HistoryItem[]> => {
  try {
    const currentHistory: HistoryItem[] = await getHistory();
    const updatedHistory: HistoryItem[] = [...currentHistory, newItem];

    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));

    console.log("Saved history:", updatedHistory);
    return updatedHistory; 
  } catch (error) {
    console.error("Error saving history:", error);
    return [];
  }
};

export const completeTimer = async (id: string): Promise<HistoryItem[]> => {
  try {
    const timers = await getTimers();
    const timer = timers.find(t => t.id === id);

    if (!timer) return await getHistory();

    const historyItem: HistoryItem = { 
      id: timer.id, 
      name: timer.name, 
      completionTime: new Date().toLocaleString() 
    };

    const updatedHistory = await saveHistory(historyItem);
    await removeTimer(id);

    return updatedHistory;
  } catch (error) {
    console.error("Error completing timer:", error);
    return [];
  }
};

export const clearHistory = async (): Promise<HistoryItem[]> => {
  await AsyncStorage.removeItem(HISTORY_KEY);
  return [];
};
