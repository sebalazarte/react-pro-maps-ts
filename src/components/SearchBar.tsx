import { ChangeEvent, useContext } from 'react'
import { PlacesContext } from '../context';
import { SearchResults } from './SearchResults';

export const SearchBar = () => {

    const { searchPlacesByTerm } = useContext(PlacesContext)

    const handlerChange = (event: ChangeEvent<HTMLInputElement>) => {
        
        setTimeout(() => {
            const data = searchPlacesByTerm(event.target.value)
                .then(data => console.log(data)
            );
        }, 1000);
    }

    return (
        <div className='search-container'>
            <input type='text'
                className='form-control'
                placeholder='Encuentra un lugar'
                onChange={handlerChange}
            />

            <SearchResults/>

        </div>
    )
}


