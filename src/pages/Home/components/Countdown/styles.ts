import styled from 'styled-components'

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
