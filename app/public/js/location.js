var searchVal;
var map;
var infowindow;

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

var map;
var marker;

function initMap() {
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 34.052235, lng: -118.243683 },
        zoom: 14,
        position: google.maps.ControlPosition.TOP_CENTER
    });
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var userPos = new google.maps.LatLng(position.coords.latitude,
                position.coords.longitude);
            
            var markUsr = new google.maps.Marker({
                position: userPos,
                map: map
                // icon: 'images/locblue.png'
            });
            $.get("/api/vendors/" , function(data) {
                console.log(data);
                map.setCenter(markUsr.position);

                for (var i = 0; i < data.length; i++) {
                    var pos = new google.maps.LatLng(parseFloat(data[i].Locations[0].latitude), parseFloat(data[i].Locations[0].longitude));

                    var marker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        info: data[i].business_name
                        // icon: 'images/locred.png',
                        // description: data[i].desc,
                    });

                    var infowindow = new google.maps.InfoWindow({
                        content: data[i].business_name
                    });

                    google.maps.event.addListener(marker, 'click', function () {
                        infowindow.setContent(this.info);
                        infowindow.open(map, this);
                    });
                    
                }
                
            });
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

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

}

$("#search-button").on("click", function () {
    searchVal = $("#search-box").val();
    console.log(searchVal);
})