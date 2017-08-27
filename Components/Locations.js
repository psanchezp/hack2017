import React from 'react';
import { Alert, StyleSheet, Text, View, Image, Button, DeviceEventEmitter } from 'react-native';
import {styles, stylesNoSwipe} from './StylesVar';
import Swiper from 'react-native-swiper';
import DoubleClick from 'react-native-double-click';
import { NativeModules } from 'react-native';

//receives Location Name as prop
var beaconID;
class CalibrateLocation extends React.Component {
	render() {
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

		// Create edge data
		var edgeData = buildEdgeData("Entrance", "Counter","N","0.34","20","4");
		// Populate edge array
		edgesPostedArray.push(edgeData);

		// Use helper function to buils json
		// This is after all calibration is done
		var locationCalibratedData = parseDataToJSON("Azucar Morena", landmarksPostedArray, edgesPostedArray);

		// Emulates a beacon being recognized data, or a place being picked
		beaconID = JSON.stringify(locationCalibratedData.uuid);

		// Post to API
		postJSON(beaconID, locationCalibratedData);

		// Post done
		return (
			<Text>Landmarks Calibrated {beaconID}</Text>
		);
	}
}

var tts = require('react-native-android-speech');

export default class swipeLocationsScreen extends React.Component {
	// Ttile  for locations page
	static navigationOptions = { title: 'Landmarks', header: null, gesturesEnabled: false};


	constructor() {
		super();
		currentAzimuth = 0;
	    interval = null;

		this.state = {showText: false, azimuth: 0};
	}
	componentWillMount() {
		const {params} = this.props.navigation.state;
		beaconID = params.beaconID;

		var hostURL = "http://138.197.105.242:5000/";

		fetch((hostURL + 'api/v1.0/maps/get/' + beaconID))
			.then((response) => response.json())
			.then(data => {
				landmarkList = data.mapdata.landmarks
				edgeList = data.mapdata.edges
				this.setState(previousState => {
					return { showText: true};
				});
			})
			.catch((error) => {
				console.error(error);
			});

	}

	componentDidMount() {
	    NativeModules.CompassAndroid.startTracking();

	    DeviceEventEmitter.addListener('azimuthChanged', this.azimuthChanged.bind(this));

	    /**
	     * We need this magic because we receive too much 'azimuthChanged' events so RN can't render it.
	     * Using interval we'll update our view each 1/10 second with current azimuth value.
	     */
	    this.interval = setInterval(() => {
	      this.setState({
	        azimuth: this.currentAzimuth
	      });
	    }, 1000);
	  }

	  azimuthChanged(e: AzimuthEvent) {
	    this.currentAzimuth = e.newAzimuth;
	  }

	  componentWillUnmount() {
	    NativeModules.CompassAndroid.stopTracking();
	    clearInterval(this.interval);
	  }

	handleChooseClick(indexChosen) {
		if (indexChosen != 0){
			for(var i = 0; i < edgeList.length; i++){
				if(landmarkList[indexChosen].id == edgeList[0].endNode) {
					this.speakDirection(edgeList[0], landmarkList[indexChosen].name);          
					break;
				}
			}
		}
		else{
			this.speakError(landmarkList[indexChosen].name);
		}
	}

	_calcDir(end) {
		coordNames = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];
	    coordIndex = Math.round(end / 45);

