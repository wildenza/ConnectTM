import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, onValue } from '@firebase/database';
import { database } from './firebaseConfig'; // Importing the initialized database from firebaseConfig.js

// Create a context
const GlobalContext = createContext();

// Custom hook for accessing the context
export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

// Global context provider component
export const GlobalContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user data from AsyncStorage
                const storedUserData = await AsyncStorage.getItem('userData');
                if (storedUserData) {
                    setUserData(JSON.parse(storedUserData));
                }

                // Optional: Set up any listeners or initial data fetching here
                const postsRef = ref(database, 'posts');
                onValue(postsRef, (snapshot) => {
                    console.log('Database connection established successfully.');
                });
            } catch (error) {
                console.error('Error initializing global context:', error);
            }
        };

        fetchData();
    }, []);

    // Function to store user data in AsyncStorage
    const storeUserData = async (userData) => {
        try {
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            setUserData(userData);
        } catch (error) {
            console.error('Error storing user data:', error);
        }
    };

    // Context value
    const contextValue = {
        database,
        userData,
        storeUserData,
    };

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
};
