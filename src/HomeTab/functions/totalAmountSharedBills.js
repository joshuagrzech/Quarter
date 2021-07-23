export const totalAmountSharedBills = (items, homeMembers) => {
  const bills = items.filter((item) => item.type === 'bill')
  const sharedBills = bills.filter((bill) => bill.shared === true)

  if (bills.length > 0) {
    if (sharedBills.length === 1) {
      const totalMembers = homeMembers.length + 1
      return { amount: parseInt(sharedBills[0].amount) / totalMembers }
    } else if (sharedBills.length > 1) {
      let amountArr = []
      sharedBills.forEach((bill) => {
        amountArr.push(parseInt(bill.amount))
      })

      const total = amountArr.reduce((a, b) => a + b)
      const totalMembers = homeMembers.length + 1
      return { amount: total / totalMembers }
    } else {
      return { amount: 0 }
    }
  } else {
    return { amount: 0 }
  }
}
