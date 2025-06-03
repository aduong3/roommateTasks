import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getHouseholdMembers } from "../services/apiHouse";
import { AuthContext } from "../utils/authContext";
import NewTaskModal from "./NewTaskModal";
import MemberTaskList from "./MemberTaskList";

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
      <FlatList
        data={membersList}
        keyExtractor={(item) => item.userId}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingTop: 20,
          paddingHorizontal: 12,
        }}
        renderItem={({ item }) => (
          <MemberTaskList
            memberName={item.name}
            isCurrentUser={user?.name === item.name}
            tasks={item.tasks}
          />
        )}
      />
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
