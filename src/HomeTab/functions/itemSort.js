import XDate from 'xdate'

export const itemSort = (refreshing, items) => {
  if (items === undefined || items === null) {
    return
  }
  if (refreshing === true) {
    return []
  }
  if (items.length === 0) {
    return []
  }
  if (items.length === 1) {
    return [items[0]]
  }
  return items.slice().sort((a, b) => parseInt(new XDate(a.due).valueOf()) - parseInt(new XDate(b.due).valueOf()))
}
