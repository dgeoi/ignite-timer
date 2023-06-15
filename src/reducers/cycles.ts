import { Cycle } from '../contexts/Cycle/Context'

interface CyclesReducerState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export enum CyclesReducerActionType {
  Create = 'ADD_NEW_CYCLE',
  Interrupt = 'INTERRUPT_CURRENT_CYCLE',
  Finish = 'FINISH_CURRENT_CYCLE',
}

// interface CyclesReducerAction {
//   type: string
//   payload?: {
//     newCycle?: Cycle
//     activeCycleId?: string
//   }
// }

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
