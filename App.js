// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { GlobalContextProvider } from './GlobalContext'; // Import the GlobalContextProvider

import { auth } from './firebaseConfig';
import HomePage from './HomePage';
import LoginScreen from './LoginScreen';
import HistoryPage from "./HistoryPage";

const Stack = createNativeStackNavigator();

export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            console.log('user', authUser);
            setUser(authUser);
        });

        return () => unsubscribe();
    }, []);

    return (
        <NavigationContainer>
            {/* Wrap the entire app with GlobalContextProvider */}
            <GlobalContextProvider>
                <Stack.Navigator>
                    {!user ? (
                        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    ) : (
                        <>
                            <Stack.Screen
                                name="Home"
                                component={HomePage}
                                options={{ headerShown: false }}
                                initialParams={{ user }}
                            />
                            <Stack.Screen
                                name="HistoryPage"
                                component={HistoryPage}
                                options={{ headerShown: false }}
                            />
                        </>
                    )}
                </Stack.Navigator>
            </GlobalContextProvider>
        </NavigationContainer>
    );
}
