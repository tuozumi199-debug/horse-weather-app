import { fmt1, fmt0, formatHourWithDate } from '../utils/formatWeather';

interface TooltipPayloadItem {
  payload: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    precipitation: number;
    precipitation_probability: number;
    wind_speed_10m: number;
    relative_humidity_2m: number;
  };
}

interface Props {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

export default function WeatherTooltip({ active, payload }: Props) {
  if (!active || !payload || payload.length === 0) return null;
  const d = payload[0].payload;

  return (
    <div className="weather-tooltip">
      <div className="tt-time">{formatHourWithDate(d.time)}</div>
      <div className="tt-row"><span className="tt-label">気温</span><span className="tt-val">{fmt1(d.temperature_2m)} ℃</span></div>
      <div className="tt-row"><span className="tt-label">体感</span><span className="tt-val">{fmt1(d.apparent_temperature)} ℃</span></div>
      <div className="tt-row"><span className="tt-label">降水量</span><span className="tt-val">{fmt1(d.precipitation)} mm/h</span></div>
      <div className="tt-row"><span className="tt-label">降水確率</span><span className="tt-val">{fmt0(d.precipitation_probability)} %</span></div>
      <div className="tt-row"><span className="tt-label">風速</span><span className="tt-val">{fmt1(d.wind_speed_10m)} m/s</span></div>
      <div className="tt-row"><span className="tt-label">湿度</span><span className="tt-val">{fmt0(d.relative_humidity_2m)} %</span></div>
    </div>
  );
}
