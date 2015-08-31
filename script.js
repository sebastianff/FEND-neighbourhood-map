var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });

  var marker = new google.maps.Marker({
   	map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: {lat: -34.397, lng: 150.644}
  });
}