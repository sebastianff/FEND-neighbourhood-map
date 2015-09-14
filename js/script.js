var locations = [
	{name:"France",coor:[{lat:48.998754, lng:23.04600}],marker:""},
	{name:"Italy",coor:[{lat:43.281775, lng:12.074211}],marker:""},
	{name:"Belgium",coor:[{lat:50.515523, lng:4.816355}],marker:""},
	{name:"Serbia",coor:[{lat:44.867888, lng:20.426739}],marker:""},
	{name:"Spain",coor:[{lat:40.426406, lng:-3.699224}],marker:""},
	{name:"Greece",coor:[{lat:37.919440, lng:23.708987}],marker:""}//This is the list of all the locations we use.
];

var map;

initMap = function(){
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 43.281775, lng: 12.074211},
		zoom: 3
	});
};

var myViewModel = function(){//A viewModel used for knockout.js

	this.markers = ko.observableArray();//This array is gonna hold the marker objects

	this.listObservable = ko.observableArray();//This array will hold the data for the markers we are displaying

	this.populateList = function(){//This function populates the inital list and ads the initial markers to the map
		locations.forEach(function(locItem){
			this.listObservable.push(locItem);
		});
		setTimeout(function(){createMarkers();},1000);
	};

	this.filterLocations = function(){//This function filter the listobservable array based on user search queries
		listObservable.removeAll();
		setMapOnAll(null);
		locations.forEach(function(locItem){
				if (locItem.name.toLowerCase().indexOf(userInput.toLowerCase())===0){
					this.listObservable.push(locItem);
				}
		});
		createMarkers();//We call the create markers function to create the filtered markers
	};

	this.clickLocations = function(){//This function displays the clicker marker from the list
		var clickedItem = this.name;
		for(items in locations){
				if (locations[items].name.toLowerCase().indexOf(clickedItem.toLowerCase())===0){
					setMapOnAll(null);
					markers()[items].setMap(map);
					attachWin(markers()[items],locations[items].name)
				}
		}
	}

	this.createMarkers = function(){//This fucntion is called from other functions to create the markers
  		setMapOnAll(null);
  		markers.removeAll();
  		for (items in listObservable()){
  			addMarkers(listObservable()[items].coor[0],listObservable()[items].name);
  		}
  		setMapOnAll(map);
  	};

	this.addMarkers = function(location,message){//This fucntion created the basic marker to be used in other fucntions
	    var marker = new google.maps.Marker({
	    	animation: google.maps.Animation.DROP,
	    	position: location
	  	});
	    markers().push(marker);
  	};

  	this.setMapOnAll = function(map){
  		for (var i = 0; i < markers().length; i++) {
    		markers()[i].setMap(map);//Set the map on markers to make them visible
  		}
	};

	this.noAnimation = function(){
  		for (var i = 0; i < markers().length; i++) {
    		markers()[i].setAnimation(null);//Set the map on markers to make them visible
  		}
	};

	this.attachWin = function(marker,message){//Function used to add the infoWindow to the markers
		var infowindow = new google.maps.InfoWindow();
		receiveData(message);//send the location name for the AJAX request
		if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
			} else {
				noAnimation();
			marker.setAnimation(google.maps.Animation.BOUNCE);//ads the animation when marker clicked
			}
		setTimeout(function(){infowindow.setContent(dataReceived)},600);
		infowindow.open(marker.get('map'), marker);
		console.log(marker)
	};

	this.receiveData = function(message){//This function makes the AJAX call for each marker when clicked
		url = "http://api.population.io:80/1.0/population/"+message+"/2015-12-24/";
		$.getJSON(url,function(data){
			var sentence = "<p class='infowin'>Population of " + message + " is </p>";
        	dataReceived = String(data.total_population.population).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        	dataReceived = sentence + dataReceived;
		}).error(function(){dataReceived="Request couldn't be completed";})
	};

  	this.populateList();//Call to the function to initaly populate the list

}
ko.applyBindings(myViewModel);