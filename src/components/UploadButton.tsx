import React from 'react';
import { useContext } from 'react';
import { TouchableOpacity, Text, ViewStyle } from 'react-native';
import { styles } from '../../styles/zealthyStyles';
import { FontColorContext } from '../contexts/ModesContext';

type UploadButtonProps = {
  onPress: () => void;
  btnText: string;
  extraStyles?: ViewStyle
}

const UploadButton = ({onPress, btnText, extraStyles}: UploadButtonProps) => {
  const {fontColor} = useContext(FontColorContext);

  return (
    <TouchableOpacity style={[styles.upload, extraStyles]} onPress={onPress}>
      <Text style={{color: fontColor}}>{btnText}</Text>
    </TouchableOpacity>
  )
}

export default UploadButton;
