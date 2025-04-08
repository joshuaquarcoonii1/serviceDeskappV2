import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { getCurrentUser, getUserContact, getUserLocation, getUserDepartment } from '../UserData';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from '../hooks/useDebounce';
const ComplaintSubmissionScreen = () => {
  const [complaint, setComplaint] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const debouncedQuery = useDebounce(query, 200);
  const [shouldSearch, setShouldSearch] = useState(true);

  const [userDetails, setUserDetails] = useState({
    name: '',
    contact: '',
    location: '',
    department: '',
  });

  useEffect(() => {
    setUserDetails({
      name: getCurrentUser() || '',
      contact: getUserContact() || '',
      location: getUserLocation().toUpperCase() || '',
      department: getUserDepartment() || '',
    });
  }, []);

  useEffect(() => {

    const fetchUsers = async () => {
      if (!shouldSearch) return; 
      if (debouncedQuery.length > 1) {
        try {
          const response = await fetch(
            `https://service-desk-app-6xvv.onrender.com/api/users/search?query=${debouncedQuery}`
          );
          const data = await response.json();
          setResults(data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      } else {
        setResults([]);
      }
    };

    fetchUsers();
  }, [debouncedQuery]);
  
  const handleSelectUser = (user) => {
    setShouldSearch(false); 
    setUserDetails({
      name: user.name,
      department: user.department,
      location: user.location.toUpperCase(),
      contact: user.avaya,
    });
    setQuery(user.name);
    setResults([]);
  };
  const handleClear = () => {
    setQuery('');
    setUserDetails({
      name: '',
      department: '',
      location: '',
      contact:'',
    });
  };
  const handleSubmit = async () => {
    const endpoint = 'https://service-desk-app-6xvv.onrender.com/reports';
    const payload = {
      username: userDetails.name,
      complaint,
      department: userDetails.department,
      location: userDetails.location,
      contact: userDetails.contact,
    };

    console.log('Payload:', payload);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error(`Error: ${response.status} - ${errorDetails}`);
        throw new Error(errorDetails || `Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Complaint submitted successfully:', data);
      setComplaint('');
      alert('Complaint submitted successfully!');
    } catch (error) {
      console.error('Failed to submit complaint:', error.message);
      alert('Failed to submit complaint. Please try again.');
    }
  };
  const handleInputChange = (text) => {
    setShouldSearch(true); // Re-enable search on manual typing
    setQuery(text);
  };
  

  return (
    <ImageBackground source={require('../assets/Dam.png')} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <Text style={styles.header}>SERVICE DESK{'\n'}Submit a Complaint</Text>

          {/* Name Search Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name:</Text>
            <Searchbar
              placeholder="Enter your name or avaya"
              onChangeText={handleInputChange}
              value={query}
              style={styles.searchBar}
              onClearIconPress={handleClear}

            />
            <View style={styles.searchResultsContainer}>
              <FlatList
                data={results}
                keyExtractor={(item) => item._id?.$oid || item._id}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelectUser(item)} style={styles.userItem}>
                    <Text style={styles.userText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>

          {/* User Details */}
          <Text style={styles.label}>Department:</Text>
          <TextInput style={styles.input} value={userDetails.department} editable={false} />

          <Text style={styles.label}>Location:</Text>
          <TextInput style={styles.input} value={userDetails.location} editable={false} />

          {/* Complaint Field */}
          <Text style={styles.label}>Complaint:</Text>
          <TextInput
            style={styles.textarea}
            multiline
            numberOfLines={4}
            value={complaint}
            onChangeText={setComplaint}
            placeholder="Describe your issue..."
          />

          <View style={styles.buttonContainer}>
            <Button title="Submit " onPress={handleSubmit} />
          </View>

          {/* Confirmation Modal */}
          <Modal
            transparent
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modal}>
                <Text style={styles.modalText}>Your complaint has been submitted!</Text>
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
 container: {
  flex: 1,
  padding: 20,
  width: '90%', // Increased width
  maxWidth: 800, 
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  alignSelf: 'center',
  borderRadius: 100,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 5,
  paddingBottom: 40, // Added padding to prevent bottom cut-off
},

  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#f9f9f9',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
    color: '#f9f9f9',
  },
  inputContainer: {
    marginBottom: 10,
  },
  searchBar: {
    marginBottom: 5,
  },
  searchResultsContainer: {
    maxHeight: 150,
  },
  userItem: {
    padding: 10,
    backgroundColor: '#1e2a38',
    borderRadius: 5,
    marginVertical: 2,
  },
  userText: {
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  textarea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 10,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    marginVertical: 20,
    backgroundColor: '#b4e6ee',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default ComplaintSubmissionScreen;
