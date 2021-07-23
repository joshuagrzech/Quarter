import styled from 'styled-components'
import TouchableScale from 'react-native-touchable-scale'

export const NewTaskOccurenceButton = styled(TouchableScale)`
align-self: center;
margin: 5%;
background-color: ${props=> props.selected ? '#ff6b81' : '#a4b0be'};
border-radius: 20px;
padding: 2%;
flex: 1;
justify-content: center;
box-shadow: 2px 2px 3px rgba(47, 53, 66,0.50)
`
