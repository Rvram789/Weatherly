import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({});
    const [values, setValues] = useState([]);
    const [place, setPlace] = useState('Mumbai');
    const [thisLocation, setLocation] = useState('');

    const fetchWeather = async () => {
        const options = {
            method: 'GET',
            url: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/',
            params: {
                unitGroup: 'metric',
                key: import.meta.env.VITE_API_KEY,
                contentType: 'json',
                location: place,
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            setLocation(response.data.resolvedAddress);
            setValues(response.data.days);
            setWeather(response.data.days[0]);
            console.log(response);
        } catch (e) {
            console.error(e);
            alert('This place does not exist or there was an error with the API.');
        }
    };

    useEffect(() => {
        fetchWeather();
    }, [place]);

    useEffect(() => {
        console.log(values);
    }, [values]);

    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            thisLocation,
            place
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
