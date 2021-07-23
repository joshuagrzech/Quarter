import React from 'react'
import { useSelector } from 'react-redux'

export const totalToMe = (stateItems, profile) => {
  const iouToMe = stateItems.filter((item) => item.type === 'iou' && item.createdBy === profile.name)
  if (iouToMe.length > 0) {
    return iouToMe.reduce((a, b) => ({
      amount: parseInt(a.amount) + parseInt(b.amount)
    }))
  }
  return { amount: 0 }
}
