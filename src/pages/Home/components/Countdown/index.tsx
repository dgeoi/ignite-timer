import { differenceInSeconds } from 'date-fns'
import { useEffect } from 'react'
import { useCycle } from '../../../../contexts/hooks/useCycle'
import { CountdownContainer, CountdownSeparator } from './styles'

export function Countdown() {
  const {
    activeCycle,
    amountSecondsPassed,
    setAmountSecondsPassed,
    setCurrentCycleAsFinished,
  } = useCycle()
  const activeCycleDurationInSeconds = activeCycle
    ? activeCycle.taskDuration * 60
    : 0
  const currentCycleTime = activeCycle
    ? activeCycleDurationInSeconds - amountSecondsPassed
    : 0
  const currentMinutes = Math.floor(currentCycleTime / 60)
  const minutes = String(currentMinutes).padStart(2, '0')
  const currentSeconds = currentCycleTime % 60
  const seconds = String(currentSeconds).padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const differenceInSecondsBetweenCurrentDateAndCycleStartDate =
          differenceInSeconds(new Date(), activeCycle.startDate)

        if (
          differenceInSecondsBetweenCurrentDateAndCycleStartDate >=
          activeCycleDurationInSeconds
        ) {
          setCurrentCycleAsFinished()
          setAmountSecondsPassed(activeCycleDurationInSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(
            differenceInSecondsBetweenCurrentDateAndCycleStartDate,
          )
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    activeCycleDurationInSeconds,
    setAmountSecondsPassed,
    setCurrentCycleAsFinished,
  ])

  useEffect(() => {
    minutes && seconds !== '00'
      ? (document.title = `${minutes}:${seconds} | ${activeCycle?.taskDescription}`)
      : (document.title = 'Ignite Timer')
  }, [minutes, seconds, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <CountdownSeparator>{':'}</CountdownSeparator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
