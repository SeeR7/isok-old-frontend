import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '../../rtk/api/authAPI'
import { logout } from '../../rtk/features/authSlice'
import { useAppDispatch } from '../../rtk/store'
import Button from '@mui/material/Button'
import LogoutIcon from '@mui/icons-material/Logout'

const Header:React.FC = () => {
    const [logoutUser, { isSuccess }] = useLogoutUserMutation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        await logoutUser("")
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(logout())
            navigate("/login")
        }
    }, [navigate, dispatch, isSuccess])

    return (
        <header className='header'>
            <span>ИСОК</span>
            <Button startIcon={<LogoutIcon/>} onClick={logoutHandler}>Выйти</Button>
        </header>
    )
}

export default Header