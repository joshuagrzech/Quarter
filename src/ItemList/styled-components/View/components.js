import styled from 'styled-components'
import { View } from 'react-native'

export const CompletedItemContainerView = styled(View)`
  align-self: center;
  flex-direction: row;
`
export const HomeListItemSharedElementContainer = styled(View)`
  align-self: flex-start;
  background-color: 'rgba(223,228,234,1.0)';
  border-radius: 2px;
  height: 80%;
  left: -10%;
  position: absolute;
  top: 10%;
  width: 25%;
`
export const HomeListItemViewContainer = styled(View)`
  align-self: flex-end;
  border-radius: 5px;
  width: 90%;
`
