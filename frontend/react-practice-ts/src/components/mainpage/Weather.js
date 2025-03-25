import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import axios from "axios";
import { useEffect, useState } from "react";
import weatherDescKo from "./weatherDescKo";
import styles from '../../styles/mainpage/Weather.module.css';
import windImg from "@/assets/images/icon/wind.png";
import feelTempImg from "@/assets/images/icon/feelTemp.png";
import { PacmanLoader } from "react-spinners";
const Weather = () => {
    const API_KEY = import.meta.env.VITE_WEATHER_KEY;
    const [isLoading, setIsLoading] = useState(true); // t 로딩, f 완료
    const [weather, setWeather] = useState({
        description: "",
        name: "",
        temp: 0,
        icon: "",
        windSpeed: 0,
        feelsTemp: 0
    });
    const [forecast, setForecast] = useState([]);
    const getCurrentLocation = () => {
        // navigator.geolocation.getCurrentPosition((position) => {
            console.log("GetCurrentLocation 실행");
            // let lat = position.coords.latitude;
            // let lon = position.coords.longitude;
            let lat = "37.5683"; // 서울 좌표
            let lon = "126.9778"; // 서울 좌표
            console.log("getWeather 호출")
            getWeather(lat, lon);
            console.log("getForecast 호출")
            getForecast(lat, lon);
        // });
    };
    const getForecast = async (lat, lon) => {
        console.log("getForecast 실행 lat: ", lat);
        await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`, {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        })
            .then((res) => {
                console.log("getForecast res: ", res);
                const list = res.data.list;
                // dt_txt 09시가 한국시간으로 18시 -> 9시간 시차  => 한국 시간 15시 = 06시
                let filteredList = list.filter(data => data.dt_txt.includes("06:00:00"));
                // 필요한 데이터만 매핑
                const data = filteredList.map(data => {
                    const timeStamp = new Date(data.dt * 1000);
                    const day = timeStamp.toString().split(" ")[0]; // 요일 추출
                    const time = timeStamp.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
                    const parts = time.split(".");
                    const month = parts[1].trim();
                    const day2 = parts[2].trim().split(" ")[0];
                    const date = `${month}/${day2}`; // 월/일 형식 추출
                    return {
                        day,
                        date,
                        maxTemp: Math.round(data.main.temp_max),
                        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                    };
                });
                setForecast(data);
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    };
    const getWeather = async (lat, lon) => {
        console.log("getWeather 실행 lat: ", lat);
        try {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
                , {
                    headers: {
                        'User-Agent': 'Mozilla/5.0'
                    }
                });
            console.log("getWeather res: ", res);
            const weatherId = res.data.weather[0].id;
            const weatherKo = weatherDescKo[weatherId]; // id 찾아서 매칭 후 description 한글 번역
            const weatherIcon = res.data.weather[0].icon;
            const weatherIconAdrs = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`; // 날씨 아이콘 
            const cityName = res.data.name; // 지역명 
            const windSpeed = res.data.wind.speed; // 풍속
            const temp = Math.round(res.data.main.temp); // 현재온도
            const feelsTemp = Math.round(res.data.main.feels_like * 10) / 10; // 체감온도
            setWeather({
                description: weatherKo,
                name: cityName,
                temp: temp,
                icon: weatherIconAdrs,
                windSpeed,
                feelsTemp
            });
        }
        catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        console.log("API KEY 확인: ", API_KEY);
        console.log("useEffect geolocation 실행");
        getCurrentLocation();
    }, []);
    return (_jsxs("div", {
        className: styles.widgetContainer, children: [_jsxs("div", { className: styles.header, children: [_jsx("span", { children: "\uB0A0\uC528" }), _jsx("span", { className: styles.location, children: weather.name })] }), isLoading ? (_jsx("div", {
            className: styles.loadingContainer, children: _jsx(PacmanLoader, {
                color: "#4A90E2", cssOverride: {
                    transform: "translate(-50%,-50%)",
                }
            })
        })) : (_jsxs("div", { className: styles.weatherContainer, children: [_jsxs("div", { className: styles.currentWeather, children: [_jsxs("div", { className: styles.simple, children: [_jsx("img", { src: weather.icon, className: styles.icon, alt: "weatherIcon" }), _jsxs("div", { className: styles.temperature, children: [weather.temp, "\u00B0"] })] }), _jsx("span", { className: styles.description, children: weather.description }), _jsxs("div", { className: styles.details, children: [_jsxs("div", { className: styles.windSection, children: [_jsx("img", { src: windImg, className: styles.windImg, alt: "wind-Img" }), _jsxs("span", { children: [weather.windSpeed, "m/s"] })] }), _jsxs("div", { className: styles.windSection, children: [_jsx("img", { src: feelTempImg, className: styles.windImg, alt: "feels-like-temp" }), _jsxs("span", { children: [weather.feelsTemp, "\u00B0"] })] })] })] }), _jsx("div", { className: styles.forecast, children: forecast.map((e, i) => (_jsxs("div", { className: styles.day, children: [_jsxs("div", { className: styles.datSection, children: [_jsx("div", { className: styles.forecastDay, children: e.day }), _jsx("div", { className: styles.forecastDate, children: e.date })] }), _jsx("div", { children: _jsx("img", { src: e.icon, className: styles.forecastIcon, alt: "weather-icon" }) }), _jsxs("div", { className: styles.max, children: [e.maxTemp, "\u00B0"] })] }, i))) })] }))]
    }));
};
export default Weather;
