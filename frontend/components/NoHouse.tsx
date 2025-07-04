import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import HouseModal from "./HouseModal";

const NoHouse = () => {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<"join" | "create" | "">("");

  return (
    <>
      {(mode === "join" || mode === "create") && (
        <HouseModal visible={visible} setVisible={setVisible} mode={mode} />
      )}
      <View className="flex-1 justify-center items-center mt-8 px-3">
        <Text className="text-xl font-bold text-center">
          You are currently not in a household! Create or join one to start
          creating tasks with your roommates!
        </Text>
        <View className="flex-row gap-10 mt-5">
          <TouchableOpacity
            className="bg-blue-500 px-4 py-2 rounded-lg"
            onPress={() => {
              setVisible(!visible);
              setMode("join");
            }}
          >
            <Text className="text-white font-semibold text-xl">
              Join with Code
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-blue-500 px-4 py-2 rounded-lg"
            onPress={() => {
              setVisible(!visible);
              setMode("create");
            }}
          >
            <Text className="text-white font-semibold text-xl">
              Create Household
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default NoHouse;
