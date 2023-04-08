import { HistoryContainer, HistoryContent } from './styles'

export function History() {
  return (
    <HistoryContainer>
      <h1>My history</h1>

      <HistoryContent>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>When</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt totam, aliquam praesentium esse fuga commodi, iste ab
                qui laudantium, laborum eveniet enim ullam. Exercitationem
                dignissimos expedita nam dolor labore molestias.
              </td>
              <td>45 minutes</td>
              <td>2 months ago</td>
              <td>Finished</td>
            </tr>
          </tbody>
        </table>
      </HistoryContent>
    </HistoryContainer>
  )
}
