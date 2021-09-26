# Google map integration for React

## !!! Make sure to enter your Google map API key in apiKey.js file, and also activate the places service when generating a API key.

<br />

## Getting started

> Run in local machine

Clone this repo into your machine and run

```js
  npm install && npm run start
```

> Run in Codesandbox

## Link to Codesandbox [Google-Map-React](https://codesandbox.io/s/google-map-react-with-address-qnyov)

<br />

> Packages used

- [google-map-react](https://www.npmjs.com/package/google-map-react)
  - To show a map, and to get lat, lng of location
- [react-geocode](https://www.npmjs.com/package/react-geocode)
  - To get readable address from lat, lng of location
- [react-google-autocomplete](https://www.npmjs.com/package/react-google-autocomplete)
  - Used to set searchbar, to autocomplete location details

## Features

### Current location from browser

- At initial load we will get current location from browser using geolocation API. ( Only If we allow the location permission )

### Get address details as we drag

- Based on center position of map we will get a readable address details on bottom of map.

### Search for places in searchbar

- In top searchbar search for places, if you choose one location then map will move to that location, and we will get that places address.

### Custom Current location button

- There is a custom current location button to move back to your current location

<br />

### This can be useful to someone who is getting started with google map integration on react

<br />

## If you find any issue or have suggestion make a pull request 😉
