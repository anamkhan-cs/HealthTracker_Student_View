import { GoogleSigninButton, statusCodes,} from '@react-native-community/google-signin';
import { GoogleSignin } from '@react-native-community/google-signin';
import React, { Component} from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
  } from 'react-native';

GoogleSignin.configure();
export default class Login extends Component {

    state = { email: '', password: '', userInfo:'', errorMessage: "Failed to log in, try again" };

    handleLogin = async() => {
      try {

        await GoogleSignin.hasPlayServices();
        const info =  await GoogleSignin.signIn();
        this.setState({ userInfo:info });

          this.props.navigation.navigate('Home', {
              screen: 'Profile',
              params: { name: info["user"]["name"], email: info["user"]["email"]},
          });

          this.props.navigation.navigate('Home', {
              screen: 'Feed',
              params: { name: info["user"]["name"], email: info["user"]["email"]}});

      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.warn("failed to login");

        } else if (error.code === statusCodes.IN_PROGRESS) {
            console.warn("Trying to login");
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
      }
    };

      render() {
        return (
          <View style={styles.main}>
            <Text style={styles.title}>Sign in with Gmail</Text>
            <TouchableHighlight
              style={styles.button}
              underlayColor="#7ac3fc"
              onPress={this.handleLogin}
            >
                <GoogleSigninButton
                    style={styles.buttonText}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    disabled={this.state.isSigninInProgress} />
            </TouchableHighlight>
          </View>
        );
      }
    }

const styles = StyleSheet.create({
    main: {
      flex: 1,
      padding: 30,
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#7ac3fc'
    },
    title: {
      marginBottom: 20,
      fontSize: 25,
      textAlign: 'center'
    },
    itemInput: {
      height: 50,
      padding: 4,
      marginRight: 5,
      fontSize: 23,
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 8,
      color: 'white'
    },
    buttonText: {
      alignSelf: 'center'
    },
    button: {
      height: 40,
      flexDirection: 'row',
      borderColor: 'white',
      borderRadius: 8,
      alignSelf: 'stretch',
      justifyContent: 'center',
    }
  });

