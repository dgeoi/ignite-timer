import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'
import { Pause, Play } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import {
  CountdownContainer,
  CountdownSeparator,
  FormContainer,
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
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
  startDate: Date
  interruptedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const activeCycleDurationInSeconds = activeCycle
    ? activeCycle.taskDuration * 60
    : 0
  const currentCycleTime = activeCycle
    ? activeCycleDurationInSeconds - amountSecondsPassed
    : 0
  const currentMinutes = Math.floor(currentCycleTime / 60)
  const minutes = String(currentMinutes).padStart(2, '0')
  const currentSeconds = currentCycleTime % 60
  const seconds = String(currentSeconds).padStart(2, '0')

  const { register, watch, handleSubmit, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      taskDescription: '',
      taskDuration: 5,
    },
  })
  const taskInput = watch('taskDescription')
  const isTaskInputEmpty = !taskInput

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate),
        )
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle])

  useEffect(() => {
    minutes && seconds !== '00'
      ? (document.title = `${minutes}:${seconds} | ${activeCycle?.taskDescription}`)
      : (document.title = 'Ignite Timer')
  }, [minutes, seconds, activeCycle])

  function handleCreateNewCycle({
    taskDescription,
    taskDuration,
  }: NewCycleFormData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      taskDescription,
      taskDuration,
      startDate: new Date(),
    }

    setCycles((previous) => previous.concat(newCycle))
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  function handleStopCycle() {
    setCycles(
      cycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        }
        return cycle
      }),
    )
    setActiveCycleId(null)
  }

  console.log(cycles)

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

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <CountdownSeparator>{':'}</CountdownSeparator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {activeCycle ? (
          <StopCountdownButton onClick={handleStopCycle} type="button">
            <Pause size={24} />
            Stop
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isTaskInputEmpty}>
            <Play size={24} weight="fill" />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
