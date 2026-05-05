import { useState } from 'react';
import { DisplayMode, TimeRange } from '../types/weather';
import { getTimeRange, formatDate } from '../utils/dateRange';

interface Props {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
}

const MODES: { mode: DisplayMode; label: string }[] = [
  { mode: 'today_tomorrow', label: '今日＋明日' },
  { mode: 'night_to_tomorrow', label: '夜間〜翌日' },
  { mode: 'tomorrow_only', label: '明日だけ' },
  { mode: 'competition_range', label: '試合期間' },
  { mode: 'custom', label: 'カスタム' },
];

export default function TimeRangeSelector({ value, onChange }: Props) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [compStart, setCompStart] = useState(formatDate(today));
  const [compEnd, setCompEnd] = useState(formatDate(tomorrow));
  const [customStart, setCustomStart] = useState(formatDate(today) + 'T00:00');
  const [customEnd, setCustomEnd] = useState(formatDate(tomorrow) + 'T23:00');

  function select(mode: DisplayMode) {
    const range = getTimeRange(mode, {
      competitionStartDate: compStart,
      competitionEndDate: compEnd,
      customStart,
      customEnd,
    });
    onChange(range);
  }

  function applyCompetition() {
    onChange(getTimeRange('competition_range', { competitionStartDate: compStart, competitionEndDate: compEnd }));
  }

  function applyCustom() {
    onChange(getTimeRange('custom', { customStart, customEnd }));
  }

  return (
    <div className="time-range-selector">
      <label className="selector-label">表示範囲</label>
      <div className="mode-pills">
        {MODES.map(({ mode, label }) => (
          <button
            key={mode}
            className={`mode-pill${value.mode === mode ? ' active' : ''}`}
            onClick={() => select(mode)}
          >
            {label}
          </button>
        ))}
      </div>

      {value.mode === 'competition_range' && (
        <div className="date-inputs">
          <input
            type="date"
            value={compStart}
            onChange={(e) => setCompStart(e.target.value)}
          />
          <span className="date-sep">〜</span>
          <input
            type="date"
            value={compEnd}
            onChange={(e) => setCompEnd(e.target.value)}
          />
          <button className="apply-btn" onClick={applyCompetition}>適用</button>
        </div>
      )}

      {value.mode === 'custom' && (
        <div className="date-inputs">
          <input
            type="datetime-local"
            value={customStart}
            onChange={(e) => setCustomStart(e.target.value)}
          />
          <span className="date-sep">〜</span>
          <input
            type="datetime-local"
            value={customEnd}
            onChange={(e) => setCustomEnd(e.target.value)}
          />
          <button className="apply-btn" onClick={applyCustom}>適用</button>
        </div>
      )}
    </div>
  );
}
