import { useFormContext } from 'react-hook-form'
import { useCycle } from '../../../../contexts/hooks/useCycle'
import {
  FormContainer,
  TaskDescriptionInput,
  TaskDurationInput,
} from './styles'

export function NewCycleForm() {
  const { activeCycle } = useCycle()
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="taskDescription">{`I'll work on`}</label>
      <TaskDescriptionInput
        type="text"
        id="taskDescription"
        placeholder="Name your project"
        list="task-suggestion"
        {...register('taskDescription')}
        disabled={!!activeCycle}
      />

      <datalist id="task-suggestion">
        <option value="Meditar" />
      </datalist>

      <label htmlFor="taskDuration">for</label>
      <TaskDurationInput
        type="number"
        id="taskDuration"
        placeholder="00"
        min={5}
        max={60}
        step={5}
        {...register('taskDuration', { valueAsNumber: true })}
        disabled={!!activeCycle}
      />

      <span>minutes.</span>
    </FormContainer>
  )
}
