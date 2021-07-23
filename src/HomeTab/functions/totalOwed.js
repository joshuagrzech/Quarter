export const totalOwed = (stateItems, profile) => {
  const iouOwed = stateItems.filter((item) => item.type === 'iou' && item.user === profile.name)

  if (iouOwed.length === 1) {
    return { amount: iouOwed[0].amount }
  }
  if (iouOwed.length > 0) {
    return iouOwed.reduce((a, b) => ({ amount: a.amount + b.amount }))
  }
  return { amount: 0 }
}
