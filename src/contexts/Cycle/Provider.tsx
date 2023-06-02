import { ReactNode, useState } from 'react'
import { newCycleFormData } from '../../pages/Home'
import { Cycle, CycleContext } from './Context'

export const CycleProvider = (props: { children: ReactNode }) => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function createNewCycle({ taskDescription, taskDuration }: newCycleFormData) {
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
  }

  function setCurrentCycleAsInterrupted() {
    setCycles((previous) =>
      previous.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        }
        return cycle
      }),
    )
    setActiveCycleId(null)
  }

  function setCurrentCycleAsFinished() {
    setCycles((previous) =>
      previous.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        }
        return cycle
      }),
    )
    setActiveCycleId(null)
  }

  return (
    <CycleContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        createNewCycle,
        setAmountSecondsPassed,
        setCurrentCycleAsFinished,
        setCurrentCycleAsInterrupted,
      }}
    >
      {props.children}
    </CycleContext.Provider>
  )
}
