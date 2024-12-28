import React from 'react';
import {View, Text} from 'react-native';
import styles from '../styles/styles';

const EmptyList: React.FC = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        No tasks added yet. Start by adding one!
      </Text>
    </View>
  );
};

export default EmptyList;
