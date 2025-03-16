import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

declare let google;

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.page.html',
  styleUrls: ['./mapping.page.scss'],
})
export class MappingPage implements OnInit {

  @ViewChild('map', {static: true}) mapElement;
  map: any;

  constructor(private navParams: NavParams,
    private modalController: ModalController) { }

  place:string = '';
  lat:number = null;
  long:number = null;

  ngOnInit() {
    // Get data of location
    this.place = this.navParams.get('place');
    this.lat = this.navParams.get('lat');
    this.long = this.navParams.get('long');

    // Assign data to map
    let mapOptions = {
      center: {lat: this.lat, lng: this.long},
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions); // Show map

    // For new diary, detect user's current location
    if (this.lat == null || this.long == null) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          this.lat = pos.lat;
          this.long = pos.lng;
          this.map.setCenter(pos);
        });
      } else {alert("Geolocation not supported.");}

      // Show pin and info window when a location is selected on map
      let infoWindow = new google.maps.InfoWindow();
      let marker: any;

      this.map.addListener("click", (mapsMouseEvent) => {
        // Remove previous pin and info window whenever a new location is picked
        infoWindow.close();
        if (marker) {marker.setMap(null);} 

        infoWindow = new google.maps.InfoWindow({
          position: mapsMouseEvent.latLng,
        });

        marker = new google.maps.Marker({ // Set pin's location
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: mapsMouseEvent.latLng
        });

        infoWindow.setContent( // Show coordinates or place's name in info window
          JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        );

        this.lat = marker.getPosition().lat(); // Save coordinates of location selected
        this.long = marker.getPosition().lng();

        infoWindow.open(this.map, marker); // Display info window
      });

    }
    else{ // For show/read diary, show pin on location saved
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });

      let infoWindow = new google.maps.InfoWindow({ // Info window displays place's name
        content: '<h4>' + this.place + '<h/4>'
      });
  
      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
      });
    }
  }

  closeMap() {this.modalController.dismiss();} // Close map

  // Save location and map (Mostly for new diary)
  saveMap() {
    this.modalController.dismiss({ 
      place: this.place,
      lat: this.lat, 
      long: this.long
    });
  }

}
