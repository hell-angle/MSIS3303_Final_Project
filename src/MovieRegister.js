import React, { useState,useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet ,Text} from 'react-native';
import validator from 'validator';
export const MovieRegister = () => {
  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [confirmPassWord, setConfirmPassWord] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const handleRegister = () => {
    // Perform registration validation
    if (!userName || !passWord || !confirmPassWord) {
      Alert.alert('Missing required fields.');
      return;
    }

    if (passWord !== confirmPassWord) {
      Alert.alert('Passwords do not match.');
      return;
    }


    // Registration successful
    Alert.alert('Registration successful!');
    // Perform necessary actions (e.g., call API for user registration)
        // Create the registration payload
        const registrationData = {
          username: userName,
          password: passWord,
          email: email,
          phone: phoneNumber,
          fullname:fullName
        };
      
        // Send a POST request to the backend endpoint
        fetch('http://127.0.0.1:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(registrationData)
        })
        .then(response => response.json())
        .then(data => {
          // Handle the response from the backend
          if (data.success) {
            // Registration successful
            alert('Registration successful');
          } else {
            // Registration failed
            alert('Registration failed: ' + data.message);
          }
        })
        .catch(error => {
          console.error('Error occurred during registration:', error);
          alert('Registration failed. Please try again later.');
        });
  };

  useEffect(() => {
    setIsFormValid(emailError === '' && phoneNumberError === '');
  }, [emailError, phoneNumberError]);

  const validateEmail = () => {
    if (email.trim() === '') {
      setEmailError('Email is required');
    } else if (!validator.isEmail(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  }

  const validatePhoneNumber = () => {
    if (phoneNumber.trim() === '') {
      setPhoneNumberError('Phone number is required');
    } else if (!/^\d+$/.test(phoneNumber)) {
      setPhoneNumberError('Please enter a valid phone number');
    } else if (!validator.isMobilePhone(phoneNumber, 'any')) {
      setPhoneNumberError('Please enter a valid phone number');
    } else {
      setPhoneNumberError('');
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.fanpage}>
        <View style={styles.pageHeader}>
          <Text style={styles.heading}>Register Page</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Full Name"
            value={fullName}
            onChangeText={text => setFullName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="youremail@gmail.com"
          value={email}
          onChangeText={text => setEmail(text)}
          onBlur={validateEmail} // Validate email onBlur
        />
        </View>
          {emailError ? <Text>{emailError}</Text> : null}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={text => setPhoneNumber(text)}
              onBlur={validatePhoneNumber}
              keyboardType="phone-pad" // Set the keyboard type to a numeric keypad
            />
          </View>
          {phoneNumberError ? <Text>{phoneNumberError}</Text> : null}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Username"
            value={userName}
            onChangeText={text => setUserName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="*********"
            secureTextEntry
            value={passWord}
            onChangeText={text => setPassWord(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="*********"
            secureTextEntry
            value={confirmPassWord}
            onChangeText={text => setConfirmPassWord(text)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Register"
            onPress={handleRegister}
            color="#007bff"
            disabled={!isFormValid}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fanpage: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  pageHeader: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  inputField: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    width: '10%',
    marginTop: 20,
  },
});

export default MovieRegister;
