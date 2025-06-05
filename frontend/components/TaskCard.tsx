import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import StatusPicker from "./StatusPicker";
import { AuthContext } from "../utils/authContext";

type Props = {
  task: {
    _id: string;
    name: string;
    dueDate: Date;
    status: string;
  };
  memberName: string;
  index: number;
  open: number | null;
  setOpen: React.Dispatch<React.SetStateAction<number | null>>;
};

const status: Record<string, string> = {
  not_started: "Not Started",
  in_progress: "In Progress",
  complete: "Complete",
};

const TaskCard = ({ task, memberName, index, open, setOpen }: Props) => {
  const dueDay = new Date(task.dueDate).toLocaleDateString(undefined, {
    weekday: "long",
  });
  const authState = useContext(AuthContext);
  const { user } = authState;
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-xl">{task.name}</Text>
      <Text className="text-xl">{dueDay}</Text>
      {user?.name === memberName && (
        <StatusPicker
          onSubmit={(val) => console.log(val)}
          open={open}
          setOpen={setOpen}
          index={index}
        />
      )}
      {user?.name !== memberName && (
        <Text className="text-lg">{status[task.status]}</Text>
      )}
    </View>
  );
};

export default TaskCard;
