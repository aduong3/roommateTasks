import { View, Text } from "react-native";
import React from "react";
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
  return (
    <View className="py-2">
      <Text className="text-2xl">{isCurrentUser ? "You" : memberName}</Text>
      <View className="border-solid border-black border py-2 px-3 rounded-lg">
        {tasks.length > 0 ? (
          tasks?.map((task) => <TaskCard task={task} key={task._id} />)
        ) : (
          <Text className="text-xl">No Tasks Assigned</Text>
        )}
      </View>
    </View>
  );
};

export default MemberTaskList;
