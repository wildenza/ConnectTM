import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IssuesPage from './IssuesPage';
import SettingsScreen from './SettingsScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {GlobalContextProvider} from "./GlobalContext";

const Tab = createBottomTabNavigator();

const HomePage = () => {
    return (
        <GlobalContextProvider>
        <Tab.Navigator initialRouteName="IssuesPage">
            <Tab.Screen
                name="Issues"
                component={IssuesPage}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="error" color={"purple"} size={size} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="settings" color={"purple"} size={size} />
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
            </GlobalContextProvider>
    );
};

export default HomePage;
