import { ReactNode, useReducer, useState } from 'react'
import { CyclesReducerActionType, cyclesReducer } from '../../reducers/cycles'
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
    dispatch({
      type: CyclesReducerActionType.Create,
      payload: {
        newCycle,
      },
    })
    setAmountSecondsPassed(0)
  }

  function setCurrentCycleAsInterrupted() {
    dispatch({
      type: CyclesReducerActionType.Interrupt,
    })
  }

  function setCurrentCycleAsFinished() {
    dispatch({
      type: CyclesReducerActionType.Finish,
    })
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
