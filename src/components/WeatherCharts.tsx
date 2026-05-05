import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import { HourlyWeather } from '../types/weather';
import WeatherTooltip from './WeatherTooltip';
import { tickFormatter } from '../utils/formatWeather';

interface Props {
  data: HourlyWeather[];
  nowTime: string | null; // ISO string of current hour slot, or null
}

const COLORS = {
  temp: '#e05c2a',
  apparent: '#f5a623',
  precip: '#4a9eff',
  precipProb: '#1a5fb4',
  wind: '#2ca55d',
};

export default function WeatherCharts({ data, nowTime }: Props) {
  const xTickInterval = Math.max(1, Math.floor(data.length / 24));

  return (
    <div className="charts-container">
      {/* Chart 1: Temperature */}
      <div className="chart-block">
        <div className="chart-title">気温・体感温度</div>
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart data={data} margin={{ top: 5, right: 16, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis
              dataKey="time"
              tickFormatter={tickFormatter}
              interval={xTickInterval}
              tick={{ fontSize: 11, fill: '#9aa5b4' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
              tickLine={false}
            />
            <YAxis
              unit="℃"
              tick={{ fontSize: 11, fill: '#9aa5b4' }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip content={<WeatherTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 4 }}
              formatter={(v) => v === 'temperature_2m' ? '気温' : '体感温度'}
            />
            {nowTime && (
              <ReferenceLine x={nowTime} stroke="#ef4444" strokeWidth={2} strokeDasharray="4 2" />
            )}
            <Line
              type="monotone"
              dataKey="temperature_2m"
              name="temperature_2m"
              stroke={COLORS.temp}
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="apparent_temperature"
              name="apparent_temperature"
              stroke={COLORS.apparent}
              dot={false}
              strokeWidth={2}
              strokeDasharray="6 3"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 2: Precipitation */}
      <div className="chart-block">
        <div className="chart-title">降水量・降水確率</div>
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart data={data} margin={{ top: 5, right: 40, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis
              dataKey="time"
              tickFormatter={tickFormatter}
              interval={xTickInterval}
              tick={{ fontSize: 11, fill: '#9aa5b4' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              unit="mm"
              tick={{ fontSize: 11, fill: '#9aa5b4' }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              unit="%"
              domain={[0, 100]}
              tick={{ fontSize: 11, fill: '#9aa5b4' }}
              axisLine={false}
              tickLine={false}
              width={36}
            />
            <Tooltip content={<WeatherTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 4 }}
              formatter={(v) => v === 'precipitation' ? '降水量' : '降水確率'}
            />
            {nowTime && (
              <ReferenceLine yAxisId="left" x={nowTime} stroke="#ef4444" strokeWidth={2} strokeDasharray="4 2" />
            )}
            <Bar
              yAxisId="left"
              dataKey="precipitation"
              name="precipitation"
              fill={COLORS.precip}
              opacity={0.75}
              maxBarSize={12}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="precipitation_probability"
              name="precipitation_probability"
              stroke={COLORS.precipProb}
              dot={false}
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 3: Wind */}
      <div className="chart-block">
        <div className="chart-title">平均風速</div>
        <ResponsiveContainer width="100%" height={180}>
          <ComposedChart data={data} margin={{ top: 5, right: 16, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis
              dataKey="time"
              tickFormatter={tickFormatter}
              interval={xTickInterval}
              tick={{ fontSize: 11, fill: '#9aa5b4' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
              tickLine={false}
            />
            <YAxis
              unit="m/s"
              tick={{ fontSize: 11, fill: '#9aa5b4' }}
              axisLine={false}
              tickLine={false}
              width={44}
            />
            <Tooltip content={<WeatherTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 4 }}
              formatter={() => '平均風速'}
            />
            {nowTime && (
              <ReferenceLine x={nowTime} stroke="#ef4444" strokeWidth={2} strokeDasharray="4 2" />
            )}
            <Line
              type="monotone"
              dataKey="wind_speed_10m"
              name="wind_speed_10m"
              stroke={COLORS.wind}
              dot={false}
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
