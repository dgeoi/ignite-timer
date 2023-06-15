import { Cycle } from '../../contexts/Cycle/Context'

export enum CyclesReducerActionType {
  Create = 'ADD_NEW_CYCLE',
  Interrupt = 'INTERRUPT_CURRENT_CYCLE',
  Finish = 'FINISH_CURRENT_CYCLE',
}

export function createCycleAction(newCycle: Cycle) {
  return {
    type: CyclesReducerActionType.Create,
    payload: { newCycle },
  }
}

export function interruptCycleAction() {
  return {
    type: CyclesReducerActionType.Interrupt,
  }
}

export function finishCycleAction() {
  return {
    type: CyclesReducerActionType.Finish,
  }
}
