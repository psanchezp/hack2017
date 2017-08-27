import uuid from 'uuid';
import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import DoubleClick from 'react-native-double-click';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { parseDataToJSON, postJSON, getJSON, buildLandmarkData, buildEdgeData, getLandmarkList, getEdgesList}  from './CallApi';

var beaconID = "";
var landmarkList = [];
var edgeList = [];

import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

export default class HomeScreen extends React.Component {
  // Ttile hidden for home page
  static navigationOptions = { title: 'Home', header: null, gesturesEnabled: false};

  constructor() {
    super();
    this.handleHostClick = this.handleHostClick.bind(this);
    this.handleVisitClick = this.handleVisitClick.bind(this);

    //simulate post 
    // Holder for props
    var data = this.props;
    
    // push to these arrays with method builders
    // Do not post to API before populating these
    var landmarksPostedArray = [];
    var edgesPostedArray = [];

    // Create landmark data
    var landmarkData = buildLandmarkData("Entrance","12","24");
    // Populate landmark array
    landmarksPostedArray.push(landmarkData);
    // Create for counter
    var endlandmarkData = buildLandmarkData("Counter","22","14");
    // Populate landmark array
    landmarksPostedArray.push(endlandmarkData);

    // Create edge data
    var edgeData = buildEdgeData(landmarkData.id, endlandmarkData.id,"N","0.34","20","4");
    // Populate edge array
    edgesPostedArray.push(edgeData);

    // Use helper function to buils json
    // This is after all calibration is done
    var locationCalibratedData = parseDataToJSON("Azucar Morena", landmarksPostedArray, edgesPostedArray);

    // Emulates a beacon being recognized data, or a place being picked
    beaconID = JSON.stringify(locationCalibratedData.uuid);

    // Post to API
    postJSON(beaconID, locationCalibratedData);
  }

  handleHostClick() {
    const { navigate } = this.props.navigation;
    navigate('Alpha');
  }

  handleVisitClick() {
    const { navigate } = this.props.navigation;
    navigate('Locations');
  }

  render() {
    return (
      <Swiper style={styles.wrapper}>
        <View style={styles.slide1}>
          <DoubleClick stye={styles.container} onClick={this.handleHostClick}>
            <Text style={styles.text}>Host</Text>
          </DoubleClick>
        </View>
        <View style={styles.slide2}>
        <DoubleClick stye={styles.container} onClick={this.handleVisitClick}>
            <Text style={styles.text}>Visit</Text>
          </DoubleClick>
        </View>
      </Swiper>
    );
  }
}

var styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00bfff',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff9000',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#31B404',
  },
  slide4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#088A29',
  },
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: '60%',
    paddingBottom: '60%',
    paddingLeft: '30%',
    paddingRight: '30%'
  },
  text1: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: '60%',
    paddingBottom: '60%',
    paddingLeft: '15%',
    paddingRight: '15%'
  }
})

const stylesNoSwipe = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
    width:300,
    height:400
  },
});