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

    $("#online").on("click", function () {
        currentUser.status = true;
        $.ajax({
            method: "PUT",
            url: "/api/vendors",
            data: currentUser
        });
        if(currentUser.status) {
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
        }
        alert("You're live");      
    });

    $("#offline").on("click", function () {
        currentUser.status = false;
        $.ajax({
            method: "PUT",
            url: "/api/vendors",
            data: currentUser
        });
        alert("See you soon!")
    });

    function submitItem(newItem) {
        $.post("/api/menu", newItem, function(data) {

            $("#menuDisplay").append("<p>Name: " + newItem.name + "</p>");
            $("#menuDisplay").append("<p>Price: $" + newItem.price) + "</p>";
            $("#menuDisplay").append("<hr>");
        });
    }

    function getLocation(pos) {
        $.post("/api/location", pos, function(data) {
            console.log(data);
        });
    }
});