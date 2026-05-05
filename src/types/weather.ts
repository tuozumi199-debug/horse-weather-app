export interface Venue {
  id: string;
  name: string;
  fullName: string;
  prefecture: string;
  latitude: number;
  longitude: number;
}

export interface HourlyWeather {
  time: string; // ISO string
  temperature_2m: number;
  apparent_temperature: number;
  precipitation: number;
  precipitation_probability: number;
  wind_speed_10m: number;
  relative_humidity_2m: number;
}

export type DisplayMode =
  | 'today_tomorrow'
  | 'night_to_tomorrow'
  | 'tomorrow_only'
  | 'competition_range'
  | 'custom';

export interface TimeRange {
  mode: DisplayMode;
  start: Date;
  end: Date;
  competitionStartDate?: string;
  competitionEndDate?: string;
  customStart?: string;
  customEnd?: string;
}
