import {SafeAreaView, ScrollView, StatusBar, Text, View} from 'react-native';
import styles from '../Styles';
import React from 'react';
import {Header} from 'react-native-elements';

function Information({route, navigation}) {

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <Header centerComponent={{ text: 'Health Passport', style: { color: '#fff', fontSize: 24 } }}/>
                    <View style={styles.body}>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}> University Health Service Information  </Text>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionDescription}> Schedule an Appointment 847.491.2204  </Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionDescription}> Emergencies (All Hours) 847.491.8100  </Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionDescription}> Addr: 633 Emerson Street, Evanston, IL </Text>
                        </View>

                        <View style={styles.sectionContainer}>
                            <Text style={styles.unhealthyHighlight}> Please reach out the Health Service is you are not
                                feeling well. Your safety and health is the top most priority.   </Text>
                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </>

    );
}

export default Information;
