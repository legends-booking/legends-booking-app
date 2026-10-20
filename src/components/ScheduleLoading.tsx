import { BlocksLoading } from './BlocksLoading'

export function ScheduleLoading() {
  return (
    <main className="landing page" aria-busy="true">
      <BlocksLoading count={3} />
    </main>
  )
}