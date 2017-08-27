import React from 'react';
import { Alert, StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';

export default class ViewLandmarks extends React.Component {
	constructor() {
		super()
		// call API
		// TODO: Change to FlatList component
	}
	render() {
		return (
			<View style={{flex: 1}}>
				{tiles.map((tile, index) => {
					return(
						<TouchableWithoutFeedback key={tile}>
							<View style={[styles.coloredRows, {backgroundColor: colors[index%5]}]}>
								<Text style={{fontSize: 30, fontWeight: '600', color: 'white', 'textAlign': 'left'}}>{tile}</Text>
							</View>
						</TouchableWithoutFeedback>
					)
				})}
			</View>
		)
	}
}
const colors = ['#a1dab4', '#41b6c4', '#2c7fb8', '#4f5d75', '#2d3142'];
const tiles = ['Counter', 'Cereal Bar', 'Men\'s Bathroom', 'Women\'s Bathroom', "Exit"];

const styles = {
	coloredRows: {
		flex: 1,
		backgroundColor: 'red',
		justifyContent: 'center',
		paddingLeft: 40,
		paddingRight: 40
	}
};
