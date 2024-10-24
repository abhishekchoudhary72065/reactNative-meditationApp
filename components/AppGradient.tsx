import React from "react";
import { View, SafeAreaView, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Content from "./Content";

const AppGradient = ({
  children,
  colors,
  additionalStyles,
}: {
  children: any;
  colors: string[];
  additionalStyles?: string;
}) => {
  return (
    <LinearGradient colors={colors} className={`flex-1 ${additionalStyles}`}>
      <Content>{children}</Content>
    </LinearGradient>
  );
};

export default AppGradient;
