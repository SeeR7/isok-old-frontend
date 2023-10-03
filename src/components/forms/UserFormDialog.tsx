import React, { useState } from 'react'
import { IDepartment } from '../../rtk/features/departmentSlice'
import { useGetDepartmentsQuery } from '../../rtk/api/departmentAPI'
import { useCreateUserMutation } from '../../rtk/api/userAPI'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'

const UserFormDialog: React.FC = () => {
    const { data: dep } = useGetDepartmentsQuery('')
    const [open, setOpen] = useState(false);
    const [createUser] = useCreateUserMutation()

    const [lastNameInput, setLastName] = useState('');
    const [firstNameInput, setFirstName] = useState('');
    const [middleNameInput, setMiddleName] = useState('');
    const [depInput, setDep] = useState(1);
    const [loginInput, setLogin] = useState('');
    const [passwordInput, setPassword] = useState('');
    const [accessGroupInput, setAccessGroup] = useState('');
    const [birthDateInput, setBirthDate] = useState('');
    const [joinDateInput, setJoinDate] = useState('');
    const [isActiveInput, setIsActive] = useState(1);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCreate = async () => {
        let data = {
            id: 0,
            department: null,
            user: {
              id: 0,
              login: loginInput,
              password: passwordInput,
              accessGroup: accessGroupInput,
              refreshToken: null,
              refreshTokenExpiryTime: null
            },
            departmentId: depInput,
            userId: 0,
            firstName: firstNameInput,
            middleName: middleNameInput,
            lastName: lastNameInput,
            birthDate: birthDateInput,
            photoUrl: null,
            joinDate: joinDateInput,
            leftDate: null,
            isActive: Boolean(isActiveInput)
          }
        await createUser(data);
        handleClose()
    };

    const handleChange = (event: SelectChangeEvent) => {
        setDep(parseInt(event.target.value));
    };
    const handleChangeStatus = (event: SelectChangeEvent) => {
        setIsActive((parseInt(event.target.value)));
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Добавить
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Новый пользователь</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="lastName"
                        label="Фамилия"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="firstName"
                        label="Имя"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="middleName"
                        label="Отчество"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setMiddleName(e.target.value)}
                    />
                    <InputLabel id="demo-simple-select-label">Тип подразделения</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={depInput.toString()}
                        label="Подразделение"
                        fullWidth
                        onChange={(handleChange)}
                    >
                        {dep && dep.map((depar: IDepartment) => (
                            <MenuItem key={depar.id} value={depar.id}>{depar.number + ' - ' + depar.name}</MenuItem>
                        ))}
                    </Select>
                    <TextField
                        margin="dense"
                        id="login"
                        label="Логин"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        label="Пароль"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="accessGroup"
                        label="Доступ"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setAccessGroup(e.target.value)}
                    />
                    <InputLabel id="demo-simple-select-label">Дата рождения</InputLabel>
                    <TextField
                        margin="dense"
                        id="birthDate"
                        type="date"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                    <InputLabel id="demo-simple-select-label">Дата устройства</InputLabel>
                    <TextField
                        margin="dense"
                        id="joinDate"
                        type="date"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setJoinDate(e.target.value)}
                    />
                    <InputLabel id="demo-simple-select-label">Статус</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={isActiveInput.toString()}
                        label="type"
                        fullWidth
                        onChange={handleChangeStatus}
                    >
                        <MenuItem value={"1"}>Активный</MenuItem>
                        <MenuItem value={"0"}>Не активный</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreate}>ОК</Button>
                    <Button onClick={handleClose}>Отмена</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default UserFormDialog