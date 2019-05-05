/*import React, { Component } from 'react';
//import react in our code.
import {
   Text,
   View,
   Linking, 
   TouchableHighlight, 
   PermissionsAndroid, 
   Platform, 
   StyleSheet,
   AsyncStorage
  } from 'react-native';

// import all basic components
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
//import CameraKitCameraScreen we are going to use.

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      //variable to hold the qr value
      qrvalue: '',
      opneScanner: false,
      user:null,
      pass:null,
    };
  }
  componentDidMount(){
   this._retrieveData();

  

}

  static navigationOptions =
      {
        title: 'QRCODE',
   
      };
   
    gotoNextActivity = () => {
      this.props.navigation.navigate('Second');
   
    }

    _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('email');
        const pass = await AsyncStorage.getItem('pass');
        if (value !== null) {
          // We have data!!
          console.log(value);
           this.setState({ user:value});
           this.setState({pass:pass});
          console.log(pass);

          fetch('http://35.246.54.179/login/', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
           'Content-Type': 'application/json',
            },
            body: JSON.stringify({
           'email': this.state.user,
           'pass':this.state.pass,
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

  onOpenlink() {
    //Function to open URL, If scanned 
    Linking.openURL(this.state.qrvalue);
    //Linking used to open the URL in any browser that you have installed
  }
  onBarcodeScan(qrvalue) {
    //called after te successful scanning of QRCode/Barcode
    this.setState({ qrvalue: qrvalue });
    this.setState({ opneScanner: false });
  }
  onOpneScanner() {
    var that =this;
    //To Start Scanning
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
            //If CAMERA Permission is granted
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
      //Calling the camera permission function
      requestCameraPermission();
    }else{
      that.setState({ qrvalue: '' });
      that.setState({ opneScanner: true });
    }    
  }
  render() {
    let displayModal;
    //If qrvalue is set then return this view
    if (!this.state.opneScanner) {
      return (
        <View style={styles.container}>
            <Text style={styles.heading}>Scan QR Code at the Shop</Text>
            <Text style={styles.simpleText}>{this.state.qrvalue ? 'Scanned QR Code: '+this.state.qrvalue : ''}</Text>
            {this.state.qrvalue.includes("http") ? 
              <TouchableHighlight
                onPress={() => this.onOpenlink()}
                style={styles.button}>
                  <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Open Link</Text>
              </TouchableHighlight>
              : null
            }
            <TouchableHighlight
              onPress={() => this.onOpneScanner()}
              style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>
                Open QR Scanner
                </Text>
            </TouchableHighlight>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <CameraKitCameraScreen
          showFrame={true}////////////////////////
          //Show/hide scan frame
          scanBarcode={true}
          //Can restrict for the QR Code only
          laserColor={'red'}
          //Color can be of your choice
          frameColor={'yellow'}
          //If frame is visible then frame color
          colorForScannerFrame={'black'}
          //Scanner Frame color
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
    fontSize: 24, 
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 30 
  },
  simpleText: { 
    color: 'black', 
    fontSize: 20, 
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 16
  }
});*/

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
   Alert
  } from 'react-native';

import { CameraKitCameraScreen, } from 'react-native-camera-kit';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      qrvalue: '',        //variable to hold the qr value
      opneScanner: false,
    };
  }

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

  handlePress = async () => {
    fetch('http://35.246.54.179/detectShop/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "shop_name" :this.state.qrvalue,
          "branch" : "Kadawatha"
         
        })
  })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      Alert.alert(responseJson.msg+" : "+this.state.qrvalue);
   
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
                <Text style={{ color: '#FFFFFF', fontSize: 18 }}>
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
    fontSize: 35, 
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 30 
  },
  
});