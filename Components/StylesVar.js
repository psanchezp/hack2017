import { Alert, StyleSheet, Text, View, Image, Button} from 'react-native';

export var styles = StyleSheet.create({
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
    paddingRight: '30%',
  },
  text1: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: '60%',
    paddingBottom: '60%',
    paddingLeft: '15%',
    paddingRight: '15%',
  }
})

export const stylesNoSwipe = StyleSheet.create({
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

