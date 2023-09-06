import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    value: false,
  },
  reducers: {
    open: (state) => {
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
      state.value=true
    },
    close:(state)=>{
        console.log('clossssssssssssssssssssssssssssssss');
      state.value=false
    },
    // toggle:(state)=>{
    //   state.value = !state.value
    // },
    
  },
})

// Action creators are generated for each case reducer function
export const { open,close } = loginSlice.actions

export default loginSlice.reducer