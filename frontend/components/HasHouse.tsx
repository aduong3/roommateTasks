import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getHouseholdMembers } from "../services/apiHouse";
import { AuthContext } from "../utils/authContext";
import NewTaskModal from "./NewTaskModal";

type Task = {
  _id: string;
  name: string;
  dueDate: Date;
};

type MemberList = {
  userId: string;
  name: string;
  tasks: Task[];
};

const HasHouse = () => {
  const [visible, setVisible] = useState(false);
  const [membersList, setMembersList] = useState<MemberList[]>([]);
  const authState = useContext(AuthContext);
  const { user } = authState;

  useEffect(() => {
    const fetchMembers = async () => {
      const members = await getHouseholdMembers(user?.houseId!);
      setMembersList(members.membersWithTasks);
      // console.log(members.membersWithTasks[0].tasks);
    };
    fetchMembers();
  }, [user?.houseId]);

  return (
    <>
      <NewTaskModal visible={visible} setVisible={setVisible} />
      <View className="flex-1 mt-8 px-3 gap-8">
        {membersList.map((member) => (
          <View key={member.userId}>
            <Text className="text-3xl font-semibold">
              {user?.name === member.name ? "You" : member.name}
            </Text>

            {/* Extract this into a task card UI for each member.
                Add in a drop down for task status. This will display an emoji along with the status on the
                right side of the tasks.            
            */}
            <View className="border-solid border-black border py-2 px-3 rounded-lg">
              {member.tasks.length > 0 ? (
                member.tasks?.map((task) => (
                  <Text key={task._id} className="text-xl">
                    {task.name} -{" "}
                    {new Date(task.dueDate).toLocaleDateString(undefined, {
                      weekday: "long",
                    })}
                  </Text>
                ))
              ) : (
                <Text className="text-xl">No Tasks Assigned</Text>
              )}
            </View>
          </View>
        ))}
      </View>
      <View className="flex justify-center items-end px-6">
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-lg"
          onPress={() => {
            setVisible(!visible);
          }}
        >
          <Text className="text-xl text-white">+</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default HasHouse;
