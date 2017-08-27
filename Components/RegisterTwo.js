import React from 'react';
import { Alert, StyleSheet, Text, View, Image, Button, TextInput} from 'react-native';
// import { Accelerometer, Gyroscope } from 'react-native-sensors';
import { NativeModules } from 'react-native';


export default class RegisterTwo extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Registration', header: null
	});

	constructor() {
		super()
		this.state = {
			isVisible: 1,
			landmarkOneName: 'Entrance',
			landmarkTwoName: null,
			alertMsg: 'Walk to second landmark',
			isFirstBtnVisible: true,
			isSecondBtnVisible: false,
			lat1: null,
			long1: null,
			lat2: null,
			long2: null,
			acceleration: null,
			distance: null,
			direction: null,
			error: null
		}
		this.startRecording = this.startRecording.bind(this);
		this.parseText = this.parseText.bind(this);
		this.generateData = this.generateData.bind(this);
		this._distance = this._distance.bind(this)
		this._direction = this._direction.bind(this)
	}

	_distance() {
		var R = 6378.137;
		var dLat = this.state.lat2 * Math.PI / 180 - this.state.lat1 * Math.PI / 180;
		var dLon = this.state.long2 * Math.PI / 180 - this.state.long1 * Math.PI / 180;
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(this.state.lat1 * Math.PI / 180) * Math.cos(this.state.lat2 * Math.PI / 180) *
			Math.sin(dLon/2) * Math.sin(dLon/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c;
		return d * 1000;
	}

	_direction() {
		var radians = Math.atan2((this.state.long2 - this.state.long1), (this.state.lat2 - this.state.lat1));

		var compassDirection = radians * (180 / Math.PI);

		if(compassDirection < 0) {
			compassDirection = 360 + compassDirection;
		}

		var coordNames = ["North", "North East", "East", "South East", "South", "South West", "West", "North West", "North"];
		var coordIndex = Math.round(compassDirection / 45);

		return coordNames[coordIndex]; // returns the coordinate value
	}

	_invalidLandmarkOne = () => {
		return (this.state.landmarkTwoName == null || this.state.landmarkTwoName.trim() == "")
	}

	startRecording() {
		if(this._invalidLandmarkOne()) {
			Alert.alert('Please input a valid landmark names');
			return false;
		}

		this.setState({ isVisible: 0 })

		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState({
					lat2: position.coords.latitude,
					long2: position.coords.longitude,
					error: null,
				}, () => {
					var distancia = this._distance();
					var direc = this._direction();
					this.setState({
						distance: distancia,
						direction: direc,
						isFirstBtnVisible: false, 
						isSecondBtnVisible: true
					});
				});
			},
			(error) => this.setState({ error: error.message }),
			{ enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
	    );
	}

	parseText(value) {
		this.setState({ landmarkTwoName: value })
	}
	generateData() {
		const {params} = this.props.navigation.state;
		var nodea = {
			name: params.name,
			lat: params.lat1,
			long: params.long1,
			dist: this.state.distance,
			direction: this.state.direction
		};
		var nodeb = {
			name: this.state.landmarkTwoName,
			lat: this.state.lat2,
			long: this.state.long2,
			dist: this.state.distance,
			direction: this.state.direction
		};
		return [nodea, nodeb];
	}
	render() {
		const { params } = this.props.navigation.state;
		const { navigate } = this.props.navigation;

		// this.setState({ lat1: params.lat1, long1: params.long1 });
		return(
			<View style={{flex: 1, backgroundColor: '#3CD0D0', alignItems: 'center', paddingTop: 100}}>
				<Text style={{color: 'white', fontSize: 40, marginRight: 40, marginLeft: 40, fontWeight: '600', textAlign: 'center', marginBottom: 20}}>Landmark name {params.lat1}</Text>
				<TextInput style={{height: 60, width: '80%', padding: 10, backgroundColor: 'white', marginBottom: 30}} onChangeText={e => this.parseText(e)} />
				{(function(){return this.state.isFirstBtnVisible ?
					<Button raised={true} onPress={this.startRecording} title="Start recording" color="#000"  style={{fontSize: 60}} accessibilityLabel="Press this when you wanna start mapping" /> : null}
				).bind(this)()}
				<Text style={{fontSize: 30, color: '#f9dc5c', fontWeight: '600', opacity: this.state.isVisible, marginTop: 60, marginBottom: 40}}>{this.state.alertMsg}</Text>
				{
					(function(){
						return this.state.isSecondBtnVisible ?
							<Button onPress={() => navigate('RegisterSuccess', { data: this.generateData() })} title="Finish recording" color="#000" accessibilityLabel="Press this when you're done recording" /> : null;
					}).bind(this)()
				}
			</View>
		)
	}
}

 