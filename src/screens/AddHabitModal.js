import React, { useState } from "react";
import { TextInput, Button, View, Modal } from "react-native";

const AddHabitModal = ({ onAdd, onClose }) => {
  const [habit, setHabit] = useState("");

  const handleAdd = () => {
    onAdd({ name: habit, done: false });
    onClose();
  };

  return (
    <Modal visible={true} onRequestClose={onClose}>
      <View>
        <TextInput
          placeholder="Enter habit"
          value={habit}
          onChangeText={setHabit}
        />
        <Button title="Add Habit" onPress={handleAdd} />
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default AddHabitModal;
