import { Map, Marker } from "mapbox-gl";
import { MapState } from "./MapProvider";

type MapActions =
    | { type: 'setMap', payload: Map }
    | { type: 'setMarkers', payload: Marker[] }
    | { type: 'setInfoRoute', payload: { distance: number, duration: number } }

export const mapReducer = (state: MapState, action: MapActions): MapState => {
    switch (action.type) {
        case 'setMap':
            return {
                ...state,
                isMapReady: true,
                map: action.payload
            }
        case 'setMarkers':
            return {
                ...state,
                markers: action.payload
            }
        case 'setInfoRoute':
            return {
                ...state,
                distance: action.payload.distance,
                duration: action.payload.duration
            }
        default:
            return state;
    }
} 