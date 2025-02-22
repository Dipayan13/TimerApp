import { Tabs } from "expo-router";
import { useTheme } from "@/utils/themeContext"; 
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icons

export default function TabsLayout() {
  const { isDarkMode } = useTheme();

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap; 

            if (route.name === "index") {
              iconName = focused ? "timer" : "timer-outline";
            } else if (route.name === "history") {
              iconName = focused ? "time" : "time-outline";
            } else if (route.name === "addTimer") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            } else if (route.name === "explore") {
              iconName = focused ? "compass" : "compass-outline";
            } else {
              iconName = "help-circle"; // Default icon (prevents undefined)
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: isDarkMode ? "#ffffff" : "#007AFF",
          tabBarInactiveTintColor: isDarkMode ? "#BBBBBB" : "#888888",
          tabBarStyle: {
            backgroundColor: isDarkMode ? "#121212" : "#ffffff",
          },
        })}
      >
        <Tabs.Screen 
          name="index" 
          options={{ title: "Timers", headerTitleAlign: "center" }} 
        />
        <Tabs.Screen 
          name="history" 
          options={{ title: "History", headerTitleAlign: "center" }} 
        />
        <Tabs.Screen 
          name="addTimer" 
          options={{ title: "Add Timer", headerTitleAlign: "center" }} 
        />
        <Tabs.Screen 
          name="explore" 
          options={{ title: "Explore", headerTitleAlign: "center" }} 
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  darkContainer: { backgroundColor: "#121212" },
});
