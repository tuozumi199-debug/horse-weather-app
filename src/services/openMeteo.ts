import { HourlyWeather } from '../types/weather';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

interface OpenMeteoResponse {
  hourly: {
    time: string[];
    temperature_2m: number[];
    apparent_temperature: number[];
    precipitation: number[];
    precipitation_probability: number[];
    wind_speed_10m: number[];
    relative_humidity_2m: number[];
  };
}

export async function fetchWeather(
  latitude: number,
  longitude: number,
  startDate: string,
  endDate: string
): Promise<HourlyWeather[]> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    hourly: [
      'temperature_2m',
      'apparent_temperature',
      'precipitation',
      'precipitation_probability',
      'wind_speed_10m',
      'relative_humidity_2m',
    ].join(','),
    timezone: 'Asia/Tokyo',
    wind_speed_unit: 'ms',
    precipitation_unit: 'mm',
    start_date: startDate,
    end_date: endDate,
  });

  const res = await fetch(`${BASE_URL}?${params}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data: OpenMeteoResponse = await res.json();

  return data.hourly.time.map((t, i) => ({
    time: t,
    temperature_2m: data.hourly.temperature_2m[i],
    apparent_temperature: data.hourly.apparent_temperature[i],
    precipitation: data.hourly.precipitation[i],
    precipitation_probability: data.hourly.precipitation_probability[i],
    wind_speed_10m: data.hourly.wind_speed_10m[i],
    relative_humidity_2m: data.hourly.relative_humidity_2m[i],
  }));
}
