import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native';
import validator from 'validator';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DEV_URL, URL } from '../../constants';
import { useEffect } from 'react';
import { styles } from '../../styles/zealthyStyles';
import { useContext } from 'react';
import { FontColorContext } from '../contexts/ModesContext';
import SubmitButton from '../components/SubmitButtom';
import { isSubmitBtnDisabled } from '../../utils/utils';
import UploadButton from '../components/UploadButton';

const TicketSubmissionComponent = () => {
  const [showActivity, setShowActivity] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [emailIsNotValid, setEmailIsNotValid] = useState(false);
  const [selectedImages, setSelectedImages] = useState<Asset | null>(null);
  const [filesSelected, setFilesSelected] = useState<DocumentPickerResponse | null>(null);

  const {fontColor} = useContext(FontColorContext);

  const clearFields = () => {
    setName('');
    setEmail('');
    setDescription('');
    setSelectedImages(null);
    setFilesSelected(null);
  }

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles]
      });

      setFilesSelected(res[0]);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User cancelled flow');
      } else {
        console.log('Error while picking the file', error);
      }
    }
  }

  const pickImage = async () => {
    try {
      const response = await launchImageLibrary({ mediaType: 'photo'});
      
      if (response.assets) {
        setSelectedImages(response.assets[0]);
      }
      
    } catch (error) {
      console.log(error, 'THis is error');
    }
  }

  const handleSubmit = async () => {
    setShowActivity(true);
    const formData = new FormData();
    
    formData.append('file', {
      uri: selectedImages ? selectedImages.uri : filesSelected?.uri,
      name: selectedImages ? selectedImages.fileName : filesSelected?.name,
      type: selectedImages ? selectedImages.type! : filesSelected?.type!
    });

    formData.append('name', name);
    formData.append('email', email);
    formData.append('description', description);

    try {
      const response = await fetch(URL + 'tickets', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formData
      });
      const data = await response.json();
      setShowActivity(false);
      
      Alert.alert(
        'Ticket Submitted',
        'Ticket successfully submitted, our team will review it as soon as possible', [
          {
            text: 'OK',
            onPress: () => {
              clearFields();
            }
          }
        ]);
    } catch (error) {
      console.log(error);
      setShowActivity(false);
    }
  }

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      extraScrollHeight={Platform.OS === 'ios' ? 0 : 80}
      contentContainerStyle={
        Platform.OS === 'ios' ? styles.keyboardAware : {flex: 1}
      }
    >
      <View style={styles.container}>
        <View>
          <View style={styles.subContainer}>
            <Text style={[styles.title, {color: fontColor}]}>Help Desk</Text>
          </View>

          <View style={{paddingHorizontal: 20}}>
            <Text style={{textAlign: 'center', color: fontColor}}>
              Please submit your ticket with the information below. Describe your issue the best you can.
            </Text>
          </View>
          <View style={styles.textInputsContainer}>
            <TextInput
              style={[styles.input, {color: fontColor}]}
              placeholder='Enter Full Name'
              value={name}
              onChangeText={(text) => setName(text)}
            />

            <TextInput
              style={[styles.input, emailIsNotValid && styles.emailIsNotValid, {color: fontColor}]}
              placeholder='Enter email'
              autoCapitalize={'none'}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                !validator.isEmail(email) && text.length !== 0
                ? 
                setEmailIsNotValid(true) 
                : 
                setEmailIsNotValid(false);
              }}
              keyboardType={'email-address'}
            />

            <TextInput 
              style={[styles.input, {height: 100, color: fontColor}]}
              textAlignVertical='top'
              placeholder='Description'
              multiline
              value={description}
              onChangeText={(text) => setDescription(text)}
            />

            <View style={styles.uploadContainer}>
              <UploadButton btnText='Upload File' onPress={pickDocument} />
              <UploadButton extraStyles={styles.imageButton} btnText='Upload Image' onPress={pickImage} />
            </View>

            <View style={styles.selectedFile}>
              {selectedImages ? ( 
                <>
                  <Text style={{color: fontColor}}>Image selected:</Text>
                  <Text style={{color: fontColor}}>{selectedImages.fileName}</Text>
                </>
              ) : null}

              {filesSelected ? (
                <>
                  <Text style={{color: fontColor}}>File selected:</Text>
                  <Text style={{color: fontColor}}>{filesSelected.name}</Text>
                </>
              ) : null}
            </View>
          </View>
        </View>
        <SubmitButton 
          isActivityRunning={showActivity}
          isDisabled={isSubmitBtnDisabled(name, email, description)}
          handleSubmit={handleSubmit}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

export default TicketSubmissionComponent;
