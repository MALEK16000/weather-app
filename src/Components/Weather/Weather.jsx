import { Card } from 'react-bootstrap';
import styles from './Weather.module.scss';
import DefaultWeather from '../Svgs/DefaultWeather';
import Thermometer from '../Svgs/Thermometer';
import Time from '../Svgs/Time';
import PositionSvg from '../Svgs/PositionSvg';
import Wind from '../Svgs/Wind';
import Rainy from '../Svgs/Rainy';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import { Switch } from '@mui/material';
import { SvgHoc } from '../Svgs/SvgHoc';

export const Weather = () => {

    const weather = useSelector(({weather}) => weather)
    console.log(weather)

    return (
        <>
        
        <Card className={` ${styles.container}`}>
            {weather.isLoaded ?
            <Card.Body>
                <Card.Title>
                    {weather.name} ,  {weather.sys.country} <PositionSvg color={'rgba(255,255,255,0.7)'}/>
                    <div className={styles.date}>
                            <div> 
                            <Moment format='dddd D MMMM YYYY , hh:mm' ></Moment>
                            </div>
                            <div> <Time width={'15px'} height={'15px'}/> </div>
                    </div>
                </Card.Title>
                <Card.Text as={'div'} className={` ${styles.weather_infos}`}>
                    <div>
                        <img src={`https://openweathermap.org/img/wn/${weather.weather.icon}@2x.png`}alt="" />
                    </div>
                        <div className={styles.temperature}>
                            <div>{weather.main.feels_like}° C</div>
                            <div><Thermometer /></div>
                        </div>
                        <div>
                            Good Morning {weather.name}
                            <div className={styles.separator}></div>
                        </div>
                        <div className={styles.infos}>
                            <div className={styles.border_right}>
                                <div><DefaultWeather color={'#fff'}/></div>
                                <div>Sunrise</div>
                                <div>
                                    <Moment unix={true} format={'hh:mm'}>
                                    {weather.sys.sunrise}
                                    </Moment>
                                </div>
                            </div>
                            <div className={styles.border_right}> 
                                <div><Wind/></div>
                                <div>Wind</div>
                                <div>{weather.wind.speed}</div>
                            </div>
                            <div className={styles.border_right}> 
                                <div>SVG</div>
                                <div>Speedometer</div>
                                <div>...</div>
                            </div>
                            <div className={styles.border_right}> 
                                <div>SVG</div>
                                <div>Humidity</div>
                                <div>...</div>
                            </div>
                            <div >
                                <div><Thermometer color={'#fff'} width={'25px'} height={'25px'}/></div>
                                <div>Temp</div>
                                <div>{weather.main.temp_max}</div>
                            </div>
                        </div>
                    
                </Card.Text>
            </Card.Body>: 
            <Card.Body>
                <Card.Title>Please choose your city</Card.Title>
            </Card.Body>
            }
        </Card>
        </>
    )
}