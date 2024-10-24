import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import TimerContextProvider from "@/context/TimerContext";

// This will prevent the splash screen from auto hiding until all the fonts are loaded.

SplashScreen.preventAutoHideAsync();
const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Roboto-Mono": require("../assets/fonts/RobotoMono-Regular.ttf"),
  });
  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [error, fontsLoaded]);

  if (!fontsLoaded) return null;
  if (!fontsLoaded && error) return null;

  return (
    <TimerContextProvider>
      <Stack screenOptions={{ gestureEnabled: true }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="meditate/[id]" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modal)/adjust-meditation-duration"
          options={() => ({
            headerShown: false,
            presentation: "transparentModal",
            animation: "slide_from_bottom",
            contentStyle: {
              marginTop: 50,
              borderTopStartRadius: 50,
              borderTopEndRadius: 50,
            },
          })}
        />
      </Stack>
    </TimerContextProvider>
  );
};

export default RootLayout;
