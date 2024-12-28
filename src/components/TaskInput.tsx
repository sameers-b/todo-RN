import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Text, Alert} from 'react-native';
import styles from '../styles/styles';

interface TaskInputProps {
  onAddTask: (text: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({onAddTask}) => {
  const [task, setTask] = useState<string>('');

  const handleAddTask = () => {
    if (task.trim() === '') {
      Alert.alert('Error', 'Task cannot be empty');
      return;
    }
    onAddTask(task.trim());
    setTask(''); // Clear input
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter a task"
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskInput;
