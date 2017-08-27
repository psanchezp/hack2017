//receives Location Name as prop
class CalibrateLocation extends Component {
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

default export class swipeLocationsScreen extends React.Component {
  // Ttile  for locations page
  static navigationOptions = { title: 'Landmarks', header: null, gesturesEnabled: false};

  constructor() {
    super();
    this.state = {showText: false};

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
    alert(sentence);
  }

  speakDirection(edge, end){
    var directions = "Please head " + edge.distance + " meters towards the " + this._getDirection("N", edge.direction) + " to reach " + end + ".";
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