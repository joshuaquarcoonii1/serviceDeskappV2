import React, { useState } from "react";
import { View, Text, TextInput, Button, Image, Alert, Dimensions ,ScrollView,StyleSheet,Platform} from "react-native";
import { Picker } from '@react-native-picker/picker';



const SignupScreen = ({ navigation,setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
const [email, setEmail] = useState("");
const [name, setName] = useState("");
  // Signup method
  const handleSignup = async () => {
    try {
      const response = await fetch('https://service-desk-app-6xvv.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password,email,name, contact, location, department }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sign Up Successful', `Welcome, ${data.username}`);
        setIsAuthenticated(true);
        //  navigation.replace('Main') // Navigate to the main screen after successful sign-up
      } else {
        Alert.alert('Sign Up Failed', data.error || 'An error occurred during sign up.');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      Alert.alert('Error', 'An error occurred while signing up.');
    }
  };
 
  return (
    <ScrollView>
    <View style={{ alignSelf: 'center', flex: 1, justifyContent: "center", alignItems: "center", padding: 20, width: Dimensions.get('window').width > 800 ? '80%' : '100%' }}>
      <Image source={require('../assets/vra_2.png')} style={{ width: 150, height: 150, borderRadius: 80, overflow: 'hidden', marginBottom: 16 }} />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingLeft: 10, marginBottom: 10, width: '100%' }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingLeft: 10, marginBottom: 10, width: '100%' }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        
        style={{ height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingLeft: 10, marginBottom: 10, width: '100%' }}
      />
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        
        style={{ height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingLeft: 10, marginBottom: 10, width: '100%' }}
      />
      <TextInput
        placeholder="Contact"
        value={contact}
        onChangeText={setContact}
        style={{ height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingLeft: 10, marginBottom: 10, width: '100%' }}
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={{ height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingLeft: 10, marginBottom: 10, width: '100%' }}
      />
      <Picker
        selectedValue={department}
        onValueChange={(itemValue) => setDepartment(itemValue)}
        style={{ height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingLeft: 10, marginBottom: 10, width: '100%' }}
      >
        <Picker.Item label="Select Department" value="" />
        <Picker.Item label="Internal Audit (AUD)" value="AUD" />
        <Picker.Item label="Board Secretariat (BSEC)" value="BSEC" />
        <Picker.Item label="Commercial Services (CMD)" value="CMD" />
        <Picker.Item label="Corporate Strategy (CSD)" value="CSD" />
        <Picker.Item label="Corporate Affairs & External Relations unit (CA&ER)" value="CA&ER" />
        <Picker.Item label="Engineering Services (ESD)" value="ESD" />
        <Picker.Item label="Finance & Investment (FIN)" value="FIN" />
        <Picker.Item label="Environment & Sustainable (ESD)" value="ESD" />
        <Picker.Item label="Human Resources (HRD)" value="HRD" />
        <Picker.Item label="Hydro Generation (HGD)" value="HGD" />
        <Picker.Item label="Legal Services (LSD)" value="LSD" />
        <Picker.Item label="Management Information Systems (MIS)" value="MIS" />
        <Picker.Item label="Procurement (PRD)" value="PRD" />
        <Picker.Item label="Real Estates & Security Services (REESD)" value="REESD" />
        <Picker.Item label="Technical Services (TSD)" value="TSD" />
        <Picker.Item label="Thermal Generation (TGD)" value="TGD" />
        <Picker.Item label="Water Resources & Renewables (WR&RE)" value="WR&RE" />
        <Picker.Item label="Utilities (UTIL)" value="UTIL" />
        <Picker.Item label="Special Projects & New Business (SP&NB)" value="SP&NB" />
        <Picker.Item label="VRA Academy (ACAD)" value="ACAD" />
        <Picker.Item label="VRA Health Services Ltd. (VHSL)" value="VHSL" />
        <Picker.Item label="VRA Intl. School (VISL)" value="VISL" />
      </Picker>
      <Button title="Sign Up" onPress={handleSignup} />
      <Button title="Go to Login" onPress={() => navigation.replace('Login')} style={{ marginTop: 10 }} />
    </View>
    </ScrollView>
  );
};
const styles=StyleSheet.create({

  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
picker: {
    height: 50,
    width: '100%',
    ...(Platform.OS === 'ios' ? { marginBottom: 20 } : {}),
  },
})



export default SignupScreen;