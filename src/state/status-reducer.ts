import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const slice = createSlice({
    name: 'status',
    initialState: {
        status: 'idle',
        isFiltered: false,
    } as InitialStateType,
    reducers: {
        setStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setIsFilteredAC(state, action: PayloadAction<{ isFiltered: boolean }>) {
            state.isFiltered = action.payload.isFiltered
        },
    },
    extraReducers(builder) {
    }
})

export const statusReducer = slice.reducer

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = {
    status: RequestStatusType
    isFiltered: boolean
}

export const { setStatusAC, setIsFilteredAC } = slice.actions