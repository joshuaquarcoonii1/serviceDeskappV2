import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { Searchbar, Card, Paragraph } from 'react-native-paper';

const HistoryScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  // Fetch users matching search query
  const fetchUsers = async (text) => {
    setQuery(text);
    if (typingTimeout) clearTimeout(typingTimeout);

    if (text.length > 1) {
      const timeout = setTimeout(async () => {
        try {
          const response = await fetch(`https://service-desk-app-6xvv.onrender.com/api/users/search?query=${text}`);
          const data = await response.json();
          setResults(data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }, 500);

      setTypingTimeout(timeout);
    } else {
      setResults([]);
    }
  };

  // Fetch complaints based on selected user
  const fetchComplaints = async (username) => {
    setLoading(true);
    try {
      const response = await fetch(`https://service-desk-app-6xvv.onrender.com/Greports/${username}`);
      const data = await response.json();
      setComplaints(data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
    setLoading(false);
  };

  const handleSelectUser = (user) => {
    setQuery(user.name);
    setResults([]);
    fetchComplaints(user.name);
  };
  const handleClear = () => {
    setQuery('');
    setResults([]);
    setComplaints([]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      <Text style={styles.header}>SEE COMPLAINT HISTORY</Text>


        <Searchbar
          placeholder="Search by name"
          onChangeText={fetchUsers}
          value={query}
          style={styles.searchBar}
          onClearIconPress={handleClear}
          elevation='5'
        />

        {/* Search Results List */}
        {results.length > 0 && (
          <FlatList
            data={results}
            keyExtractor={(item) => item._id?.$oid || item._id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectUser(item)} style={styles.userItem}>
                <Text style={styles.userText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            style={styles.resultsList}
          />
        )}

        {/* Complaints Section */}
        {loading ? (
          <ActivityIndicator size="large" color="#4ea8de" style={styles.loading} />
        ) : (
          <FlatList
            data={complaints}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Card style={styles.card}>
                <Card.Content>
                  <Paragraph>
                    <Text style={styles.label}>Description:</Text> {item.complaint}
                  </Paragraph>
                  {/* <Paragraph>
                    <Text style={styles.label}>Department:</Text> {item.department}
                  </Paragraph> */}
                  {/* <Paragraph>
                    <Text style={styles.label}>Location:</Text> {item.location}
                  </Paragraph> */}
                  <Paragraph>
                    <Text style={styles.label}>Sent At: {new Date(item.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
                  </Paragraph>
                  <Paragraph>
                    <Text style={styles.label}>Status:</Text> {item.status}
                  </Paragraph>
                </Card.Content>
              </Card>
            )}
            style={styles.complaintsList}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0e1621',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  searchBar: {
    marginBottom: 10,
  },
  userItem: {
    padding: 10,
    backgroundColor: '#1e2a38',
    borderRadius: 5,
    marginVertical: 5,
  },
  userText: {
    color: '#fff',
  },
  resultsList: {
    flexGrow: 0, // Ensures it doesn't take excessive space
    maxHeight: 200, // Limits height
  },
  complaintsList: {
    flex: 1,
  },
  loading: {
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#4ea8de',
  },
});

export default HistoryScreen;
