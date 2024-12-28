import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import {Task} from '../types/task';
import styles from '../styles/styles';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEditTask: (Task: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
  onEditTask,
}) => {
  const [isEdited, setIsEdited] = useState(false);
  const [taskTxt, setTaskTxt] = useState(task.text);

  const cancelHandler = () => {
    setIsEdited(false);
    setTaskTxt(task.text);
  };

  const editHandler = () => {
    if (taskTxt.trim() === '') {
      Alert.alert('Error', 'Task cannot be empty');
      return;
    }
    onEditTask({...task, text: taskTxt.trim()});
    setIsEdited(false);
  };

  return (
    <View style={styles.taskContainer}>
      {isEdited ? (
        <View style={[styles.inputContainer, {marginBottom: 0}]}>
          <TextInput
            style={styles.input}
            placeholder="Enter a task"
            value={taskTxt}
            onChangeText={setTaskTxt}
          />
          <View
            style={{
              flexDirection: 'row',
              columnGap: 10,
              alignItems: 'center',
            }}>
            <TouchableOpacity style={styles.addButton} onPress={editHandler}>
              <Text style={styles.addButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cancelHandler}>
              <Text style={styles.deleteText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity onPress={() => onToggle(task.id)}>
          <Text
            style={[
              styles.taskText,
              {
                textDecorationLine: task.completed ? 'line-through' : 'none',
              },
            ]}>
            {task.text}
          </Text>
        </TouchableOpacity>
      )}
      {!isEdited && (
        <View style={{flexDirection: 'row', columnGap: 15}}>
          <TouchableOpacity onPress={() => setIsEdited(true)}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(task.id)}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default TaskItem;
