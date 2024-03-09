import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';
import { ref, set } from "@firebase/database"
import { database, auth } from './firebaseConfig'
import LottieView from 'lottie-react-native';
import {CommonActions} from "@react-navigation/native";
import { useGlobalContext } from './GlobalContext';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { storeUserData } = useGlobalContext();

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Sign in successful');
                console.log('User data:', userCredential.user);
                // Store user data including email in AsyncStorage
                storeUserData({ email: userCredential.user.email });
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'HomePage' }],
                    })
                );
            })
            .catch((error) => {
                console.log('Sign in failed');
                console.log(error.message);
                setError(error.message);
            });
    };

    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Sign up successful');
                sendEmailVerification(user);
                alert('Account created successfully! Verify your email now.');
                addUserRole(user, user.uid);
                // Store user data including email in AsyncStorage
                storeUserData({ email: user.email });
                console.log("Test1");
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
            });
    };

    const addUserRole = (user) => {
        const encodedEmail = user.email.replace(/\./g, ',');
        const updates = {userID: `${user.uid}`, role:"default"};

        set(ref(database,`user/${userId}`), updates)
            .then(() => {
                console.log("User role added successfully.");
            })
            .catch((error) => {
                console.error("Error adding user role: ", error);
            });
    };

    const handleForgotPassword = () => {
        console.log('Forgot Password button pressed');
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log('Password reset email sent');
                alert('Check your email!');
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
            });
    };

    return (
        <View style={styles.container} backgroundColor={"#f0eef3"}>
            <LottieView
                source={require('./assets/Animation_-_1709960173042.json')}
                autoPlay
                loop
                style={{ width: 200, height: 200, marginBottom: 20 }}
            />
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
                <Text style={styles.buttonText}>Forgot Password</Text>
            </TouchableOpacity>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top:'5%',
    },
    title: {
        fontSize: 28,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        marginVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#652b94', // Set purple background for TouchableOpacity
        width: '80%', // Match the width of input fields
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});

export default LoginScreen;
