import { AnySourceData, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl';
import { useContext, useEffect, useReducer } from 'react';
import { directionApi } from '../../apis';
import { DirectionsResponse } from '../../interfaces/directions';
import { PlacesContext, MapContext } from '../';
import { mapReducer } from './mapReducer';

interface Props {
    children: JSX.Element | JSX.Element[]
}

export interface MapState {
    isMapReady: boolean;
    map?: Map,
    markers: Marker[];
    distance?: number;
    duration?: number;
}

const initialState: MapState = {
    isMapReady: false,
    map: undefined,
    markers: []
}

export const MapProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(mapReducer, initialState);
    const { places } = useContext(PlacesContext);

    useEffect(() => {
        state.markers.forEach(marker => marker.remove());
        const newMarkers: Marker[] = [];
        if (!places) return;
        for (const place of places) {
            const [lng, lat] = place.center;
            const popup = new Popup()
                .setHTML(`
                        <h4>${place.text_es}</h4>
                        <p>${place.place_name_es}</p>
                `);
            const newMarker = new Marker({
                color: 'red'
            })
                .setLngLat([lng, lat])
                .setPopup(popup)
                .addTo(state.map!);
            newMarkers.push(newMarker);

            dispatch({ type: 'setMarkers', payload: newMarkers });
        }
    }, [places])


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

        dispatch({ type: 'setMap', payload: map });
    }

    const getRouteBetweenPoints = async (start: [number, number], end: [number, number]) => {
        const resp = await directionApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`);
        const { distance, duration, geometry } = resp.data.routes[0];
        const { coordinates: cords } = geometry;

        let kms = distance / 1000;
        kms = Math.round(kms * 100);
        kms /= 100;
        const minutes = Math.floor(duration * 60);

        dispatch({ type: 'setInfoRoute', payload: { distance: kms, duration: minutes } });

        const bounds = new LngLatBounds(start, start);

        for (const cord of cords) {
            const newCord: [number, number] = [cord[0], cord[1]];
            bounds.extend(newCord);
        }

        state.map?.fitBounds(bounds, {
            padding: 200
        });

        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: cords
                        }
                    }
                ]
            }
        };
        
        if ( state.map?.getLayer('RouteString') ) {
            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString');
        }

        state.map?.addSource('RouteString', sourceData);

        state.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint: {
                'line-color': 'black',
                'line-width': 3
            }
        })

    }

    return (
        <MapContext.Provider value={{
            ...state,
            setMap,
            getRouteBetweenPoints
        }}>
            {children}
        </MapContext.Provider>
    )
}
