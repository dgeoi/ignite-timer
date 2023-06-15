import { ReactNode, useReducer, useState } from 'react'
import {
  createCycleAction,
  finishCycleAction,
  interruptCycleAction,
} from '../../reducers/cycles/actions'
import { cyclesReducer } from '../../reducers/cycles/reducer'
import { CreateCycleData, Cycle, CycleContext } from './Context'

interface CycleProviderProps {
  children: ReactNode
}

export const CycleProvider = ({ children }: CycleProviderProps) => {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })
  const { cycles, activeCycleId } = cyclesState
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function createNewCycle({ taskDescription, taskDuration }: CreateCycleData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      taskDescription,
      taskDuration,
      startDate: new Date(),
    }
    dispatch(createCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function setCurrentCycleAsInterrupted() {
    dispatch(interruptCycleAction())
  }

  function setCurrentCycleAsFinished() {
    dispatch(finishCycleAction())
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
