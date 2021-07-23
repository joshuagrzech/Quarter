import styled from 'styled-components'
import { View } from 'react-native'

export const ModalDarkBackground = styled(View)`
  align-items: center;
  background-color: 'rgba(223,228,234,1.0)';
  height: 100%;
  justify-content: center;
  opacity: backgroundOpacity;
  position: absolute;
  width: 100%;
`
export const RecentTransactionDateContainer = styled(View)`
  background-color: 'rgba(223,228,234,1.0)';
  border-radius: 10px;
  flex: 1;
  justify-content: center;
`
export const TransactionDetailSharedElementContainerAndDecoy = styled(View)`
  align-content: center;
  align-items: center;
  align-self: center;
  height: 75%;
  justify-content: center;
  position: absolute;
  text-align: center;
  width: 90%;
`
