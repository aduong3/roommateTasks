import { View, Text } from "react-native";
import React, { useState } from "react";
import TaskCard from "./TaskCard";

type Task = {
  _id: string;
  name: string;
  dueDate: Date;
  status: string;
};

type Props = {
  memberName: string;
  isCurrentUser: boolean;
  tasks: Task[];
};

const MemberTaskList = ({ memberName, isCurrentUser, tasks }: Props) => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <View className="py-2">
      <Text className="text-2xl">{isCurrentUser ? "You" : memberName}</Text>
      <View className="border-solid border-black border py-2 px-3 rounded-lg">
        {tasks.length > 0 ? (
          tasks?.map((task, index) => (
            <TaskCard
              task={task}
              memberName={memberName}
              index={index}
              open={open}
              setOpen={setOpen}
              key={task._id}
            />
          ))
        ) : (
          <Text className="text-xl">No Tasks Assigned</Text>
        )}
      </View>
    </View>
  );
};

export default MemberTaskList;
