import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";

type NewTaskModalProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
};

type NewTaskDataInput = {
  name: string;
  dueDate: Date;
  recurrence: string;
  assignedTo: string;
};

const NewTaskModal = ({ visible, setVisible }: NewTaskModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewTaskDataInput>({
    defaultValues: {
      name: "",
      dueDate: new Date(),
      recurrence: "",
      assignedTo: "",
    },
  });

  return (
    <View>
      <Modal visible={visible} transparent={true}>
        <View className="flex-1 bg-transparent justify-center items-center">
          <View className="w-full h-[50%] bg-blue-300 rounded-lg">
            <View className="flex-1 items-center py-6 px-4">
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Task name"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    className="py-2 px-3 text-xl"
                  />
                )}
                name="name"
              />
              {/* Date picker */}
              {/* select picker for recurrence */}
              {/* assignedTo picker. Get all users and choose by name, but saved as user's id. */}
            </View>
            <View className="flex justify-center items-center py-2">
              <TouchableOpacity
                className="bg-blue-500 py-2 px-3 rounded-lg"
                onPress={() => setVisible(false)}
              >
                <Text className="text-white font-semibold text-lg">
                  Close Modal
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NewTaskModal;
