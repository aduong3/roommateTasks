import { View, Text, TextInput, Modal, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { createHousehold, joinHousehold } from "../services/apiHouse";
import { AuthContext } from "../utils/authContext";

type HouseModalProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  mode: "join" | "create";
};

type DataInput = {
  code: string;
  name?: string;
};

const HouseModal = ({ visible, setVisible, mode }: HouseModalProps) => {
  const authState = useContext(AuthContext);
  const { user, updateHousehold } = authState;
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DataInput>({ defaultValues: { code: "", name: "" } });

  const onSubmit = async (data: DataInput) => {
    setVisible(false);
    if (mode === "create") {
      if (data?.name && user?.id && data?.code) {
        const household = await createHousehold({
          houseName: data?.name!,
          houseCode: data?.code,
          userId: user?.id!,
        });
        const houseId: string = household.newHouse._id;
        updateHousehold(data?.name, houseId);
      }
    } else if (mode === "join") {
      if (data?.code && user?.id) joinHousehold(user?.id, data?.code);
    }
    reset();
  };

  const onCloseModal = () => {
    setVisible(false);
    reset();
  };

  return (
    <View>
      <Modal visible={visible} transparent={true}>
        <View className="flex-1 bg-transparent justify-center items-center">
          <View className="w-[90%] h-[30%] bg-blue-300 rounded-lg">
            <View className="flex-1 items-center justify-center gap-3">
              {mode === "create" && (
                <Controller
                  control={control}
                  rules={{ minLength: 5, maxLength: 25 }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Enter House name"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      maxLength={25}
                      className="text-2xl py-2 px-3"
                    />
                  )}
                  name="name"
                />
              )}
              <Controller
                control={control}
                rules={{ minLength: 12, maxLength: 12 }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Enter Code"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    maxLength={12}
                    className="text-xl py-2 px-3"
                  />
                )}
                name="code"
              />
            </View>
            <View className="flex-row justify-around py-2">
              <TouchableOpacity
                onPress={onCloseModal}
                className="py-2 px-3 rounded-lg"
              >
                <Text className="text-xl font-semibold">Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                className="py-2 px-3 rounded-lg"
              >
                <Text className="text-xl font-semibold">Enter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HouseModal;
