export default function Filters({ categories = [], active, onChange }) {
  return (
    <div className="filters">
      <div className="d-flex align-items-center gap-2 mb-2">
        <strong>Danh mục:</strong>
      </div>
      <div className="chip-row">
        <button
          type="button"
          className={`chip ${!active ? 'active' : ''}`}
          onClick={() => onChange(null)}
        >
          All
        </button>
        {categories.slice(0, 20).map(c => (
          <button
            type="button"
            key={c}
            className={`chip ${active === c ? 'active' : ''}`}
            onClick={() => onChange(c)}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
