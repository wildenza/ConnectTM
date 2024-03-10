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
            <Text style={styles.title}>Detalii Proiect</Text>
            <View style={styles.textBox}>
                <Text style={styles.textBoxTitle}>Team Name :</Text>
                <Text style={styles.textBoxContent}>n0exp</Text>
            </View>
            <View style={styles.textBox}>
                <Text style={styles.textBoxTitle}>Membri Echipa:</Text>
                <Text style={styles.textBoxContent}>Ivan Andrei , Marius Dudui, Negru Alexandru, Jasmine-Afrem,Nechiteaaalea Flavius</Text>
            </View>
            <View style={styles.textBox}>
                <Text style={styles.textBoxTitle}>Framework-uri folosite:</Text>
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
        alignItems:'center',
    },
    textBoxTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    textBoxContent: {
        fontSize: 16,
        color:'purple',
    },
});

export default ProjectDetails;
