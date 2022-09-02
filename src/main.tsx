import React from 'react'
import ReactDOM from 'react-dom/client'
import { MapsApp } from './MapsApp'
import './style.css';
import 'mapbox-gl/dist/mapbox-gl.css'
import mapbox from 'mapbox-gl';

mapbox.accessToken = 'pk.eyJ1Ijoic2xhemFydGUiLCJhIjoiY2txMDNwMGp1MDEzeDJwczVjdWgweTk2YSJ9.UGJumYlWxXz4bvERV4-zxA';

if(!navigator.geolocation){
  alert('Debe habilitar la geolocalizacion');
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
)
