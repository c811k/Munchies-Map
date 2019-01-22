$(document).ready(function() {
    var itemName = $("#itemName");
    var itemPrice =$("#itemPrice");

    var currentUser = JSON.parse(sessionStorage.getItem("user"));
    console.log(currentUser);
    if(currentUser) {
        $("#greeting").text(`Hello ${currentUser.owner_name}`);
        $("#business").text(`Business Name: ${currentUser.business_name}`);
    }

    $("#save").on("click", function(event) {
        event.preventDefault();

        var newItem = {
            name: itemName.val().trim(),
            price: itemPrice.val(),
            vendorId: currentUser.id
        }
        submitItem(newItem);
    });

    $("#status").on("click", function () {
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    vendorId: currentUser.id
                };

                console.log(pos);
                getLocation(pos);
            });
        }
    });

    function submitItem(newItem) {
        $.post("/api/menu", newItem, function(data) {
            console.log(data);
        });
    }

    function getLocation(pos) {
        $.post("/api/location", pos, function(data) {
            console.log(data);
        });
    }
});