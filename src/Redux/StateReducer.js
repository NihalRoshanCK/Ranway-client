import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: false,
  },
  reducers: {
    open: (state) => {
     
      state.value=true
    },
    close:(state)=>{
      state.value=false
    },
    toggle:(state)=>{
      state.value = !state.value
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { open,close,toggle } = counterSlice.actions

export default counterSlice.reducer