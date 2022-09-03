import { useEffect, useReducer } from "react";
import { searchApi } from "../../apis";
import { getUserLocation } from "../../helpers";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";

export interface PlacesState {
    isLoading: boolean;
    userLocation?: [number, number]
}

const initialState: PlacesState = {
    isLoading: true,
    userLocation: undefined
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const PlacesProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(placesReducer, initialState);

    useEffect(() => {
        getUserLocation().then(logLat => dispatch({ type: 'setUserLocation', payload: logLat }));
    }, [])

    const searchPlacesByTerm = async(query: string) => {
        if(query.length === 0) return [];
        if(!state.userLocation) throw new Error('No existe ubicacion del usuario');

        const resp = await searchApi.get(`/${query}.json`, {
            params: {
                proximity: state.userLocation.join(',')
            }
        });

        return resp.data;
    }

    return (
        <PlacesContext.Provider value={{
            ...state,
            searchPlacesByTerm
        }}>
            {children}
        </PlacesContext.Provider>
    )
}
