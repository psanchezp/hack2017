import uuid from 'uuid';

export function getLandmarkList(landmarks) {
		var landmarkNames = [];

		for (x in landmarks) {
				ladmarkNames.push(x.name);
		}

		return landmarkNames;
	}

function GetLocationInformation(beaconID){
		// This is how you get an entire place´s database
		// contains list of landmarks
		var entireDBforLocation = getJSON(beaconID);
		
		var landmarkResponseList = getLandmarkList(entireDBforLocation.landmarks);

		var edgeResponseList = getEdgeList(entireDBforLocation.edges);

		//alert(landmarkResponseList);
		//alert(edgesResponseList);
}

export function getEdgesList(edges) {
		var edges = [];
		var nodesInEdge;
		
		for (x in edges) {
				nodesinEdge = {
						"start": x.startNode,
						"end": x.endNode
				}
				edges.push(nodesInEdge);
		}

		return edges;
	}

export function parseDataToJSON(locationName, landmarkArray, edgesArray) {
	var jsonData = {
		"uuid": uuid.v4(),
		"locationName": locationName, 
		"landmarks": landmarkArray,
		"edges": edgesArray
	};

	return jsonData;
}

export function buildLandmarkData(landmarkName, longitude, latitude) {
	var landmarkData = {
		"id": uuid.v4(),
		"name": landmarkName, 
		gpsLoc: {
			"lon": longitude,
			"lat": latitude
		}
	};
	return landmarkData;
}

export function buildEdgeData(startNode, endNode, direction, distance) {
	var edgeData = {
		"startNode": startNode,
		"endNode": endNode, 
		"direction": direction, 
		"distance": distance, 
		"steps": 10,  // TODO: calculate
		"accuracyIndex": 1 // TODO: calculate
	};
	return edgeData;
}

export function postJSON(uuid, mapdata) {
	var hostURL = "http://138.197.105.242:5000/";
	fetch((hostURL + 'api/v1.0/maps/store/' + uuid +'/'), {
		method: 'POST',
		headers: {
				'Content-Type': 'application/json'
		},
		body: JSON.stringify(mapdata)
	})
	.then((response)=>{
			//alert("Simulated Location Calibrated");
			console.log(response)
		})
	.catch((error) => {
		console.error(error);
	});
}

export function getJSON(uuid) {
	var hostURL = "http://138.197.105.242:5000/";

	fetch((hostURL + 'api/v1.0/maps/get/' + uuid))
	.then((response) => response.json())
	.then(data => {
			//alert(JSON.stringify(data.mapdata.landmarks));
		})
	.catch((error) => {
		console.error(error);
	});
}
