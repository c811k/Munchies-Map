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
                infowindow.setPosition(pos);
                infowindow.setContent('<h4>You are here</h4>');
                infowindow.open(map);
                map.setCenter(pos);
            }
            );
        }
    })
});

var infowindow;
var map;
var marker;

function initMap() {
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 34.052235, lng: -118.243683 },
        zoom: 14,
        position: google.maps.ControlPosition.TOP_CENTER,
        styles: [
            {
                elementType: 'geometry',
                stylers: [{color: '#d9e2da'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#b7e2c1'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#c8cec9'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#80a087'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#adb5ad'}]
            },
            {
                featureType: 'poi',
                stylers: [{visibility: 'off'}]
            }
        ]
       
    });
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {            
            var icon = {
                url: "/assets/images/businesslogo.png",
                scaledSize: new google.maps.Size(50,50)
            };
        
            var userPos = new google.maps.LatLng(position.coords.latitude,
                position.coords.longitude);
            
            var markUsr = new google.maps.Marker({
                position: userPos,
                map: map,
                
            });

            $("#search-button").on("click", function () {
                var searchInput = $("#search-box").val().trim();
                searchInput = searchInput.replace(/\s+/g, "").toLowerCase();
                console.log(searchInput);
                
                $.get("/api/vendors/" + searchInput, function(data) {
                    console.log(data);
                    map.setCenter(markUsr.position);

                    for (var i = 0; i < data.length; i++) {
                        var pos = new google.maps.LatLng(parseFloat(data[i].Locations[0].latitude), parseFloat(data[i].Locations[0].longitude));
    
                        var marker = new google.maps.Marker({
                            position: pos,
                            map: map,
                            info: data[i].business_name,
                            icon: icon
                            // description: data[i].desc,
                        });
    
                        infowindow = new google.maps.InfoWindow({
                            content: data[i].business_name
                        });                       
                        
                        infowindow.open(map, marker);
                    }
                });
            });

            $.get("/api/vendors/" , function(data) {
                console.log(data);
                map.setCenter(markUsr.position);

                for (var i = 0; i < data.length; i++) {
                    var pos = new google.maps.LatLng(parseFloat(data[i].Locations[0].latitude), parseFloat(data[i].Locations[0].longitude));

                    var marker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        info: data[i].business_name,
                        icon: icon
                        // description: data[i].desc,
                    });

                    infowindow = new google.maps.InfoWindow({
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
        handleLocationError(false, infowindow, map.getCenter());
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

