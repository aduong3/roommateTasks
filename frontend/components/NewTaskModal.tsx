import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";

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
  const [show, setShow] = useState(false);

  const [openRecur, setOpenRecur] = useState(false);
  const [recurItems, setRecurItems] = useState([
    { label: "None", value: "none" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
  ]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewTaskDataInput>({
    defaultValues: {
      name: "",
      dueDate: new Date(),
      recurrence: "none",
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
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Task name"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    className="py-2 px-3 text-xl"
                  />
                )}
              />
              {/* Date picker */}
              <Controller
                control={control}
                name="dueDate"
                render={({ field: { onChange, value } }) => (
                  <>
                    <Text>{value.toDateString()}</Text>
                    <Button onPress={() => setShow(true)} title="Date picker" />
                    {show && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={value}
                        mode="date"
                        is24Hour={true}
                        onChange={(event, selectedDate) => {
                          setShow(false);
                          if (selectedDate) onChange(selectedDate);
                        }}
                      />
                    )}
                  </>
                )}
              />

              {/* select picker for recurrence */}
              <Controller
                control={control}
                name="recurrence"
                render={({ field: { onChange, value } }) => (
                  <DropDownPicker
                    open={openRecur}
                    value={value}
                    items={recurItems}
                    setOpen={setOpenRecur}
                    setValue={onChange}
                    setItems={setRecurItems}
                  />
                )}
              />

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
