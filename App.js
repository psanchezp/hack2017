import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Alpha from './Components/Alpha'
import RegisterOne from './Components/RegisterOne'
import RegisterSuccess from './Components/RegisterSuccess'
import RegisterTwo from './Components/RegisterTwo'
import ViewLandmarks from './Components/ViewLandmarks'
import Visitor from './Components/Visitor'
import Locations from './Components/Locations'

// import { parseDataToJSON, postJSON, getJSON, buildLandmarkData, buildEdgeData, getLandmarkList, getEdgesList}  from './Components/CallApi';

const Blindhack = StackNavigator({
  Visitor: { screen: Visitor },
  Locations: { screen: Locations },
  Alpha: { screen: Alpha },
  RegisterOne: { screen: RegisterOne },
  RegisterSuccess: { screen: RegisterSuccess },
  RegisterTwo: { screen: RegisterTwo },
  ViewLandmarks: { screen: ViewLandmarks }
});

AppRegistry.registerComponent('blindhack', () => Blindhack)

// type AzimuthEvent = {
//   newAzimuth: Number
// };

// var tts = require('react-native-android-speech');

// class HostData extends React.Component {
//   static navigationOptions = {
//     title: 'Host'
//   };

//   constructor(props) {
//     currentAzimuth = 0;
//     interval = null;

//     super(props);
//     this.state = {
//       lat1: null,
//       long1: null,
//       lat2: null,
//       long2: null,
//       acceleration: null,
//       error: null,
//       distance: null,
//       direction: null,
//       azimuth: 0,
//       click: true
//     };
    
//     const accelerationObservable = new Accelerometer({
//       updateInterval: 500, // defaults to 100ms
//     });

//     accelerationObservable
//       .map(({ x, y, z }) => x + y + z)
//       .subscribe(speed => this.setState({ acceleration: speed }));
//   }



//   componentDidMount() {
//     NativeModules.CompassAndroid.startTracking();

//     DeviceEventEmitter.addListener('azimuthChanged', this.azimuthChanged.bind(this));

//     /**
//      * We need this magic because we receive too much 'azimuthChanged' events so RN can't render it.
//      * Using interval we'll update our view each 1/10 second with current azimuth value.
//      */
//     this.interval = setInterval(() => {
//       this.setState({
//         azimuth: this.currentAzimuth
//       });
//     }, 200);
//   }

//   azimuthChanged(e: AzimuthEvent) {
//     this.currentAzimuth = e.newAzimuth;
//   }

//   componentWillUnmount() {
//     NativeModules.CompassAndroid.stopTracking();

//     clearInterval(this.interval);
//   }

//   _distance = () => {
//     R = 6378.137;
//     dLat = this.state.lat2 * Math.PI / 180 - this.state.lat1 * Math.PI / 180;
//     dLon = this.state.long2 * Math.PI / 180 - this.state.long1 * Math.PI / 180;
//     a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//         Math.cos(this.state.lat1 * Math.PI / 180) * Math.cos(this.state.lat2 * Math.PI / 180) *
//         Math.sin(dLon/2) * Math.sin(dLon/2);
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//     var d = R * c;
//     return d * 1000;
//   }

//   _direction = () => {
//     radians = Math.atan2((this.state.long2 - this.state.long1), (this.state.lat2 - this.state.lat1));
  
//     compassDirection = radians * (180 / Math.PI);

//     if(compassDirection < 0) {
//       compassDirection = 360 - compassDirection;
//     }

//     coordNames = ["North", "North East", "East", "South East", "South", "South West", "West", "North West", "North"];
//     coordIndex = Math.round(compassDirection / 45);
    
//     if (coordIndex < 0) {
//         coordIndex = coordIndex + 8
//     };

//     tts.speak({
//       text:'Please head ' + coordNames[coordIndex]
//     }).then(isSpeaking=>{
//         //Success Callback
//         console.log(isSpeaking);
//     }).catch(error=>{
//         //Errror Callback
//         console.log(error)
//     });

//     return coordNames[coordIndex]; // returns the coordinate value
//   }

//   _onFirstPress = () => {
//     this.setState({ click: false });
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         this.setState({
//           lat1: position.coords.latitude,
//           long1: position.coords.longitude,
//           error: null,
//         });
//       },
//       (error) => this.setState({ error: error.message }),
//       { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
//     );
//   }

//   _onSecondPress = () => {
//     this.setState({ click: true });
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         this.setState({
//           lat2: position.coords.latitude,
//           long2: position.coords.longitude,
//           error: null,
//         });
//         this.setState({
//           distance: this._distance(),
//           direction: this._direction()
//         });
//       },
//       (error) => this.setState({ error: error.message }),
//       { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
//     );
//   }

//   render() {    
//     return (
//       <View>
//         <Text>Accelerometer: {this.state.acceleration ? this.state.acceleration : ''}</Text>
//         { this.state.click ? <Button onPress={this._onFirstPress} title='Start' /> : <Button onPress={this._onSecondPress} title='End' /> }
//         <Text>Latitude One:{this.state.lat1 ? this.state.lat1 : ''}</Text> 
//         <Text>Longitude One:{this.state.long1 ? this.state.long1 : ''}</Text>
//         <Text>Latitude Two:{this.state.lat2 ? this.state.lat2 : ''}</Text> 
//         <Text>Longitude Two:{this.state.long2 ? this.state.long2 : ''}</Text> 
//         {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
//         {this.state.distance ? <Text>Distance: {this.state.distance}</Text> : null}
//         {this.state.direction ? <Text>Direction: {this.state.direction}</Text> : null}
//         {this.state.azimuth ? <Text>Azimuth: {this.state.azimuth}</Text> : null}
//       </View>
//     )
//   }

//   componentWillUnmount() {
//     NativeModules.CompassAndroid.stopTracking();
//     clearInterval(this.interval);
//   }
// }

