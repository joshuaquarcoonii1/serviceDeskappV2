import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import ComplaintSubmissionScreen from './screens/Main';
import HistoryScreen from './screens/Complaints';
import ProfileScreen from './screens/Profile';
import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';
import WelcomeScreen from './screens/WelcomeScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Navigationer({ setIsAuthenticated }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={ComplaintSubmissionScreen} options={{
        tabBarIcon: () => <Entypo name="home" size={24} color="black" />
      }} />
      <Tab.Screen name="Complaints" component={HistoryScreen} options={{
        tabBarIcon: () => <AntDesign name="profile" size={24} color="black" />
      }} />
      {/* <Tab.Screen name="Profile" options={{
        tabBarIcon: () => <AntDesign name="user" size={24} color="black" />
      }}>
        {props => <ProfileScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
      </Tab.Screen> */}
    </Tab.Navigator>
  );
}

function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login">
              {props => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
            </Stack.Screen>
            <Stack.Screen name="Signup">
              {props => <SignupScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen name="Main">
            {props => <Navigationer {...props} setIsAuthenticated={setIsAuthenticated} />}
          </Stack.Screen>
        )} */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Main">
            {props => <Navigationer {...props} setIsAuthenticated={setIsAuthenticated} />}
          </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
