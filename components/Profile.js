import {SafeAreaView, ScrollView, StatusBar, Text, View} from 'react-native';
import styles from '../Styles';
import React from 'react';
import {Button, Header} from 'react-native-elements';
import {GoogleSignin} from '@react-native-community/google-signin';

function Profile({route, navigation}) {
    const info = route.params;


    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
        } catch (error) {
            console.error(error);
        }
    };


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
                            <Text style={styles.sectionTitle}> Welcome! </Text>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}> Name: {info["name"]} </Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}> Email: {info["email"]} </Text>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.container}>
                            <Text></Text>
                            <Button title="Logout" onPress={()=>
                            {
                                signOut();
                                navigation.navigate('Login');
                            }}/>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>

    );
}

export default Profile;
