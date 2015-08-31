var locations = [
	{name:"France",coor:[{lat:48.998754, lng:230460}]},
	{name:"Italy",coor:[{lat:43.281775, lng:12.074211}]},
	{name:"United Kingdom",coor:[{lat:51.510795, lng:-0.105520}]},
	{name:"Belgium",coor:[{lat:50.515523, lng:4.816355}]}
]
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 43.281775, lng: 12.074211},
    zoom: 4
  });

  for(items in locations){
	  var marker = new google.maps.Marker({
	   	map: map,
	    draggable: true,
	    animation: google.maps.Animation.DROP,
	    position: locations[items].coor[0]
	  });
  }
}