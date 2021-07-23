import styled from 'styled-components'
import LinearGradient from 'react-native-linear-gradient'

export const HomeTabLinearGradient = styled(LinearGradient)`
  padding: 1%;
  border-radius: 20px;
  margin-top: 5%;
  width: 90%;
  align-self: center;
  
  height: 95%;
  position: absolute;
  opacity: 0.75;
  border-color: ${props => props.color};
`
