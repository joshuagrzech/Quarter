import React from 'react'
import { LottieCloseContainer } from 'styled_components'
import { DateHeaderText } from '../styled-components/Text'

export const DateHeader = (props) => {
  const { date } = props

  return (
    <LottieCloseContainer>
      <DateHeaderText>{date.toString('MMM')}, {date.getDate() + date.toString('S')}</DateHeaderText>
    </LottieCloseContainer>
  )
}
