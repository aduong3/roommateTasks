import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getHouseholdMembers } from "../services/apiHouse";
import { AuthContext } from "../utils/authContext";

type MemberList = {
  _id: string;
  name: string;
};

const HasHouse = () => {
  const [membersList, setMembersList] = useState<MemberList[]>([]);
  const authState = useContext(AuthContext);
  const { user } = authState;

  useEffect(() => {
    const fetchMembers = async () => {
      const members = await getHouseholdMembers(user?.houseId!);
      setMembersList(members.listOfMembers);
      // console.log(members.listOfMembers);
    };
    fetchMembers();
  }, [user?.houseId]);

  return (
    <View className="flex-1 justify-center items-center mt-8 px-3">
      {membersList.map((member) => (
        <Text key={member._id}>{member.name}</Text>
      ))}
    </View>
  );
};

export default HasHouse;
