import { View, Text } from "react-native";
import React from "react";
import StatusPicker from "./StatusPicker";

type Props = {
  task: {
    _id: string;
    name: string;
    dueDate: Date;
    status: string;
  };
};

const TaskCard = ({ task }: Props) => {
  const dueDay = new Date(task.dueDate).toLocaleDateString(undefined, {
    weekday: "long",
  });
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-xl">{task.name}</Text>
      <Text className="text-xl">{dueDay}</Text>
      <StatusPicker onSubmit={(val) => console.log(val)} />
    </View>
  );
};

export default TaskCard;
