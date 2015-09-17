var locations = [
	{name:"France",coor:[{lat:48.998754, lng:23.04600}]},
	{name:"Italy",coor:[{lat:43.281775, lng:12.074211}]},
	{name:"Belgium",coor:[{lat:50.515523, lng:4.816355}]},
	{name:"Serbia",coor:[{lat:44.867888, lng:20.426739}]},
	{name:"Spain",coor:[{lat:40.426406, lng:-3.699224}]},
	{name:"Greece",coor:[{lat:37.919440, lng:23.708987}]}//This is the list of all the locations we use.
];

var map,google,ko,infowindow,listObservable,createMarkers,setMapOnAll,markers,userInput,attachWin,addMarkers,receiveData,dataReceived,url,$;

var initMap = function(){
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 43.281775, lng: 12.074211},
		zoom: 3
	});//this is the inital callback function for the map
};

var myViewModel = function(){//A viewModel used for knockout.js

	this.markers = ko.observableArray();//This array is gonna hold the marker objects

	this.listObservable = ko.observableArray();//This array will hold the data for the markers we are displaying

	this.userInput = ko.observable();//this variable holds the user search info

	this.infowindows = ko.observableArray();

	this.populateList = function(){//This function populates the inital list and ads the initial markers to the map
		locations.forEach(function(locItem){
			this.listObservable.push(locItem);
		});
		setTimeout(function(){createMarkers();infowindow = new google.maps.InfoWindow();},1000);
	};

	this.filterLocations = function(){//This function filters the listobservable array based on user search queries
		infowindow.close();
		listObservable.removeAll();
		setMapOnAll(null);
		for (var i=0;i<locations.length;i++){
				if (locations[i].name.toLowerCase().indexOf(userInput().toLowerCase())===0){
					this.listObservable.push(locations[i]);
					markers()[i].setMap(map);

				}
		}
	};

	this.clickLocations = function(){//This function displays the clicker marker from the list
		var clickedItem = this.name;
		for(var i=0;i<locations.length;i++){
				if (locations[i].name.toLowerCase().indexOf(clickedItem.toLowerCase())===0){
					markers()[i].setMap(map);
					attachWin(markers()[i],locations[i].name);
				}
		}
	};

	this.createMarkers = function(){//This function is called from other functions to create the markers
  		setMapOnAll(null);
  		for (var i=0;i<listObservable().length;i++){
  			addMarkers(listObservable()[i].coor[0],listObservable()[i].name);
  		}
  		setMapOnAll(map);
  	};

	this.addMarkers = function(location,message){//This function created the basic marker to be used in other fucntions
	    var marker = new google.maps.Marker({
	    	animation: google.maps.Animation.DROP,
	    	position: location
	  	});
	  	marker.addListener('click',function(){
	  		attachWin(marker,message);
	  	});
	    markers().push(marker);
  	};

  	this.setMapOnAll = function(map){
  		for (var i = 0; i < markers().length; i++) {
    		markers()[i].setMap(map);//Set the map on markers to make them visible
  		}
	};

	this.attachWin = function(marker,message){//Function used to add the infoWindow to the markers
		infowindow.close();
		infowindow = new google.maps.InfoWindow();
		receiveData(message);//send the location name for the AJAX request
		setTimeout(function(){marker.setAnimation(null);},1400);
		marker.setAnimation(google.maps.Animation.BOUNCE);//ads the animation when marker clicked
		setTimeout(function(){infowindow.setContent(dataReceived);},300);
		infowindow.open(marker.get('map'), marker);
	};

	this.receiveData = function(message){//This function makes the AJAX call for each marker when clicked
		url = "http://api.population.io:80/1.0/population/"+message+"/2015-12-24/";
		$.ajax({
			type:'GET',
			url:url,
			contentType: 'text/plain',
			xhrFields:{
				withCredentials: false
			},
			headers:{

			},
			success:function(data){
				var sentence = "<p class='infowin'>Population of " + message + " is </p>";
        		dataReceived = String(data.total_population.population).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        		dataReceived = sentence + dataReceived;
        		},
        	error:function(){
        		dataReceived="Request couldn't be completed";
        	}
        });
	};

  	this.populateList();//Call to the function to initaly populate the list

};
ko.applyBindings(myViewModel);