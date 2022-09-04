import { Feature } from "../../interfaces/places";
import { PlacesState } from "./PlacesProvider";

type PlacesAction =
    | { type: 'setUserLocation', payload: [number, number] }
    | { type: 'setPlaces', payload: Feature[] }
    | { type: 'setLoadingPlaces' };

export const placesReducer = (state: PlacesState, action: PlacesAction): PlacesState => {

    switch (action.type) {
        case 'setUserLocation':
            return {
                ...state,
                isLoading: false,
                userLocation: action.payload
            }
            break;
        case 'setPlaces':
            return {
                ...state,
                isLoadingPlaces: false,
                places: action.payload
            }
            break;
        case 'setLoadingPlaces':
            return {
                ...state,
                isLoadingPlaces: true,
                places: []
            }
            break
        default:
            return state
    }
}