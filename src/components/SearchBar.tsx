import { ChangeEvent, useContext, useRef } from 'react'
import { PlacesContext } from '../context';

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
        </div>
    )
}
function useState(arg0: string): [any, any] {
    throw new Error('Function not implemented.');
}

