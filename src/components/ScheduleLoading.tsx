export function ScheduleLoading() {
    return (
      <main className="landing page" aria-busy="true" aria-label="Loading">
        <div className="placeholder placeholder-heading" />
        {[0, 1].map((i) => (
          <section key={i} className="schedule-day">
            <div className="placeholder placeholder-card" />
            <div className="placeholder placeholder-card" />
            <div className="placeholder placeholder-card" />
          </section>
        ))}
      </main>
    )
  }