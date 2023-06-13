import { createContext, Dispatch, SetStateAction } from 'react'

export interface Cycle {
  id: string
  taskDescription: string
  taskDuration: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export interface CreateCycleData {
  taskDescription: string
  taskDuration: number
}

interface CycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  createNewCycle: ({ taskDescription, taskDuration }: CreateCycleData) => void
  setAmountSecondsPassed: Dispatch<SetStateAction<number>>
  setCurrentCycleAsFinished: () => void
  setCurrentCycleAsInterrupted: () => void
}

export const CycleContext = createContext({} as CycleContextType)
