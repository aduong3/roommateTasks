import { View, Text } from "react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DropDownPicker from "react-native-dropdown-picker";

const StatusPicker = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Not Started", value: "not_started" },
    { label: "In Progress", value: "in_progress" },
    { label: "Complete", value: "complete" },
  ]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      status: "not_started",
    },
  });

  const currentStatus = watch("status");

  const handleChange = (val) => {
    setValue("status", val);
    handleSubmit(onSubmit)();
  };

  return (
    <Controller
      control={control}
      name="status"
      render={({ field: { onChange, value } }) => (
        <View className="flex-shrink w-44">
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={(cb) => {
              const newVal = cb(currentStatus);
              handleChange(newVal);
            }}
            setItems={setItems}
            onChangeValue={handleChange}
            zIndex={open ? 3000 : 1000}
            zIndexInverse={1000}
            style={{
              borderWidth: 0,
              backgroundColor: "transparent",
              maxWidth: 150,
              alignSelf: "center",
            }}
            dropDownContainerStyle={{ backgroundColor: "#fff", maxWidth: 150 }}
            textStyle={{ fontSize: 16 }}
          />
        </View>
      )}
    />
  );
};

export default StatusPicker;
