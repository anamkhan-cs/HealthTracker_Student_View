import React, { Component} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView, ScrollView, StatusBar, Image,
  Alert, Platform,
} from 'react-native';
import styles from '../Styles';
import ImagePicker from 'react-native-image-picker';
import { db, storage } from './config';
import SelectMultiple from 'react-native-select-multiple'
import {Button} from 'react-native-elements';
import RNFetchBlob from 'react-native-fetch-blob';


export default class AddItem extends Component {

  state = {
    name: '',

  };

  constructor(props) {
    super(props);

    this.state = {
      filePath: {},
      url: "",
      date: "",
      user_name : props.route["params"]["name"],
      email: props.route["params"]["email"],
      selectedFruits: []
    };
  }



   uploadingImage = (ref,filePath) =>{

    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
     window.Blob = Blob

    fs.readFile(filePath,'base64').then((data)=>{
      return Blob.build(data,{type:'image/jpeg;BASE64'})
    }).then((blob)=>{
      return ref.put(blob,{contentType:'image/jpeg'})
    }).catch((error)=>{
      console.log(error);
    }).then(()=>{
      return ref.getDownloadURL()
     }).then((url_result)=>{
       this.setState({url:url_result});
       return true;
    }).catch((error)=>{
      console.log(error)
    })
  }

  addItem = (item, url, symptoms)=> {
    var updates = {};
    var symptom_list = [];

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var day = month + '-' + date + '-' + year;



    for (var i = 0; i < symptoms.length; i++) {
      symptom_list.push(symptoms[i].label);
    }
    console.log("these are symptoms");
    console.log(symptom_list);

    if (symptom_list.includes("Body aches"))
      updates['Student/'+ this.state.user_name +'/record/' + day + "/Body aches"] = "yes";
    else
      updates['Student/'+ this.state.user_name +'/record/' + day + "/Body aches"] = "no";

    if (symptom_list.includes("Loss of taste"))
      updates['Student/'+ this.state.user_name +'/record/' + day + "/Loss of taste"] = "yes";
    else
      updates['Student/'+ this.state.user_name +'/record/' + day + "/Loss of taste"] = "no";

    if (symptom_list.includes("Shortness of breath"))
      updates['Student/'+ this.state.user_name +'/record/' + day + "/Shortness of breath"] = "yes";
    else
      updates['Student/'+ this.state.user_name +'/record/' + day + "/Shortness of breath"] = "no";

    if (symptom_list.includes("Severe cough"))
      updates['Student/'+ this.state.user_name +'/record/' + day + "/Severe cough"] = "yes";
    else
      updates['Student/'+ this.state.user_name +'/record/' + day + "/Severe cough"] = "no";

    if (symptom_list.includes("Abdominal pain"))
      updates['Student/'+ this.state.user_name +'/record/' + day + "/Abdominal pain"] = "yes";
    else
      updates['Student/'+ this.state.user_name +'/record/' + day + "/Abdominal pain"] = "no";


    console.log("The url result is : ",this.state.url);
    updates['Student/'+ this.state.user_name +'/record/' + day + "/temp"] = item;
    updates['Student/'+ this.state.user_name +'/record/' + day + "/url"] = url;

    return db.ref().update(updates);

  };


  chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        this.setState({
          filePath: source,
        });
        const date = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const full_date = month + '-' + date + '-' + year;
        const path = "img/"+this.state.user_name+"_" + full_date + ".JPG";
        const {uri} = source;
        console.log(uri);
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        console.log(filename, uploadUri);
        console.log(storage);
        console.log("source.uri", source.uri);
        const ref = storage.ref(path)
        this.uploadingImage(ref,uploadUri);
      }
    });
  };

  onSelectionsChange = (selectedFruits) => {
      this.setState({ selectedFruits })
    };

  handleChange = e => {

    this.setState({
      name: e.nativeEvent.text
    });
  };

  handleSubmit = () => {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const full_date = month + '-' + date + '-' + year;

    this.setState({
      date: full_date,
    });
    this.addItem(this.state.name, this.state.url, this.state.selectedFruits);
    Alert.alert(
    'Success!',
    'You have successfully submitted your temperature',
    [
      {text: 'OK', onPress: () => this.props.navigation.navigate('Home', {
        screen: 'Feed',
        params: { name: this.state.user_name, email : this.state.email}})},

    ],
    {cancelable: false},);

  };

  render() {

    const fruits = ['Body aches', 'Loss of taste', 'Shortness of breath',
                    'Severe cough', 'Abdominal pain']

    return (  <>
      <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}>
                <View style={styles.body}>
                  <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}> Enter your temperature </Text>
                    <TextInput style = {styles.input}
                               underlineColorAndroid = "transparent"
                               placeholder = "Temperature"
                               placeholderTextColor = "#616161"
                               autoCapitalize = "none"
                               onChange={this.handleChange}/>
                  </View>
                </View>
                <View style={styles.container}>
                    <Image source={this.state.filePath} style={styles.image} />
                    <Text style={{ alignItems: 'center' }}>
                      {this.state.filePath.uri}
                    </Text>
                    <Button title="Choose File" onPress={this.chooseFile.bind(this)} />
                </View>

                <View style={styles.body}>
                  <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Do you have any of the following symptoms? (Select all that apply)</Text>
                    <SelectMultiple
                     items={fruits}
                     selectedItems={this.state.selectedFruits}
                     onSelectionsChange={this.onSelectionsChange} />
                  </View>
                </View>
                <View style={styles.body}>
                    <View style={styles.container}>
                      <Button title="Submit" onPress={this.handleSubmit} />
                    </View>
                </View>
            </ScrollView>
          </SafeAreaView>
        </>
    );
  }
}
