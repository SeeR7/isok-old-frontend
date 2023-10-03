import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useCreateDepartmentMutation } from '../../rtk/api/departmentAPI';

const FormDialog = () => {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [number, setNumber] = React.useState(0);
    const [type, setType] = React.useState('Отдел');
    const [createDepartment] = useCreateDepartmentMutation()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = async () => {
        let payload = {
          name: name,
          number: number,
          type: type,
        }
        await createDepartment(payload);
        handleClose()
      }

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
      };


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Добавить
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Новое подразделение</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Название"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="number"
                        label="Номер"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setNumber(parseInt(e.target.value))}
                    />
                    <InputLabel id="demo-simple-select-label">Тип подразделения</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="type"
                        fullWidth
                        onChange={handleChange}
                    >
                        <MenuItem value={"Отдел"}>Отдел</MenuItem>
                        <MenuItem value={"Цех"}>Цех</MenuItem>
                        <MenuItem value={"Склад"}>Склад</MenuItem>
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

export default FormDialog