var locations = [
	{name:"France",coor:[{lat:48.998754, lng:230460}]},
	{name:"Italy",coor:[{lat:43.281775, lng:12.074211}]},
	{name:"United Kingdom",coor:[{lat:51.510795, lng:-0.105520}]},
	{name:"Belgium",coor:[{lat:50.515523, lng:4.816355}]}
]
var test = ["da","ne","mozda","hmm","da","sebo"]

//
var map;
	//

	initMap = function(){
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 43.281775, lng: 12.074211},
    		zoom: 4
		});
	}



var myViewModel = function(){

	this.markers = ko.observableArray();
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

	this.addMarkers = function(location,message){
			  var marker = new google.maps.Marker({
			    draggable: true,
			    animation: google.maps.Animation.DROP,
			    position: location
			  });
			  attachWin(marker,message);
			markers().push(marker);
  	}

  	this.createMarkers = function(){
  		deleteMarkers();
  		for (items in listObservable()){
  			addMarkers(listObservable()[items].coor[0],listObservable()[items].name);
  			//console.log(listObservable()[items].coor);
  		}
  		showMarkers();
  	}

  	this.setMapOnAll = function(map){
  		for (var i = 0; i < markers().length; i++) {
    		markers()[i].setMap(map);
  		}
	}

	this.showMarkers =  function(){
		setMapOnAll(map)
	}

	this.deleteMarkers =  function(){
		setMapOnAll(null);
		markers.removeAll();
	}

	this.attachWin = function(marker,message){
		var infowindow = new google.maps.InfoWindow();

  		marker.addListener('click', function() {
  			infowindow.close();
  			receiveData();
  			setTimeout(function(){infowindow.setContent(da)},600);
    		infowindow.open(marker.get('map'), marker);

  		});
	}

	this.getInfo = function(){
		return("da")
	}

	this.receiveData = function(){
		url = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=france&page=2&sort=oldest&api-key=231e8ef758feba7528cc7418f8c7e894:2:72283946";
		$.getJSON(url,function(data){
        	da = data.response.docs[0].headline.main;
        	setTimeout(function(){return(da)},20000);
        	//return(da);
		})
	}
  	this.populateList();

}
ko.applyBindings(myViewModel);