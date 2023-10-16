import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
  Textarea,
} from "@material-tailwind/react";

class LocationPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      longval: 120.994260,
      latval: 14.593999,
    };

    this.mapRef = React.createRef();
    this.marker = null;
    this.infoWindow = null;
  }

  componentDidMount() {
    this.loadGoogleMapsScript(() => {
      this.initializeMap();
    });
  }

  loadGoogleMapsScript = (callback) => {
    if (!window.google || !window.google.maps) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCPvqKJigbPJWjWpPcHXQ-c5TxuHTXQaRM&libraries=places`;
      script.onload = () => {
        if (callback) callback();
      };
      document.body.appendChild(script);
    } else {
      if (callback) callback();
    }
  };

  initializeMap = () => {
    const { longval, latval } = this.state;
    const curpoint = new window.google.maps.LatLng(latval, longval);

    const mapOptions = {
      center: curpoint,
      zoom: 10,
      mapTypeId: 'roadmap'
    };

    this.map = new window.google.maps.Map(this.mapRef.current, mapOptions);

    this.marker = new window.google.maps.Marker({
      map: this.map,
      position: curpoint
    });

    this.infoWindow = new window.google.maps.InfoWindow();

    this.map.addListener('click', this.handleMapClick);
    this.marker.addListener('click', this.handleMarkerClick);

    this.updateInfoWindow();
  };

  handleMapClick = (event) => {
    const longval = event.latLng.lng().toFixed(6);
    const latval = event.latLng.lat().toFixed(6);

    this.setState({ longval, latval }, () => this.updateMapMarker());
  };

  handleMarkerClick = () => {
    this.updateInfoWindow();
    this.infoWindow.open(this.map, this.marker);
  };

  updateMapMarker = () => {
    const { longval, latval } = this.state;
    const curpoint = new window.google.maps.LatLng(latval, longval);

    this.marker.setPosition(curpoint);
    this.map.setCenter(curpoint);

    this.updateInfoWindow();
  };

  updateInfoWindow = () => {
    const { longval, latval } = this.state;
    const content = `Longitude: ${longval}<br>Latitude: ${latval}`;
    this.infoWindow.setContent(content);
  };

  handleJumpToLocation = () => {
    this.updateMapMarker();
  };

  render() {
    return (
    <>
    <div className="sm:flex sm:space-x-5 sm:space-y-0 space-y-4">

            <Input
            name="latitude"
            size="10"
            placeholder="Longitude"
            label="Longitude"
            type="text"
            value={this.state.longval}
              onChange={(e) => this.setState({ longval: e.target.value })}
            />
            
            <Input
            name="longitude"
            placeholder="Latitude"
            label="Latitude"
              size="10"
              type="text"
              value={this.state.latval}
              onChange={(e) => this.setState({ latval: e.target.value })}
              />
              </div>
            <div className="flex justify-center">
            <Button  onClick={this.handleJumpToLocation}>Jump back </Button>
            </div>
          <div  
           style={{
            backgroundColor: "#E0E0E0",
            width: "100%",  // Set width to 100% to make it responsive
            paddingTop: "56.25%", // Set a fixed aspect ratio (16:9), adjust as needed
            position: "relative",
          }} 
          ref={this.mapRef}>
            
          </div>
    </>
     
    );
  }
}

export default LocationPicker;
