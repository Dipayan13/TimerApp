import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="clock"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore Timer Features</ThemedText>
      </ThemedView>
      <ThemedText>Welcome to the Timer App! Here are some of the app's powerful features:</ThemedText>

      <Collapsible title="Multiple Timers">
        <ThemedText>
          You can set up multiple timers at once, organize them into categories, and run them simultaneously. Whether it's for work, fitness, or study sessions, this app has you covered.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Progress Tracking">
        <ThemedText>
          Track the progress of your timers with visual indicators. See how much time has passed and how much time is left for each timer with real-time updates.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Timer History">
        <ThemedText>
          Keep track of your past timer sessions. You can view the history of completed timers and analyze your productivity or progress.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Categories & Bulk Actions">
        <ThemedText>
          Organize your timers into categories for better management. You can also perform bulk actions like starting, pausing, or resetting multiple timers at once.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Local Data Persistence">
        <ThemedText>
          Your timers, settings, and history are saved locally using AsyncStorage. This means you can use the app offline, and your data will persist even when you restart the app.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Dark Mode & Light Mode Support">
        <ThemedText>
          The app supports both dark and light modes. The color scheme will automatically adjust based on your device settings for a more comfortable experience.
        </ThemedText>
        <ExternalLink href="https://reactnative.dev/docs/theming">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Customization Options">
        <ThemedText>
          Customize the appearance of your timers, set personalized alarms, and even choose from various timer sounds to suit your preferences.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Animations">
        <ThemedText>
          The app includes smooth animations when starting, pausing, or resetting timers, giving you a more interactive and engaging experience.
        </ThemedText>
      </Collapsible>

      <Collapsible title="App Documentation">
        <ThemedText>
          For a deeper dive into the app's features and functionality, check out the documentation. It includes detailed explanations and guides to help you make the most of the Timer App.
        </ThemedText>
        <ExternalLink href="https://github.com/Dipayan13">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
