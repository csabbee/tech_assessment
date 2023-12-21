import { Getter, Lens, ProfunctorState, Setter } from '@staltz/use-profunctor-state'

// This is the same interface that is in @staltz/use-profunctor-state, but that is not exported
export interface Promap<T> {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  <S>(lens: Lens<T, S>, args?: any[]): ProfunctorState<S>
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  <S>(get: Getter<T, S>, set: Setter<T, S>, args?: any[]): ProfunctorState<S>
}