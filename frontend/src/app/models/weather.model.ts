export interface WeatherCurrent {
  temperature: number;
  windspeed: number;
  weathercode: number;
  time: string;
}

export interface WeatherResponse {
  current_weather: WeatherCurrent;
  latitude: number;
  longitude: number;
  timezone: string;
}
