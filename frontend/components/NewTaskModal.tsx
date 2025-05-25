import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";

type NewTaskModalProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
};

const NewTaskModal = ({ visible, setVisible }: NewTaskModalProps) => {
  return (
    <View>
      <Modal visible={visible} transparent={true}>
        <View className="flex-1 bg-transparent justify-center items-center">
          <View className="w-[90%] h-[30%] bg-blue-300 rounded-lg">
            <TouchableOpacity
              className="bg-gray-200"
              onPress={() => setVisible(false)}
            >
              <Text>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NewTaskModal;
