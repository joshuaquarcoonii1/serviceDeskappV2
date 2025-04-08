import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground,TouchableOpacity } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
// FAQ Data
const FAQ_DATA = [
    { question: "How do I submit a complaint?", answer: "Click on the 'Submit a Complaint' button and fill out the form." },
    { question: "How long does it take to resolve issues?", answer: "It depends on the issue, but we aim for quick resolutions within 24-48 hours." },
    { question: "Is my data secure?", answer: "Yes! We use top-tier security to protect your data." },
];

const WelcomeScreen = () => {
    const navigation = useNavigation();
    const [expandedFAQ, setExpandedFAQ] = useState(null);

    // Render FAQ Item
    const renderFAQItem = ({ item, index }) => (
        <Card style={styles.faqCard} onPress={() => setExpandedFAQ(expandedFAQ === index ? null : index)}>
             <TouchableOpacity style={styles.faqHeaderContainer} onPress={() => setExpandedFAQ(expandedFAQ === index ? null : index)}>
                <Title style={styles.faqQuestion}>{item.question}</Title>
                <MaterialIcons 
                    name={expandedFAQ === index ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                    size={24} 
                    color="#fff" 
                />
            </TouchableOpacity>
            {expandedFAQ === index && <Paragraph style={styles.faqAnswer}>{item.answer}</Paragraph>}
        </Card>
    );

    return (
        <ImageBackground source={require('../assets/Dam.png')} style={styles.background}>
            <View style={styles.container}>
                {/* Company Logo */}
                <ImageBackground source={require('../assets/logo.png')} style={styles.logo} />
                
                <Text style={styles.header}>ServiceDesk</Text>

                {/* FAQ Section */}
                <Text style={styles.faqHeader}>Frequently Asked Questions</Text>
                <FlatList
                    data={FAQ_DATA}
                    renderItem={renderFAQItem}
                    keyExtractor={(item, index) => index.toString()}
                />

                {/* Submit Complaint Button */}
                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={() => navigation.navigate('Main')}
                >
                    Submit a Complaint
                </Button>

                {/* Version Number */}
                <View style={styles.versionContainer}>
  <Text style={styles.versionText}>Version 1.0.0</Text>
  <Text style={styles.developedBy}>Developed by MIS</Text>
</View>

            </View>
        </ImageBackground>
    );
};

// Styles
const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay for readability
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom: 10,
        resizeMode: 'contain',
    },
    header: {
        fontSize: 24,
        color: '#4ea8de',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    faqHeader: {
        fontSize: 18,
        color: '#4ea8de',
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10,
        textAlign: 'center',
    },
    faqCard: {
        backgroundColor: '#1e2a38',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
    },
    faqQuestion: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    faqAnswer: {
        color: '#b0bec5',
        marginTop: 5,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#4ea8de',
        padding: 10,
        borderRadius: 25,
        top: -60,
    },
    versionContainer: {
  marginTop: 20,
  alignItems: 'center',
},

versionText: {
  color: '#90a4ae',
  fontSize: 12,
  fontWeight: '500',
},

developedBy: {
  color: '#b0bec5',
  fontSize: 12,
  marginTop: 2,
},

});

export default WelcomeScreen;
