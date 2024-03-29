import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ref, onValue } from '@firebase/database';
import { database } from './firebaseConfig';
import { useGlobalContext } from './GlobalContext';
import LottieView from 'lottie-react-native';

export default function HistoryPage({ navigation }) {
    const [reports, setReports] = useState([]);
    const [expandedReportId, setExpandedReportId] = useState(null);

    const { userData } = useGlobalContext();

    useEffect(() => {
        const fetchReports = () => {
            if (userData && userData.email) {
                console.log(userData);
                const userMail = userData.email;
                const reportsRef = ref(database, `issues`);
                onValue(reportsRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const reportsList = Object.keys(data).map(id => {
                            if (data[id].email === userMail) {
                                return { id, ...data[id] };
                            }
                        }).filter(report => report !== undefined);
                        setReports(reportsList);
                    } else {
                        setReports([]);
                    }
                });
            }
        };

        fetchReports();
    }, [userData]);

    const getStatusColor = (status) => {
        switch(status) {
            case 'Open':
                return '#0f7ab0';
            case 'In-Progress':
                return 'orange';
            case 'Resolved':
                return 'green';
            default:
                return 'brown';
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <LottieView
                    source={require('./assets/Animation - 1710020788852.json')}
                    autoPlay
                    loop
                    style={{ width: 50, height: 50, marginRight: 10 }}
                />
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'purple' , top:10,  }}>Toate Sesizarile</Text>
            </View>
            <FlatList
                data={reports}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    const isExpanded = expandedReportId === item.id;
                    const description = isExpanded ? item.description : item.description.substring(0, 10) + '... [Mai multe ]';

                    return (
                        <TouchableOpacity onPress={() => setExpandedReportId(isExpanded ? null : item.id)} style={styles.reportItem}>
                            <Text style={styles.reportTitle}>{item.title}</Text>
                            <Text style={styles.reportTitle}>{item.requestTime}</Text>
                            <Text style={styles.reportDescription}>{description}</Text>

                            {isExpanded && item.image && <Image source={{ uri: item.image }} style={styles.reportImage} />}
                            {isExpanded && <Text style={styles.category}>Categorie : {item.selectedOption}</Text>}
                            <View
                                style={{
                                    ...styles.statusIndicator,
                                    backgroundColor: getStatusColor(item.status)
                                }}
                            />
                        </TouchableOpacity>
                    );
                }}
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
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 35,
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
    reportImage: {
        width: '100%',
        height: 200,
        marginTop: 10,
        marginBottom: 10,
    },
    category: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        color: 'purple',
    },
    statusIndicator: {
        height: 20,
        width: 20,
        borderRadius: 20,
        position: 'absolute',
        right: 10,
        top: 20,
    },
});
