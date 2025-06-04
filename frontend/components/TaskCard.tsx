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
  index: number;
};

const TaskCard = ({ task, index }: Props) => {
  const dueDay = new Date(task.dueDate).toLocaleDateString(undefined, {
    weekday: "long",
  });
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-xl">{task.name}</Text>
      <Text className="text-xl">{dueDay}</Text>
      <StatusPicker
        onSubmit={(val) => console.log(val)}
        zIndex={3000 - index * 100}
      />
    </View>
  );
};

export default TaskCard;
