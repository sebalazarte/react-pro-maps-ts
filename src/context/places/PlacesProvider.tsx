import { useEffect, useReducer } from "react";
import { searchApi } from "../../apis";
import { getUserLocation } from "../../helpers";
import { Feature, PlacesResponse } from "../../interfaces/places";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";

export interface PlacesState {
    isLoading: boolean;
    userLocation?: [number, number];
    isLoadingPlaces: boolean;
    places?: Feature[];
}

const initialState: PlacesState = {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: true,
    places: undefined
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

        dispatch({type: 'setLoadingPlaces'});

        const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
            params: {
                proximity: state.userLocation.join(',')
            }
        });

        dispatch({type: 'setPlaces', payload: resp.data.features});

        return resp.data.features;
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
