import { View, Text } from "react-native";
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
  return (
    <View className="flex justify-center items-center py-20">
      {membersList.map((member) => (
        <Text key={member?.userId}>{member?.name}</Text>
      ))}
    </View>
  );
};

export default TeamMembers;
