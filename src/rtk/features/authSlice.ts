import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwt from 'jwt-decode'
import { RootState } from "../store";

const decodeJwt = (token: string | null, type: string) => {
    if (token === null) {
        return null
    }
    try {
        const jwtToken: jwtState = jwt(token)
        if (type === "name") {
            return jwtToken.name
        }
        if (type === "role") {
            return jwtToken.role
        }
        if (type === "fio") {
            return jwtToken.fio
        }
        if (type === "dep") {
            return jwtToken.dep
        }
    } catch (error) {
        return null
    }

    return null
}

const tokenJWT: string | null = localStorage.getItem("accessToken")

interface IAuthState {
    id: string | null;
    accessGroup: string | null;
    accessToken: string | null;
    fio: string | null;
    dep: string | null;
}

const initialState: IAuthState = {
    id: decodeJwt(tokenJWT, "name"),
    accessGroup: decodeJwt(tokenJWT, "role"),
    accessToken: tokenJWT,
    fio: decodeJwt(tokenJWT, "fio"),
    dep: decodeJwt(tokenJWT, "dep")
}

interface jwtState {
    name: string;
    role: string;
    fio: string;
    dep: string;
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.id = null
            state.accessToken = null
            state.accessGroup = null
            state.fio = null
            state.dep = null
            localStorage.removeItem("accessToken")
        },
        setUser: (state, action: PayloadAction<string>) => {
            localStorage.setItem("accessToken", action.payload)
            state.id = (decodeJwt(action.payload, "name"))
            state.accessGroup = (decodeJwt(action.payload, "role"))
            state.accessToken = action.payload
            state.fio = (decodeJwt(action.payload, "fio"))
            state.dep = (decodeJwt(action.payload, "dep"))
        },
        getMe: (state, action: PayloadAction<string | null>) => {
            state.id = (decodeJwt(action.payload, "name"))
            state.accessGroup = (decodeJwt(action.payload, "role"))
            state.accessToken = action.payload
            state.fio = (decodeJwt(action.payload, "fio"))
            state.dep = (decodeJwt(action.payload, "dep"))
        }
    }
})

export default authSlice.reducer;
export const { logout, setUser, getMe } = authSlice.actions

export const checkIsAuth = (state: RootState) => Boolean(state.authState.accessToken)
export const checkRole = (state: RootState) => state.authState.accessGroup
export const checkToken = (state: RootState) => state.authState.accessToken
export const checkFio = (state: RootState) => state.authState.fio
export const checkDep = (state: RootState) => state.authState.dep