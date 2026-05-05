import { HourlyWeather } from '../types/weather';
import { fmt1, fmt0, formatHour } from '../utils/formatWeather';

interface Props {
  data: HourlyWeather[];
  nowTime: string | null;
}

export default function HourlyTable({ data, nowTime }: Props) {
  return (
    <div className="table-wrapper">
      <table className="hourly-table">
        <thead>
          <tr>
            <th className="sticky-col">時刻</th>
            <th>気温<br /><span className="unit">℃</span></th>
            <th>体感<br /><span className="unit">℃</span></th>
            <th>降水量<br /><span className="unit">mm/h</span></th>
            <th>降水確率<br /><span className="unit">%</span></th>
            <th>風速<br /><span className="unit">m/s</span></th>
            <th>湿度<br /><span className="unit">%</span></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            const isNow = row.time === nowTime;
            return (
              <tr key={row.time} className={isNow ? 'now-row' : ''}>
                <td className="sticky-col time-cell">
                  {isNow && <span className="now-badge">NOW</span>}
                  {formatHour(row.time)}
                </td>
                <td className="num">{fmt1(row.temperature_2m)}</td>
                <td className="num">{fmt1(row.apparent_temperature)}</td>
                <td className={`num ${row.precipitation > 0 ? 'precip' : ''}`}>
                  {fmt1(row.precipitation)}
                </td>
                <td className={`num ${row.precipitation_probability >= 50 ? 'prob-high' : ''}`}>
                  {fmt0(row.precipitation_probability)}
                </td>
                <td className={`num ${row.wind_speed_10m >= 8 ? 'wind-strong' : ''}`}>
                  {fmt1(row.wind_speed_10m)}
                </td>
                <td className="num">{fmt0(row.relative_humidity_2m)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
