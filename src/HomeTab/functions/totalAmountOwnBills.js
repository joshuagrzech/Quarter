export const totalAmountOwnBills = (items) => {
  const bills = items.filter((item) => item.type === 'bill')
  const ownBills = bills.filter((bill) => bill.shared === false)

  if (bills.length > 0) {
    if (ownBills.length === 1) {
      const amount = parseInt(ownBills[0].amount)
      return { amount }
    }
    if (ownBills.length > 1) {
      const amountArr = []
      ownBills.forEach((bill) => {
        amountArr.push(parseInt(bill.amount))
      })
    } else {
      return { amount: 0 }
    }
  } else {
    return { amount: 0 }
  }
}
