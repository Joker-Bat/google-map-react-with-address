import React, { useCallback, useEffect, useState } from "react";
import classes from "./GoogleMap.module.scss";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";
import AutoComplete from "react-google-autocomplete";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BiCurrentLocation } from "react-icons/bi";
import { getArea, getCity, getState } from "./model/helperFunctions";
import { GOOGLE_API_KEY } from "../../apiKey";

Geocode.setApiKey(GOOGLE_API_KEY);
Geocode.enableDebug();

// Marker to show at center
const Marker = () => {
  return (
    <div className={classes.Marker}>
      <FaMapMarkerAlt />
    </div>
  );
};

const GoogleMap = () => {
  const [mapCenter, setMapCenter] = useState({
    lat: 11.127123,
    lng: 78.656891,
  });
  const [currentAddress, setCurrentAddress] = useState({
    address: "",
    city: "",
    area: "",
    state: "",
  });

  // On change in map
  const handleChange = ({ center }) => {
    setMapCenter(center);
  };

  // When selected a place in searchbar
  const handlePlaceSelected = (place, inputRef) => {
    if (!place.geometry) {
      return;
    }
    // After the place is successfully selected from list then empty the inputfield
    inputRef.value = "";
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    setMapCenter({ lat, lng });
  };

  // When location access enabled
  function success(pos) {
    var crd = pos.coords;
    setMapCenter({ lat: crd.latitude, lng: crd.longitude });
  }

  // When location access denied
  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  // To get location from browser
  const getCurrentUserLocation = useCallback(() => {
    // We cant guarantee that all system can support geolocation so based on that query for that permission
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            //Here if user already allowed location permission then we can get location from geolocation API
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === "prompt") {
            // Here user will be prompted to allow or deny a location permission
            navigator.geolocation.getCurrentPosition(success, errors);
          } else if (result.state === "denied") {
            // Here user already denied a location permission so you need to instruct user to enable location permission, because if user at first time denied location permission then browser wont show the popup to enable location, so user need to manually enable location permission in browser settings
            alert("Location must be enabled");
          }
        });
    } else {
      alert("Sorry Not available!");
    }
  }, []);

  // At initial get location from browser
  useEffect(() => {
    getCurrentUserLocation();
  }, [getCurrentUserLocation]);

  // When the center changes then get address from that location
  useEffect(() => {
    Geocode.fromLatLng(mapCenter.lat, mapCenter.lng).then(response => {
      const address = response.results[0].formatted_address,
        addressArray = response.results[0].address_components,
        city = getCity(addressArray),
        area = getArea(addressArray),
        state = getState(addressArray);
      setCurrentAddress(prev => {
        return { ...prev, city, area, state, address };
      });
    });
    console.clear();
  }, [mapCenter]);

  return (
    <>
      <div className={classes.MapContainer}>
        <div className={classes.AutoCompleteContainer}>
          <AutoComplete
            apiKey={GOOGLE_API_KEY}
            onPlaceSelected={handlePlaceSelected}
            options={{ types: ["(regions)"] }}
            placeholder='Search for your places'
          />
        </div>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: GOOGLE_API_KEY,
            libraries: ["places"],
          }}
          center={mapCenter}
          defaultZoom={11}
          onChange={handleChange}
          yesIWantToUseGoogleMapApiInternals
          options={{ fullscreenControl: false }}
        />
        <Marker />
        <button
          className={classes.CurrentLocation}
          onClick={getCurrentUserLocation}
        >
          <BiCurrentLocation />
        </button>
      </div>
      {Object.keys(currentAddress).map((item, index) => (
        <p key={index}>{currentAddress[item]}</p>
      ))}
    </>
  );
};

export default GoogleMap;
