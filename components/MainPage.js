import {SafeAreaView, ScrollView, StatusBar, Text, View, Dimensions} from 'react-native';
import {Button, Header} from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import styles from '../Styles';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Profile from './Profile';
import Information from './Information';
import { LineChart } from 'react-native-chart-kit';
import { db } from './config';

const getCurrentDate = ()=>{
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    return month + '-' + date + '-' + year;
};

const Tab = createMaterialBottomTabNavigator();

var value = [];

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Profile"
            activeColor="#e91e63"
            labelStyle={{ fontSize: 12 }}
            style={{ backgroundColor: 'tomato' }}
        >
            <Tab.Screen
                name="Feed"
                component={Feed}
                options={{
                    tabBarLabel: 'Feed',
                    navigationOptions:  {
                        title: 'MyScreen',
                        headerLeft: null
                    }
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    headerLeft: null,
                    navigationOptions: {
                        title: "FirstPage",
                        header: {
                            left: null,
                        }
                    },
                }}
            />
            <Tab.Screen
                name="Info"
                component={Information}
                options={{
                    tabBarLabel: 'Info',
                    headerLeft: null,
                    navigationOptions: {
                        title: "InfoPage",
                        header: {
                            left: null,
                        }
                    },

                }}
            />
        </Tab.Navigator>
    );
}

function Feed({route, navigation}) {
  const username = route.params.name;
  const email = route.params.email;

  const [tasks, setTasks] = useState([{"key": "5-19-2020", "temp": "98", "url": "url goes here"}]);
  const [status, setStatus] = useState("Unknown");
  const [style, setStyle] = useState();

  useEffect(() => {
    console.log("this is the task array");
    console.log(tasks);

    const ref = db.ref('Student/'+ username + '/record');
    const listener = ref.on('value', snapshot => {
      const fetchedTasks = [];
      snapshot.forEach(function(snap) {
          var returnArray = [];
          var item = snap.val();
          item.key = snap.key;
          returnArray.push(item);
          fetchedTasks.push(item);
      });
      if (fetchedTasks !== null && fetchedTasks.length > 0) {
          const most_recent = fetchedTasks[fetchedTasks.length - 1];

          if (most_recent["key"] === getCurrentDate()) {
              var status = ""

              db.ref('Student/'+ username + '/Status').once('value').then(function(snapshot) {

                setStatus(snapshot.val())
                status = snapshot.val()
                if (status == "unhealthy" || status == "Unhealthy"){
                    setStyle(styles.unhealthyHighlight);
                }
                if(status == "healthy" || status == "Healthy"){
                    setStyle(styles.healthyHighlight);
                }
                if(status == 'undocumented' || status == 'Undocumented'){
                    setStatus("Unknown");
                    setStyle(styles.unknownHighlight);
                }
              });
          }
          else {
              setStatus("Unknown");
              setStyle(styles.unknownHighlight);
          }
      }
      console.log(fetchedTasks);
      setTasks(fetchedTasks);

    });
    return() => ref.off('value', listener);

  }, []);

  value = tasks;
  returnArray = value;

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
                            <Text style={styles.sectionTitle}> Today is: {getCurrentDate()} </Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}> Your health status:
                                <Text style={style}>
                                    {status}
                                </Text>
                                </Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <Button
                                title="Upload Temperature"
                                onPress={() => navigation.navigate('Details', { name: username, email: email})}
                            />
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Your Temperature over the last week</Text>
                        </View>

                        <View style={styles.sectionContainer}>
                            <LineChart
                                data={{
                                    labels:
                                    this.items = returnArray.map((item) =>
                                          item.key).map((date) => date.split("-2020")[0]),

                                    datasets: [
                                        {

                                            data:
                                                this.temp = returnArray.map((item) =>
                                                   parseInt(item.temp)
                                               )



                                        }
                                    ]
                                }}
                                width={Dimensions.get("window").width - 50} // from react-native
                                height={220}
                                yAxisLabel=""
                                yAxisSuffix="F°"
                                yAxisInterval={1} // optional, defaults to 1
                                chartConfig={{
                                    backgroundColor: "#e26a00",
                                    backgroundGradientFrom: "#fb8c00",
                                    backgroundGradientTo: "#ffa726",
                                    decimalPlaces: 1, // optional, defaults to 2dp
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "6",
                                        strokeWidth: "2",
                                        stroke: "#ffa726"
                                    }
                                }}

                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            />
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

function MainPage({route}) {
    return (
        <MyTabs/>
    );
}

export {
    MainPage,
}
