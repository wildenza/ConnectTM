import React, { useState, useEffect } from 'react';
import { TextInput, Keyboard, View, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ref, set, get } from "@firebase/database";
import { onAuthStateChanged } from 'firebase/auth';
import { database, auth } from './firebaseConfig';
import * as Location from 'expo-location';
import LottieView from 'lottie-react-native'; // Import LottieView
import styles from "./styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomButton from "./customButton";


export default function IssuesPage({ navigation }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [user, setUser] = useState(null);
    const [location, setLocation] = useState(null);
    const [issueID, setIssueID] = useState(1);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                navigation.navigate('LoginScreen');
            }
        });

        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
        };

        const fetchLastIssueID = async () => {
            const snapshot = await get(ref(database, 'lastIssueID'));
            console.log("Snapshot value is: " + snapshot.val());
            if(snapshot.val()){
                setIssueID(snapshot.val()+1)
            }
            else{
                setIssueID(1)
            }
        };

        getLocation();
        fetchLastIssueID();
        console.log(issueID);
        return unsubscribe;
    }, []);

    const handleSubmit = () => {
        if (user && location) {
            const requestTime = new Date().toLocaleString();
            const status = "Primite";
            const department = "Unallocated";
            setIssueID(issueID + 1);
            writeUserData(user.email, issueID, title, description, requestTime, status, department, location);
        }
    };

    const writeUserData = (email, issueID, title, description, requestTime, status, department, location) => {
        const encodedEmail = email.split('@')[0];
        const updates = {};
        updates[`issues/${issueID}`] = {
            encodedEmail,
            title,
            description,
            requestTime,
            status,
            department,
            location
        };
        console.log(issueID);
        updates['lastIssueID'] = issueID; // Update the last issueID
        console.log(updates['lastIssueID']);
        console.log(updates[`issues/${issueID}`]);
        set(ref(database, `issues/${updates['lastIssueID']}`), updates[`issues/${issueID}`]).then(() => {
            console.log("Data written successfully.");
        }).catch((error) => {
            console.error("Error writing data: ", error);
        });
        set(ref(database, 'lastIssueID'), updates['lastIssueID']).then(() => {
            console.log("Last ID Written.");
        }).catch((error) => {
            console.error(("Error writing last ID."), error);
        });

    };

    return (
        <View style={{ flex:1, paddingHorizontal: 2, justifyContent: 'center', alignItems: 'center' ,backgroundColor:'white',}}>
            <Text style={styles.issuesText}>Issues</Text>
            <View style={styles.animationContainer}>
                <LottieView
                    source={require('./assets/Animation_-_1709961777783.json')} // Replace 'your-animation.json' with the path to your downloaded Lottie JSON file
                    autoPlay
                    loop
                    style={{ width: 200, height: 360,top:80, }} // Adjust width and height as needed
                />
            </View>
            <TextInput
                style={[styles.emailTitle, ]}
                onChangeText={setTitle}
                value={title}
                placeholder="Title"
            />
            <View style={styles.rowSpacer2} />
            <TextInput
                style={[styles.emailTitle]}
                onChangeText={setDescription}
                value={description}
                placeholder="Description"
                multiline
                blurOnSubmit={true}
                onSubmitEditing={() => Keyboard.dismiss()} // Dismiss the keyboard when submitting
            />
            <View style={{ marginBottom: 20 }} />
            <CustomButton title={"Submit"} onPress={handleSubmit} />
        </View>
    );
}
