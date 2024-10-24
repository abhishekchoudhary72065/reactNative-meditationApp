import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { GalleryPreviewData } from "@/components/models/AffirmationCategory";
import { useLocalSearchParams, useRouter } from "expo-router";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";
import AppGradient from "@/components/AppGradient";
import AntDesign from "@expo/vector-icons/AntDesign";

const AffirmationItem = () => {
  const [affirmation, setAffirmation] = useState<GalleryPreviewData>();
  const [sentences, setSentences] = useState<string[]>([]);

  const { itemId } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    for (let idx = 0; idx < AFFIRMATION_GALLERY.length; idx++) {
      const affirmationData = AFFIRMATION_GALLERY[idx].data;
      const affirmationStart = affirmationData.find(
        (item: GalleryPreviewData) => item.id === Number(itemId)
      );
      if (affirmationStart) {
        setAffirmation(affirmationStart);

        const affirmationArray = affirmationStart?.text.split(".");

        if (affirmationArray[affirmationArray.length - 1] === "") {
          affirmationArray.pop();
          setSentences(affirmationArray);
        }
        return;
      }
    }
  }, []);
  // console.log(affirmation);

  return (
    <View className="flex-1">
      <ImageBackground
        source={affirmation?.image}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.9)"]}>
          {/* <Text>Test</Text> */}
          <Pressable
            onPress={() => router.back()}
            className="absolute top-16 left-6 z-10"
          >
            <AntDesign name="leftcircleo" size={40} color="#ffffcf" />
          </Pressable>
          <ScrollView className="mt-28" showsVerticalScrollIndicator={false}>
            <View className="h-full justify-center">
              <View className="h-4/5 justify-center">
                {sentences?.map((sentence, index) => (
                  <Text
                    key={index}
                    className="text-white text-3xl font-bold mt-5 text-center mb-12"
                  >
                    {sentence}.
                  </Text>
                ))}
              </View>
            </View>
          </ScrollView>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default AffirmationItem;
