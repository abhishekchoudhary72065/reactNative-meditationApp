import { View, Text, ScrollView } from "react-native";
import React from "react";
import AppGradient from "@/components/AppGradient";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";
import GuidedAffirmationGallery from "@/components/GuidedAffirmationGallery";
import { AffirmationCategory } from "@/components/models/AffirmationCategory";

const Affirmations = () => {
  return (
    <View className="flex-1">
      <AppGradient colors={["#2e1f58", "#54426b", "#a790af"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-zinc-50 text-3xl font-bold">
            Change your beliefs with any affirmations
          </Text>
          <View>
            {AFFIRMATION_GALLERY?.map(
              (item: AffirmationCategory, index: number) => (
                <GuidedAffirmationGallery
                  title={item.title}
                  previews={item.data}
                  key={index}
                />
              )
            )}
          </View>
        </ScrollView>
      </AppGradient>
    </View>
  );
};

export default Affirmations;