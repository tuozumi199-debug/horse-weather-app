import { useState, useEffect, useCallback } from 'react';
import venues from './data/venues.json';
import { Venue, TimeRange } from './types/weather';
import { HourlyWeather } from './types/weather';
import { fetchWeather } from './services/openMeteo';
import { getTimeRange, formatDate, formatDateDisplay, formatDateTimeDisplay, formatDateHour } from './utils/dateRange';
import VenueSelector from './components/VenueSelector';
import TimeRangeSelector from './components/TimeRangeSelector';
import WeatherCharts from './components/WeatherCharts';
import HourlyTable from './components/HourlyTable';

const venueList = venues as Venue[];

function getNowSlot(): string {
  const now = new Date();
  const y = now.getFullYear();
  const mo = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const h = String(now.getHours()).padStart(2, '0');
  return `${y}-${mo}-${d}T${h}:00`;
}

export default function App() {
  const [selectedVenueId, setSelectedVenueId] = useState(venueList[0].id);
  const [timeRange, setTimeRange] = useState<TimeRange>(() => getTimeRange('today_tomorrow'));
  const [weatherData, setWeatherData] = useState<HourlyWeather[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedAt, setFetchedAt] = useState<Date | null>(null);
  const [now, setNow] = useState(new Date());

  const venue = venueList.find((v) => v.id === selectedVenueId)!;

  // Update current time every minute
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const start = formatDate(timeRange.start);
      const end = formatDate(timeRange.end);
      const all = await fetchWeather(venue.latitude, venue.longitude, start, end);

      // Filter to the exact local time window.
      // Open-Meteo returns Asia/Tokyo strings such as "2026-05-06T14:00".
      // Do not use Date.toISOString() here because it converts the time to UTC
      // and shifts the intended JST window by 9 hours.
      const startIso = formatDateHour(timeRange.start);
      const endIso = formatDateHour(timeRange.end);

      const filtered = all.filter((d) => d.time >= startIso && d.time <= endIso);
      setWeatherData(filtered.length > 0 ? filtered : all);
      setFetchedAt(new Date());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'データ取得エラー');
    } finally {
      setLoading(false);
    }
  }, [venue, timeRange]);

  useEffect(() => {
    load();
  }, [load]);

  // Determine if current time is in range
  const nowSlot = getNowSlot();
  const nowInRange =
    weatherData.length > 0 &&
    nowSlot >= weatherData[0].time &&
    nowSlot <= weatherData[weatherData.length - 1].time;
  const nowTime = nowInRange ? nowSlot : null;

  const periodLabel = `${formatDateDisplay(timeRange.start)} ${String(timeRange.start.getHours()).padStart(2,'0')}:00 〜 ${formatDateDisplay(timeRange.end)} ${String(timeRange.end.getHours()).padStart(2,'0')}:00`;

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="app-logo">
            <span className="logo-icon">🐴</span>
            <div>
              <h1 className="app-title">馬場天気</h1>
              <p className="app-subtitle">乗馬競技場 時間別天気予報</p>
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        {/* Controls */}
        <section className="controls-section">
          <VenueSelector
            venues={venueList}
            selectedId={selectedVenueId}
            onChange={setSelectedVenueId}
          />
          <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
        </section>

        {/* Status */}
        <section className="status-section">
          <div className="status-grid">
            <div className="status-item">
              <span className="status-label">競技場</span>
              <span className="status-value">{venue.fullName}（{venue.prefecture}）</span>
            </div>
            <div className="status-item">
              <span className="status-label">表示期間</span>
              <span className="status-value">{periodLabel}</span>
            </div>
            <div className="status-item">
              <span className="status-label">現在時刻</span>
              <span className="status-value">{formatDateTimeDisplay(now)}</span>
            </div>
            {fetchedAt && (
              <div className="status-item">
                <span className="status-label">取得時刻</span>
                <span className="status-value">{formatDateTimeDisplay(fetchedAt)}</span>
              </div>
            )}
          </div>
          <button className="reload-btn" onClick={load} disabled={loading}>
            {loading ? '取得中…' : '🔄 更新'}
          </button>
        </section>

        {/* Error */}
        {error && (
          <div className="error-banner">
            ⚠️ {error}
          </div>
        )}

        {/* Charts & Table */}
        {loading && weatherData.length === 0 ? (
          <div className="loading-state">
            <div className="loading-spinner" />
            <p>天気データを取得中…</p>
          </div>
        ) : weatherData.length > 0 ? (
          <>
            <section className="charts-section">
              <WeatherCharts data={weatherData} nowTime={nowTime} />
            </section>
            <section className="table-section">
              <div className="section-title">毎時データ</div>
              <HourlyTable data={weatherData} nowTime={nowTime} />
            </section>
          </>
        ) : null}
      </main>
    </div>
  );
}
