import { differenceInSeconds } from 'date-fns'
import { ReactNode, useEffect, useReducer, useState } from 'react'
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
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedCyclesStateInJSON = localStorage.getItem(
        '@IGNITE_TIMER:CYCLES_STATE~1.0.0',
      )

      if (storedCyclesStateInJSON) {
        return JSON.parse(storedCyclesStateInJSON)
      }

      return initialState
    },
  )
  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  })

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

  useEffect(() => {
    const cyclesStateInJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@IGNITE_TIMER:CYCLES_STATE~1.0.0', cyclesStateInJSON)
  }, [cyclesState])

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
