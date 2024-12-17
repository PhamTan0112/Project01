import axios from 'axios';
import { checkIfTokenExpired } from '../helpers';
import { isAuthenticated } from './Auth';

export const getAvailableFlightesOfOwner = () =>{
    // checkIfTokenExpired(isAuthenticated().token);
    return axios.get('/flight/owner-flight-available');
} 
export const getAllAvailableFlightes = () => axios.get('/flight/all-flight-available');

export const getUnavailableFlightesOfOwner = () => axios.get('/flight/owner-flight-unavailable');
export const getAllUnavailableFlightes = () => axios.get('/flight/all-flight-unavailable');

export const addNewFlight = body => axios.post('/flight', body);

export const getFlightBySlug = slug => axios.get('/flight/' + slug);

export const removeFlight = slug => axios.delete('/flight/' + slug);

export const updateFlight = (slug, body) => axios.put('/flight/' + slug, body);

// axios.post('/flight', body, { onUploadProgress: progressEvent => console.log(progressEvent.loaded) });
