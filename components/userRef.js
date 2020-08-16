import {SafeAreaView, ScrollView, StatusBar, Text, View, Dimensions} from 'react-native';
import {Button, Header} from 'react-native-elements';
import { GoogleSignin } from '@react-native-community/google-signin';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import styles from '../Styles';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Profile from './Profile';
// import DetailsScreen from './CreateForm';
import { LineChart } from 'react-native-chart-kit';
import { db } from './config';


var returnArray = [1, 2, 3];
var username = "";
var dummy = [];

class B {

  dataRef = (username)=> {
    returnArray = [];
    var test = db.ref('Student/'+ username +'/record').once('value', snapshot => {
    snapshot.forEach(function(snap) {
        var item = snap.val();
        item.key = snap.key;
        returnArray.push(item);
    })

    console.log("inside userRef");
    console.log(returnArray);
    return returnArray;
    })
    console.log("this is a test");
    console.log(test);
  }
};

const b = new B();
export default b;
