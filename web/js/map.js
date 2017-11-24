let map;
let markers = [];
let buffer;

let center;

function initMap() {

    let mapOptions;

    let mapCentre;

    if (localStorage.getItem("mapLat") !== null &&
        localStorage.getItem("mapLng") !== null &&
        localStorage.getItem("mapZoom") !== null) {

        mapOptions = {
            center: new google.maps.LatLng(localStorage.mapLat,localStorage.mapLng),
            zoom: parseInt(localStorage.mapZoom),
            scaleControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: true
        };

        // console.log(mapOptions)

    } else {

        console.log("new localStorage mapOptions");

        //Choose some default options
        mapOptions = {
            center: {lat: 59.9000, lng: 30.3000},
            zoom: 5,
            scaleControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: true
        };
    }

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    google.maps.event.addListener(map, "center_changed", function() {

        //Set local storage variables.
        mapCentre = map.getCenter();

        localStorage.setItem("mapLat", mapCentre.lat());
        localStorage.setItem("mapLng", mapCentre.lng());
        localStorage.setItem("mapZoom", map.getZoom());

        // console.log(localStorage)
    });

    google.maps.event.addListener(map, "zoom_changed", function() {

        //Set local storage variables.
        mapCentre = map.getCenter();

        localStorage.setItem("mapLat", mapCentre.lat());
        localStorage.setItem("mapLng", mapCentre.lng());
        localStorage.setItem("mapZoom", map.getZoom());
    });
}

function createMarker(user, position) {

    let image = {
        url: "",
        // This marker is 20 pixels wide by 32 pixels high.
        // size: new google.maps.Size(250, 250),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(50, 50),

        scaledSize: new google.maps.Size(100, 100)
    };

    user.marker = new google.maps.Marker({

        position: position,
        map: map,
        // label: 'Label',
        icon: image
    });

    user.marker.addListener('click', function() {
        // map.setZoom(8);
        // map.setCenter(marker.getPosition());
        // alert('marker click: ' + user.id)
        openConstructor(user, position);
    });
}
