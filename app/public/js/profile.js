$(document).ready(function() {
    var itemName = $("#itemName");
    var itemPrice =$("#itemPrice");

    $("#save").on("click", function(event) {
        event.preventDefault();

        var newItem = {
            name: itemName.val().trim(),
            price: itemPrice.val()
        }
        submitItem(newItem);
    });

    $("#status").on("click", function () {
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    position: google.maps.ControlPosition.TOP_CENTER
                };

                console.log(pos);
                // infoWindow.setPosition(pos);
                // infoWindow.setContent('<h1>You are here</h1>');
                // infoWindow.open(map);
                // map.setCenter(pos);
            });
        }
    });

    function submitItem(nItem) {
        $.post("/api/menu", nItem, function() {
            alert("Good Luck!");
        })
    }
});