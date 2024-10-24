import { View, Text, FlatList, Pressable, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import AppGradient from "@/components/AppGradient";
import { MEDITATION_DATA } from "@/constants/MeditationData";
import meditationImages from "@/constants/meditation-images";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

const NatureMeditate = () => {
  const router = useRouter();
  return (
    <View className="flex-1">
      <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
        <View className="mb-6">
          <Text className="text-4xl font-bold text-gray-200 mb-3 text-left">
            Welcome Screen
          </Text>
          <Text className="text-xl text-indigo-100 font-medium">
            Start your mediation today
          </Text>
        </View>
        <View>
          <FlatList
            data={MEDITATION_DATA}
            className="mb-20"
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => router.push(`/meditate/${item.id}`)}
                className="h-48 my-3 rounded-md overflow-hidden"
              >
                <ImageBackground
                  source={meditationImages[item.id - 1]}
                  resizeMode="cover"
                  className="flex-1 justify-center rounded-lg"
                >
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.3)"]}
                    className="flex-1 justify-center items-center"
                  >
                    <Text className="text-3xl text-center font-bold text-gray-100">
                      {item.title}
                    </Text>
                  </LinearGradient>
                </ImageBackground>
              </Pressable>
            )}
          />
        </View>
        <StatusBar style="light" />
      </AppGradient>
    </View>
  );
};

export default NatureMeditate;
