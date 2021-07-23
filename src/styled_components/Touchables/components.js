import styled from 'styled-components'
import TouchableScale from 'react-native-touchable-scale'

export const NewTaskOccurenceButton = styled(TouchableScale)`
  align-self: center;
`

export const TransactionAssignButton = styled(TouchableScale)`
  flex: 1;
  border-radius: 20px;
`

export const TransactionDetailRecurringDateButton = styled(TouchableScale)`
  flex: 1;
  margin: 2%;
  border-radius: 20px;
`

export const CloseButtonTouchableScale = styled(TouchableScale)`
  flex: 1;
  align-items: center;
  height: 100%;
`

export const ProfileCompleteTouchable = styled(TouchableScale)`
  align-self: center;
  margin: 5%;
  background-color: ${props => props.color};
  border-radius: 30px;
  padding: 5%;
  border-width: 1px;
  border-color: #FFFFFF;
  box-shadow: 2px 2px 3px rgba(47, 53, 66,0.50)

`

export const ConfigTouchable = styled(TouchableScale)`
  align-self: center;
  border-radius: 80px;
  padding: 5%;
  flex: 1;
  margin: auto;
  box-shadow: 2px 2px 3px rgba(47, 53, 66,0.50)
`

