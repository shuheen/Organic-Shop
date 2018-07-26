import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  currentLat: any;
  currentLong: any;
  map: google.maps.Map;
  geocoder;
  myLocation;
  constructor() {}

  ngOnInit() {
    this.geocoder = new google.maps.Geocoder();
    this.myLocation = "Your Current Location";
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;
    this.geocodeLatLng(this.geocoder, this.map);
  }

  geocodeLatLng(geocoder, map) {
    var latlng = { lat: this.currentLat, lng: this.currentLong };
    geocoder.geocode(
      { location: latlng },
      results => (this.myLocation = results[0].formatted_address)
    );
  }
}
