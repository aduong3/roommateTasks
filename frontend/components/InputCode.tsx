import { View, Text, TextInput, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { useForm, Controller } from "react-hook-form";

type CodeInput = {
  code: string;
};

const InputCode = ({ inputCode, setInputCode }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CodeInput>({ defaultValues: { code: "" } });

  const onSubmit = (data: CodeInput) => {
    setInputCode(false);
    console.log(data);
    reset();
  };

  const onCloseModal = () => {
    setInputCode(false);
    reset();
  };

  return (
    <View>
      <Modal visible={inputCode} transparent={true}>
        <View className="flex-1 bg-transparent justify-center items-center">
          <View className="w-[90%] h-[25%] bg-blue-200">
            <View className="flex-1 items-center justify-center">
              <Controller
                control={control}
                rules={{ maxLength: 12 }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Enter Code"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    maxLength={12}
                    className="text-2xl py-2 px-3"
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

export default InputCode;
