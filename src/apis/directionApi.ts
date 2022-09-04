import axios from 'axios';

const directionApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: true,
        language: 'es',
        access_token: 'pk.eyJ1Ijoic2xhemFydGUiLCJhIjoiY2tvaW1kMHp2MDFxNTJ2cHBsb2tya3RpcCJ9.pbvFeBfsvgwJXbLy3yObRQ'
    }
});

export default directionApi;