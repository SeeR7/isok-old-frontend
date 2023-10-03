import React, { useEffect, useState } from 'react'
import { useLoginUserMutation } from '../../rtk/api/authAPI'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../rtk/store'
import { setUser } from '../../rtk/features/authSlice'
import { Box, Button, Container, FormControl, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login'
import {useForm} from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm: React.FC = () => {
  const {handleSubmit, control} = useForm();
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch();
  const [loginUser, { data, isSuccess, status}] = useLoginUserMutation();
  const navigate = useNavigate();
  const notify = () => toast("Wow so easy!");

  const auth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await loginUser({ login, password })
    
  }
  console.log(status)
  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data))
      setLogin('')
      setPassword('')
      navigate("/monitor")
    }
    if (status === 'rejected'){
      
      toast.error('Неправильный логин или пароль', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }, [navigate, dispatch, data, isSuccess, status])

  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer />
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 4,
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">Вход ИСОК</Typography>
        <Box component="form" onSubmit={(e) => auth(e)}  >
          <FormControl>
            <TextField
              margin="normal"
              fullWidth
              autoFocus
              label="Логин"
              required
              onChange={(e) => setLogin(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Пароль"
              type="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              variant="contained"
              startIcon={<LoginIcon />}
              type="submit"
              sx ={{marginTop:2}}>
              Войти
            </Button>
          </FormControl>
        </Box>
      </Box>
    </Container>
  )
}

export default LoginForm