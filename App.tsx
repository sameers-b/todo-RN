import React, {useEffect, useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import TaskItem from './src/components/TaskItem';
import EmptyList from './src/components/EmptyList';
import styles from './src/styles/styles';
import {Task} from './src/types/task';
import TaskInput from './src/components/TaskInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? {...task, completed: !task.completed} : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const editTask = (updatedTask: Task) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  const saveTasks = async (newTasks: Task[]) => {
    try {
      await AsyncStorage.setItem('todo_tasks', JSON.stringify(newTasks));
    } catch (error) {
      console.error('Failed to save tasks', error);
    }
  };

  useEffect(() => {
    // Load tasks from AsyncStorage when the app loads
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('todo_tasks');

        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Failed to load tasks', error);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    // Save tasks to AsyncStorage whenever the tasks state changes
    saveTasks(tasks);
  }, [tasks]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do App</Text>
      <TaskInput onAddTask={addTask} />
      {tasks.length === 0 ? (
        <EmptyList />
      ) : (
        <FlatList
          data={tasks}
          renderItem={({item}) => (
            <TaskItem
              task={item}
              onEditTask={editTask}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          )}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default App;
