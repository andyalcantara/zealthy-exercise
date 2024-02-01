import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { styles } from '../../styles/zealthyStyles';

type SubmitButtonProps = {
  isDisabled: boolean;
  handleSubmit: () => void;
  isActivityRunning: boolean;
}

const SubmitButton = ({isDisabled, handleSubmit, isActivityRunning}: SubmitButtonProps) => {
  return (
    <View style={{padding: 20}}>
      <TouchableOpacity disabled={isDisabled} style={styles.submit} onPress={handleSubmit}>
        {
          !isActivityRunning ? 
          <Text style={styles.submitButton}>Submit Ticket</Text> : 
          <ActivityIndicator color={'white'} size={'small'} />
        }
      </TouchableOpacity>
    </View>
  );
}

export default SubmitButton;
