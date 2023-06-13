import { ReactNode, useState } from 'react'
import { CreateCycleData, Cycle, CycleContext } from './Context'

interface CycleProviderProps {
  children: ReactNode
}

export const CycleProvider = ({ children }: CycleProviderProps) => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function createNewCycle({ taskDescription, taskDuration }: CreateCycleData) {
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
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        createNewCycle,
        setAmountSecondsPassed,
        setCurrentCycleAsFinished,
        setCurrentCycleAsInterrupted,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
