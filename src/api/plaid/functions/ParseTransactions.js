import RNFetchBlob from 'rn-fetch-blob'

export const parseReocurringTransactions = async (transactions) => {
  const recObj = {}

  const { fs } = RNFetchBlob
  const subObj = {}

  transactions.forEach((transaction) => {
    let name = transaction.merchant_name

    const id = transaction.transaction_id
    const { date } = transaction
    if (!name) {
      name = transaction.name
    }

    const { amount } = transaction
    if (subObj[name]) {
      if (subObj[name][amount]) {
        subObj[name][amount].times++
        subObj[name][amount].dates = [...subObj[name][amount].dates, date]
      } else {
        subObj[name][amount] = { times: 1, dates: [date] }
      }
    } else {
      subObj[name] = {}
      subObj[name].name = name
      subObj[name][amount] = { times: 1 }
      subObj[name][amount].dates = [date]
    }
    if (recObj[name]) {
      recObj[name].times++
      recObj[name][id] = amount
      recObj[name].dates = [...recObj[name].dates, date]
    } else {
      recObj[name] = { times: 1 }
      recObj[name][id] = amount
      recObj[name].dates = [date]
    }
  })

  const contiansSubscription = (name) => {
    const thisSub = {}
    const currentSub = subObj[name]
    Object.keys(currentSub).forEach((amount) => {
      if (subObj[name][amount].times >= 2) {
        thisSub[amount] = currentSub[amount]
      } else {
        thisSub[amount] = false
      }
    })
    return thisSub
  }

  const parseCompanyArray = async (recObj) => {
    const companyObj = recObj

    const companyArray = Promise.all(
      Object.keys(companyObj).map(async (company) => {
        if (companyObj[company].times >= 2) {
          const companyName = company
          const singleWord = (name) => {
            if (name.split(' ').length > 1) {
              if (name.split(' ')[0] === 'The') {
                return name.split(' ')[1]
              }
              return name.split(' ')[0]
            }
            return name
          }
          const nameSpace = singleWord(companyName).replace(/\s/g, '')
          const thisName = nameSpace.replace(/\'/, '').toLowerCase()

          return fetch(`https://company.clearbit.com/v1/domains/find?name=:${thisName}`, {
            method: 'GET',
            headers: {
              Authorization: 'Bearer sk_ef97df71f5a466361e4c214d1476cb0f'
            }
          })
            .then((data) => data.json())
            .then((json) => {
              if (!json.error) {
                return {
                  companyFound: true,
                  ...json,
                  merchant_name: `${company}`,
                  reocurring: true,
                  reocurringData: companyObj[company],
                  subscription: contiansSubscription(company)
                }
              }
              return {
                companyFound: false,
                name: `${company}`,
                merchant_name: `${company}`,
                reocurring: true,
                reocurringData: companyObj[company],
                subscription: contiansSubscription(company)
              }
            })
        }
      })
    )

    return companyArray
  }
  return parseCompanyArray(recObj)
}
