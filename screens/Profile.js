import React,{useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView,SafeAreaView ,Modal,Animated,Pressable} from 'react-native';
// const fs =require('fs');

// const pic =fs.readFileSync('C:\Users\HP\Desktop\MyApp\components\josh.jpg');
import { getCurrentUser,getUserContact } from '../UserData';

const ProfileScreen = ({navigation, setIsAuthenticated }) => {
  //modal
  const [modalVisible, setModalVisible] = useState(false);
  const name =getCurrentUser();
  const contact=getUserContact();

  // Sample user data
  const user = {
    name: name,
    
    phone: contact,
    profileImage: require('../assets/user.png'), // Placeholder image URL
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Update authentication state
  };

  return (
    
    <SafeAreaView>
    <ScrollView contentContainerStyle={styles.container}>
    <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Are you sure you wanna log out ?</Text>
              <Pressable
                style={[styles.buttonM, styles.buttonClose]}
                onPress={handleLogout}>
                
                <Text style={styles.textStyle}>Log Out</Text>
              </Pressable>

              <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.buttonM, styles.logoutButton]}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
            </View>
          </View>
        </Modal>

      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        <Image source={user.profileImage} style={styles.profileImage} />
      </View>

      {/* User Information */}
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.userEmail}>{user.email}</Text>
      <Text style={styles.userPhone}>{user.phone}</Text>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
      
        <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.button, styles.logoutButton]}>
        
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
        
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonM:{
    marginBottom:10,
borderRadius:4
  },
  buttonC: {
    marginVertical: 20,
    backgroundColor: '#b4e6ee',
    opacity: 0.8, // Corrected opacity value
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    paddingVertical: 50,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 16,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    
    marginBottom: 10,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
  },
  //modal styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    
  },
  
 
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 36,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ProfileScreen;
