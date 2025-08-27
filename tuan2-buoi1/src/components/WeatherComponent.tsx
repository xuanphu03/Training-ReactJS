import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Ban } from 'lucide-react';

interface WeatherData {
  weather?: string;
  temperature?: number;
  tempMin?: number;
  tempMax?: number;
  humidity?: number;
  timestamp?: number;
  location?: string;
  country?: string;
  icon?: string;
  cod: number;
  message?: string;
}

export default function WeatherComponent() {
  const [isData, setIsData] = useState<WeatherData | null>(null);
  const [isCity, setIsCity] = useState('Hanoi1');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_KEY_API;
    const ICON_URL = 'https://openweathermap.org/img/wn';

    const weatherFetchData = async () => {
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${isCity}&appid=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log('data raw', data);
          if (data.cod === 200) {
            const weatherData: WeatherData = {
              weather: data.weather[0].description,
              temperature: Math.round(data.main.temp - 273.15),
              tempMin: Math.round(data.main.temp_min - 273.15),
              tempMax: Math.round(data.main.temp_max - 273.15),
              humidity: data.main.humidity,
              timestamp: data.dt,
              location: data.name,
              country: data.sys.country,
              icon: `${ICON_URL}/${data.weather[0].icon}.png`,
              cod: data.cod,
            };
            setIsData(weatherData);
            return weatherData;
          }
          setIsData({ cod: data.cod, message: data.message });
        })
        .catch((err) => console.log('Error fetching weather data:', err));
    };

    weatherFetchData();
  }, [isCity]);

  console.log('isData', isData);
  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="flex flex-col items-center justify-center">
          {isData && isData.cod === 200 ? (
            <>
              <h2 className="font-bold text-2xl mb-4">
                {isData.location}, {isData.country}
              </h2>
              <img src={isData.icon} alt="Weather Icon" />
              <p>Description: {isData.weather}</p>
              <p>Temperature: {isData.temperature}°C</p>
              <p>Min Temperature: {isData.tempMin}°C</p>
              <p>Max Temperature: {isData.tempMax}°C</p>
              <p>Humidity: {isData.humidity}%</p>
              <p>
                Timestamp:{' '}
                {isData.timestamp !== undefined
                  ? new Date(isData.timestamp * 1000).toLocaleString()
                  : 'N/A'}
              </p>
            </>
          ) : (
              <div className="flex flex-col items-center text-center text-red-500">
                <Ban />
              <p className="uppercase font-medium">{isData?.message || 'Loading...'}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setIsCity(inputRef.current?.value || '');
            }}
          >
            <Input placeholder="Search for a city..." ref={inputRef} />
            <Button type="submit">Search</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
