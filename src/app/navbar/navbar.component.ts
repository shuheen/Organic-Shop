import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../services/auth.service";
import { AppUser } from "./../model/app-user";
import { ShoppingCartService } from "./../services/shopping-cart.service";
import { Observable } from "rxjs/internal/Observable";
import { ShoppingCart } from "./../model/shopping-cart";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  currentLat: any;
  currentLong: any;
  map: google.maps.Map;
  geocoder;
  myLocation;
  constructor(
    private auth: AuthService,
    private cartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => (this.appUser = appUser));
    this.cart$ = await this.cartService.getCart();
    this.geocoder = new google.maps.Geocoder();
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

  logout() {
    this.auth.logout();
  }
}
