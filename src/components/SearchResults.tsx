import { useContext } from 'react'
import { PlacesContext } from '../context'
import { LoadingPlaces } from './LoadingPlaces';

export const SearchResults = () => {

    const { isLoadingPlaces, places } = useContext(PlacesContext);

    if(isLoadingPlaces){
        return (
            <LoadingPlaces/>
        )
    }

    if(places?.length === 0){
        return (<></>);
    }

    return (
        <ul className="list-group mt-3">
            {
                places?.map(({id, place_name, text_es}) => (
                    <li
                        key={id}
                        className='list-group-item list-group-item-action'
                    >
                        <h6>{text_es}</h6>
                        <p
                            className='text-muted'
                            style={{
                                fontSize: '12px'
                            }}
                        >
                            {place_name}
                        </p>
                        <button className='btn btn-outline-primary btn-sm'>
                            Direcciones
                        </button>
                    </li>
                ))
            }

        </ul>
    )
}
