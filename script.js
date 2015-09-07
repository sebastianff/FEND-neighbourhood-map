var locations = [
	{name:"France",coor:[{lat:48.998754, lng:230460}]},
	{name:"Italy",coor:[{lat:43.281775, lng:12.074211}]},
	{name:"United Kingdom",coor:[{lat:51.510795, lng:-0.105520}]},
	{name:"Belgium",coor:[{lat:50.515523, lng:4.816355}]}
]


//
var map;
	//

	initMap = function(){
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 43.281775, lng: 12.074211},
    		zoom: 4
		});
	}

  	infoWin = function(){
  		var infowindow = new google.maps.InfoWindow({
  			content: nesto
		});
		marker.addListener('click', function() {
			infowindow.open(map, marker);
		});
	}
var myViewModel = function(){

	this.listObservable = ko.observableArray();

	this.populateList = function(){
		locations.forEach(function(locItem){
					this.listObservable.push(locItem);
			});

	}

	this.filterLocations = function(){
		listObservable.removeAll();
		locations.forEach(function(locItem){
			var userText = document.getElementById('userInput').value;
				if (locItem.name.toLowerCase().indexOf(userText.toLowerCase())==0){
					this.listObservable.push(locItem);
				}
			});
	}

	this.addMarkers = function(){
		for(items in listObservable()){
			  var marker = new google.maps.Marker({
			   	map: map,
			    draggable: true,
			    animation: google.maps.Animation.DROP,
			    position: listObservable()[items].coor[0]
			  });
		}
  	}
  	this.populateList();

}
ko.applyBindings(myViewModel);