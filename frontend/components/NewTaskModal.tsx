import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { AuthContext } from "../utils/authContext";
import { getHouseholdMembers } from "../services/apiHouse";
import { createNewTask } from "../services/apiTask";

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
  const authState = useContext(AuthContext);
  const { user } = authState;
  const [show, setShow] = useState(false);

  const [openRecur, setOpenRecur] = useState(false);
  const [recurItems, setRecurItems] = useState([
    { label: "None", value: "none" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
  ]);
  const [openAssignedTo, setOpenAssignedTo] = useState(false);
  const [householdMembers, setHouseholdMembers] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const onRecurOpen = useCallback(() => {
    setOpenAssignedTo(false);
  }, []);
  const onAssignToOpen = useCallback(() => {
    setOpenRecur(false);
  }, []);

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

  const onSubmit = async (data: NewTaskDataInput) => {
    setVisible(false);
    if (
      data?.name &&
      data?.dueDate &&
      data?.recurrence &&
      data?.assignedTo &&
      user?.houseId
    ) {
      // console.log(data);
      createNewTask(
        data?.name,
        data?.dueDate,
        data?.recurrence,
        data?.assignedTo,
        user?.houseId
      );

      reset();
    }
  };

  useEffect(() => {
    async function fetchMembers() {
      const houseId = user?.houseId;
      const members = await getHouseholdMembers(houseId!);

      const assignedToPickerFormat = members?.membersWithTasks?.map(
        (member: any) => ({
          label: member.name,
          value: member.userId,
        })
      );
      setHouseholdMembers(assignedToPickerFormat);
    }
    fetchMembers();
  }, [user?.houseId]);

  return (
    <View>
      <Modal visible={visible} transparent={true}>
        <View className="flex-1 bg-transparent justify-center items-center">
          <View className="w-full h-[50%] bg-blue-300 rounded-lg">
            <View className="flex-1 items-center py-6 px-4 gap-6">
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Task name"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    maxLength={12}
                    className="py-2 px-3 text-xl"
                  />
                )}
              />
              {/* Date picker */}
              <Controller
                control={control}
                name="dueDate"
                render={({ field: { onChange, value } }) => (
                  <View>
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
                  </View>
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
                    setValue={(cb) => {
                      onChange(cb(value));
                    }}
                    setItems={setRecurItems}
                    zIndex={3000}
                    zIndexInverse={1000}
                    onOpen={onRecurOpen}
                  />
                )}
              />

              {/* assignedTo picker. Get all users and choose by name, but saved as user's id. */}
              <Controller
                control={control}
                name="assignedTo"
                render={({ field: { onChange, value } }) => (
                  <DropDownPicker
                    open={openAssignedTo}
                    value={value}
                    items={householdMembers}
                    setOpen={setOpenAssignedTo}
                    setValue={(cb) => {
                      onChange(cb(value));
                    }}
                    setItems={setHouseholdMembers}
                    zIndex={1000}
                    zIndexInverse={3000}
                    onOpen={onAssignToOpen}
                  />
                )}
              />
            </View>
            <View className="flex-row justify-evenly items-center py-4">
              <TouchableOpacity
                className="bg-blue-500 py-2 px-3 rounded-lg"
                onPress={() => setVisible(false)}
              >
                <Text className="text-white font-semibold text-lg">Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-blue-500 py-2 px-3 rounded-lg"
                onPress={handleSubmit(onSubmit)}
              >
                <Text className="text-white font-semibold text-lg">Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NewTaskModal;
