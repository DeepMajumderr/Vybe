import { createSlice } from "@reduxjs/toolkit"

const loopSlice = createSlice({
    name: "loop",
    initialState: {
        loopData:null
    },
    reducers: {
        setLoopData: (state, action) => {
            state.loopData = action.payload
        }
    }
})

export const {setloopData} = loopSlice.actions
export default loopSlice.reducer