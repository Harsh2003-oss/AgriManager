const axios = require('axios');
const farmModel = require('../models/Farm');

const getWeatherByFarm = async (req, res) => {
    try {
        const { farmId } = req.params;
        
        const farm = await farmModel.findById(farmId);
        if (!farm) {
            return res.status(404).json({ error: "Farm not found" });
        }
        
        let weatherData;
        if (farm.location.coordinates && farm.location.coordinates.length === 2) {
            const [lon, lat] = farm.location.coordinates;
            weatherData = await getWeatherByCoordinates(lat, lon);
        } else if (farm.location.address) {
            weatherData = await getWeatherByCity(farm.location.address);
        } else {
            return res.status(400).json({ error: "No location data available" });
        }
        
        return res.status(200).json({
            farm: {
                id: farm._id,
                name: farm.name,
                location: farm.location
            },
            weather: weatherData
        });
        
    } catch (error) {
        console.log('Weather API Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
};

const getWeatherByCoordinates = async (lat, lon) => {
    const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${lat},${lon}&aqi=yes`
    );
    return formatWeatherData(response.data);
};

const getWeatherByCity = async (city) => {
    const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}&aqi=yes`
    );
    return formatWeatherData(response.data);
};

const formatWeatherData = (data) => {
    return {
        location: {
            name: data.location.name,
            region: data.location.region,
            country: data.location.country,
            lat: data.location.lat,
            lon: data.location.lon
        },
        current: {
            temperature: data.current.temp_c,
            condition: data.current.condition.text,
            humidity: data.current.humidity,
            windSpeed: data.current.wind_kph,
            pressure: data.current.pressure_mb,
            feelsLike: data.current.feelslike_c,
            uvIndex: data.current.uv,
            visibility: data.current.vis_km,
            cloudCover: data.current.cloud
        }
    };
};

module.exports = { getWeatherByFarm };