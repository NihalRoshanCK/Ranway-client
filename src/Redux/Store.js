import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './StateReducer'
import loginReduser from './LoginReduser'

export default configureStore({
  reducer: {
    counter: counterReducer,
    login:loginReduser,
  },
})