import { Play } from 'phosphor-react'
import {
  CountdownButton,
  CountdownContainer,
  CountdownSeparator,
  FormContainer,
  HomeContainer,
  TaskDescriptionInput,
  TaskDurationInput,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="taskDescription">{`I'll work on`}</label>
          <TaskDescriptionInput
            type="text"
            id="taskDescription"
            name="taskDescription"
            placeholder="Name your project"
            list="task-suggestion"
          />

          <datalist id="task-suggestion">
            <option value="Meditar" />
          </datalist>

          <label htmlFor="taskDuration">for</label>
          <TaskDurationInput
            type="number"
            id="taskDuration"
            name="taskDuration"
            placeholder="00"
            min={5}
            max={60}
            step={5}
          />

          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <CountdownSeparator>{':'}</CountdownSeparator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <CountdownButton type="submit" disabled>
          <Play size={24} weight="fill" />
          Start
        </CountdownButton>
      </form>
    </HomeContainer>
  )
}
