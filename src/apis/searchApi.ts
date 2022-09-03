import axios from 'axios';

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        language: 'es',
        access_token: 'pk.eyJ1Ijoic2xhemFydGUiLCJhIjoiY2tvaW1kMHp2MDFxNTJ2cHBsb2tya3RpcCJ9.pbvFeBfsvgwJXbLy3yObRQ'
    }
});

export default searchApi;