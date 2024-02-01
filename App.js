import React, { useCallback, useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <WebView
        source={{ uri: "https://protons.vercel.app/" }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
