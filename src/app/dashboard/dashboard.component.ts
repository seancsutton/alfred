import { Component, OnInit, ViewChild, Input, NgZone } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer, observable } from 'rxjs';

declare var google: any;

// interface Marker2 {
//   [index: number] :{
//   lat: number;
//   lng: number;
//   label?: string;
//   draggable: boolean;
// }

interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
  
}
interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  
})


export class DashboardComponent implements OnInit {
  lat: number;
  lng: number;
  public userChores = [
    {
    marker: {
    lat: 29.951065,
    lng: -90.071533,
    draggable: true
      }
    },
    {
      marker: {
        lat: 29.942662896,
        lng: -90.07583303,
        draggable: true
      }
    },
    {
      marker: {
        lat: 29.9505,
        lng: -90.0753,
        draggable: true
      }
    },
];
  geocoder: any;
  public location: Location = {
    lat: 30.433283,
    lng: -87.240372,
    marker: {
      lat: 29.9505,
      lng: -90.0753,
      draggable: true
    },
    
    zoom: 10
  };
  user: any;
  obj = {
    lat: 12,
    lng: 12,
  }
  test: any;
  test2: string = '2539 Columbus Street, New Orleans, LA';
  @ViewChild(AgmMap) map: AgmMap;
  constructor(public mapsApiLoader: MapsAPILoader, private router: Router, private http: HttpClient,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper) {
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
      console.log(this.geocoder);
    });
  }
  
  getlatlng(address: string) {
    
    this.geocoder = new google.maps.Geocoder();
    this.geocoder.geocode({"address" : address}, (result, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        this.lat = result[0].geometry.location.lat();
        this.lng = result[0].geometry.location.lng();
      }
    })
    this.map.triggerResize();
  }
  updateOnMap() {
    let full_address: string = this.location.address || ""
    if (this.location.address_state) full_address = full_address + " " + this.location.address_state
    if (this.location.address_country) full_address = full_address + " " + this.location.address_country

    this.findLocation(full_address);
  }
  findLocation(address) {
    if (!this.geocoder) this.geocoder = new google.maps.Geocoder()
    this.geocoder.geocode({
      'address': address
    }, (results, status) => {
      console.log(results);
      if (status == google.maps.GeocoderStatus.OK) {
        for (var i = 0; i < results[0].address_components.length; i++) {
          let types = results[0].address_components[i].types
          if (types.indexOf('country') != -1) {
            this.location.address_country = results[0].address_components[i].long_name
          }
          if (types.indexOf('postal_code') != -1) {
            this.location.address_zip = results[0].address_components[i].long_name
          }
          if (types.indexOf('administrative_area_level_1') != -1) {
            this.location.address_state = results[0].address_components[i].long_name
          }
        }

        if (results[0].geometry.location) {
          this.location.lat = results[0].geometry.location.lat();
          this.location.lng = results[0].geometry.location.lng();
          this.location.marker.lat = results[0].geometry.location.lat();
          this.location.marker.lng = results[0].geometry.location.lng();
          this.location.marker.draggable = true;
          this.location.viewport = results[0].geometry.viewport;
        }

        this.map.triggerResize()
      
      } else {
        alert("Sorry, this search produced no results.");
      }
    })
    
  }
  // markerDragEnd(m: any, $event: any) {
  //   this.location.marker.lat = m.coords.lat;
  //   this.location.marker.lng = m.coords.lng;
  //   this.findAddressByCoordinates();
  // }
  // findAddressByCoordinates() {
  //   this.geocoder.geocode({
  //     'location': {
  //       lat: this.location.marker.lat,
  //       lng: this.location.marker.lng
  //     }
  //   }, (results, status) => {
  //     console.log(results);
  //     this.decomposeAddressComponents(results);
  //   })
  // }
  // decomposeAddressComponents(addressArray) {
  //   if (addressArray.length == 0) return false;
  //   let address = addressArray[0].address_components;

  //   for (let element of address) {
  //     if (element.length == 0 && !element['types']) continue

  //     if (element['types'].indexOf('street_number') > -1) {
  //       this.location.address = element['long_name'];
  //       continue;
  //     }
  //     if (element['types'].indexOf('route') > -1) {
  //       this.location.address += ', ' + element['long_name'];
  //       continue;
  //     }
      
  //     if (element['types'].indexOf('administrative_area_level_1') > -1) {
  //       this.location.address_state = element['long_name'];
  //       continue;
  //     }
  //     if (element['types'].indexOf('country') > -1) {
  //       this.location.address_country = element['long_name'];
  //       continue;
  //     }
  //     if (element['types'].indexOf('postal_code') > -1) {
  //       this.location.address_zip = element['long_name'];
  //       continue;
  //     }
  //   }
  // }
  logOut() {
    this.http.get("/logOut").subscribe((data) => {
      console.log(data);
        this.router.navigateByUrl('/');
    })


  }
  testing() {}
  ngOnInit() {
    this.http.get('/user').subscribe((user) =>{
      console.log(user);
      this.user = user;
      console.log(this.user.area);
      this.getlatlng(this.user.area);
      
    })
    
  }

}
