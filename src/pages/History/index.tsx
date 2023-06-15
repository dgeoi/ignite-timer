import { formatDistanceToNow } from 'date-fns'
import { useCycle } from '../../contexts/hooks/useCycle'
import { HistoryContainer, HistoryContent, Status } from './styles'

export function History() {
  const { cycles } = useCycle()

  return (
    <HistoryContainer>
      <h1>My history</h1>

      <HistoryContent>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Completed at</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.taskDescription}</td>
                  <td>{cycle.taskDuration} minutes</td>
                  <td>
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true,
                    })}
                  </td>
                  <td>
                    {cycle.finishedDate && (
                      <Status currentStatus="completed">
                        <span />
                        <span>Completed</span>
                      </Status>
                    )}
                    {cycle.interruptedDate && (
                      <Status currentStatus="interrupted">
                        <span />
                        <span>Interrupted</span>
                      </Status>
                    )}
                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <Status currentStatus="running">
                        <span />
                        <span>Ongoing</span>
                      </Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryContent>
    </HistoryContainer>
  )
}
