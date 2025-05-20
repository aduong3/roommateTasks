import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";

const NoHouse = () => {
  const [inputCode, setInputCode] = useState(false);
  return (
    <View className="flex-1 justify-center items-center mt-8 px-3">
      <Text className="text-xl font-bold text-center">
        You are currently not in a household! Create or join one to start
        creating tasks with your roommates!
      </Text>
      <View className="flex-row gap-10 mt-5">
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-lg"
          onPress={() => setInputCode(!inputCode)}
        >
          <Text className="text-white font-semibold text-xl">
            Join with Code
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-lg">
          <Text className="text-white font-semibold text-xl">
            Create Household
          </Text>
        </TouchableOpacity>
      </View>
      {inputCode && (
        <View className="mt-16">
          <Text>Input code here</Text>
        </View>
      )}
    </View>
  );
};

export default NoHouse;
