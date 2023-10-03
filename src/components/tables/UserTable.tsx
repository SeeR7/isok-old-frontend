import React, { useState } from 'react'
import { useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from '../../rtk/api/userAPI'
import { IEmployee } from '../../rtk/models/IEmployee';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { IDepartment } from '../../rtk/features/departmentSlice';
import UserFormDialog from '../forms/UserFormDialog';
import { useGetDepartmentsQuery } from '../../rtk/api/departmentAPI';

const UserTable: React.FC = () => {
  const [{ userData, toggle }, setToggle] = useState({ userData: 0, toggle: true })
  const { data: sortedUser } = useGetUsersQuery('')
  const { data: sortedDep } = useGetDepartmentsQuery('')

  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const sortNameA = (a: IEmployee, b: IEmployee) => a.lastName > b.lastName ? 1 : -1 //1
  const sortNameD = (a: IEmployee, b: IEmployee) => b.lastName > a.lastName ? 1 : -1 //2

  const sortNumA = (a: IEmployee, b: IEmployee) => a.department.number - b.department.number ? 1:-1//3
  const sortNumD = (a: IEmployee, b: IEmployee) => b.department.number - a.department.number ? 1:-1//4

  const sortTypeA = (a: IEmployee, b: IEmployee) => a.user.login > b.user.login ? 1 : -1 //5
  const sortTypeD = (a: IEmployee, b: IEmployee) => b.user.login > a.user.login ? 1 : -1 //6

  const [lastNameInput, setLastName] = useState('');
  const [firstNameInput, setFirstName] = useState('');
  const [middleNameInput, setMiddleName] = useState('');
  const [depInput, setDep] = useState(1);
  const [loginInput, setLogin] = useState('');
  const [passwordInput, setPassword] = useState('');
  const [accessGroupInput, setAccessGroup] = useState('');
  const [birthDateInput, setBirthDate] = useState('');
  const [joinDateInput, setJoinDate] = useState('');
  const [isActiveInput, setIsActive] = useState(true);



  const [sort, setSort] = useState(() => sortNameA)
  const [toggleSort, setToggleSort] = useState(3)

  const handleSort = (a: number) => {
    switch (a) {
      case 1:
        if (toggleSort === 1) {
          setToggleSort(2)
          setSort(() => sortNameD)
        }
        else {
          setToggleSort(1)
          setSort(() => sortNameA)
        }
        break;
      case 2:
        if (toggleSort === 3) {
          setToggleSort(4)
          setSort(() => sortNumD)
        }
        else {
          setToggleSort(3)
          setSort(() => sortNumA)
        }
        break;
      case 3:
        if (toggleSort === 5) {
          setToggleSort(6)
          setSort(() => sortTypeD)
        }
        else {
          setToggleSort(5)
          setSort(() => sortTypeA)
        }
        break;
    }
  }

  let counter = 0;
  const handleDelete = async (id: any) => {
    deleteUser({ id: id });
  }

  const handleUpdate = async (eId: any, uId:any) => {
    let data = {
      id: eId,
      department: null,
      user: {
        id: uId,
        login: loginInput,
        password: passwordInput,
        accessGroup: accessGroupInput,
        refreshToken: null,
        refreshTokenExpiryTime: null
      },
      departmentId: depInput,
      userId: uId,
      firstName: firstNameInput,
      middleName: middleNameInput,
      lastName: lastNameInput,
      birthDate: birthDateInput,
      photoUrl: null,
      joinDate: joinDateInput,
      leftDate: null,
      isActive: isActiveInput
    }
    await updateUser(data)
    setToggle({ userData: 0, toggle: true })
  }
console.log(birthDateInput)
  return (
    <div>
      <h2>Пользователи</h2>
      <UserFormDialog />
      <table className='styled-table'>
        <thead>
          <tr>
            <th>№</th>
            <th onClick={() => handleSort(1)}>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th onClick={() => handleSort(2)}>Цех</th>
            <th onClick={() => handleSort(3)}>Логин</th>
            <th>Пароль</th>
            <th>Доступ</th>
            <th>Дата<br />рождения</th>
            <th>Дата<br />устройства</th>
            <th>Статус</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {sortedUser && [...sortedUser].sort(sort).map((user: IEmployee) => (
            <tr key={user.id}>
              {toggle || (user.id !== userData)
                ?
                <>
                  <td>{counter += 1}</td>
                  <td>{user.lastName}</td>
                  <td>{user.firstName}</td>
                  <td>{user.middleName}</td>
                  <td>{user.department.number}</td>
                  <td>{user.user.login}</td>
                  <td>{user.user.password}</td>
                  <td>{user.user.accessGroup}</td>
                  <td>{new Date(user.birthDate).toLocaleDateString('ru')}</td>
                  <td>{new Date(user.joinDate).toLocaleDateString('ru')}</td>
                  <td>{user.isActive ? "Активный" : "Неактивный"}</td>
                  <td>
                    <EditIcon color="primary" onClick={() => {
                      setToggle({ userData: user.id, toggle: false });
                      setLastName(user.lastName);
                      setFirstName(user.firstName);
                      setMiddleName(user.middleName);
                      setDep(user.department.id);
                      setLogin(user.user.login);
                      setPassword(user.user.password);
                      setAccessGroup(user.user.accessGroup);
                      setBirthDate(user.birthDate.toString().substring(0,10));
                      setJoinDate(user.joinDate.toString().substring(0,10));
                      setIsActive(user.isActive);
                      }} />
                    <DeleteIcon color='secondary' onClick={() => handleDelete(user.id)} />
                  </td>
                </>
                :
                <>
                  <td>{counter += 1}</td>
                  <td><input size={10} type="text" value={lastNameInput} onChange={(e) => setLastName(e.target.value)}></input></td>
                  <td><input size={10} type="text" value={firstNameInput} onChange={(e) => setFirstName(e.target.value)}></input></td>
                  <td><input size={10} type="text" value={middleNameInput} onChange={(e) => setMiddleName(e.target.value)}></input></td>
                  <td>
                  <select name='depUpd' id="typeUpd" onChange={(e) => setDep(parseInt(e.target.value))}>
                      <option disabled selected value={user.department.id}>{user.department.number}</option>
                      {sortedDep && sortedDep.map((dep:IDepartment) => (
                        <option key={dep.id} value={dep.id}>{dep.number}</option>
                      ))}
                    </select>
                  </td>
                  <td><input size={10} type="text" value={loginInput} onChange={(e) => setLogin(e.target.value)}></input></td>
                  <td><input size={10} type="text" value={passwordInput} onChange={(e) => setPassword(e.target.value)}></input></td>
                  <td><input size={10} type="text" value={accessGroupInput} onChange={(e) => setAccessGroup(e.target.value)}></input></td>
                  <td><input type="date" value={birthDateInput.toString().substring(0,10)} onChange={(e) => setBirthDate(e.target.value.toString().substring(0,10))}></input></td>
                  <td><input type="date" value={joinDateInput.toString().substring(0,10)} onChange={(e) => setJoinDate(e.target.value.toString().substring(0,10))}></input></td>
                  <td>
                  <select name='status' id="statusUpd" onChange={(e) => setIsActive(Boolean(parseInt(e.target.value)))}>
                      <option disabled selected>{user.isActive ? "Активный" : "Не активный"}</option>
                      <option value={"1"}>Активный</option>
                      <option value={"0"}>Не активный</option>
                    </select>
                  </td>
                  <td>
                    <SaveIcon color="success" onClick={() => {
                      handleUpdate(user.id, user.user.id);
                      }} />
                    <CancelIcon color='error' onClick={() => setToggle({ userData: 0, toggle: true })} />
                  </td>
                </>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable