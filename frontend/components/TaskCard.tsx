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
    <View className="flex-row items-center w-full px-1">
      <Text className="text-xl flex-1" numberOfLines={1}>
        {task.name}
      </Text>

      <Text className="text-xl px-4">{dueDay}</Text>
      <View className="">
        {user?.name === memberName && (
          <StatusPicker
            onSubmit={(val) => console.log(val)}
            open={open}
            setOpen={setOpen}
            index={index}
          />
        )}
      </View>
      {user?.name !== memberName && (
        <View className="pr-10 pl-6 py-3">
          <Text className="text-lg">{status[task.status]}</Text>
        </View>
      )}
    </View>
  );
};

export default TaskCard;
