import styled from 'styled-components'

const BaseInput = styled.input`
  height: 2.5rem;
  padding-inline: 0.5rem;

  font-size: 1.125rem;
  font-weight: bold;
  color: ${(props) => props.theme['gray-100']};
  background-color: transparent;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }
`

export const TaskDescriptionInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const TaskDurationInput = styled(BaseInput)`
  width: 4rem;
`

export const CountdownButton = styled.button`
  width: 100%;
  padding: 1rem;

  font-weight: bold;
  color: ${(props) => props.theme['gray-100']};
  background-color: ${(props) => props.theme['green-500']};
  border: 0;
  border-radius: 8px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  transition: background-color 0.2s, color 0.2s;
  &:not(:disabled):hover {
    color: ${(props) => props.theme['gray-300']};
    background-color: ${(props) => props.theme['green-700']};
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
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

export const FormContainer = styled.section`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  font-size: 1.125rem;
  font-weight: 700;
  color: ${(props) => props.theme['gray-100']};
  flex-wrap: wrap;
`

export const CountdownSeparator = styled.div`
  width: 4rem;
  padding-block: 2rem;
  padding-inline: 0;

  color: ${(props) => props.theme['green-500']};

  display: flex;
  justify-content: center;
  overflow: hidden;
`

export const CountdownContainer = styled.section`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme['gray-100']};
  cursor: default;
  user-select: none;

  display: flex;
  gap: 1rem;

  & > span {
    background-color: ${(props) => props.theme['gray-700']};
    padding-block: 2rem;
    padding-inline: 1rem;
    border-radius: 8px;
  }
`
