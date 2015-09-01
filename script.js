var locations = [
	{name:"France",coor:[{lat:48.998754, lng:230460}]},
	{name:"Italy",coor:[{lat:43.281775, lng:12.074211}]},
	{name:"United Kingdom",coor:[{lat:51.510795, lng:-0.105520}]},
	{name:"Belgium",coor:[{lat:50.515523, lng:4.816355}]}
]
var map;

var myViewModel = function(){
	this.userInput = ko.observable("ne");
	this.listObservable = ko.observableArray();

	locations.forEach(function(locItem){
		this.listObservable.push(locItem);
	});

	this.initMap = function(){
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 43.281775, lng: 12.074211},
    		zoom: 4
		});

		for(items in listObservable()){
			if (userInput().indexOf(listObservable()[items].name==0)){
			  var marker = new google.maps.Marker({
			   	map: map,
			    draggable: true,
			    animation: google.maps.Animation.DROP,
			    position: listObservable()[items].coor[0]
			  });

		  	}
		  	else{console.log("da")}
  		}
	}
}

ko.applyBindings(myViewModel);
