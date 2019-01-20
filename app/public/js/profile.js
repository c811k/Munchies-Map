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

    function submitItem(nItem) {
        $.post("/api/menu", nItem, function() {
            alert("Good Luck!");
        })
    }
});