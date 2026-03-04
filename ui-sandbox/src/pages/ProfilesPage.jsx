export function ProfilesPage({ profiles, selectedProfileId, setSelectedProfileId }) {
  return (
    <section>
      <h2>Regression Profiles</h2>
      <p>Select a committed regression profile and then run evaluator diagnostics.</p>
      <div className="card-grid">
        {profiles.map((profile) => (
          <article
            key={profile.profile_id}
            className={`card ${selectedProfileId === profile.profile_id ? 'selected' : ''}`}
          >
            <header className="card-header">
              <h3>{profile.profile_id}</h3>
              <button onClick={() => setSelectedProfileId(profile.profile_id)}>Use</button>
            </header>
            <p>{profile.description}</p>
            <ul>
              {Object.entries(profile.constraints).map(([name, values]) => (
                <li key={name}>
                  <strong>{name}:</strong> {values.current_level.toFixed(2)} / req{' '}
                  {values.required_level.toFixed(2)} ({values.trend})
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
