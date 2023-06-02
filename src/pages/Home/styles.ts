import styled from 'styled-components'

export const CountdownButton = styled.button`
  width: 100%;
  padding: 1rem;

  border: 0;
  border-radius: 8px;
  color: ${(props) => props.theme['gray-100']};
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
`

export const StartCountdownButton = styled(CountdownButton)`
  background-color: ${(props) => props.theme['green-500']};

  &:not(:disabled):hover {
    color: ${(props) => props.theme['gray-300']};
    background-color: ${(props) => props.theme['green-700']};
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StopCountdownButton = styled(CountdownButton)`
  background-color: ${(props) => props.theme['red-500']};

  &:hover {
    background-color: ${(props) => props.theme['red-700']};
  }
`

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`
