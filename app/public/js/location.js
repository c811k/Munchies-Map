var searchVal;
var userLonLang;

$(document).ready(function () {
    $("#sidebarCollapse").on("click", function () {
        $("#sidebar").toggleClass("active");
        $(this).toggleClass("active");
    });

    $("#loc1").on("click", function () {
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(function (position) {
                pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    position: google.maps.ControlPosition.TOP_CENTER
                };
                infoWindow.setPosition(pos);
                infoWindow.setContent('<h1>You are here</h1>');
                infoWindow.open(map);
                map.setCenter(pos);
            }
            );
        }
    })
});

var uluru = { lat: 34.053345, lng: -118.496475 };
var uluru2 = { lat: 34.0522222, lng: -118.2427778 };
var map;
var marker;

function initMap() {
    // The location of Uluru

    // The map, centered at Uluru
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 34.052235, lng: -118.243683 },
        zoom: 14,
        position: google.maps.ControlPosition.TOP_CENTER
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                position: google.maps.ControlPosition.TOP_CENTER
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('<h1>You are here</h1>');
            infoWindow.open(map);
            map.setCenter(pos);
        }
        );
    } else {
        // Browser doesn't support Geolocation

        handleLocationError(false, infoWindow, map.getCenter());
    }
    // The marker, positioned at Uluru
    //This is the way you can have markers show in the correct place on the map
    // marker = new google.maps.Marker({ position: uluru, map: map });
    // var marker2 = new google.maps.Marker({ position: uluru2, map: map });

    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the ' +
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
        'south west of the nearest large town, Alice Springs; 450&#160;km ' +
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
        'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
        'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
        'Aboriginal people of the area. It has many springs, waterholes, ' +
        'rock caves and ancient paintings. Uluru is listed as a World ' +
        'Heritage Site.</p>' +
        '</div>' +
        '</div>';

        var infowindow2 = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 200
          });

          var marker = new google.maps.Marker({
            position: uluru,
            map: map,
            title: 'Uluru (Ayers Rock)'
          });

          marker.addListener('click', function() {
            infowindow2.open(map, marker);
          });

    // var marker = new google.maps.Marker({
    //     position: uluru,
    //     map: map,
    //     title: 'Hello World!'
    // });

    // var marker2 = new google.maps.Marker({
    //     position: uluru2,
    //     map: map,
    //     title: 'Hello World!'
    // });

    var markers = [];
    var infoWindows = [];


}
$("#search-button").on("click", function () {
    searchVal = $("#search-box").val();
    console.log(searchVal);
})