type OptionalityGaugeProps = {
  value: number
}

export function OptionalityGauge({ value }: OptionalityGaugeProps) {
  const bounded = Math.max(-0.2, Math.min(0.2, value))
  const normalized = ((bounded + 0.2) / 0.4) * 100
  return (
    <div className="gauge-card">
      <h3>Optionality Change</h3>
      <div className="gauge-track">
        <div className="gauge-fill" style={{ width: `${normalized}%` }} />
      </div>
      <p>{value.toFixed(3)}</p>
    </div>
  )
}
