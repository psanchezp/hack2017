import React from 'react';
import { Alert, StyleSheet, Text, View, Image, Button} from 'react-native';

export default class RegisterSuccess extends React.Component {
	goToLandmarkRegistration(){
		Alert.alert("This functionality has yet to be implemented")
	}
	goHome() {
		Alert.alert('Where is home?')
		setTimeout(() => {
			Alert.alert('Home is where the heart is')
		}, 2000)
	}
	componentWillMount() {
		this.saveToServer()
	}
	saveToServer() {
		const {params} = this.props.navigation.state;
		var landmarks = params.data.map(node => {
			return buildLandmarkData(node.name, node.long, node.lat);
		});
		var distance = params.data[0].dist;
		var direction = params.data[0].direction;
		var edge = buildEdgeData(landmarks[0].id, landmarks[1].id, direction, distance);
		var storeJSON = parseDataToJSON(params.data[1].name, landmarks, edge);
		postJSON(JSON.stringify(storeJSON.uuid), storeJSON);
	}
	render() {
		return(
			<View style={{flex: 1, backgroundColor: '#2C95CA', alignItems: 'center', justifyContent: 'center'}}>
				<Text style={{color: 'white', fontSize: 60, fontWeight: '600', textAlign: 'center', marginBottom: 20}}>Success!</Text>
				<Text style={{color: 'white'}}>Entrance has been recorded</Text>
				<View style={{marginTop: 60}}>
					<Button raised={true} onPress={this.goToLandmarkRegistration} title="Record another one" color="#2C95CA"  style={{fontSize: 60}} accessibilityLabel="Press this when you're ready to record another landmark" />
					<Button raised={true} onPress={this.goHome} title="Go Home" color="#2C95CA"  style={{fontSize: 60}} accessibilityLabel="Press this when you wanna go home" />
				</View>
			</View>
		)
	}
}

