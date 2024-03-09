import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ref, onValue } from '@firebase/database';
import { database } from './firebaseConfig'; // Import your Firebase configuration

export default function HistoryPage({ navigation }) {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = () => {
            const reportsRef = ref(database, 'issues'); // Assuming 'issues' is where your reports are stored
            onValue(reportsRef, (snapshot) => {
                const data = snapshot.val();
                const reportsList = [];
                for (let id in data) {
                    reportsList.push({ id, ...data[id] });
                }
                setReports(reportsList);
            });
        };

        fetchReports();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Reports</Text>
            <FlatList
                data={reports}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.reportItem}>
                        <Text style={styles.reportTitle}>{item.title}</Text>
                        <Text style={styles.reportDescription}>{item.description}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    reportItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    reportTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    reportDescription: {
        fontSize: 16,
    },
});
