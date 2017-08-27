import React from 'react';
import { Alert, StyleSheet, Text, View, Image, Button} from 'react-native';

export default class RegisterOne extends React.Component {

	constructor() {
		super()
		this.state = {
			lat1: null,
			lat2: null,
			isFirstBtnVisible: true,
			isSecondBtnVisible: false,
			error: null
		}
	}

	static navigationOptions = {
    title: 'Registration'
  };

  _onFirstPress = () => {
    this.setState({ click: false });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          lat1: position.coords.latitude,
          long1: position.coords.longitude,
          error: null,
        });
        this.setState({
        	isFirstBtnVisible: false,
        	isSecondBtnVisible: true
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );
  }

  // TODO: GET THEM APIS

	render() {
		const { navigate } = this.props.navigation;

		return(
			<View style={{flex: 1, backgroundColor: '#ef8354', alignItems: 'center', justifyContent: 'center'}}>
				<Text style={{color: 'white', fontSize: 60, fontWeight: '600', textAlign: 'center', marginBottom: 20}}>go to entrance</Text>
				{(function(){return this.state.isFirstBtnVisible ?
					<Button raised={true} onPress={this._onFirstPress} title="Ready!" color="#000"  style={{fontSize: 60}} accessibilityLabel="Press this when you're already at the entrance" /> : null}
				).bind(this)()}
				{(function(){return this.state.isSecondBtnVisible ?
					<Button raised={true} onPress={() => navigate('RegisterTwo', { name: "Entrance", lat1: this.state.lat1, long1: this.state.long1 })} title="Next Step" color="#000"  style={{fontSize: 60}} /> : null}
				).bind(this)()}
			</View>
		)
	}
}

