import React from "react";
import { SafeAreaView, Platform, StatusBar, StyleSheet } from "react-native";

const Content = ({ children }: { children: any }) => {
  return (
    <SafeAreaView
      style={styles.androidSafeView}
      className={`gap-10 justify-between flex-1 mx-5 my-10`}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  androidSafeView: {
    paddingTop:
      Platform.OS === "android" && StatusBar?.currentHeight
        ? StatusBar?.currentHeight
        : 0,
  },
});

export default Content;
