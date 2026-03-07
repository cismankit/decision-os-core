type ConstraintMeterProps = {
  label: string
  current: number
  required: number
  trend?: string
}

export function ConstraintMeter({ label, current, required, trend }: ConstraintMeterProps) {
  const percent = Math.max(0, Math.min(100, current * 100))
  const requiredPercent = Math.max(0, Math.min(100, required * 100))
  const ok = current >= required
  return (
    <div className="constraint-meter">
      <div className="constraint-head">
        <strong>{label}</strong>
        <span className={ok ? 'ok' : 'warn'}>
          {current.toFixed(2)} / {required.toFixed(2)}
        </span>
      </div>
      <div className="meter-track">
        <div className={`meter-fill ${ok ? 'ok' : 'warn'}`} style={{ width: `${percent}%` }} />
        <div className="meter-required" style={{ left: `${requiredPercent}%` }} />
      </div>
      <small>trend: {trend || 'stable'}</small>
    </div>
  )
}
