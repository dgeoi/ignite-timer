import { createContext, Dispatch, SetStateAction } from 'react'
import { newCycleFormData } from '../../pages/Home'

export interface Cycle {
  id: string
  taskDescription: string
  taskDuration: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  createNewCycle: ({ taskDescription, taskDuration }: newCycleFormData) => void
  setAmountSecondsPassed: Dispatch<SetStateAction<number>>
  setCurrentCycleAsFinished: () => void
  setCurrentCycleAsInterrupted: () => void
}

export const CycleContext = createContext({} as CycleContextType)
