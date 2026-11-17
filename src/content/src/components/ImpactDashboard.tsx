import { impactMetrics } from '../content';

/**
 * Shows only verified figures. Until a metric has a value AND verified: true in
 * src/content/impact.json, it displays a clearly labelled "tracking begins" state.
 */
export function ImpactDashboard({ light }: { light?: boolean }) {
  const anyVerified = impactMetrics.some((m) => m.verified && m.value);
  return (
    <div className={light ? 'light' : ''}>
      <div className="impact-grid" role="list">
        {impactMetrics.map((m) => {
          const show = m.verified && m.value;
          return (
            <div className="impact-cell" role="listitem" key={m.key}>
              {show
                ? <div className="impact-value">{m.value}</div>
                : <div className="impact-value pending">Not yet published</div>}
              <div className="impact-label">{m.label}</div>
              <div className="impact-desc">{m.description}</div>
              {show && m.asOf && <div className="impact-desc">As of {m.asOf}</div>}
            </div>
          );
        })}
      </div>
      <p className="notice">
        {anyVerified
          ? 'Figures are verified internally before they are published and updated as programs grow.'
          : 'We’re a new company, so we haven’t published any impact figures yet. We will only report numbers we’ve verified, starting with our first projects and training cohorts.'}
      </p>
    </div>
  );
}
