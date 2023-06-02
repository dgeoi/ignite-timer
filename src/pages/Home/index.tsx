import { zodResolver } from '@hookform/resolvers/zod'
import { Pause, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { CycleProvider } from '../../contexts/Cycle/Provider'
import { useCycle } from '../../contexts/hooks/useCycle'
import { Countdown } from './components/Countdown'
import { NewCycleForm } from './components/NewCycleForm'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  taskDescription: zod.string().min(1, 'Missing description'),
  taskDuration: zod.number().min(5).max(60),
})

export type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

function HomeComponent() {
  const { activeCycle, createNewCycle, setCurrentCycleAsInterrupted } =
    useCycle()
  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      taskDescription: '',
      taskDuration: 5,
    },
  })
  const newCycleFormMethods = newCycleForm
  const taskInput = newCycleFormMethods.watch('taskDescription')
  const isTaskInputEmpty = !taskInput

  function handleCreateNewCycle() {
    createNewCycle({
      taskDescription: newCycleForm.getValues('taskDescription'),
      taskDuration: newCycleForm.getValues('taskDuration'),
    })
    newCycleFormMethods.reset()
  }

  return (
    <HomeContainer>
      <FormProvider {...newCycleForm}>
        <form onSubmit={newCycleFormMethods.handleSubmit(handleCreateNewCycle)}>
          <NewCycleForm />
          <Countdown />

          {activeCycle ? (
            <StopCountdownButton
              onClick={setCurrentCycleAsInterrupted}
              type="button"
            >
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
      </FormProvider>
    </HomeContainer>
  )
}

export function Home() {
  return (
    <CycleProvider>
      <HomeComponent />
    </CycleProvider>
  )
}
