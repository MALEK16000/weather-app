import {Form} from "react-bootstrap";
import { Button } from "react-bootstrap";
import styles from './SearchBar.module.scss';
import { Autocomplete, Switch, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setData } from "../../features/weather/WeatherSlice";
import { resetData } from "../../features/weather/WeatherSlice";

export const SearchBar = () => {

    const GEO_API_KEY = process.env.REACT_APP_GEO_API_KEY;
    const WEATHER_API_KEY = "81d22e7ef72a5cc4938f8361047a6da0";
    const dispatch = useDispatch()
    const [cities, setCities] = useState([])
    const [unity, setUnity] = useState('metric')

    const handleInputChange = (e) => {
        const {value} = e.currentTarget
        fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&format=json&apiKey=${GEO_API_KEY}`)
            .then(response => response.json())
            .then(json => setCities(json.results.map(data => {
                const {lat, lon, city, country, formatted} = data
                return {lat, lon, city, country, formatted}
            })));
    }

    const handleAutocompleteSelect = (e,value) => {
        if(value != null) {
            const {lon, lat} = value
                console.log(WEATHER_API_KEY)
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&units=${unity}&lon=${lon}&appid=${WEATHER_API_KEY}`)
            .then(response => response.json())
            .then(json => {
                const {clouds, main, name, sys, weather, wind} = json
                dispatch(setData({clouds, main, name, sys, weather, wind}))
            });
        }
        else {
            dispatch(resetData())
        }
        
    }

    return (
        <>
        <Form >
        <Switch />
            <Form.Group className= {styles.searchContainer}>
                <Autocomplete className={styles.searchInput}
                 clearOnBlur={false}
                 onChange={handleAutocompleteSelect}
                 getOptionLabel={(option) => option.formatted}
                 renderInput={(params) => 
                 <TextField onChange={handleInputChange} {...params} label={'Enter your city ...'} />} options={cities} />
                
            </Form.Group>
        </Form>
        </>
    )
}