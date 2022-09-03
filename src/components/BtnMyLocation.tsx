import React, { useContext } from 'react'
import { MapContext, PlacesContext } from '../context'

export const BtnMyLocation = () => {

    const { isMapReady, map } = useContext(MapContext);
    const { isLoading, userLocation } = useContext(PlacesContext);

    const handlerClick = () => {
        if(!isMapReady) throw new Error('El mapa no esta listo');
        if(!userLocation) throw new Error('no hay ubicacion del usuario');

        map?.flyTo({
            zoom: 14,
            center: userLocation
        })
    }

    return (
        <button
            className='btn btn-primary'
            onClick={handlerClick}
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 999
            }}
        >
            Mi ubicacion
        </button>
    )
}
