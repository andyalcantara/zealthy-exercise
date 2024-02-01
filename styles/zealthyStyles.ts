import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  emailIsNotValid: {
    borderColor: 'red',
    borderWidth: 2,
  },
  input: {
    height: 40,
    borderRadius: 8,
    borderColor: 'lightgray',
    borderWidth: 2,
    paddingLeft: 10,
    marginTop: 10,
  },
  submit: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderRadius: 8,
    backgroundColor: '#3E9432',
  },
  upload: {
    height: 30,
    borderColor: '#3E9432',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 8,
  },
  uploadContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  keyboardAware: {
    flex: 1,
    paddingBottom: 30,
    paddingTop: 60,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  subContainer: {
    padding: 20,
  },
  textInputsContainer: {
    padding: 20,
    justifyContent: 'space-evenly'
  },
  submitButton: {
    color: 'white',
    fontSize: 18
  },
  imageButton: {
    marginLeft: 8,
  },
  selectedFile: {
    marginTop: 20
  }
});