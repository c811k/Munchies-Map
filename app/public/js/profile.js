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
                };

                console.log(pos);
                getLocation(pos);
            });
        }
    });

    function submitItem(nItem) {
        $.post("/api/menu", nItem, function() {
            alert("Good Luck!");
        });
    }

    function getLocation(pos) {
        $.post("/api/location", pos, function() {
            alert("You're live");
        });
    }
});