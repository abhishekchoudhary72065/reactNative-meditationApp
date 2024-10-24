import { View, Text, FlatList, Pressable, Image } from "react-native";
import React from "react";
import { GalleryPreviewData } from "./models/AffirmationCategory";
import { Link } from "expo-router";

interface GuidedAffirmationGalleryProps {
  title: string;
  previews: GalleryPreviewData[];
}
const GuidedAffirmationGallery = ({
  title,
  previews,
}: GuidedAffirmationGalleryProps) => {
  return (
    <View className="my-5">
      <View className="mb-2">
        <Text className="text-zinc-100 text-2xl font-semibold">{title}</Text>
      </View>
      <View className="space-y-2">
        <FlatList
          data={previews}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Link href={`./affiramtions/${item.id}`} asChild>
              <Pressable>
                <View className="h-36 w-32 rounded-md mr-4">
                  <Image
                    source={item.image}
                    resizeMode="cover"
                    className="h-full w-full"
                  />
                </View>
              </Pressable>
            </Link>
          )}
          horizontal
        />
      </View>
    </View>
  );
};

export default GuidedAffirmationGallery;
