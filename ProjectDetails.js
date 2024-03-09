import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const ProjectDetails = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('HomePage')} style={styles.backButton}>
                <MaterialIcons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Project Details</Text>
            <View style={styles.textBox}>
                <Text style={styles.textBoxTitle}>Team Name:</Text>
                <Text style={styles.textBoxContent}>X</Text>
            </View>
            <View style={styles.textBox}>
                <Text style={styles.textBoxTitle}>Team Members:</Text>
                <Text style={styles.textBoxContent}>A, B, C, D, E</Text>
            </View>
            <View style={styles.textBox}>
                <Text style={styles.textBoxTitle}>Frameworks Used:</Text>
                <Text style={styles.textBoxContent}>React Native, React, Expo, Firebase</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    textBox: {
        borderWidth: 2,
        borderColor: 'purple',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    textBoxTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    textBoxContent: {
        fontSize: 16,
    },
});

export default ProjectDetails;
