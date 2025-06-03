import { View, Text } from "react-native";
import React from "react";

type Props = {
  task: {
    _id: string;
    name: string;
    dueDate: Date;
  };
};

const TaskCard = ({ task }: Props) => {
  const dueDay = new Date(task.dueDate).toLocaleDateString(undefined, {
    weekday: "long",
  });
  return (
    <View>
      <Text className="text-xl">
        {task.name} - {dueDay}
      </Text>
    </View>
  );
};

export default TaskCard;
