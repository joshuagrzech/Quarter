import { combineReducers } from 'redux'

import items from './item'
import user from './user'
import home from './home'


export default combineReducers({ items, user, home })
