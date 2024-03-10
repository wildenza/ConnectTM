import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
    Alert,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styles from "./styles";
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useGlobalContext } from './GlobalContext';
import ProjectDetails from "./ProjectDetails";
export default function SettingsScreen({ navigation }) {

  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });
  const [user, setUser] = useState(null);
  const { userEmail } = useGlobalContext();
  /*console.log("EMAIL" , userEmail)*/

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const handleLogout = () => {
    // Call signOut function to log the user out
    signOut(auth)
        .then(() => {
          console.log('User logged out successfully');
          // Navigate back to the login screen
          navigation.navigate('LoginPage');
        })
        .catch((error) => {
          console.log('Error logging out:', error.message);
        });
  };

  //pentru alertlacontact
  const handleContactUs = () => {
    Alert.alert(
        "In caz de o problema",
        "Trimite-ne un mesaj la itfest@it.com",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ]
    );
  };

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f0eef3' }}>
        <View style={styles.container}>
          <View style={styles.header}>
            {/*<View style={styles.headerAction}>
              <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}>
                <FeatherIcon
                    color="#652b94"
                    name="arrow-left"
                    size={24} />
              </TouchableOpacity>
            </View>*/}

            <Text style={{fontSize:25,top:25, color:'#652b94',width:'100%', marginLeft:'40%',}}>Setari</Text>

            <View style={[styles.headerAction, { alignItems: 'flex-end' }]}>
              <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}>
                {/*<FeatherIcon
                    color="#652b94"
                    name="more-vertical"
                    size={24} />*/}
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            <View style={[styles.section, { paddingTop: 4 }]}>
              <Text style={styles.sectionTitle}>Account</Text>

              <View style={styles.sectionBody}>
                <TouchableOpacity
                    onPress={() => {
                      // handle onPress
                    }}
                    style={styles.profile}>
                  <Image
                      source={require('./assets/user.png')}
                      style={styles.profileAvatar}
                  />


                  <View style={styles.profileBody}>
                    <Text style={styles.profileName}>Email</Text>

                    <Text style={styles.profileHandle}>
                      {user?.email}
                    </Text>
                  </View>

                  <FeatherIcon
                      color="#652b94"
                      name="chevron-right"
                      size={22} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>General</Text>

              <View style={styles.sectionBody}>
                <View style={[styles.rowWrapper, styles.rowFirst, styles.roundedRight]}>
                  <TouchableOpacity
                      onPress={() => navigation.navigate('HistoryPage')} // Navigate to HistoryPage
                      style={styles.row}>
                    <Text style={styles.rowLabel}>Istoric</Text>





                    <FeatherIcon
                        color="#652b94"
                        name="chevron-right"
                        size={19} />
                  </TouchableOpacity>
                </View>
                {/* NOTIFICARI PUSH SI EMAIL*/}

                {/*<View style={styles.rowWrapper}>
                  <View style={styles.row}>
                    <Text style={styles.rowLabel}>Notificari Email</Text>

                    <View style={styles.rowSpacer} />

                    <Switch
                        onValueChange={(emailNotifications) =>
                            setForm({ ...form, emailNotifications })
                        }
                        value={form.emailNotifications}
                        trackColor={{ false: 'grey', true: '#5c3385' }}
                        ios_backgroundColor={form.emailNotifications ? 'grey' : '#5c3385'}
                        style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                    />
                  </View>
                </View>*/}

                <View style={[styles.rowWrapper, styles.rowLast]}>
                  <View style={styles.row}>
                    <Text style={styles.rowLabel}>Notificari Push</Text>

                    <View style={styles.rowSpacer} />

                    <Switch
                        onValueChange={(pushNotifications) =>
                            setForm({ ...form, pushNotifications })
                        }
                        value={form.pushNotifications}
                        trackColor={{ false: 'grey', true: '#5c3385' }} // Adjust the colors as needed
                        thumbColor={form.pushNotifications ? 'white' : 'white'} // Adjust the colors as needed
                        ios_backgroundColor={form.pushNotifications ? '#5c3385' : 'grey'}
                        style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                    />

                  </View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Mai Multe</Text>

              <View style={styles.sectionBody}>
                <View style={[styles.rowWrapper, styles.rowFirst]}>
                  <TouchableOpacity
                      onPress={handleContactUs} // Call handleContactUs when pressed
                      style={styles.row}>
                    <Text style={styles.rowLabel}>Contacteaza-ne!</Text>
                    <FeatherIcon
                        color="#652b94"
                        name="chevron-right"
                        size={19} />
                  </TouchableOpacity>
                </View>

                <View style={styles.rowWrapper}>
                  {/*<TouchableOpacity
                      onPress={() => {
                        // handle onPress
                      }}
                      style={styles.row}>
                    <Text style={styles.rowLabel}>Report Bug</Text>

                    <View style={styles.rowSpacer} />

                    <FeatherIcon
                        color="#652b94"
                        name="chevron-right"
                        size={19} />
                  </TouchableOpacity>*/}
                </View>
                <View style={[styles.rowWrapper, styles.rowLast]}>
                  <TouchableOpacity
                      onPress={() => navigation.navigate('ProjectDetails')}
                      style={styles.row}>
                    <Text style={styles.rowLabel}>Despre Proiect</Text>
                    <View style={styles.rowSpacer} />
                    <FeatherIcon color="#652b94" name="chevron-right" size={19} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionBody}>
                <View
                    style={[
                      styles.rowWrapper,
                      styles.rowFirst,
                      styles.rowLast,
                      { alignItems: 'center' },
                    ]}>
                  <TouchableOpacity
                      onPress={handleLogout}
                      style={styles.row}>

                    <Text style={[styles.rowLabel, styles.rowLabelLogout]}>
                      Log Out
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <Text style={styles.contentFooter}>App Version 2.24 #50491</Text>
          </ScrollView>
        </View>
      </SafeAreaView>
  );
}
