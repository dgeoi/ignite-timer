import { zodResolver } from '@hookform/resolvers/zod'
import { Play } from 'phosphor-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import {
  CountdownButton,
  CountdownContainer,
  CountdownSeparator,
  FormContainer,
  HomeContainer,
  TaskDescriptionInput,
  TaskDurationInput,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  taskDescription: zod.string().min(1, 'Missing description'),
  taskDuration: zod.number().min(5).max(60),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  taskDescription: string
  taskDuration: number
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const { register, watch, handleSubmit, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      taskDescription: '',
      taskDuration: 5,
    },
  })
  const taskInput = watch('taskDescription')
  const isTaskInputEmpty = !taskInput

  function handleCreateNewCycle({
    taskDescription,
    taskDuration,
  }: NewCycleFormData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      taskDescription,
      taskDuration,
    }

    setCycles((previous) => previous.concat(newCycle))
    setActiveCycleId(id)

    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="taskDescription">{`I'll work on`}</label>
          <TaskDescriptionInput
            type="text"
            id="taskDescription"
            placeholder="Name your project"
            list="task-suggestion"
            {...register('taskDescription')}
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

        <CountdownButton type="submit" disabled={isTaskInputEmpty}>
          <Play size={24} weight="fill" />
          Start
        </CountdownButton>
      </form>
    </HomeContainer>
  )
}
