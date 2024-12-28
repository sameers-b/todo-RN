import React, {useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import TaskItem from './src/components/TaskItem';
import EmptyList from './src/components/EmptyList';
import styles from './src/styles/styles';
import {Task} from './src/types/task';
import TaskInput from './src/components/TaskInput';

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
            <TaskItem task={item} onToggle={toggleTask} onDelete={deleteTask} />
          )}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default App;
