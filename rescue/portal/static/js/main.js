function getLocation() {

    x = document.getElementById("coordinateField");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.value = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.value = "Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude;
}