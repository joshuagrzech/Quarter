import { createSlice } from '@reduxjs/toolkit'
import XDate from 'xdate'
const itemsSlice = createSlice({
  name: 'items',
  initialState: [],
  reducers: {
    addItem(state, action) {
      const itemObject = action.payload
      state.push(itemObject)
    },
    updateItem(state, action) {
      const itemObject = action.payload
      return state.map((item) => {
        if (item.id === itemObject.id) {
          return itemObject
        } else {
          return item
        }
      })
    },
    archiveItem(state, action) {
      const id = action.payload
      return state.map((item) => {
        if (item.id === id) {
          return { ...item, archived: true }
        } else {
          return item
        }
      })
    },
    billPaidForMonth(state, action) {
      const bill = action.payload

      return state.map((item) => {
        if (item.id === bill.id) {
          return bill
        } else {
          return item
        }
      })
    },
    taskDoneForWeek(state, action) {
      const task = action.payload

      return state.map((item) => {
        if (item.id === task.id) {
          return task
        } else {
          return item
        }
      })
    },
    taskDoneForMonth(state, action) {
      const task = action.payload

      return state.map((item) => {
        if (item.id === task.id) {
          return task
        } else {
          return item
        }
      })
    },
    updateSharedItems(state, action) {
      const sharedItems = action.payload
      let newItemArray = []
      const stateSharedArray = state.filter((stateItem) => {
        if (stateItem.shared === true) {
          newItemArray = sharedItems.filter((sharedItem) => {
            // eslint-disable-next-line no-shadow
            return stateSharedArray.map((stateItem) => {
              if (stateItem.id === sharedItem.id) {
                return false
              } else {
                return true
              }
            })
          })
        }
      })

      const updatedItemArray = stateSharedArray.map((stateItem) => {
        return sharedItems.map((sharedItem) => {
          if (stateItem.id === sharedItem.id) {
            return Object.assign({}, stateItem, {
              shared: sharedItem,
              lastUpdated: new XDate().toString('HH') + new XDate().toString('mm')
            })
          }
        })
      })

      const newState = Object.assign(
        [],
        newItemArray,
        updatedItemArray,
        state.filter((stateItem) => stateItem.shared === false)
      )

      return newState
    },
    resetItems(state, action) {
      return []
    }
  }
})

export const {
  addItem,
  archiveItem,
  billPaidForMonth,
  updateSharedItems,
  taskDoneForWeek,
  taskDoneForMonth,
  updateItem,
  resetItems
} = itemsSlice.actions
export default itemsSlice.reducer
