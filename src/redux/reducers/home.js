import { createSlice } from '@reduxjs/toolkit'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import XDate from 'xdate'

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    id: null,
    name: null,
    users: [],
    items: [],
  },
  reducers: {
    createSharedHome(state, action) {
      const { membersArray } = action.payload
      state.users = membersArray
    },
    editSharedHome(state, action) {
      const homeObject = action.payload
      state.home = { ...state.home, ...homeObject }
    },
    editHomeNickname(state, action) {
      const { homeNickname } = action.payload
      state.homeNickname = homeNickname
    },
    updateMembers(state, action) {
      const { memberObject } = action.payload

      state.users.push(memberObject)
    },
    removeMember(state, action) {
      const memberId = action.payload

      state.users = state.users.filter((member) => member.id !== memberId)
    },
    updateMember(state, action) {
      const memberObject = action.payload
      state.users = state.users.map((member) => {
        if (member.id === memberObject.id) {
          return memberObject
        }
        return member
      })
    },
    initSharedHome(state, action) {
      return Object.assign(state, { isShared: true, connectedMembers: [] })
    },
    updateConnectedMembers(state, action) {
      const memberObject = action.payload
      state.connectedMembers.push(memberObject)
    },
    lastUpdated(state, action) {
      state.lastUpdated = new XDate().valueOf()
    },
    resetHome(state, action) {
      return initialState
    }
  }
})

export const {
  resetHome,
  createSharedHome,
  editSharedHome,
  editHomeNickname,
  updateMembers,
  lastUpdated,
  removeMember,
  updateMember,
  initSharedHome,
  updateConnectedMembers
} = homeSlice.actions
export default homeSlice.reducer
