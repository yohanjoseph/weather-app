/**
 * Define data model for weather data retrived through API
 */

export interface WeatherByCity {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
  weather: Weather;
  daily: Daily[];
}

export interface Coord {
  lat: number;
  lon: number;
}
export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
  temp: string;
  windspeed: string;
  pressure: number;
  iconPath: string;
}
export interface Daily {
  day: string;
  date: number;
  weather: Weather;
}
