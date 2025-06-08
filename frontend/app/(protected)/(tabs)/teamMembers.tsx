import { View, Text, Alert, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getHouseholdMembers } from "../../../services/apiHouse";
import { AuthContext } from "../../../utils/authContext";
import Toast from "react-native-toast-message";

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

  const showSuccessToast = (name: string) => {
    Toast.show({
      type: "success",
      text1: `You have just pinged ${name}!`,
    });
  };
  const showFailedToast = (name: string) => {
    Toast.show({
      type: "error",
      text1: `Something went wrong with pinging ${name}`,
    });
  };

  const pingMember = async (name: string, userId: string) => {
    try {
      showSuccessToast(name);
      // maybe will need userId to do some backend API function call and then have notifications sent.
    } catch (error) {
      showFailedToast(name);
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
