import {
  View,
  Text,
  ImageBackground,
  StatusBar,
} from "react-native";
import "../global.css";
import beachImage from "@/assets/meditation-images/beach.webp";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import AppGradient from "@/components/AppGradient";

export default function App() {
  const router = useRouter();
  return (
    <View className="flex-1">
      <ImageBackground
        source={beachImage}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}>
          <View>
            <Text className="font-bold text-white text-4xl text-center">
              Simple Medidation
            </Text>
            <Text className="text-white text-2xl text-center mt-3">
              Simplifying Medidation
            </Text>
          </View>
          <View>
            <CustomButton
              onPress={() => router.push({ pathname: "./nature-meditate" })}
              title="Get Started!!"
            />
          </View>
          <StatusBar barStyle={"light-content"} />
        </AppGradient>
      </ImageBackground>
    </View>
  );
}
