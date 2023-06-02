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

  &:disabled {
    cursor: not-allowed;
  }
`

export const TaskDurationInput = styled(BaseInput)`
  width: 4rem;

  &:disabled {
    cursor: not-allowed;
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
