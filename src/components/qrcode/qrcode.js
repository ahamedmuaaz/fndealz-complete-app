import React, { Component } from 'react';

import {
   Text,
   View,
   Linking, 
   TouchableHighlight, 
   PermissionsAndroid, 
   Platform, 
   StyleSheet,
   TouchableOpacity,
   Alert,
   AsyncStorage,
   
  } from 'react-native';

  import { NavigationEvents } from "react-navigation";

import { CameraKitCameraScreen, } from 'react-native-camera-kit';

export default class App extends Component {
  constructor() {
     global.email='';
    super();
    this.state = {
      qrvalue: '',        //variable to hold the qr value
      opneScanner: false,
     
    };
  }
  componentDidMount(){
    this._retrieveData();
  }

  static navigationOptions =
  {
    title: 'QRCODE',
  };

  onOpenlink() {
    Linking.openURL(this.state.qrvalue);
  }
  //after scanning qr code
  onBarcodeScan(qrvalue) {
    this.setState({ qrvalue: qrvalue });
    this.setState({ opneScanner: false });
  }
  onOpneScanner() {
    var that =this;
      
    if(Platform.OS === 'android'){
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,{
              'title': 'CameraExample App Camera Permission',
              'message': 'CameraExample App needs access to your camera '
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            
            that.setState({ qrvalue: '' });
            that.setState({ opneScanner: true });
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err",err);
          console.warn(err);
        }
      }
      requestCameraPermission();
    }else{
      that.setState({ qrvalue: '' });
      that.setState({ opneScanner: true });
    }    
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('email');
      const pass = await AsyncStorage.getItem('pass');
      global.email=value;
      if (value !== null) {
        // We have data!!
        console.log(value);
         //this.setState({ user:value});
         //this.setState({pass:pass});
        console.log("sfssdfdf"+global.email);

        fetch('http://35.246.67.79/login/', {
          method: 'POST',
          headers: {
          Accept: 'application/json',
         'Content-Type': 'application/json',
          },
          body: JSON.stringify({
         'email':value,
         'pass':pass,
          }),
      
         }).then((response) => response.json())
         .then((responseJson) => {
         console.log("hello");
         console.log(responseJson);
         
         })
         .catch((error) => {
         console.error(error);
         });
      }
    } catch (error) {
      // Error retrieving data
      //console.log(error);
    }
  };

  handlePress = async () => {
    var div = this.state.qrvalue.split(" ");
    shop = div[0];
    branch=div[1];
    console.log(shop)
    fetch('http://35.246.67.79/detectShop/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'email':global.email,
          'shop_name':shop,
          'branch': branch
         
        })
  })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        Alert.alert(responseJson.msg+" : "+this.state.qrvalue+" branch.");
   
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    let displayModal;
    //If qrvalue is set 
    if (!this.state.opneScanner) {
      return (
        <View style={styles.container}>
            <Text style={styles.heading}> QR Code Scanner</Text>
            {/* <Text style={styles.simpleText}>{this.state.qrvalue ? 'Scanned QR Code: '+this.state.qrvalue : ''}</Text>
            {this.state.qrvalue.includes("http") ? 
              <TouchableHighlight
                onPress={() => this.onOpenlink()}
                style={styles.button}>
                  <Text style={{ color: '#FFFFFF', fontSize: 13 }}>Open Link</Text>
              </TouchableHighlight>
              : null
            } */}
            <TouchableHighlight
              onPress={() => this.onOpneScanner()}
              style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 15 }}>
                Touch to Scan
                </Text>
            </TouchableHighlight>
            
            
            <TouchableOpacity onPress={this.handlePress.bind(this)}>
             <Text style={{paddingTop: 50, color: '#FF0000',fontSize:20}}> ---Check if connected with the Shop--- </Text>
            </TouchableOpacity>

        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
          <NavigationEvents
          onDidFocus={() => {
           this.setState({ opneScanner: false});
          
       
         }}
          />
        
        <CameraKitCameraScreen
          showFrame={true}
          
          scanBarcode={true}
          
          laserColor={'red'}
          
          frameColor={'yellow'}
          
          colorForScannerFrame={'black'}
          
          onReadCode={event =>
            this.onBarcodeScan(event.nativeEvent.codeStringValue)
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white'
  },
  button: {
    alignItems: 'center', 
    backgroundColor: '#2c3539',
    padding: 10,
    width:300,
    marginTop:16
  },
  heading: { 
    color: 'black', 
    fontSize: 25, 
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 30 
  },
  
});