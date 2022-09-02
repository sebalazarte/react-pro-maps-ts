import { useEffect, useReducer } from "react";
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


    return (
        <PlacesContext.Provider value={{
            ...state
        }}>
            {children}
        </PlacesContext.Provider>
    )
}
