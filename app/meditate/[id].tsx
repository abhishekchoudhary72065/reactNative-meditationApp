import { View, Text, ImageBackground, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppGradient from "@/components/AppGradient";
import meditationImages from "@/constants/meditation-images";
import { useLocalSearchParams, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomButton from "@/components/CustomButton";
import { Audio } from "expo-av";
import { MEDITATION_DATA, AUDIO_FILES } from "@/constants/MeditationData";
import { TimerContext } from "@/context/TimerContext";

const meditate = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { duration: secondsRemaining, setDuration } = useContext(TimerContext);

  const [startMeditating, setStartMeditating] = useState<boolean>(false);
  const [audioSound, setSound] = useState<Audio.Sound>();
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    // Exit
    if (secondsRemaining === 0) {
      setStartMeditating(false);
      return;
    }

    if (startMeditating) {
      timerId = setTimeout(() => {
        setDuration(secondsRemaining - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [secondsRemaining, startMeditating]);

  useEffect(() => {
    setDuration(10);
  }, []);

  useEffect(() => {
    return () => {
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

  const handleAdjustDuration = () => {
    if (startMeditating) toggleMeditationSessionStatus();
    router.push("../(modal)/adjust-meditation-duration");
  };

  const toggleMeditationSessionStatus = async () => {
    if (secondsRemaining === 0) setDuration(10);
    setStartMeditating(!startMeditating);

    await toggleSound();
  };

  const toggleSound = async () => {
    const sound = audioSound ? audioSound : await initializeSound();

    const status = await sound?.getStatusAsync();

    if (status?.isLoaded && !isPlayingAudio) {
      await sound?.playAsync();
      setIsPlayingAudio(true);
    } else {
      await sound?.pauseAsync();
      setIsPlayingAudio(false);
    }
  };

  const initializeSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;

    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);
    setSound(sound);
    return sound;
  };

  // format time in minutes
  const formatMinutes = String(Math.floor(secondsRemaining / 60)).padStart(
    2,
    "0"
  );

  // format time in seconds
  const formatSeconds = String(Math.floor(secondsRemaining % 60)).padStart(
    2,
    "0"
  );

  return (
    <View className="flex-1">
      <ImageBackground
        className="flex-1"
        source={meditationImages[Number(id) - 1]}
      >
        <AppGradient colors={["transparent", "rgba(0,0,0,0.8)"]}>
          <Pressable onPress={() => router.back()}>
            <AntDesign name="leftcircleo" size={40} color="white" />
          </Pressable>
          <View className="flex-1 justify-center">
            <View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
              <Text className="text-4xl text-blue-800 font-medium font-rmono">
                {formatMinutes}:{formatSeconds}
              </Text>
            </View>
          </View>
          <View>
            <CustomButton
              title="Adjust Duration"
              onPress={handleAdjustDuration}
            />
            <CustomButton
              title={startMeditating ? "Stop" : "Start Meditation"}
              onPress={toggleMeditationSessionStatus}
              containerStyles="mt-5"
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default meditate;
