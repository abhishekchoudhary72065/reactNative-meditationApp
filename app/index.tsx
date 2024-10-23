import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Platform,
  StyleSheet,
  StatusBar,
} from "react-native";
import "../global.css";
import beachImage from "@/assets/meditation-images/beach.webp";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "@/components/CustomButton";

export default function App() {
  return (
    <View className="flex-1">
      <ImageBackground
        source={beachImage}
        resizeMode="cover"
        className="flex-1"
      >
        <LinearGradient
          className="flex-1"
          colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}
        >
          <SafeAreaView
            className="gap-10 justify-between flex-1 mx-5 my-10"
            style={styles.androidSafeView}
          >
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
                onPress={() => console.log("hello")}
                title="Get Started!!"
              />
            </View>
            <StatusBar barStyle={"light-content"} />
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  androidSafeView: {
    paddingTop:
      Platform.OS === "android" && StatusBar?.currentHeight
        ? StatusBar?.currentHeight
        : 0,
  },
});
