import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;

  display: flex;
  flex-direction: column;

  & > h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`

export const HistoryContent = styled.div`
  flex: 1 1 auto;
  overflow: auto;
  margin-top: 2rem;

  & > table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      padding: 1rem;

      text-align: left;
      font-size: 0.875rem;
      line-height: 1.6;
      color: ${(props) => props.theme['gray-100']};
      background-color: ${(props) => props.theme['gray-600']};

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      padding: 1rem;

      line-height: 1.6;
      font-size: 0.875rem;
      background-color: ${(props) => props.theme['gray-700']};
      border-top: 4px solid ${(props) => props.theme['gray-800']};

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      &:first-child {
        max-width: 440px;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`

const COLOR_BASED_ON_CURRENT_STATUS = {
  running: 'yellow-500',
  completed: 'green-500',
  interrupted: 'red-500',
} as const

interface CurrentStatus {
  currentStatus: keyof typeof COLOR_BASED_ON_CURRENT_STATUS
}

export const Status = styled.div<CurrentStatus>`
  display: flex;
  gap: 0.5rem;

  & > span:first-child {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${(props) =>
      props.theme[COLOR_BASED_ON_CURRENT_STATUS[props.currentStatus]]};
    transform: translateY(0.375rem);
  }
`
