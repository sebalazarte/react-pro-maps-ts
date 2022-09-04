import { useContext, useState } from 'react'
import { MapContext, PlacesContext } from '../context'
import { Feature } from '../interfaces/places';
import { LoadingPlaces } from './LoadingPlaces';

export const SearchResults = () => {

    const { isLoadingPlaces, places, userLocation } = useContext(PlacesContext);
    const { map, getRouteBetweenPoints } = useContext(MapContext);
    const [activeId, setActiveId] = useState('');

    const getRoute =  (place: Feature) => {
        if (!userLocation) return;
        const [lng, lat] = place.center;
        getRouteBetweenPoints(userLocation, [lng, lat]);
    }

    const handlerPlaceClick = (place: Feature) => {
        const [lng, lat] = place.center;
        map?.flyTo({
            zoom: 14,
            center: [lng, lat]
        });
        setActiveId(place.id);
    }

    if (isLoadingPlaces) {
        return (
            <LoadingPlaces />
        )
    }

    if (places?.length === 0) {
        return (<></>);
    }

    return (
        <ul className="list-group mt-3">
            {
                places?.map((place) => (
                    <li
                        key={place.id}
                        className={[place.id === activeId ? 'active' : '', 'list-group-item list-group-item-action pointer'].join(' ')}
                        onClick={() => handlerPlaceClick(place)}
                    >
                        <h6>{place.text_es}</h6>
                        <p
                            style={{
                                fontSize: '12px'
                            }}
                        >
                            {place.place_name_es}
                        </p>
                        <button
                            className={['btn btn-sm', place.id !== activeId ? 'btn-outline-primary' : 'btn-outline-light'].join(' ')}
                            onClick={() => getRoute(place)}
                        >
                            Direcciones
                        </button>
                    </li>
                ))
            }

        </ul>
    )
}
