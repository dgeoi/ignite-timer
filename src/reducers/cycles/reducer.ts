import { Cycle } from '../../contexts/Cycle/Context'
import { CyclesReducerActionType } from './actions'

interface CyclesReducerState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CyclesReducerState, action: any) {
  switch (action.type) {
    case CyclesReducerActionType.Create:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      }

    case CyclesReducerActionType.Interrupt:
      return {
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, interruptedDate: new Date() }
          }
          return cycle
        }),
        activeCycleId: null,
      }

    case CyclesReducerActionType.Finish:
      return {
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, finishedDate: new Date() }
          }
          return cycle
        }),
        activeCycleId: null,
      }

    default:
      return state
  }
}
