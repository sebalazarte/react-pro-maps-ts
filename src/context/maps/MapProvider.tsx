import { Map, Marker, Popup } from 'mapbox-gl';
import { useReducer } from 'react';
import { MapContext } from './MapContext'
import { mapReducer } from './mapReducer';

interface Props {
    children: JSX.Element | JSX.Element[]
}

export interface MapState {
    isMapReady: boolean;
    map?: Map
}

const initialState: MapState = {
    isMapReady: false,
    map: undefined
}

export const MapProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(mapReducer, initialState);

    const setMap = (map: Map) => {

        const myLocationPopup = new Popup()
        .setHTML(`
            <h4>Estoy aqui</h4>
            <p>En algun lugar del mundo</p>
        `)
        new Marker({
            color: 'red'
        })
            .setLngLat(map.getCenter())
            .setPopup(myLocationPopup)
            .addTo(map);

        dispatch({type: 'setMap', payload: map});
    }

    return (
        <MapContext.Provider value={{
            ...state,
            setMap
        }}>
            {children}
        </MapContext.Provider>
    )
}
