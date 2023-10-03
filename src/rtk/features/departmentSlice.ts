import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IDepartment {
    id: number;
    name: string;
    number: number;
    type: string;
}

interface IDepartmentState {
    department: IDepartment[] | null;
}

const initialState: IDepartmentState = {
    department: null
}

export const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {
        setDepartment: (state, action: PayloadAction<IDepartment[]>) => {
            state.department = action.payload
        }
    }
})

export default departmentSlice.reducer
export const { setDepartment } = departmentSlice.actions