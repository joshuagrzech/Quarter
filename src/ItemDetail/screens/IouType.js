import React from 'react'
import XDate from 'xdate'
import { IouMainText, IouNameText, DueDateText } from '../styled-components/Text'
import { IouVerifyView } from '../styled-components/View'
import { LottieCloseContainer } from 'styled-components'
export const IouType = (props) => {
  const { item } = props

  return (
    <LottieCloseContainer>
      <IouMainText>
        {item.user} Owes {item.createdBy} ${item.amount}
      </IouMainText>
      <IouNameText>{item.name}</IouNameText>
      <DueDateText>
        Created {Math.abs(Math.round(new XDate(item.due).diffDays(new XDate())))} Day
        {Math.abs(Math.round(new XDate(item.due).diffDays(new XDate()))) === 1 ? ' ' : 's '}
        Ago
      </DueDateText>
      <IouVerifyView />
    </LottieCloseContainer>
  )
}
