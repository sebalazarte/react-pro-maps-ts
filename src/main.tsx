import React from 'react'
import ReactDOM from 'react-dom/client'
import { MapsApp } from './MapsApp'

if(!navigator.geolocation){
  alert('Debe habilitar la geolocalizacion');
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
)
