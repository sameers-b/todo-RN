import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Task} from '../types/task';
import styles from '../styles/styles';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({task, onToggle, onDelete}) => {
  return (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={() => onToggle(task.id)}>
        <Text
          style={[
            styles.taskText,
            {textDecorationLine: task.completed ? 'line-through' : 'none'},
          ]}>
          {task.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(task.id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskItem;