	    return coordNames[coordIndex];
	}

	_getDirection(dirOne, dirTwo) {
		if (dirOne == dirTwo) {
			return "Front";
		}

		switch(dirOne) {
			case "N":
				switch(dirTwo){
					case "NE":
						return "front right";
					case "NW":
						return "front left";
					case "E":
						return "left";
					case "W":
						return "right";
					case "SW":
						return "Turn Around. Then front right";
					case "SE":
						return "Turn Around. Then front left";
					case "S":
						return "Turn Around. Then front";
				}
			break;
			case "S":
				switch(dirTwo){
					case "SW":
						return "front right";
					case "SE":
						return "front left";
					case "W":
						return "left";
					case "E":
						return "right";
					case "NE":
						return "Turn Around. Then front right";
					case "NW":
						return "Turn Around. Then front left";
					case "N":
						return "Turn Around. Then front";
				}
			break;
			case "SW":
				switch(dirTwo){
					case "W":
						return "front right";
					case "S":
						return "front left";
					case "SE":
						return "left";
					case "NW":
						return "right";
					case "E":
						return "Turn Around. Then front right";
					case "N":
						return "Turn Around. Then front left";
					case "NE":
						return "Turn Around. Then front";
				}
			break;
			case "SE":
				switch(dirTwo){
					case "S":
						return "front right";
					case "E":
						return "front left";
					case "NE":
						return "left";
					case "SW":
						return "right";
					case "W":
						return "Turn Around. Then front right";
					case "N":
						return "Turn Around. Then front left";
					case "NW":
						return "Turn Around. Then front";
				}
			break;
			case "E":
				switch(dirTwo){
					case "SE":
						return "front right";
					case "NE":
						return "front left";
					case "N":
						return "left";
					case "S":
						return "right";
					case "NW":
						return "Turn Around. Then front right";
					case "SW":
						return "Turn Around. Then front left";
					case "W":
						return "Turn Around. Then front";
				}
			break;
			case "W":
				switch(dirTwo){
					case "NW":
						return "front right";
					case "SW":
						return "front left";
					case "S":
						return "left";
					case "N":
						return "right";
					case "SE":
						return "Turn Around. Then front right";
					case "NE":
						return "Turn Around. Then front left";
					case "E":
						return "Turn Around. Then front";
				}
			break;
			case "NW":
				switch(dirTwo){
					case "N":
						return "front right";
					case "W":
						return "front left";
					case "SW":
						return "left";
					case "NE":
						return "right";
					case "S":
						return "Turn Around. Then front right";
					case "E":
						return "Turn Around. Then front left";
					case "SE":
						return "Turn Around. Then front";
				}
			break;
			case "NE":
				switch(dirTwo){
					case "E":
						return "front right";
					case "N":
						return "front left";
					case "NW":
						return "left";
					case "SE":
						return "right";
					case "W":
						return "Turn Around. Then front right";
					case "S":
						return "Turn Around. Then front left";
					case "SW":
						return "Turn Around. Then front";
				}
			break;
		}
	}

	speak(sentence){
		tts.speak({
	      text: sentence
	    }).then(isSpeaking=>{
	        //Success Callback
	        console.log(isSpeaking);
	    }).catch(error=>{
	        //Errror Callback
	        console.log(error)
	    });
	}

	speakDirection(edge, end){
		var directions = "Please head " + edge.distance + " meters towards the " + this._getDirection(this._calcDir(this.state.azimuth), edge.direction) + " to reach " + end + ".";
		this.speak(directions);
	}

	speakError(landmark){
		var sorry = landmark + " is not available for directions. You are already there.";
		this.speak(sorry);
	}

	speakLandmark(landmark){
		var speakLandmark = landmark.name;
		this.speak(speakLandmark);
	}

	createList(){
			return landmarkList.map((function(landmark, index) {
				styleChosen = index%2 ? styles.slide3 : styles.slide4;
				return (<View style={styleChosen} key={landmark.name}>
									<DoubleClick stye={styles.container} onClick={() => {this.handleChooseClick(index)}} key={landmark.name}>
									<Text numberOfLines={3} style={styles.text1} key={landmark.name}>
										{landmark.name}
									</Text>
									</DoubleClick>
							</View>)
			}).bind(this));
	}

	render() {
		let display = !this.state.showText ? <View style={styles.slide3}><Text Loading /></View>: this.createList();

		return (
			<Swiper style={styles.wrapper}>
				{display}
			</Swiper>
		);
	}
}

