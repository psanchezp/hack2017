import React from 'react';
import { Alert, StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';

export default class Alpha extends React.Component {
	static navigationOptions = {
    title: 'Welcome!'
  };

	render() {
		const { navigate } = this.props.navigation;

		return(
			<View style={{flex: 1}}>
				<TouchableWithoutFeedback onPress={() => navigate('RegisterOne')}>
					<View style={styles.halfWidth}>
						<Text style={styles.bigFonts}>Register landmark</Text>
					</View>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback onPress={() => navigate('ViewLandmarks')} >
					<View style={[styles.halfWidth, {backgroundColor: '#242423'}]}>
						<Text style={styles.bigFonts}>View landmarks</Text>
					</View>
				</TouchableWithoutFeedback>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	bigFonts: {
		fontSize: 60,
		fontWeight: '600',
		color: 'white'
	},
	halfWidth: {
		backgroundColor: '#f5cb5c', 
		flex: 1, 
		alignItems: 'center', 
		justifyContent: 'center'
	}
});
