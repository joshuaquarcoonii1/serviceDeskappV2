import {useState,React} from "react";
import { View ,Text,TextInput,Button,Image,Alert ,Dimensions} from "react-native";
import { setCurrentUser,setUserContact ,setUserLocation,setUserDepartment,setUserEmail} from "../UserData";
// login
const LoginScreen = ({ navigation,setIsAuthenticated }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
  //login method
  const handleLogin = async () => {
    try {
      const response = await fetch('https://service-desk-app-6xvv.onrender.com/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
      });
  
      const text = await response.text(); // Log raw response
      console.log('Raw response:', text);
  
      // Try parsing only if it's valid JSON
      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        console.error('JSON Parse Error:', jsonError);
        Alert.alert('Error', 'Server did not return valid JSON.');
        return;
      }
  
      console.log(data);
  
      if (response.ok) {
        setCurrentUser(data.username);
        setUserContact(data.contact);
        setUserLocation(data.location);
        setUserDepartment(data.department);
        setUserEmail(data.email);
  
        Alert.alert('Login Successful', `Welcome, ${data.username}`);
        setIsAuthenticated(true);
      } else {
        Alert.alert('Login Failed', data.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'An error occurred while logging in.');
    }
  };
  
  //signup method
  const gotoSignup =  () => {
    navigation.replace('Signup')
  };
  
  
  
    const main={
      businessLogo:require('../assets/vra_2.png'),
  
    };
  
    return (
      <View style={{ alignSelf: 'center',flex: 1, justifyContent: "center", alignItems: "center", padding: 20,width: Dimensions.get('window').width > 800 ? '80%' : '100%', }}>
      <Image source={main.businessLogo} style={{width: 150,
      height: 150,
      borderRadius: 80,
      overflow: 'hidden',
      marginBottom: 16,}}/>
        <TextInput
          style={{
            width: "100%",
            padding: 10,
            borderWidth: 1,
            borderColor: "#ccc",
            marginBottom: 10,
            borderRadius: 5,
          }}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={{
            width: "100%",
            padding: 10,
            borderWidth: 1,
            borderColor: "#ccc",
            marginBottom: 20,
            borderRadius: 5,
          }}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Log In" onPress={handleLogin} />
        <Button title="Sign Up Here" onPress={gotoSignup} />
      </View>
    );
  };
  

  export default LoginScreen;