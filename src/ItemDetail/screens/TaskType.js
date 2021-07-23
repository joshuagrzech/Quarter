import React from 'react'
import XDate from 'xdate'
import { LottieCloseContainer } from 'styled_components'
import { TaskTitleText } from '../styled-components/Text'
import { Text } from 'react-native'

export const TaskType = (props) => {
  const { item } = props

  return (
    <LottieCloseContainer>
      <TaskTitleText>{item.title}</TaskTitleText>
      {item.weekly === true || item.monthly === true ? (
        <>
          
          <TaskTitleText>
            Every {item.weekly === true ? new XDate(item.due).toString('ddd') : new XDate(item.due).toString('mmm')}
          </TaskTitleText>
        </>
      ) : null}
      <Text>{item.notes}</Text>
      {item.user ? <TaskTitleText>Assigned to {item.user}</TaskTitleText> : null}
    </LottieCloseContainer>
  )
}
