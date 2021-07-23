import React from 'react'
import XDate from 'xdate'
import { useSelector } from 'react-redux'
import { BillTypeContainer } from '../styled-components/View'
import { ItemNameText, BillDueText, DueDateText } from '../styled-components/Text'
import { TransactionAssignButton } from '../styled-components/Touchables'
import { MainContainer, DueDateContainer } from 'styled_components'
export const BillType = (props) => {
  const { item } = props
  const home = useSelector((state) => state.home)
  const [eachTotalVisible, setEachTotalVisible] = React.useState(false)
  return (
    <MainContainer>
      <BillTypeContainer>
        <ItemNameText> {item.name}</ItemNameText>
        {item.shared ? (
          <>
            <ItemNameText>
              {!eachTotalVisible ? (
                <ItemNameText>${Math.round(item.amount / (home.users.length + 1))}</ItemNameText>
              ) : (
                <ItemNameText>${item.amount}</ItemNameText>
              )}
              <TransactionAssignButton color="#2f3542" onPress={() => setEachTotalVisible(!eachTotalVisible)}>
                <ItemNameText> {eachTotalVisible ? 'Total' : 'Each'}</ItemNameText>
              </TransactionAssignButton>
            </ItemNameText>
          </>
        ) : (
          <ItemNameText>${item.amount} Total</ItemNameText>
        )}

        <BillDueText>
          Due in {Math.abs(Math.round(new XDate(item.due).diffDays(new XDate())))} Day
          {Math.round(new XDate(item.due).diffDays(new XDate())) > 1 ? 's' : ''} on
        </BillDueText>
        <DueDateContainer>
          <DueDateText>{new XDate(item.due).toLocaleDateString(new XDate())}</DueDateText>
        </DueDateContainer>
      </BillTypeContainer>
    </MainContainer>
  )
}
