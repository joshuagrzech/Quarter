import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import 'react-native-get-random-values'
import {useMutation} from '@apollo/client'
import {CREATE_USER_MUTATION} from 'apollo/user'

export const saveNewAuthUser = createAsyncThunk(
  'users/saveNewAuthUser',
  async (userData, thunkAPI) => {
    const createUser = useMutation(CREATE_USER_MUTATION)
    const userId = await createUser(userData)
    return userId
  }
)



const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    provider: null,
    username: null,
    notifications: [],
    bankAccount: null,
    items: [],
    plaidAccessToken: null,
    house: null,
  },
  reducers: {
    signInAuth: (state, action) => {
      return action.payload
    },
    updateProfile(state, action) {
      const { userObject } = action.payload
      return Object.assign(state, userObject)
    },
    addPlaidData(state, action) {
      const { plaidData } = action.payload

      return Object.assign(state, {
        plaidData
      })
    },
    addTransactions(state, action) {
      const { transactions } = action.payload

      return Object.assign(state, {
        plaidData: { ...state.plaidData, transactions }
      })
    },
    printedDates(state, action) {
      const datesArray = action.payload
      state.printedDates = datesArray
    },
    resetUser(state, action) {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveNewAuthUser.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export const { updateProfile, addPlaidData, addTransactions, resetUser } = userSlice.actions
export default userSlice.reducer
