import { Venue } from '../types/weather';

interface Props {
  venues: Venue[];
  selectedId: string;
  onChange: (id: string) => void;
}

export default function VenueSelector({ venues, selectedId, onChange }: Props) {
  return (
    <div className="venue-selector">
      <label className="selector-label">競技場</label>
      <div className="venue-pills">
        {venues.map((v) => (
          <button
            key={v.id}
            className={`venue-pill${v.id === selectedId ? ' active' : ''}`}
            onClick={() => onChange(v.id)}
            title={v.fullName}
          >
            <span className="venue-pref">{v.prefecture}</span>
            <span className="venue-name">{v.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
