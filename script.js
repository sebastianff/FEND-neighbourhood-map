var locations = [
	{name:"France",coor:[{lat:48.998754, lng:230460}]},
	{name:"Italy",coor:[{lat:43.281775, lng:12.074211}]},
	{name:"United Kingdom",coor:[{lat:51.510795, lng:-0.105520}]},
	{name:"Belgium",coor:[{lat:50.515523, lng:4.816355}]}
]

var map;

	initMap = function(){
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 43.281775, lng: 12.074211},
    		zoom: 3
		});
	}

var myViewModel = function(){

	this.markers = ko.observableArray();

	this.listObservable = ko.observableArray();

	this.populateList = function(){
		locations.forEach(function(locItem){
			this.listObservable.push(locItem);
		});
		setTimeout(function(){createMarkers()},1000);
	}

	this.filterLocations = function(){
		listObservable.removeAll();
		locations.forEach(function(locItem){
			var userText = document.getElementById('userInput').value;
				if (locItem.name.toLowerCase().indexOf(userText.toLowerCase())==0){
					this.listObservable.push(locItem);
				}
		});
		createMarkers();
	}

	this.clickLocations = function(){
		var clickedItem = this.name;
		locations.forEach(function(locItem){
				if (locItem.name.toLowerCase().indexOf(clickedItem.toLowerCase())==0){
					setMapOnAll(null);
					markers.removeAll();
					addMarkers(locItem.coor[0],locItem.name);
					setMapOnAll(map);
				}
		});
	}

	this.createMarkers = function(){
  		setMapOnAll(null);
  		markers.removeAll();
  		for (items in listObservable()){
  			addMarkers(listObservable()[items].coor[0],listObservable()[items].name);
  		}
  		setMapOnAll(map);
  	}

	this.addMarkers = function(location,message){
	    var marker = new google.maps.Marker({
	    	animation: google.maps.Animation.DROP,
	    	position: location
	  	});
	    attachWin(marker,message);
	    markers().push(marker);
  	}

  	this.setMapOnAll = function(map){
  		for (var i = 0; i < markers().length; i++) {
    		markers()[i].setMap(map);
  		}
	}

	this.attachWin = function(marker,message){
		var infowindow = new google.maps.InfoWindow();

  		marker.addListener('click', function() {
  			animation: google.maps.Animation.DROP,
  			receiveData(message);
  			setTimeout(function(){infowindow.setContent(dataReceived)},600);
    		infowindow.open(marker.get('map'), marker);
    		console.log(marker)

  		});
	}

	this.receiveData = function(message){
		url = "http://api.population.io:80/1.0/population/"+message+"/2015-12-24/";
		$.getJSON(url,function(data){
			var sentence = "Population of " + message + " is ";
        	dataReceived = String(data.total_population.population).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        	dataReceived = sentence + dataReceived;
		}).error(function(){dataReceived="Request couldn't be completed"})
	}

  	this.populateList();

}
ko.applyBindings(myViewModel);