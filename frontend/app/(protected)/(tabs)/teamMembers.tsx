import { View, Text, Alert, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getHouseholdMembers } from "../../../services/apiHouse";
import { AuthContext } from "../../../utils/authContext";

type Task = {
  _id: string;
  name: string;
  dueDate: Date;
  status: string;
};

type MemberList = {
  userId: string;
  name: string;
  tasks: Task[];
};

const TeamMembers = () => {
  const [membersList, setMembersList] = useState<MemberList[]>([]);

  const authState = useContext(AuthContext);
  const { user } = authState;

  useEffect(() => {
    const fetchMembers = async () => {
      const members = await getHouseholdMembers(user?.houseId!);
      setMembersList(members.membersWithTasks);
    };
    fetchMembers();
  }, [user?.houseId]);

  const pingMember = async (name: string, userId: string) => {
    try {
      Alert.alert(`You just pinged ${name}!`);
    } catch (error) {
      Alert.alert("Failed to send ping!");
    }
  };

  return (
    <View className="flex justify-center items-center py-20">
      <Text className="text-3xl">Ping a Member!</Text>
      {membersList.map((member) => (
        <View
          key={member?.userId}
          className="flex-row justify-around items-center w-full px-3 py-6"
        >
          <Text className="text-2xl">{member?.name}</Text>
          <TouchableOpacity
            className="bg-blue-400 px-3 py-2 rounded-lg"
            onPress={() => pingMember(member?.name, member?.userId)}
          >
            <Text className="text-2xl text-white">Ping</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default TeamMembers;
